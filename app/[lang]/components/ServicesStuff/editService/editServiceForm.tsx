import { Locale, getDictionary } from '../../../../../get-dictionaries';
import { CategorySelector } from '../components/categorySelector';
import { getAllItems, getServiceById } from '../../../utils/supabaseUtils';
import updateService from '../../../actions/ServicesActions';
import { SubmitButton } from '../../../utils/submitButton';
import ImageUpdater from '../components/imgUpdater';

export async function EditServiceForm({
  lang,
  searchParams,
}: {
  lang: Locale;
  searchParams: {
    error?: string;
    id?: string;
    service?: string;
  };
}) {
  const dictionary = (await getDictionary(lang))['addService'];
  const categoriesData = await getAllItems(`categories`);
  const categories = categoriesData.map(
    (category) => category[`category_${lang}`]
  );

  const service = searchParams.service
    ? await getServiceById(searchParams.service)
    : null;

  return (
    <>
      <h1>{dictionary.updateHeading}</h1>

      <form action={updateService}>
        <input type="hidden" name="lang" defaultValue={lang} />
        <input type="hidden" name="serviceId" defaultValue={service?.id} />
        <div className="error-container">
          <input
            defaultValue={lang === 'en' ? service?.title_en : service?.title_ka}
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
            selectedCategory={
              lang === 'en'
                ? service?.categories.category_en
                : service?.categories.category_ka
            }
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
            defaultValue={service?.price}
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
            defaultValue={
              lang === 'en' ? service?.description_en : service?.description_ka
            }
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
          <ImageUpdater uploadedImages={service?.image_urls} />
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
            defaultValue={lang === 'en' ? service?.title_ka : service?.title_en}
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
              lang === 'en' ? service?.description_ka : service?.description_en
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
