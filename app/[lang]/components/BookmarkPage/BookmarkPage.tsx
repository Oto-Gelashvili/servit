import { revalidatePath } from 'next/cache';
import { getDictionary, Locale } from '../../../../get-dictionaries';
import { createClient } from '../../../../utils/supabase/server';
import { getBookmarkedServices } from '../../utils/supabaseUtils';
import ServiceItem from '../ServicesStuff/ServiceItem/ServiceItem';

interface bookamrkProps {
  lang: Locale;
}
export default async function BookmarkPage({ lang }: bookamrkProps) {
  const dictionary = (await getDictionary(lang as Locale)).services;
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  if (!user_id) {
    console.error('User not authenticated');
    throw new Error('Authentication required');
  }

  const { data: bookmarks } = await getBookmarkedServices(user_id);
  revalidatePath(`/${lang}/bookmarks`);
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <div className="services-list w-full">
        {bookmarks.length === 0 ? (
          <div className="no-results">{dictionary.notFound}</div>
        ) : (
          bookmarks.map((service) => (
            <ServiceItem
              key={service.id}
              lang={lang}
              img={service.image_urls[0]}
              desc={
                lang === 'en'
                  ? service.description_en || service.description_ka
                  : service.description_ka || service.description_en
              }
              price={service.price}
              title={
                lang === 'en'
                  ? service.title_en || service.title_ka
                  : service.title_ka || service.title_en
              }
              id={service.id}
              profileData={service.profiles}
              categoryData={service.categories}
            />
          ))
        )}
      </div>
    </div>
  );
}
