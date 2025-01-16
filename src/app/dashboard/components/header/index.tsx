import { Container } from "@/components/container";
import Link from "next/link";

export function Header() {
  return (
    <>
      <Container>
        <header className="w-full items-center my-4 p-3 rounded flex gap-4 bg-slate-900 ">
          <Link
            href="/dashboard"
            className="text-white hover:font-medium duration-300"
          >
            Chamados
          </Link>
          <Link
            href="/dashboard/customer"
            className="text-white hover:font-medium duration-300"
          >
            Clientes
          </Link>
        </header>
      </Container>
    </>
  );
}
