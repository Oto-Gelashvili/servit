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

interface Product {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  Date: string;
  locale: string;
  product_id: string;
}

export default async function PurchasedProducts({ params }: ProductsProps) {
  const dictionary = await getDictionary(params.lang as Locale);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId);

  const products: Product[] = data || [];

  if (error) {
    console.error('Error fetching products:', error);
    return null;
  }

  if (products.length === 0) {
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

  return (
    <main className="purchases-main">
      <h1 className="purchases-title"> {dictionary.order.title}</h1>
      <div className="purchases-list">
        {products
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
                    </h3>{' '}
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
