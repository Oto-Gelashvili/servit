import ServiceItem from './ServiceItem/ServiceItem';
import services from './ServicesData'; // Import the data

export default function ServicesPage() {
  return (
    <div className="services-list">
      {services.map((service) => (
        <ServiceItem
          key={service.id}
          img={service.img}
          avatar={service.avatar}
          category={service.category}
          subCategory={service.subCategory}
          title={service.title}
          desc={service.desc}
          tier={service.tier}
          price={service.price}
          name={service.name}
          id={`${service.title.replace(/\s+/g, '-').toLowerCase()}-${service.id}`}
        />
      ))}
    </div>
  );
}
