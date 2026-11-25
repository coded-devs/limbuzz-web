import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container document-page">
      <p className="eyebrow">404</p>
      <h1>This page isn’t here.</h1>
      <p>Find your way back to LIMBUZZ.</p>
      <Link className="button" href="/">
        Back to home
      </Link>
    </div>
  );
}
