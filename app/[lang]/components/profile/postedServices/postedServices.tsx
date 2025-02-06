import { Dictionary, Locale } from '../../../../../get-dictionaries';
import { Database } from '../../../utils/database.types';
import ServiceItem from '../../ServicesStuff/ServiceItem/ServiceItem';
import './postedServices.css';
interface PostedServicesProps {
  lang: Locale;
  dictionary: Dictionary['services'];
  services: (Database['public']['Tables']['services']['Row'] & {
    categories: Database['public']['Tables']['categories']['Row'];
  })[];
  usersProfile: Database['public']['Tables']['profiles']['Row'];
}

export default function PostedServices({
  dictionary,
  services,
  lang,
  usersProfile,
}: PostedServicesProps) {
  return (
    <div className="postedServicesCont">
      <h2>{dictionary.postedServices}</h2>
      <div className="servicesCont">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            lang={lang}
            img={service.image_urls?.[0]}
            desc={
              lang === 'en' ? service.description_en : service.description_ka
            }
            price={service.price}
            title={lang === 'en' ? service.title_en : service.title_ka}
            id={service.id}
            profileData={usersProfile}
            categoryData={service.categories}
          />
        ))}
      </div>
    </div>
  );
}
