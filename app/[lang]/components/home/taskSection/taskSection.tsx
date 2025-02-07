import Link from 'next/link';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
import Image from 'next/image';
import './taskSection.css';

interface taskSectionProps {
  lang: Locale;
  dictionary: Dictionary['home'];
}

export default function TaskSection({ lang, dictionary }: taskSectionProps) {
  return (
    <section className="taskSection">
      <h2>{dictionary.sub}</h2>
      <div className="imgCont">
        <Image
          src="/images/subscribe.svg"
          alt="Subscribe"
          width={270}
          height={270}
        ></Image>
        <Link href={`/${lang}/pricing`}>
          {lang === 'en' ? 'Become One Now' : 'გახდი ახლავე'}
        </Link>
      </div>
      <Link className="browseTasks" href={`/${lang}/tasks`}>
        {dictionary.browseTasks}
      </Link>
    </section>
  );
}
