import { verifyOTP } from '../../actions/authActions';
import '../auth.css';
import { SubmitButton } from '../../components/auth/submitButton';
import { Locale } from '../../../../get-dictionaries';
import { getDictionary } from '../../../../get-dictionaries';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './otp';
export default async function SignupVerify({
  searchParams,
  params,
}: {
  searchParams: { error?: string; email?: string };
  params: { lang: Locale };
}) {
  const email = searchParams.email?.split('?')[0] || '';
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="p-6">
      <form className="login-form">
        <h1 className="">{dictionary.auth.headerRegister}</h1>
        {searchParams?.error && (
          <div className="error-message">{searchParams.error}</div>
        )}
        <p className="text-2xl text-center leading-10">
          {dictionary.auth.sentCode}
          {email ? email : 'an unknown email'}
        </p>
        <div className="inputs">
          <input type="hidden" name="email" value={email} />
          {/* <input
            type="OTP"
            name="OTP"
            // Your OTP
            placeholder="OTP"
            autoComplete="OTP"
            minLength={6}
            required
          /> */}
          <InputOTP maxLength={6} type="OTP" name="OTP" autoComplete="OTP">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <input
            name="locale"
            placeholder={params.lang}
            defaultValue={params.lang}
            hidden
          />
          <SubmitButton
            className="submit-btn"
            pendingText={dictionary.auth.loadingRegister}
            formAction={verifyOTP}
          >
            {dictionary.auth.signUp}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
