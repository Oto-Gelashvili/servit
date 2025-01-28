import './ServiceItem.css';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceItemProps {
  lang: string;
  id: number;
  img: string;
  categoryId: number;
  // hyperlink: string;
  title: string;
  desc: string;
  avatar: string;
  name: string;
  tier: string;
  price: number;
  user_id: number;
}

export default function ServiceItem({
  lang,
  id,
  img,
  categoryId,
  title,
  desc,
  avatar,
  name,
  tier,
  price,
  // user_id,
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
          <h6>
            <p>{categoryId}</p>
          </h6>
          <h2>
            <div>{title}</div>
          </h2>
          <p className="desc">{desc}</p>
          <div className="info">
            <div className="profile-info">
              <div>
                <Image
                  src={
                    avatar.includes('undefined')
                      ? '/images/anonProfile.jpg'
                      : img
                  }
                  alt={`${name}'s avatar`}
                  width={40}
                  height={40}
                  className="avatar-image"
                />
              </div>
              <div className="tier-container">
                <p className="name">{name}</p>
                <p>{tier}</p>
              </div>
            </div>
            <h4 className="pricing">{price}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}
