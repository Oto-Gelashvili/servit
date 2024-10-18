import './ServiceItem.css';
import Link from 'next/link';
import Image from 'next/image';

export default function ServiceItem({
  id,
  img,
  category,
  subCategory,
  title,
  desc,
  avatar,
  name,
  tier,
  price,
}) {
  return (
    <div className="service-item">
      <Link href={`/services/${id}`}>
        <div className="img-container">
          <Image
            src={img}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="service-image"
          />
        </div>
        <div className="text-container">
          <h6>
            <p>{category}</p>
            <p>/</p>
            <p>{subCategory}</p>
          </h6>
          <h2>
            <div>{title}</div>
          </h2>
          <p className="desc">{desc}</p>
          <div className="info">
            <div className="profile-info">
              <div>
                <Image
                  src={avatar}
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
