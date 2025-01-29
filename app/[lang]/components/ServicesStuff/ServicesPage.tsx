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
  const pageSize = 24;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const { data: services, count } = await getLocalizedServices(
    lang,
    currentPage,
    pageSize
  );
  const totalPages = Math.ceil((count || 0) / pageSize);

  // const sortType = searchParams?.sort || '';
  // const searchTerm = searchParams?.search || '';

  // Filtering by title and description
  // let filteredServices = searchTerm
  //   ? services.filter((service) => {
  //       const searchWords = searchTerm.toLowerCase().split(' ');
  //       if (lang === 'en') {
  //         const titleLower = service.title_en.toLowerCase();
  //         const descLower = service.description_en.toLowerCase();
  //         return searchWords.every(
  //           (word) => titleLower.includes(word) || descLower.includes(word)
  //         );
  //       } else {
  //         const titleLower = service.title_ka.toLowerCase();
  //         const descLower = service.description_ka.toLowerCase();
  //         return searchWords.every(
  //           (word) => titleLower.includes(word) || descLower.includes(word)
  //         );
  //       }
  //     })
  //   : [...services];

  // Sorting logic
  // switch (sortType) {
  //   case 'price-high-to-low':
  //     filteredServices.sort(
  //       (a, b) =>
  //         convertPriceToNumber(b.price.toString()) -
  //         convertPriceToNumber(a.price.toString())
  //     );
  //     break;
  //   case 'price-low-to-high':
  //     filteredServices.sort(
  //       (a, b) =>
  //         convertPriceToNumber(a.price.toString()) -
  //         convertPriceToNumber(b.price.toString())
  //     );
  //     break;
  //   case 'tier-high-to-low':
  //     filteredServices.sort(
  //       (a, b) =>
  //         convertTierToNumber(b.tier.toString()) -
  //         convertTierToNumber(a.tier.toString())
  //     );
  //     break;
  //   case 'tier-low-to-high':
  //     filteredServices.sort(
  //       (a, b) =>
  //         convertTierToNumber(a.tier.toString()) -
  //         convertTierToNumber(b.tier.toString())
  //     );
  //     break;
  //   default:
  //     break;
  // }
  // Filter services based on the language
  // const filteredServices = services.filter((service) => {
  //   if (lang === 'en') {
  //     return service.title_en && service.description_en;
  //   } else if (lang === 'ka') {
  //     return service.title_ka && service.description_ka;
  //   }
  //   return false;
  // });
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
