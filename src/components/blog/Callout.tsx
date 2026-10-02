export default function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-8 rounded-xl border border-accent/40 bg-accent/5 px-6 py-5">
      <p className="mb-2 font-semibold text-primary">{title}</p>
      <div className="space-y-2 text-gray-700 [&_li]:ml-5 [&_li]:list-disc">{children}</div>
    </aside>
  );
}
