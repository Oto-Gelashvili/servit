import { CreateCourseForm } from '../../components/createCourse/createCourseForm';
import { Locale } from '../../../../get-dictionaries';
import './createCourse.css';

export default function createProduct({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <main className="flex flex-col items-center justify-center gap-10 createCourse">
      <CreateCourseForm lang={params.lang} />
    </main>
  );
}
