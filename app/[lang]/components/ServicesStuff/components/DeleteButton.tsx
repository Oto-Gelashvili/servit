'use client';
import { Trash2, X } from 'lucide-react';
import { deleteProduct } from '../../../actions/deleteAction';
import { Locale } from '../../../../../get-dictionaries';
import { useRouter } from 'next/navigation';
import { Dictionary } from '../../../../../get-dictionaries';
import { useState } from 'react';

type DeleteButtonProps = {
  Id: number;
  lang: Locale;
  dictionary: Dictionary['services'];
  tableName: string;
};

export default function DeleteButton({
  Id,
  lang,
  dictionary,
  tableName,
}: DeleteButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deleteProduct(Id, lang, tableName);
      if (result.success) {
        router.push(`/${lang}/${tableName}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        data-cy="delete-product-btn"
        onClick={() => setIsModalOpen(true)}
        className="flex flex-row-reverse justify-center items-center gap-2 deleteBtn"
      >
        <Trash2 /> <p>{dictionary.delete}</p>
      </button>
      {isError && (
        <div className="flex fixed top-[90%] left-1/2 translateMid bg-[var(--error)]  rounded-lg p-4 items-center justify-between max-w-[280px] w-full text-2xl font-semibold  text-center gap-4 text-white">
          {dictionary.delete_error}
          <X className="cursor-pointer" onClick={() => setIsError(false)} />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 translateMid bg-[var(--accent-color)] border border-[var(--border-color)] rounded-lg p-6 max-w-md w-full z-50">
          <h3 className="text-3xl font-semibold mb-4 text-center text-[var(--secondary-color)]">
            {dictionary.confirm_delete_title}
          </h3>
          <p className="mb-6 text-2xl text-[var(--text-color)] text-center">
            {dictionary.noReturn}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-3 text-2xl text-[var(--secondary-color)] border border-[var(--secondary-color)] hover:scale-105  rounded-lg w-20 transition "
            >
              {dictionary.cancel}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-3 text-2xl text-white bg-[var(--error)] hover:scale-105 border border-transparent rounded-lg w-20  transition "
            >
              {dictionary.confirm}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
