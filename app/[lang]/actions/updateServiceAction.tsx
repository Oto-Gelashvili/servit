import Stripe from 'stripe';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { getCategoryIdByName } from '../utils/supabaseUtils';

export default async function updateService(formData: FormData) {
  'use server';
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY');
    throw new Error('Server configuration error');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = await createClient();

  // Get form data
  const lang = formData.get('lang') as Locale;
  const serviceId = formData.get('serviceId') as string;
  const priceId = formData.get('priceId') as string;
  const price = Number(formData.get('price'));
  const initialPrice = Number(formData.get('initialPrice'));
  const stripeId = formData.get('stripeId') as string;
  let newStripePriceId;
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
  const category = formData.get('category') as string;
  if (!title) {
    return redirect(
      `/${lang}/updateService?service=${serviceId}&error=${encodeURIComponent(dictionary.titleReq)}`
    );
  } else if (!description) {
    return redirect(
      `/${lang}/updateService?service=${serviceId}&error=${encodeURIComponent(dictionary.descriptionReq)}`
    );
  } else if (!price) {
    return redirect(
      `/${lang}/updateService?service=${serviceId}&error=${encodeURIComponent(dictionary.priceReq)}`
    );
  } else if (!category) {
    return redirect(
      `/${lang}/updateService?service=${serviceId}&error=${encodeURIComponent(dictionary.categoryReq)}`
    );
  }
  const categoryId = await getCategoryIdByName(category, lang);

  try {
    //  Handle price update in Stripe
    if (price !== initialPrice) {
      const newPrice = await stripe.prices.create({
        product: stripeId,
        unit_amount: Math.round(price * 100),
        currency: 'gel',
      });

      newStripePriceId = newPrice.id;

      // Archive old price
      await stripe.prices.update(priceId, {
        active: false,
      });
    }

    // Update database
    const { error } = await supabase
      .from('services')
      .update({
        price,
        stripe_price_id: newStripePriceId,
        updatedat: new Date().toISOString(),
        title_en,
        title_ka,
        description_en,
        description_ka,
        categoryId,
      })
      .eq('id', serviceId);

    if (error) throw error;

    revalidatePath(`/${lang}/services`);
    redirect(`/${lang}/services/${serviceId}`);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
