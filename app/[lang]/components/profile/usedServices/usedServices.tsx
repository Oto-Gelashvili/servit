import { Dictionary, Locale } from '../../../../../get-dictionaries';
import { Database } from '../../../utils/database.types';
import ServiceItem from '../../ServicesStuff/ServiceItem/ServiceItem';
interface UsedServicesProps {
  lang: Locale;
  dictionary: Dictionary['services'];
  usedServices: (Database['public']['Tables']['usedService']['Row'] & {
    service: Database['public']['Tables']['services']['Row'] & {
      categories: Database['public']['Tables']['categories']['Row'];
    };
  })[];

  usersProfile: Database['public']['Tables']['profiles']['Row'];
}

export default function UsedServices({
  dictionary,
  usedServices,
  lang,
  usersProfile,
}: UsedServicesProps) {
  return (
    <div className="usedServicesCont">
      <h2>{dictionary.usedServices}</h2>

      <div className="servicesCont ">
        {usedServices.map((usedService) => (
          <ServiceItem
            key={usedService.id}
            lang={lang}
            img={usedService.service?.image_urls?.[0]}
            desc={
              lang === 'en'
                ? usedService.service.description_en
                : usedService.service.description_ka
            }
            price={usedService.service.price}
            title={
              lang === 'en'
                ? usedService.service.title_en
                : usedService.service.title_ka
            }
            id={usedService.id}
            profileData={usersProfile}
            categoryData={usedService.service.categories}
          />
        ))}
      </div>
    </div>
  );
}
