import { resetPasswordAction } from '../../../actions/authActions';
import { Locale, getDictionary } from '../../../../../get-dictionaries';
import { SubmitButton } from '../../../utils/submitButton';
import '../../../(auth-pages)/auth.css';
export default async function ResetPassword({
  searchParams,
  params,
}: {
  searchParams: { error?: string; success?: string };
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <main className="p-6 flex items-center justify-center">
      <form className="login-form">
        <h1 className="">{dictionary.auth.reset}</h1>
        {searchParams?.error && (
          <div className="error-message">{searchParams.error}</div>
        )}
        {searchParams?.success && (
          <div className="success-message">{searchParams.success}</div>
        )}
        <div className="inputs">
          <input
            type="password"
            name="password"
            placeholder={dictionary.auth.newPass}
            autoComplete="New password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder={dictionary.auth.confirmPass}
            autoComplete="Confirm password"
          />
          <input
            name="locale"
            placeholder={params.lang}
            defaultValue={params.lang}
            hidden
          />
          <SubmitButton
            className="submit-btn"
            pendingText={dictionary.auth.sending}
            formAction={resetPasswordAction}
          >
            {dictionary.auth.reset}
          </SubmitButton>
        </div>
      </form>
    </main>
  );
}
