import { Locale, getDictionary } from '../../../../get-dictionaries';
import { CategorySelector } from './categorySelector';
import ImageUploader from './imgUploader';
import { getAllItems } from '../../utils/supabaseUtils';

export async function CreateServiceForm({ lang }: { lang: Locale }) {
  const dictionary = (await getDictionary(lang))['addService'];
  const categoriesData = await getAllItems(`categories`);
  const categories = categoriesData.map(
    (category) => category[`category_${lang}`]
  );

  return (
    <>
      <h1>{dictionary.heading}</h1>
      <form action="">
        <input type="hidden" name="lang" defaultValue={lang} />
        <input
          type="text"
          id="title"
          name="title"
          placeholder={dictionary.title}
          pattern="[A-Za-z\s]+"
          title="English letters only"
        />
        <CategorySelector dictionary={dictionary} categories={categories} />
        <input
          type="number"
          id="price"
          name="price"
          placeholder={dictionary.price}
          min="0"
          step="1.0"
        />
        <textarea
          id="desc"
          name="desc"
          placeholder={dictionary.description}
          title="English letters only"
        />
        <label htmlFor="service_images" className="custom-file-upload">
          <p className="w-full p-2 text-center flex items-center justify-center">
            {dictionary.image}
          </p>
          <ImageUploader />
        </label>
        <button className="submitBtn" type="submit">
          {dictionary.next}
        </button>
      </form>
    </>
  );
}
