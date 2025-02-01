import Link from 'next/link';
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import { createClient } from '../../../../../utils/supabase/server';
import { getAllItems, getServiceById } from '../../../utils/supabaseUtils';
import './ServicePage.css';
import { Metadata } from 'next';
import BuyButton from '../../../components/Products/BuyButton';
import DeleteButton from '../../../components/Products/DeleteButton';
import BookmarkButton from '../../../components/ServicesStuff/components/bookmarkButton';

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
  const service = await getServiceById(params.id);

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
  const dictionaryBuyBtn = (await getDictionary(params.lang as Locale))
    .productsID;
  const service = await getServiceById(id);
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
    <main className="space-y-4">
      {user_id === service.user_id.toString() && (
        <div className="cont">
          <Link href={`/${params.lang}/updateService?service=${service.id}`}>
            edit
          </Link>
          <DeleteButton
            serviceId={service.id}
            lang={params.lang}
            dictionary={dictionary}
          />
        </div>
      )}
      <BuyButton
        product={service}
        dictionary={dictionaryBuyBtn}
        locale={params.lang}
      />
      <BookmarkButton
        serviceId={service.id}
        initialIsBookmarked={isBookmarked}
        dictionary={dictionary}
      />
    </main>
  );
}
