import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import { SubMenu } from "./components/submenu";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <>
      <Container>
        <main className="mt-9 mb-2">
          <SubMenu
            title={"Chamados"}
            linkTitle={"Criar novo chamado"}
            href={"/dashboard/new"}
          />

          <table className="min-w-full my-2">
            <thead>
              <tr>
                <th className="font-medium text-left">Clientes</th>
                <th className="font-medium text-left hidden sm:block">
                  Cadastro
                </th>
                <th className="font-medium text-left">Status</th>
                <th className="font-medium text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <TicketItem />
            </tbody>
          </table>
        </main>
      </Container>
    </>
  );
}
