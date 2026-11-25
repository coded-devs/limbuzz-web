import Link from "next/link";
export function DocumentPage({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container document-page">
      <Link href="/" className="text-link">
        LIMBUZZ home
      </Link>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
      <div className="document-body">{children}</div>
    </div>
  );
}
