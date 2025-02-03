import { Locale, getDictionary } from '../../../../../get-dictionaries';
import { getAllItems } from '../../../utils/supabaseUtils';
import { SubmitButton } from '../../../utils/submitButton';
import { Database } from '../../../utils/database.types';
import { CategorySelector } from '../../ServicesStuff/components/categorySelector';
import UpdateTask from '../../../actions/updateTaskAction';

export type ServiceWithRelations =
  Database['public']['Tables']['services']['Row'] & {
    categories: Database['public']['Tables']['categories']['Row'];
    profiles: Database['public']['Tables']['profiles']['Row'];
  };
export async function EditTaskForm({
  lang,
  searchParams,
  task,
}: {
  lang: Locale;
  searchParams: {
    error?: string;
    task?: string;
  };
  task: ServiceWithRelations;
}) {
  const dictionary = (await getDictionary(lang))['tasks']['add'];
  const dictionaryForCategory = (await getDictionary(lang))['addService'];
  const categoriesData = await getAllItems(`categories`);
  const categories = categoriesData.map(
    (category) => category[`category_${lang}`]
  );

  return (
    <>
      <h1>{dictionary.updateHeading}</h1>

      <form action={UpdateTask}>
        <input type="hidden" name="lang" defaultValue={lang} />
        <input type="hidden" name="taskId" defaultValue={task?.id} />

        <div className="error-container">
          <input
            defaultValue={lang === 'en' ? task?.title_en : task?.title_ka}
            type="text"
            id="title"
            name="title"
            placeholder={dictionary.title}
            pattern={lang === 'en' ? '[A-Za-z\\s]+' : '[ა-ჰ\\s]+'}
            title={
              lang === 'en'
                ? 'English letters only'
                : 'შეიყვანეთ ქართული ასოები'
            }
          />
          {searchParams?.error &&
            searchParams.error === dictionary.titleReq && (
              <div className="error">{searchParams.error}</div>
            )}
        </div>

        <div className="category-error-container">
          <CategorySelector
            dictionary={dictionaryForCategory}
            categories={categories}
            selectedCategory={
              lang === 'en'
                ? task?.categories.category_en
                : task?.categories.category_ka
            }
          />
          {searchParams?.error &&
            searchParams.error === dictionary.categoryReq && (
              <div className=" error">{searchParams.error}</div>
            )}
        </div>

        <div className="desc-error-container">
          <textarea
            id="desc"
            name="desc"
            placeholder={dictionary.description}
            defaultValue={
              lang === 'en' ? task?.description_en : task?.description_ka
            }
          />
          {searchParams?.error &&
            searchParams.error === dictionary.descriptionReq && (
              <div className=" error">{searchParams.error}</div>
            )}
        </div>

        <div className="otherVersion">
          <h2>{dictionary.inOther}</h2>
          <p className="optional">({dictionary.optional})</p>

          <p>{dictionary.descOther}</p>
          <input
            type="text"
            id="title_in"
            name="title_in"
            placeholder={dictionary.title_in}
            defaultValue={lang === 'en' ? task?.title_ka : task?.title_en}
            pattern={lang === 'en' ? '[ა-ჰ\\s]+' : '[A-Za-z\\s]+'}
            title={
              lang === 'en'
                ? 'შეიყვანეთ ქართული ასოები'
                : 'English letters only'
            }
          />

          <textarea
            id="desc_in"
            name="desc_in"
            defaultValue={
              lang === 'en' ? task?.description_ka : task?.description_en
            }
            placeholder={dictionary.description_in}
          />
        </div>
        <SubmitButton className="submitBtn" pendingText={dictionary.loading}>
          {dictionary.submit}
        </SubmitButton>
        {searchParams?.error && (
          <div className="error-message global-error">
            {dictionary.globalError}
          </div>
        )}
      </form>
    </>
  );
}
