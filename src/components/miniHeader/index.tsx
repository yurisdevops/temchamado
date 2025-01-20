import Link from "next/link";

interface MiniHeaderProps {
  title: string;
  linkTitle: string;
  href: string;
}

export function MiniHeader({ title, href, linkTitle }: MiniHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Link href={href} className="bg-gray-900 px-4 py-1 text-white rounded">
          {linkTitle}
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </>
  );
}
