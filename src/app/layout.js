import './globals.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
export const metadata = {
  title: 'ServIt',
  description: 'ServIt service marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
