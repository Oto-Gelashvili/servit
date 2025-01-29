import './Services.css';
import ServicesPage from '../../components/ServicesStuff/ServicesPage';
import Sorter from '../../components/ServicesStuff/sorter';
import SearchBar from '../../components/ServicesStuff/searchBar';
import { getDictionary, Locale } from '../../../../get-dictionaries';
import Logo from '../../utils/logo';

interface ServicesProps {
  params: {
    lang: Locale; // The language parameter passed to the component
  };
  searchParams: {
    sort?:
      | 'price-high-to-low'
      | 'price-low-to-high'
      | 'tier-high-to-low'
      | 'tier-low-to-high'
      | undefined; // Optional sort parameter
    search?: string; // Optional search parameter
  };
}

// The main Services component
export default async function Services({
  searchParams,
  params,
}: ServicesProps) {
  const dictionary = (await getDictionary(params.lang as Locale)).services;
  const sorterDictionary = (await getDictionary(params.lang as Locale)).sorter;

  return (
    <main className="services-main">
      <div className="heading">
        <Logo />
        <h2>{dictionary.heading2}</h2>
      </div>
      <section id="filtering">
        <SearchBar />
        <Sorter dictionary={sorterDictionary} />
      </section>
      <ServicesPage
        dictionary={dictionary}
        searchParams={searchParams}
        lang={params.lang}
      />
    </main>
  );
}
