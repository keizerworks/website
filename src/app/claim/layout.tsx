export default function ClaimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-50 -z-10" />
      {children}
    </>
  );
}
