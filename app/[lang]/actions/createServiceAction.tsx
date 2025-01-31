import Stripe from 'stripe';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { getCategoryIdByName } from '../utils/supabaseUtils';

export default async function createService(formData: FormData) {
  'use server';
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY');
    throw new Error('Server configuration error');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = await createClient();

  // Get user id from Supabase with error handling
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  // Get form data
  const lang = formData.get('lang') as Locale;
  let title_en: string;
  let title_ka: string;
  let description_en: string;
  let description_ka: string;

  // needed for differnet language content correct allocation
  if (lang === 'en') {
    title_en = formData.get('title') as string;
    title_ka = formData.get('title_in') as string;
    description_en = formData.get('desc') as string;
    description_ka = formData.get('desc_in') as string;
  } else {
    title_en = formData.get('title_in') as string;
    title_ka = formData.get('title') as string;
    description_en = formData.get('desc_in') as string;
    description_ka = formData.get('desc') as string;
  }
  const dictionary = (await getDictionary(lang)).addService;
  const title = formData.get('title') as string;
  const description = formData.get('desc') as string;
  const price = Number(formData.get('price'));
  const category = formData.get('category') as string;
  const images = formData.getAll('service_images') as File[];

  // Track uploaded file paths for cleanup if error occurs and it should get cleared
  const uploadedFilePaths: string[] = [];

  if (!title) {
    return redirect(
      `/${lang}/createService?error=${encodeURIComponent(dictionary.titleReq)}`
    );
  } else if (!description) {
    return redirect(
      `/${lang}/createService?error=${encodeURIComponent(dictionary.descriptionReq)}`
    );
  } else if (!price) {
    return redirect(
      `/${lang}/createService?error=${encodeURIComponent(dictionary.priceReq)}`
    );
  } else if (!category) {
    return redirect(
      `/${lang}/createService?error=${encodeURIComponent(dictionary.categoryReq)}`
    );
  }
  const categoryId = await getCategoryIdByName(category, lang);

  try {
    // Upload images to Supabase Storage
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const filePath = `services/${user_id}/${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('service_images')
          .upload(filePath, image);

        if (uploadError) {
          // Clean up any previously uploaded files before throwing the error
          await Promise.all(
            uploadedFilePaths.map(async (path) => {
              await supabase.storage.from('service_images').remove([path]);
            })
          );
          throw uploadError;
        }

        // Track the uploaded file path so we can clear them if error occurs in futuure
        uploadedFilePaths.push(filePath);

        // Get the public URL of the uploaded image
        const { data: urlData } = supabase.storage
          .from('service_images')
          .getPublicUrl(filePath);

        return urlData.publicUrl;
      })
    );

    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name: lang === 'en' ? title_en : title_ka,
      description: lang === 'en' ? description_en : description_ka,
      images: [imageUrls[0]],
      metadata: {
        category,
      },
    });

    // Create price for the product in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Ensure whole number
      currency: 'gel',
    });

    // Insert product data into Supabase
    const { data, error } = await supabase
      .from(`services`)
      .insert({
        title_en,
        title_ka,
        description_en,
        description_ka,
        price,
        categoryId,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
        user_id,
        image_urls: imageUrls,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting into Supabase:', error);
      // Clean up Stripe resources on failure
      await stripe.products.del(stripePrice.id);
      await stripe.products.del(stripeProduct.id);
      throw new Error(`Database error: ${error.message}`);
    }

    //revalidate path so uploaded services are visible
    revalidatePath(`/${lang}/services`);
    redirect(`/${lang}/services/${data.id}`);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
