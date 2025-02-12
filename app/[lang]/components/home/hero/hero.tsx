import Link from 'next/link';
import './hero.css';
import Image from 'next/image';
import Logo from '../../../utils/logo';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
interface heroProps {
  lang: Locale;
  dictionary: Dictionary['home'];
}
export default function Hero({ dictionary, lang }: heroProps) {
  return (
    <section className="heroCont">
      <div className="textCont">
        <div className="mainText">
          <Logo />
        </div>
        <div className="headings">
          <h1>{dictionary.title}</h1>
          <h2>
            {dictionary.where} <span>{dictionary.skills}</span>{' '}
            {dictionary.areOn}
            <span> {dictionary.demand}</span>
          </h2>
        </div>
        <div className="creatorCont">
          <h3>{dictionary.become}</h3>
          <div className="createLinksCont">
            <Link href={`/${lang}/createService`}>
              {dictionary.createService}
            </Link>
            <Link href={`/${lang}/createTask`}>{dictionary.createTask}</Link>
          </div>
        </div>
      </div>
      <div className="imgCont">
        <div className="hiddenPost">
          <p className="posterTask">Help me renovate</p>
          <div className="posterInfo">
            <p>Nino,Tbilisi</p> <div className="pricingPost">₾100</div>
          </div>
        </div>
        <Image
          src={'/images/renovate.svg'}
          fill
          priority
          alt="hero image"
        ></Image>
      </div>
    </section>
  );
}
