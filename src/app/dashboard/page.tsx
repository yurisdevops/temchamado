import { Container } from "@/components/container";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import { SubMenu } from "@/components/submenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session?.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

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
              {tickets.map((ticket) => (
                <TicketItem
                  ticket={ticket}
                  customer={ticket.customer}
                  key={ticket.id}
                />
              ))}
            </tbody>
          </table>
          {tickets.length === 0 && (
            <p className="text-center text-lg font-medium mt-8">
              Nenhum chamado aberto
            </p>
          )}
        </main>
      </Container>
    </>
  );
}
