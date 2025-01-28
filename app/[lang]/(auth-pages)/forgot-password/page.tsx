import { forgotPasswordAction } from '../../actions/authActions';
import { Locale, getDictionary } from '../../../../get-dictionaries';
import { SubmitButton } from '../../utils/submitButton';
import '../auth.css';
export default async function ForgotPassword({
  searchParams,
  params,
}: {
  searchParams: { error?: string; success?: string };
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="p-6">
      <form className="login-form">
        <h1 className="">{dictionary.auth.headerForgot}</h1>
        {searchParams?.error && (
          <div className="error-message">{searchParams.error}</div>
        )}
        {searchParams?.success && (
          <div className="success-message">{searchParams.success}</div>
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
          <SubmitButton
            className="submit-btn"
            pendingText={dictionary.auth.sending}
            formAction={forgotPasswordAction}
          >
            {dictionary.auth.recover}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
