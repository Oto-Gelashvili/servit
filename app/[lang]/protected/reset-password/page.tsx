import { resetPasswordAction } from '../../authActions';
import {
  FormMessage,
  Message,
} from '../../components/supabaseComponents/form-message';
import { SubmitButton } from '../../components/supabaseComponents/submit-button';
import { Input } from '../../components/supabaseComponents/ui/input';
import { Label } from '../../components/supabaseComponents/ui/label';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <main className="flex flex-1  justify-center items-center">
      <form className="flex flex-col   max-w-md p-4 gap-2 [&>input]:mb-4">
        <h1 className="text-2xl font-medium text-center">Reset password</h1>
        <p className="text-sm text-foreground/60">
          Please enter your new password below.
        </p>
        <Label htmlFor="password">New password</Label>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          required
        />
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <SubmitButton formAction={resetPasswordAction}>
          Reset password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  );
}
