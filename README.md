# ServIt - Service Marketplace

ServIt is a minimal, modern service marketplace built with Next.js, TypeScript, Supabase, and Stripe. Users can register, subscribe, post tasks, post services, buy services, and bookmark services. The platform supports both Georgian and English languages and includes dark and light mode support. The project is optimized for server-side rendering (SSR) with minimal client-side code.

## Live Demo

🔗 [ServIt on Vercel](https://servit.vercel.app/)

## Repository

📂 [GitHub Repository](https://github.com/Oto-Gelashvili/servit)

## Features

- User authentication & subscription
- Task and service posting
- Service purchasing & payments (via Stripe)
- Bookmarking functionality
- Multi-language support (Georgian & English)
- Dark and light mode support
- Optimized with server-side rendering (SSR) for performance

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **Payments:** Stripe
- **TypeScript** for type safety
- **Deployment:** Vercel

## Installation & Setup

To run the project locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/Oto-Gelashvili/servit.git
   cd servit
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file and add the necessary keys:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXT_PUBLIC_BASE_URL
   EMAIL_USER
   EMAIL_PASS
   RECIPIENT_EMAIL
   STRIPE_WEBHOOK_SECRET
   SUPABASE_SERVICE_ROLE_KEY
   ```

4. Run the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the project.

## Deployment

The project is deployed on Vercel. To deploy your own version:

1. Push your changes to GitHub.
2. Connect your GitHub repository to Vercel.
3. Add environment variables on Vercel.
4. Deploy!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
