import { useParams, Navigate } from 'react-router-dom';
import services from '../ServicesData';
import './ServicePage.css';
export default function ServicePage() {
  const { id } = useParams();

  // Find the service that matches the id from the URL
  const service = services.find(
    (service) =>
      service.title.replace(/\s+/g, '-').toLowerCase() + '-' + service.id === id
  );

  // If service not found, display a message or redirect to a 404 page
  // If service not found, redirect to a 404 page
  if (!service) {
    Navigate('/404'); // Redirect to the NotFound route
    return null; // Prevent rendering the rest of the component
  }

  return (
    <div className="product-page">
      <div className="cont">
        <div className="profile-info">
          <img src={service.avatar} alt="avatar" />
          <div className="profile-text-info">
            <h4>{service.name}</h4>
            <p>{service.tier}</p>
          </div>
        </div>
        <h1>{service.title}</h1>
        <p className="price">{service.price} </p>
      </div>
      <p className="desc">{service.desc}</p>
      <div className="img-n-contact">
        <img src={service.img} alt={service.img} />
        <div className="contacts">
          <h6>Contacts:</h6>
          <button>Send a Message</button>
          <p className="number">{service.Number}</p>
        </div>
      </div>
    </div>
  );
}
