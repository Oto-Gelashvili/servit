import { signInAction } from '../../actions';
import {
  FormMessage,
  Message,
} from '../../components/supabaseComponents/form-message';
import { SubmitButton } from '../../components/supabaseComponents/submit-button';
import { Input } from '../../components/supabaseComponents/ui/input';
import { Label } from '../../components/supabaseComponents/ui/label';
import Link from 'next/link';
import { SocialLoginButtons } from '../../components/supabaseComponents/socialBtns';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{' '}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <form className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          name="password"
          type="password"
          placeholder="Your password"
          required
        />
        <SubmitButton>Sign in</SubmitButton>
      </form>
      <SocialLoginButtons />
    </div>
  );
}
