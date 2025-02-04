import './ServiceItem.css';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Database } from '../../../utils/database.types';
import CategoryLink from '../components/categoryLink';
import { Locale } from '../../../../../get-dictionaries';

interface ServiceItemProps {
  lang: Locale;
  id: number;
  img: string;
  title: string;
  desc: string;
  // avatar: string;
  // name: string;
  // tier: string;
  price: number;
  profileData: Database['public']['Tables']['profiles']['Row'];
  categoryData: Database['public']['Tables']['categories']['Row'];
}

export default async function ServiceItem({
  lang,
  id,
  img,
  title,
  desc,
  // avatar,
  // name,
  // tier,
  price,
  profileData,
  categoryData,
}: ServiceItemProps) {
  return (
    <div className="service-item">
      <Link href={`/${lang}/services/${id}`}>
        <div className="img-container">
          <Image
            src={img.includes('undefined') ? '/images/noImage.png' : img}
            alt={title}
            fill
            priority
            className="service-image"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="text-container">
          <CategoryLink lang={lang} categoryData={categoryData} />
          <h2>
            <div>{title}</div>
          </h2>
          <p className="desc">{desc}</p>
        </div>
      </Link>
      <Link href={'/'} className="info">
        <div className="profile-info">
          <div className="w-[32px]">
            <Image
              src={
                profileData.avatar_url
                  ? profileData.avatar_url
                  : '/images/anonProfile.jpg'
              }
              alt={`${profileData.username}'s avatar`}
              width={40}
              height={40}
              className="avatar-image"
            />
          </div>
          <div className="tier-container">
            <p className="name">{profileData.username}</p>
            <div className="ratingCont">
              <p>{Number(profileData.rating).toFixed(2)}</p>
              <Star />
            </div>
          </div>
        </div>
        <h4 className="pricing">{price.toFixed(2)}₾</h4>
      </Link>
    </div>
  );
}
