import styles from './productPage.css';
import ImageSlider from '@/app/utils/imageSlider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import QuantitySelector from '@/app/utils/quantitySelector';

const fetchProduct = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
};

const renderStars = (rating) => {
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
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

export default async function ProductPage({ params }) {
  const { id } = params; // Get the ID from URL parameters
  const product = await fetchProduct(id); // Fetch product details based on ID

  return (
    <div id="productPage">
      <div className="heading">
        <h1 className="productTitle">{product.title}</h1>
        <div className="stars">{renderStars(product.rating)}</div>
      </div>
      <div className="grouping">
        <Link href={`/categories/${product.category}`} className="category">
          {product.category}
        </Link>
        <div className="tags">
          {product.tags.map((tag, index) => (
            <Link key={index} href={`/tags/${tag}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="gridCont">
        <ImageSlider images={product.images} />
        <div className="sideBar">
          <div className="sideBarHeading">
            <p className="brand">{product.brand}</p>
            <div className="pricing">
              <p className="price">{product.price}</p>
              <div className="discounting">
                <p className="discount">{product.discountPercentage}% </p>
                <p className="off">Off</p>
              </div>
            </div>
          </div>
          <div className="legalInfo">
            <p className="waranty">{product.warrantyInformation}</p>
            <p className="shipping">{product.shippingInformation} </p>
            <p className="return">{product.returnPolicy} </p>
          </div>
          <div className="stocks">
            <p className="stock">
              Amount in stock: <span>{product.stock}</span>{' '}
            </p>
            <p className="minOrder">
              Minimum order quantity:{' '}
              <span>{product.minimumOrderQuantity}</span>
            </p>
            <QuantitySelector
              stock={product.stock}
              minOrder={product.minimumOrderQuantity}
            />
          </div>
          <div className="buttons">
            <button className="addCartBtn">Add to cart</button>
            <button className="buyBtn">Buy now</button>
          </div>
        </div>
        <div className="textSection">
          <p className="desc">{product.description} </p>
          <div className="additionalInfo">
            <div className="dimensions">
              <h6>dimensions:</h6>
              <p>width: {product.dimensions.width}</p>
              <p>height: {product.dimensions.height}</p>
              <p>depth: {product.dimensions.depth}</p>
            </div>
            <p className="weight">weight: {product.weight}kg</p>

            <p className="sku">sku: {product.sku}</p>
          </div>
        </div>
        <div className="reviewsCont">
          <h3 className="reviews">Customer reviews</h3>
          {product.reviews.map((review, index) => (
            <div key={index} className="review">
              <h6>{review.reviewerName}</h6>
              <div className="reviewDetails">
                <div className="stars">{renderStars(review.rating)}</div>
                <p className="date">{formatDate(review.date)}</p>
              </div>
              <p className="comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
