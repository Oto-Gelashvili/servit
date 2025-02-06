import Link from 'next/link';
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import { createClient } from '../../../../../utils/supabase/server';
import { getAllItems, getById } from '../../../utils/supabaseUtils';
import './ServicePage.css';
import { Metadata } from 'next';
import BuyButton from '../../../components/ServicesStuff/components/BuyButton';
import DeleteButton from '../../../components/ServicesStuff/components/DeleteButton';
import BookmarkButton from '../../../components/ServicesStuff/components/bookmarkButton';
import Image from 'next/image';
import ImageSlider from '../../../components/ServicesStuff/components/imageSlider';
import { Star } from 'lucide-react';

interface ServiceDetailsPageProps {
  params: { id: string | number; lang: Locale };
}
export async function generateStaticParams() {
  const services = await getAllItems('services');
  const locales = ['en', 'ka'];

  const paths = services.flatMap((service) =>
    locales.map((lang) => ({
      id: service.id.toString(),
      lang,
    }))
  );

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string | number; lang: Locale };
}): Promise<Metadata> {
  const service = await getById(params.id, 'services');

  return {
    title: service?.title_en || 'Service Details',
    description: service?.description_en || 'Service description',
    openGraph: {
      images: service?.image_urls?.[0] || '/default-service.jpg',
    },
  };
}

export default async function serviceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  if (!user_id) {
    console.error('User not authenticated');
    throw new Error('Authentication required');
  }

  const { id } = params;
  const dictionary = (await getDictionary(params.lang as Locale)).services;
  const service = await getById(id, 'services');
  const { data: bookmark } = await supabase
    .from('bookmarks')
    .select()
    .eq('user_id', user_id)
    .eq('service_id', service?.id)
    .maybeSingle();

  const isBookmarked = !!bookmark;

  if (!service) {
    return (
      <main className="flex flex-1 justify-center items-center text-4xl">
        {dictionary.notFound}
      </main>
    );
  }

  return (
    <main className="serviceDetailsPage">
      <div className="heading ">
        <div className="titleCont">
          <h1>
            {params.lang === 'en'
              ? service.title_en || service.title_ka
              : service.title_ka || service.title_en}
          </h1>

          <p className="category">
            {params.lang === 'en'
              ? service.categories.category_en
              : service.categories.category_ka}
          </p>
        </div>
        <div className="updateCont">
          {user_id === service.user_id.toString() ? (
            <Link
              className="editBtn"
              href={`/${params.lang}/updateService?service=${service.id}`}
            >
              {dictionary.edit}
            </Link>
          ) : (
            <BookmarkButton
              serviceId={service.id}
              initialIsBookmarked={isBookmarked}
              dictionary={dictionary}
            />
          )}
          <p className="date">
            {new Date(service.updatedat).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="gridCont">
        <div className="sliderCont">
          <ImageSlider images={service.image_urls ? service.image_urls : []} />
        </div>
        <div className="cont">
          <div className="priceCont">
            <p className="price">
              {dictionary.price}: {service.price.toFixed(2)}₾
            </p>
            {user_id === service.user_id.toString() ? (
              <DeleteButton
                Id={service.id}
                lang={params.lang}
                dictionary={dictionary}
                tableName={'services'}
              />
            ) : (
              <BuyButton product={service} locale={params.lang} />
            )}
          </div>
          <Link
            href={`/${params.lang}/profile/${service.profiles.user_slug}`}
            className="profileCont"
          >
            <div className="rating">
              <p>{Number(service.profiles.rating).toFixed(2)}</p>
              <Star />
            </div>{' '}
            <div className="relative w-[80px] h-[80px]">
              <Image
                src={
                  service.profiles.avatar_url
                    ? service.profiles.avatar_url
                    : '/images/anonProfile.jpg'
                }
                alt="Service Avatar"
                fill
                sizes="80px"
                className="avatar"
              />
            </div>
            <p className="username">{service.profiles.username}</p>
          </Link>
        </div>
        <div className="desc">
          <h2>{dictionary.desc}</h2>
          {params.lang === 'en'
            ? service.description_en || service.description_ka
            : service.description_ka || service.description_en}
        </div>
      </div>
    </main>
  );
}
