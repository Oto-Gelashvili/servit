import { getDictionary, Locale } from '../../../../../get-dictionaries';
import createService from '../../../actions/ServicesActions';
import { SubmitButton } from '../../../utils/submitButton';
import { getAllItems } from '../../../utils/supabaseUtils';
import { CategorySelector } from '../components/categorySelector';
import ImageUploader from '../components/imgUploader';

export async function CreateServiceForm({
  lang,
  searchParams,
}: {
  lang: Locale;
  searchParams: { error?: string };
}) {
  const dictionary = (await getDictionary(lang))['addService'];
  const categoriesData = await getAllItems(`categories`);
  const categories = categoriesData.map(
    (category) => category[`category_${lang}`]
  );

  return (
    <>
      <h1>{dictionary.heading}</h1>
      <form action={createService}>
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

        <div className="error-container">
          <CategorySelector
            dictionary={dictionary}
            categories={categories}
            selectedCategory=""
          />
          {searchParams?.error &&
            searchParams.error === dictionary.categoryReq && (
              <div className=" error">{searchParams.error}</div>
            )}
        </div>
        <div className="error-container">
          <input
            type="number"
            id="price"
            name="price"
            placeholder={dictionary.price}
            min="0"
            step="0.01"
          />
          {searchParams?.error &&
            searchParams.error === dictionary.priceReq && (
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

        <label htmlFor="service_images" className="custom-file-upload">
          <p className="w-full p-2 text-center flex items-center justify-center">
            {dictionary.image}
          </p>
          <ImageUploader />
        </label>
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
