import Link from 'next/link';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
import { createClient } from '../../../../../utils/supabase/server';
import { Database } from '../../../utils/database.types';
import './categorySection.css';
interface categorySectionProps {
  lang: Locale;
  dictionary: Dictionary['home'];
}
export default async function CategorySection({
  lang,
  dictionary,
}: categorySectionProps) {
  const supabase = await createClient();
  const { data: categories } = (await supabase
    .from('categories')
    .select('*')) as {
    data: Database['public']['Tables']['categories']['Row'][];
    error: Error | null;
  };
  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className="categoriesSection">
      <h2>{dictionary.categorySection}</h2>
      <ul className="categoriesCont top">
        {duplicatedCategories.map((category, idx) => (
          <Link
            className="category"
            href={`${lang}/services?category=${category.id}`}
            key={`${category.id}-${idx}`}
          >
            {category[`category_${lang}`]}
          </Link>
        ))}
      </ul>
      <ul className="categoriesCont bottom">
        {duplicatedCategories.map((category, idx) => (
          <Link
            className="category"
            href={`${lang}/services?category=${category.id}`}
            key={`${category.id}-${idx}`}
          >
            {category[`category_${lang}`]}
          </Link>
        ))}
      </ul>
    </div>
  );
}
