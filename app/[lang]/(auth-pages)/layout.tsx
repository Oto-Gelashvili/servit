export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <body>
    <div className=" flex flex-col gap-12 items-center flex-1 justify-center">
      {children}
    </div>
    // </body>
  );
}
