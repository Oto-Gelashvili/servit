'use client';
import { Trash2 } from 'lucide-react';
import { deleteProduct } from '../../(main)/products/[id]/page';
import { Locale } from '../../../../get-dictionaries';
import { useRouter } from 'next/navigation';
import { Dictionary } from '../../../../get-dictionaries';
type DeleteButtonProps = {
  productId: number;
  lang: Locale;
  dictionary: Dictionary;
};

export default function DeleteButton({
  productId,
  lang,
  dictionary,
}: DeleteButtonProps) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const result = await deleteProduct(productId, lang);

      if (result.success) {
        router.push(`/${lang}/products`);
      } else {
        throw result.error;
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex justify-center items-center gap-2 deleteBtn"
    >
      <Trash2 /> <p>{dictionary.productsID.delete}</p>
    </button>
  );
}
