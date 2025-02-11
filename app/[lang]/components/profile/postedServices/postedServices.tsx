'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
import { Database } from '../../../utils/database.types';
import ServiceItem from '../../ServicesStuff/ServiceItem/ServiceItem';
import './postedServices.css';
import { useRef } from 'react';
import CustomScrollbar from '../../home/serviceSection/customSlider';
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
    <div className="postedServicesCont">
      <div className="flex justify-between gap-6 items-center">
        <h2>{dictionary.postedServices}</h2>
        <div className="arrows flex items-center">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => scrollSlider('left')}
          ></ArrowLeft>
          <ArrowRight
            className="cursor-pointer"
            onClick={() => scrollSlider('right')}
          ></ArrowRight>
        </div>
      </div>
      <div ref={sliderRef} className="servicesCont">
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
      <div className="footer">
        <CustomScrollbar containerRef={sliderRef} />
      </div>
    </div>
  );
}
