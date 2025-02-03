import { getDictionary, Locale } from '../../../../../get-dictionaries';
import { SubmitButton } from '../../../utils/submitButton';
import { getAllItems } from '../../../utils/supabaseUtils';
import { CategorySelector } from '../../ServicesStuff/components/categorySelector';
import '../../../(main)/createService/createService.css';
import createTask from '../../../actions/createTaskAction';
export async function CreateTaskForm({
  lang,
  searchParams,
}: {
  lang: Locale;
  searchParams: { error?: string };
}) {
  const dictionary = (await getDictionary(lang))['tasks']['add'];
  const dictionaryForCategory = (await getDictionary(lang))['addService'];
  const categoriesData = await getAllItems(`categories`);
  const categories = categoriesData.map(
    (category) => category[`category_${lang}`]
  );

  return (
    <>
      <h1>{dictionary.heading}</h1>
      <form action={createTask}>
        <input type="hidden" name="lang" defaultValue={lang} />
        <div className="error-container">
          <input
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
            selectedCategory=""
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
