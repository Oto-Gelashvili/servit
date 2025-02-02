'use server';
import './productPage.css';
import ImageSlider from '../../../components/ServicesStuff/components/imageSlider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import QuantitySelector from '../../../utils/quantitySelector';
import { getItemById } from '../../../utils/supabaseUtils'; // Import the function to fetch data from Supabase
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import BuyButton from '../../../components/Products/BuyButton'; // Import the BuyButton component
import { createClient } from '../../../../../utils/supabase/server';
import DeleteButton from '../../../components/Products/DeleteButton';
// import { deleteProduct } from '../../../actions/productsActions';

const renderStars = (rating: number) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating); // Get the full star count
  const hasHalfStar = roundedRating - fullStars === 0.5; // Check if there's a half star
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} />);
  }
  return stars;
};

interface ProductPageProps {
  params: { id: string; lang: Locale }; // Product ID from URL params
}
export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  if (!user_id) {
    console.error('User not authenticated');
    throw new Error('Authentication required');
  }

  const { id } = params; // Get the ID from URL parameters
  const dictionary = await getDictionary(params.lang as 'en');

  // Fetch product details from Supabase
  const product = await getItemById(`products_${params.lang}`, id);

  if (!product) {
    return (
      <main className="flex flex-1 justify-center items-center text-4xl">
        {dictionary.products.noProducts}
      </main>
    );
  }

  return (
    <div id="productPage">
      <div className="heading">
        <h1 className="productTitle">{product.title}</h1>
        <div className="stars">{renderStars(product.rating || 0)}</div>
      </div>
      <div className="metaBtns">
        <div className="grouping">
          <Link href={`/categories/${product.category}`} className="category">
            {product.category}
          </Link>
          <div className="tags">
            {product.tags?.map((tag, index) => (
              <Link key={index} href={`/tags/${tag}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>
        {product.user_id === user_id && (
          <DeleteButton
            serviceId={product.id}
            lang={params.lang}
            dictionary={dictionary.services}
          />
        )}
      </div>
      <div className="gridCont">
        <ImageSlider images={product.thumbnail ? [product.thumbnail] : []} />
        <div className="sideBar">
          <div className="sideBarHeading">
            <p className="brand">{product.brand}</p>
            <div className="pricing">
              <p className="price">{product.price}$</p>
              {product.discountPercentage && (
                <div className="discounting">
                  <p className="discount">{product.discountPercentage}% </p>
                  <p className="off">Off</p>
                </div>
              )}
            </div>
          </div>
          <div className="legalInfo">
            <p className="waranty">{product.warrantyInformation}</p>
            <p className="shipping">{product.shippingInformation}</p>
            <p className="return">{product.returnPolicy}</p>
          </div>
          <div className="stocks">
            <p className="stock">
              {dictionary.productsID.stock}: <span>{product.stock}</span>
            </p>
            <p className="minOrder">
              {dictionary.productsID.order}:{' '}
              <span>{product.minimumOrderQuantity}</span>
            </p>
            <QuantitySelector
              stock={product.stock}
              minOrder={product.minimumOrderQuantity}
            />
          </div>
          <div className="buttons">
            <button className="addCartBtn">{dictionary.productsID.cart}</button>
            <BuyButton
              product={product}
              dictionary={dictionary.productsID}
              locale={params.lang}
            />
          </div>
        </div>
        <div className="textSection">
          <p className="desc">{product.description}</p>
          <div className="additionalInfo">
            <div className="dimensions">
              <h6>{dictionary.productsID.dimensions}:</h6>
              <p>
                {dictionary.productsID.width}: {product.width}
              </p>
              <p>
                {dictionary.productsID.height}: {product.height}
              </p>
              <p>
                {dictionary.productsID.depth}: {product.depth}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
