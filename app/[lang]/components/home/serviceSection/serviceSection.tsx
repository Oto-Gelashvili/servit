'use client';
import Link from 'next/link';
import './serviceSection.css';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
import ServiceItem from '../../ServicesStuff/ServiceItem/ServiceItem';
import { useRef } from 'react';
import { Database } from '../../../utils/database.types';
import CustomScrollbar from './customSlider';

interface serviceSectionProps {
  lang: Locale;
  dictionary: Dictionary['home'];

  services: Array<
    Database['public']['Tables']['services']['Row'] & {
      categories: Database['public']['Tables']['categories']['Row'];
      profiles: Database['public']['Tables']['profiles']['Row'];
    }
  >;
}

export default function ServiceSection({
  lang,
  services,
  dictionary,
}: serviceSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const slideWidth = slider.querySelector('.service-item')?.clientWidth || 0;
    const screenWidth = window.innerWidth;

    let multiplier = 4;
    if (screenWidth <= 400) multiplier = 1;
    else if (screenWidth <= 575) multiplier = 1.5;
    else if (screenWidth <= 768) multiplier = 2;
    else if (screenWidth <= 1200) multiplier = 3;

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
    <section className="servicesSection">
      <div className="heading">
        <div className="head">
          <Star></Star>
          <h2>{dictionary.servicesProf}</h2>
        </div>
        <div className="arrows">
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
      <div ref={sliderRef} className="slider">
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
            profileData={service.profiles}
            categoryData={service.categories}
          />
        ))}
      </div>
      <div className="footer">
        <CustomScrollbar containerRef={sliderRef} />
        <Link className="browse" href={`/${lang}/services`}>
          {dictionary.browse}
        </Link>
      </div>
    </section>
  );
}
