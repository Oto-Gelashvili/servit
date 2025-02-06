import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center">
      <Image
        src={'/images/notFound.svg'}
        alt="not found"
        width={250}
        height={250}
      ></Image>
    </main>
  );
}
