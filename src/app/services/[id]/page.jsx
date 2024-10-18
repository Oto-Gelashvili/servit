import Image from 'next/image';
import { notFound } from 'next/navigation';
import services from '../../components/ServicesStuff/ServicesList/ServicesData';
import './ServicePage.css';

export default function ServicePage({ params }) {
  const { id } = params;

  // Find the service that matches the id from the URL
  const service = services.find(
    (service) =>
      service.title.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() +
        '-' +
        service.id ===
      id
  );

  // If service not found, show 404 page
  if (!service) {
    notFound();
  }

  return (
    <div className="product-page">
      <div className="cont">
        <div className="profile-info">
          <Image src={service.avatar} alt="avatar" width={100} height={100} />
          <div className="profile-text-info">
            <h4>{service.name}</h4>
            <p>{service.tier}</p>
          </div>
        </div>
        <h1>{service.title}</h1>
        <p className="price">{service.price} </p>
      </div>
      <p className="desc">{service.desc}</p>
      <div className="contacts">
        <h6>Contacts:</h6>
        <p className="number">{service.Number}</p>
        <button>Send a Message</button>
      </div>
    </div>
  );
}
