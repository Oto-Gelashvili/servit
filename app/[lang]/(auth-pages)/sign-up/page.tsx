// import { signUpAction } from '../../actions/authActions';
// import {
//   FormMessage,
//   Message,
// } from '../../components/supabaseComponents/form-message';
// import { SubmitButton } from '../../components/supabaseComponents/submit-button';
// import { Input } from '../../components/supabaseComponents/ui/input';
// import { Label } from '../../components/supabaseComponents/ui/label';
// import Link from 'next/link';
// import { SmtpMessage } from '../smtp-message';

// export default async function Signup(props: {
//   searchParams: Promise<Message>;
// }) {
//   const searchParams = await props.searchParams;
//   if ('message' in searchParams) {
//     return (
//       <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
//         <FormMessage message={searchParams} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <form className="flex flex-col mx-auto bg-white p-12 rounded-lg shadow-lg gap-4">
//         <h1 className="text-4xl font-medium text-center">Sign up</h1>
//         <p className="text-2xl text text-foreground">
//           Already have an account?{' '}
//           <Link
//             className="text-primary text-xl font-medium underline"
//             href="/sign-in"
//           >
//             Sign in
//           </Link>
//         </p>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             name="password"
//             placeholder="Your password"
//             minLength={6}
//             required
//           />

//           <SubmitButton formAction={signUpAction} pendingText="Signing up...">
//             Sign up
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//       <SmtpMessage />
//     </>
//   );
// }
