export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-auto mr-4 flex w-fit max-w-[75%] flex-col items-end gap-2 text-right text-sm text-[#6B835B] sm:mx-auto sm:mr-auto sm:w-full sm:max-w-md sm:items-center sm:px-6 sm:text-center sm:text-base">
      {children}
    </div>
  );
}
