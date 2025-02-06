import { Star } from 'lucide-react';
import { Dictionary, Locale } from '../../../../get-dictionaries';
import { Database } from '../../utils/database.types';
import ImageUploader from './components/imageUploader';
import './profileForm.css';
import { SubmitButton } from '../../utils/submitButton';
import UpdateProfile from '../../actions/updateProfile';
interface profilePageProps {
  lang: Locale;
  users: Database['public']['Tables']['profiles']['Row'];
  dictionary: Dictionary['profile'];
  searchParams: { error?: string; success: string };
}
export default async function ProfileForm({
  lang,
  users,
  dictionary,
  searchParams,
}: profilePageProps) {
  return (
    <form action={UpdateProfile} className="profileForm">
      <input type="hidden" name="lang" defaultValue={lang} />
      <input type="hidden" name="slug" defaultValue={users.user_slug} />
      <input
        type="hidden"
        name="currentAvatarUrl"
        defaultValue={users.avatar_url || ''}
      />

      <div className="ratingCont">
        <ImageUploader
          currentImage={
            users.avatar_url ? users.avatar_url : '/images/anonProfile.jpg'
          }
        />
        <div className="rating">
          <p>{Number(users.rating).toFixed(2)}</p>
          <Star />
        </div>
      </div>
      <div className="profileInputCont">
        <h3>{dictionary.username}:</h3>
        <input
          type="text"
          id="username"
          name="username"
          placeholder={dictionary.username}
          defaultValue={users.username}
        />
      </div>
      <div className="profileInputCont">
        <h3>{dictionary.bio}:</h3>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder={dictionary.bio}
          defaultValue={users.bio}
        />
      </div>
      <div className="profileInputCont">
        <h3>{dictionary.phone}:</h3>
        <input
          type="tel"
          id="phone"
          inputMode="numeric"
          name="phone"
          placeholder={dictionary.phone}
          defaultValue={users.phone}
        />
        {searchParams?.error && searchParams.error === dictionary.numberReq && (
          <div className="error">{searchParams.error}</div>
        )}
      </div>

      <SubmitButton className="submitBtn" pendingText={dictionary.loading}>
        {dictionary.submit}
      </SubmitButton>
      {searchParams?.success && (
        <div className="success-message text-center">{dictionary.success}</div>
      )}
    </form>
  );
}
