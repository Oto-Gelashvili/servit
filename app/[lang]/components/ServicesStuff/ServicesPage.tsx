import ServiceItem from './ServiceItem/ServiceItem';
import { getLocalizedServices } from '../../utils/supabaseUtils';
import { Dictionary, Locale } from '../../../../get-dictionaries';
import Pagination from './Pagination';

type ServicesPageProps = {
  searchParams?: {
    sort?:
      | 'price-high-to-low'
      | 'price-low-to-high'
      | 'tier-high-to-low'
      | 'tier-low-to-high';
    search?: string;
    page?: string;
  };
  dictionary: Dictionary['services'];
  lang: Locale;
};

// const convertTierToNumber = (tier: string): number => {
//   const match = tier.match(/\d+/);
//   return match ? parseInt(match[0], 10) : 0;
// };

// const convertPriceToNumber = (price: string): number => {
//   if (price === 'TBD') return 0;
//   const match = price.match(/\d+/);
//   return match ? parseInt(match[0], 10) : 0;
// };

export default async function ServicesPage({
  searchParams = {},
  dictionary,
  lang,
}: ServicesPageProps) {
  const pageSize = 2;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const searchTerm = searchParams.search || '';
  const sortOption = searchParams.sort || '';

  const { data: services, count } = await getLocalizedServices(
    lang,
    currentPage,
    pageSize,
    searchTerm,
    sortOption
  );
  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div>
      <div className="services-list">
        {services.length === 0 ? (
          <div className="no-results">{dictionary.notFound}</div>
        ) : (
          services.map((service) => (
            <ServiceItem
              key={service.id}
              lang={lang}
              img={service.image_urls[0]}
              desc={
                lang === 'en' ? service.description_en : service.description_ka
              }
              price={service.price}
              title={lang === 'en' ? service.title_en : service.title_ka}
              id={service.id}
              profileData={service.profiles}
              categoryData={service.categories}
            />
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          lang={lang}
          dictionary={dictionary}
        />
      )}
    </div>
  );
}
