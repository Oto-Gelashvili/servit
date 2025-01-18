import { signInAction } from '../../actions/authActions';
import Link from 'next/link';
import { SocialLoginButtons } from '../../components/auth/socialButtons';
import '../auth.css';
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
    <div className="p-6 auth-form-cont">
      <form className="login-form">
        <h1 className="">{dictionary.auth.header}</h1>
        {searchParams?.error && (
          <div className="error-message">{searchParams.error}</div>
        )}
        <div className="inputs">
          <input
            name="email"
            placeholder={dictionary.auth.email}
            autoComplete="email"
          />
          <input
            name="locale"
            placeholder={params.lang}
            value={params.lang}
            hidden
          />
          <div className="password-cont">
            <Link className="forgot" href={`/${params.lang}/forgot-password`}>
              {dictionary.auth.forgot}
            </Link>
            <input
              type="password"
              name="password"
              placeholder={dictionary.auth.password}
              autoComplete="current-password"
            />
          </div>

          <SubmitButton
            className="submit-btn"
            data-cy="submit-btn"
            pendingText={dictionary.auth.loading}
            formAction={signInAction}
          >
            {dictionary.auth.login}
          </SubmitButton>
        </div>
        <SocialLoginButtons dictionary={dictionary} />
      </form>
    </div>
  );
}
