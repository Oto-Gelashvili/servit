import { signInAction } from '../../actions/authActions';
import Link from 'next/link';
import { SocialLoginButtons } from '../../components/auth/socialButtons';
import './login.css';
import { SubmitButton } from '../../components/auth/submitButton';

export default async function Login({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="p-6">
      <form className="login-form">
        <h1 className="">Sign in</h1>
        {searchParams?.error && (
          <div className="error-message">{searchParams.error}</div>
        )}
        <div className="inputs">
          <input
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
          <div className="password-cont">
            <Link className="forgot" href="/forgot-password">
              Forgot Password?
            </Link>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          <SubmitButton
            className="submit-btn"
            pendingText="Signing In..."
            formAction={signInAction}
          >
            Log in
          </SubmitButton>
        </div>
        <SocialLoginButtons />
      </form>
    </div>
  );
}
