import Link from 'next/link';
import Pagination from '@/app/components/pagination/Pagination';

const fetchProducts = async (page) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0 };
  }
};

export default async function Products({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const data = await fetchProducts(page);
  const products = data.products;
  const totalPages = Math.ceil(data.total / 10);

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
