import { getServicesNeeds } from '../../utils/supabaseUtils';
import { Dictionary, Locale } from '../../../../get-dictionaries';
import Pagination from '../ServicesStuff/components/Pagination';
import TaskItem from './taskItem';

type ServicesPageProps = {
  searchParams?: {
    sort?:
      | 'price-high-to-low'
      | 'price-low-to-high'
      | 'tier-high-to-low'
      | 'tier-low-to-high';
    search?: string;
    page?: string;
    category?: string;
  };
  dictionary: Dictionary['services'];
  lang: Locale;
};

export default async function TasksPage({
  searchParams = {},
  dictionary,
  lang,
}: ServicesPageProps) {
  const pageSize = 1;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const searchTerm = searchParams.search || '';
  const sortOption = searchParams.sort || '';
  const categoryIds = searchParams.category
    ? searchParams.category.split(',').map(Number)
    : undefined;
  const tableName = 'tasks';
  const { data: tasks, count } = await getServicesNeeds(
    lang,
    currentPage,
    pageSize,
    tableName,
    searchTerm,
    sortOption,
    categoryIds
  );
  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <div className="tasks-list w-full">
        {tasks.length === 0 ? (
          <div className="no-results">{dictionary.notFoundTasks}</div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              lang={lang}
              title={lang === 'en' ? task.title_en : task.title_ka}
              id={task.id}
              profileData={task.profiles}
              categoryData={task.categories}
            />
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          lang={lang}
          dictionary={dictionary}
        />
      )}
    </div>
  );
}
