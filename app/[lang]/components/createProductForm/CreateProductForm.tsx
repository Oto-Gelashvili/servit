import createProduct from './createProductAction';
import { Locale, getDictionary } from '../../../../get-dictionaries';
interface CreateProductFormProps {
  lang: Locale;
}
export async function CreateProductForm({ lang }: CreateProductFormProps) {
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div className="w-full max-w-3xl m-auto  ">
      <h2 className="text-4xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-20">
        {dictionary.addPage.title}
      </h2>
      <form
        action={createProduct}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 "
      >
        <input type="hidden" name="lang" defaultValue={lang} />
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter the product name"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="price"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.price}
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter the product price"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="brand"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.brand}
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter the product brand"
            required
          />
        </div>

        <div className="flex flex-col space-y-2 ">
          <label
            htmlFor="image"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.imageURL}
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="category"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.category}
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter the product category"
            required
          />
        </div>
        <div className="flex flex-col space-y-2 ">
          <label
            htmlFor="tags"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.tags}
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter product tags"
            required
          />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <label
            htmlFor="description"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.description}
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>
        <div className="flex flex-col space-y-2 ">
          <label
            htmlFor="weight"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.weight}
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder=" (optional)"
          />
        </div>
        <div className="flex flex-col space-y-2 ">
          <label
            htmlFor="width"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.width}
          </label>
          <input
            type="number"
            id="width"
            name="width"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="(optional)"
          />
        </div>

        <div className="flex flex-col space-y-2 ">
          <label
            htmlFor="height"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.height}
          </label>
          <input
            type="number"
            id="height"
            name="height"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="(optional)"
          />
        </div>

        <div className="flex flex-col space-y-2 ">
          <label
            htmlFor="depth"
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {dictionary.addPage.depth}
          </label>
          <input
            type="number"
            id="depth"
            name="depth"
            className="w-full text-xl p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 transition duration-300"
            placeholder="(optional)"
          />
        </div>

        <button
          type="submit"
          data-cy="add-product-btn"
          className="mt-4 w-full text-2xl py-4 bg-purple-700 text-white font-medium  rounded hover:bg-purple-700 transition duration-300 focus:outline-none dark:bg-purple-700 dark:hover:bg-purple-800 md:col-span-2"
        >
          {dictionary.addPage.submit}
        </button>
      </form>
    </div>
  );
}
