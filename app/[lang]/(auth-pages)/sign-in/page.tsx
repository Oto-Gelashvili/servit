import { signInAction } from '../../actions/authActions';
import Link from 'next/link';
import { SocialLoginButtons } from '../../components/auth/socialButtons';
import './login.css';
import { SubmitButton } from '../../components/auth/submitButton';
import { Locale } from '../../../../get-dictionaries';
import { getDictionary } from '../../../../get-dictionaries';
export default async function Login({
  searchParams,
  params,
}: {
  searchParams: { error?: string };
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="p-6">
      <form className="login-form">
        <h1 className="">{dictionary.signIn.header}</h1>
        {searchParams?.error && (
          <div className="error-message">{searchParams.error}</div>
        )}
        <div className="inputs">
          <input
            name="email"
            placeholder={dictionary.signIn.email}
            autoComplete="email"
            required
          />
          <input
            name="locale"
            placeholder={params.lang}
            value={params.lang}
            hidden
          />
          <div className="password-cont">
            <Link className="forgot" href="/forgot-password">
              {dictionary.signIn.forgot}
            </Link>
            <input
              type="password"
              name="password"
              placeholder={dictionary.signIn.password}
              autoComplete="current-password"
              required
            />
          </div>

          <SubmitButton
            className="submit-btn"
            pendingText={dictionary.signIn.loading}
            formAction={signInAction}
          >
            {dictionary.signIn.login}
          </SubmitButton>
        </div>
        <SocialLoginButtons dictionary={dictionary} />
      </form>
    </div>
  );
}
