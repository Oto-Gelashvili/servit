import { signUpAction } from '../../actions/authActions';
import '../auth.css';
import { SubmitButton } from '../../components/auth/submitButton';
import { Locale } from '../../../../get-dictionaries';
import { getDictionary } from '../../../../get-dictionaries';
export default async function SignUp({
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
        <h1 className="">{dictionary.auth.headerRegister}</h1>
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
            defaultValue={params.lang}
            hidden
          />
          <div className="password-cont">
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
            pendingText={dictionary.auth.loadingRegister}
            formAction={signUpAction}
          >
            {dictionary.auth.signUp}
          </SubmitButton>
        </div>
        {/* <SocialLoginButtons dictionary={dictionary} /> */}
      </form>
    </div>
  );
}
