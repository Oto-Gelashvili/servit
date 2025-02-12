import { Star } from 'lucide-react';
import { Dictionary } from '../../../../get-dictionaries';
import { Database } from '../../utils/database.types';
import './profileForm.css';
import UpdateProfile from '../../actions/updateProfile';
import Image from 'next/image';
interface profilePageProps {
  users: Database['public']['Tables']['profiles']['Row'];
  dictionary: Dictionary['profile'];
}
export default async function ProfileFormDisabled({
  users,
  dictionary,
}: profilePageProps) {
  return (
    <form action={UpdateProfile} className="profileForm">
      <div className="ratingCont">
        <div className="relative w-[80px] h-[80px] ">
          <Image
            src={
              users.avatar_url ? users.avatar_url : '/images/anonProfile.jpg'
            }
            sizes="80px"
            className="rounded-[50%]"
            fill
            objectFit="cover"
            alt="avatar"
          ></Image>
        </div>
        <div className="rating">
          <p>{Number(users.rating).toFixed(2)}</p>
          <Star />
        </div>
      </div>
      <div className="profileInputCont ">
        <h3>{dictionary.username}:</h3>
        <input
          type="text"
          id="username"
          name="username"
          disabled
          placeholder={dictionary.username}
          defaultValue={users.username}
        />
      </div>
      <div className="profileInputCont">
        <h3>{dictionary.bio}:</h3>
        <p>{users.bio ? users.bio : 'N/A'}</p>
      </div>
      <div className="profileInputCont">
        <h3>{dictionary.phone}:</h3>
        <a href={`tel:+995${users.phone}`}>
          {users.phone ? users.phone : 'N/A'}
        </a>
      </div>
    </form>
  );
}
