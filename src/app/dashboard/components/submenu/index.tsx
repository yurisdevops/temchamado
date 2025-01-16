import Link from "next/link";

interface SubMenuProps {
  title: string;
  linkTitle: string;
  href: string;
}

export function SubMenu({ title, href, linkTitle }: SubMenuProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Link
          href={href}
          className="bg-blue-500 px-3 py-1 text-white font-medium rounded "
        >
          {linkTitle}
        </Link>
      </div>
    </>
  );
}
