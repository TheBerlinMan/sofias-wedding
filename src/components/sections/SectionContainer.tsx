export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2 px-6 text-center text-sm text-[#6B835B] sm:max-w-md sm:text-base">
      {children}
    </div>
  );
}
