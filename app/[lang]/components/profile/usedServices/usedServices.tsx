'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
import { Database } from '../../../utils/database.types';
import ServiceItem from '../../ServicesStuff/ServiceItem/ServiceItem';
import { useRef } from 'react';
import CustomScrollbar from '../../home/serviceSection/customSlider';
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
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const slideWidth = slider.querySelector('.service-item')?.clientWidth || 0;

    let multiplier = 1;

    const scrollAmount = slideWidth * multiplier;

    if (direction === 'right') {
      slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    } else {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="usedServicesCont">
      <div className="flex justify-between gap-6 items-center">
        <h2>{dictionary.usedServices}</h2>
        <div className="arrows flex items-center">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => scrollSlider('left')}
          />
          <ArrowRight
            className="cursor-pointer"
            onClick={() => scrollSlider('right')}
          />
        </div>
      </div>

      <div ref={sliderRef} className="servicesCont ">
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
            id={usedService.service_id}
            profileData={usersProfile}
            categoryData={usedService.service.categories}
          />
        ))}
      </div>
      <div className="footer">
        <CustomScrollbar containerRef={sliderRef} />
      </div>
    </div>
  );
}
