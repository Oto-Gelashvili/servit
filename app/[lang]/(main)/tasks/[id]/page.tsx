import Link from 'next/link';
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import { createClient } from '../../../../../utils/supabase/server';
import { getAllItems, getById } from '../../../utils/supabaseUtils';
import { Metadata } from 'next';
import DeleteButton from '../../../components/ServicesStuff/components/DeleteButton';
import Image from 'next/image';
import { Star } from 'lucide-react';
import './TaskPage.css';

interface ServiceDetailsPageProps {
  params: { id: string | number; lang: Locale };
}
export async function generateStaticParams() {
  const services = await getAllItems('tasks');

  const paths = services.flatMap((service) => [
    {
      id: service.id.toString(),
    },
  ]);

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string | number; lang: Locale };
}): Promise<Metadata> {
  const task = await getById(params.id, 'tasks');

  return {
    title: task?.title_en || 'tasks Details',
    description: task?.description_en || 'tasks description',
    openGraph: {
      images: task?.image_urls?.[0],
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
  const task = await getById(id, 'tasks');

  if (!task) {
    return (
      <main className="flex flex-1 justify-center items-center text-4xl">
        {dictionary.notFound}
      </main>
    );
  }

  return (
    <main className="taskDetailsPage">
      <div className="heading ">
        <div className="titleCont">
          <h1>
            {params.lang === 'en'
              ? task.title_en || task.title_ka
              : task.title_ka || task.title_en}
          </h1>

          <p className="category">
            {params.lang === 'en'
              ? task.categories.category_en
              : task.categories.category_ka}
          </p>
        </div>
        <div className="updateCont">
          {user_id === task.user_id.toString() && (
            <Link
              className="editBtn"
              href={`/${params.lang}/updateTask?task=${task.id}`}
            >
              {dictionary.edit}
            </Link>
          )}
          <p className="date">
            {new Date(task.updatedat).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="gridCont">
        <div className="cont">
          <div className="priceCont">
            {user_id === task.user_id.toString() && (
              <DeleteButton
                Id={task.id}
                lang={params.lang}
                dictionary={dictionary}
                tableName={'tasks'}
              />
            )}
            <div className="rating">
              <p>{Number(task.profiles.rating).toFixed(2)}</p>
              <Star />
            </div>
          </div>
          <Link
            href={`/${params.lang}/profile/${task.profiles.user_slug}`}
            className="profileCont"
          >
            <div className="relative w-[80px] h-[80px]">
              <Image
                src={
                  task.profiles.avatar_url
                    ? task.profiles.avatar_url
                    : '/images/anonProfile.jpg'
                }
                alt="Service Avatar"
                fill
                sizes="80px"
                className="avatar"
              />
            </div>
            <p className="username">{task.profiles.username}</p>
          </Link>
        </div>
        <div className="desc">
          <h2>{dictionary.desc}</h2>
          {params.lang === 'en'
            ? task.description_en || task.description_ka
            : task.description_ka || task.description_en}
        </div>
      </div>
    </main>
  );
}
