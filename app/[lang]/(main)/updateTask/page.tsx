import { Locale } from '../../../../get-dictionaries';
import '../createService/createService.css';
import { Metadata } from 'next';
import { createClient } from '../../../../utils/supabase/server';
import { ServiceWithRelations } from '../../components/ServicesStuff/editService/editServiceForm';
import { getById } from '../../utils/supabaseUtils';
import { Database } from '../../utils/database.types';
import { EditTaskForm } from '../../components/tasks/editTask/editTaskForm';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: params.lang === 'ka' ? 'დავალების განახლება' : 'Update Task',
    description:
      params.lang === 'ka'
        ? 'დავაბის განახლება, დავალების რედაქტირება , დავალების ცვლილება'
        : 'Edit a Task, update a task , Change a task',
  };
}
export default async function UpdateTask({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: {
    error?: string;
    task?: string;
    user?: string;
  };
}) {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;
  const task = searchParams.task
    ? await getById(searchParams.task, 'tasks')
    : null;
  const { data: profileData } = (await supabase
    .from('profiles')
    .select('subscription_id')
    .eq('id', user_id)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'];
    error: Error | null;
  };
  return (
    <>
      {task?.user_id === user_id && profileData.subscription_id ? (
        <main className="flex flex-col items-center justify-center gap-10 createService createTask">
          <EditTaskForm
            lang={params.lang}
            searchParams={searchParams}
            task={task as ServiceWithRelations}
          />
        </main>
      ) : (
        <main className="flex items-center justify-center text-3xl">
          {params.lang === 'en'
            ? 'Dont have access to this page'
            : 'ამ გვერდძე არ გაქვს წვდომა'}
        </main>
      )}
    </>
  );
}
