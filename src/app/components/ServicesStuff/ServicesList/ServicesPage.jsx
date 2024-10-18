import ServiceItem from './ServiceItem/ServiceItem';
import services from './ServicesData';

const convertTierToNumber = (tier) => {
  const match = tier.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const convertPriceToNumber = (price) => {
  if (price === 'TBD') return 0;
  const match = price.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export default function ServicesPage({ sortType }) {
  const sortedServices = [...services].sort((a, b) => {
    switch (sortType) {
      case 'Price High to Low':
        return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
      case 'Price Low to High':
        return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
      case 'Tier High to Low':
        return convertTierToNumber(b.tier) - convertTierToNumber(a.tier);
      case 'Tier Low to High':
        return convertTierToNumber(a.tier) - convertTierToNumber(b.tier);
      default:
        return 0; // No sorting
    }
  });

  return (
    <div className="services-list">
      {sortedServices.map((service) => (
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
          id={`${service.title.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}-${service.id}`}
        />
      ))}
    </div>
  );
}
