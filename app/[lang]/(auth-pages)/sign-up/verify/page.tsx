// import { Input } from '../../../components/supabaseComponents/ui/input';
// import { Label } from '../../../components/supabaseComponents/ui/label';
// import { SubmitButton } from '../../../components/supabaseComponents/submit-button';
// import { verifyOTP } from '../../../actions/authActions';
// export default function SignupVerify({
//   searchParams,
// }: {
//   searchParams: { email?: string };
// }) {
//   const email = searchParams.email?.split('?')[0] || '';
//   return (
//     <form className="flex flex-col min-w-64 max-w-64 mx-auto">
//       <h1 className="text-2xl font-medium">Verify your code</h1>
//       <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//         <p className="text-sm text-foreground">
//           We sent a code to: {email ? email : 'an unknown email'}
//         </p>
//         <input type="hidden" name="email" value={email} />
//         <Label htmlFor="OTP">Enter Code:</Label>
//         <Input
//           type="OTP"
//           name="OTP"
//           placeholder="Your OTP"
//           minLength={6}
//           required
//         />
//         <SubmitButton formAction={verifyOTP} pendingText="Signing up...">
//           Sign up
//         </SubmitButton>
//       </div>
//     </form>
//   );
// }
