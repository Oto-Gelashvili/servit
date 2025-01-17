import Stripe from 'stripe';
import { createClient } from '../../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function createProduct(formData: FormData) {
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

  if (!user_id) {
    console.error('User not authenticated');
    throw new Error('Authentication required');
  }

  // Get form data
  const title = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const thumbnail = formData.get('image') as string;
  const brand = formData.get('brand') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const tags = (formData.get('tags') as string)
    .split(',')
    .map((tag) => tag.trim());
  const weight = Number(formData.get('weight'));
  const width = Number(formData.get('width'));
  const height = Number(formData.get('height'));
  const depth = Number(formData.get('depth'));
  const lang = formData.get('lang');

  if (!lang) {
    console.error('Missing lang');
    throw new Error('Locale is required');
  }

  if (
    !title ||
    !price ||
    !thumbnail ||
    !brand ||
    !category ||
    !description ||
    !tags.length ||
    isNaN(weight) ||
    isNaN(width) ||
    isNaN(height) ||
    isNaN(depth)
  ) {
    console.error('Missing required fields');
    throw new Error('Please fill in all required fields');
  }

  if (isNaN(price) || price <= 0) {
    redirect(`/${lang}/products/`);
  }

  try {
    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name: title,
      description,
      images: [thumbnail],
      metadata: {
        brand,
        category,
      },
    });

    // Create price for the product in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Ensure whole number
      currency: 'usd',
    });

    // Insert product data into Supabase
    const { data, error } = await supabase
      .from(`products_${lang}`)
      .insert({
        title,
        price,
        thumbnail,
        brand,
        category,
        description,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
        user_id,
        stock: 1,
        minimumOrderQuantity: 1,
        rating: 0,
        warrantyInformation: '1 year warranty',
        shippingInformation: 'Ships in 1 month',
        returnPolicy: '30-day return policy',
        tags,
        weight,
        width,
        height,
        depth,
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
    revalidatePath(`/${lang}/products`);
    redirect(`/${lang}/products/${data.id}`);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
