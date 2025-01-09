import './purchases.css';
import Link from 'next/link';
import { createClient } from '../../../utils/supabase/server';
import { getDictionary } from '../../../get-dictionaries';
import { Locale } from '../../../get-dictionaries';
import Image from 'next/image';
import { XCircle } from 'lucide-react';

interface ProductsProps {
  params: {
    lang: Locale;
  };
}

interface ProductDetails {
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
}
interface Order {
  id: string;
  user_id: string;
  product_id: string;
  locale: string;
  Date: string;
}

interface Product extends Order, ProductDetails {}

export default async function PurchasedProducts({ params }: ProductsProps) {
  const dictionary = await getDictionary(params.lang as Locale);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data: orders, error: ordersError } = (await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)) as { data: Order[]; error: Error | null };

  if (ordersError) {
    console.error('Error fetching orders:', ordersError);
    return null;
  }

  if (orders.length === 0) {
    return (
      <main className="purchases-main flex">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4.2rem',
            textAlign: 'center',
          }}
        >
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <p>{dictionary.products.noProducts}.</p>
        </div>
      </main>
    );
  }

  // Fetch product details for each order
  const products: (Product | null)[] = await Promise.all(
    orders.map(async (order) => {
      const { data: productDetails, error: productDetailsError } =
        (await supabase
          .from(`products_${order.locale}`)
          .select('title, price, thumbnail,category, description')
          .eq('id', order.product_id)
          .single()) as {
          data: ProductDetails;
          error: Error | null;
        };

      if (productDetailsError) {
        console.error('Error fetching product details:', productDetailsError);
        return null;
      }

      // Combine order and product details into a single object
      const combinedProduct: Product = {
        ...order,
        ...productDetails,
      };

      return combinedProduct;
    })
  );

  return (
    <main className="purchases-main">
      <h1 className="purchases-title">{dictionary.order.title}</h1>
      <div className="purchases-list">
        {products
          .filter((product) => product !== null)
          .sort(
            (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
          )
          .map((product) => (
            <div key={product.id} className="purchase-item">
              <Link
                href={`/${product.locale}/products/${product.product_id}`}
                passHref
              >
                <div className="img-container">
                  <Image
                    src={product.thumbnail || '/path/to/default-image.png'} // Provide fallback image
                    alt={product.title || 'Product Image'}
                    fill
                    priority
                    className="product-image"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="text-container">
                  <h6>
                    <p>{product.category}</p>
                  </h6>
                  <h2>
                    <div>{product.title}</div>
                  </h2>
                  <p className="desc">{product.description}</p>
                  <div className="attract">
                    <h3 className="brand">
                      {new Date(product.Date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h3>
                    <h4 className="pricing">{product.price}$</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </main>
  );
}
