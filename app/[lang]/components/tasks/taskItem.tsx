import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Locale } from '../../../../get-dictionaries';
import { Database } from '../../utils/database.types';

interface TaskItemProps {
  lang: Locale;
  id: number;
  title: string;
  profileData: Database['public']['Tables']['profiles']['Row'];
  categoryData: Database['public']['Tables']['categories']['Row'];
}

export default async function TaskItem({
  lang,
  id,
  title,
  profileData,
  categoryData,
}: TaskItemProps) {
  return (
    <div className="task-item">
      <Link href={`/${lang}/profile/${profileData.user_slug}`} className="info">
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
      </Link>
      <Link href={`/${lang}/tasks/${id}`} className="titleCont">
        <h3>{title}</h3>
      </Link>
      <div className="categoryCont">
        <Link
          href={`/${lang}/tasks?category=${categoryData.id}`}
          className="category-button"
        >
          {lang === 'en' ? categoryData.category_en : categoryData.category_ka}
        </Link>
      </div>
    </div>
  );
}
