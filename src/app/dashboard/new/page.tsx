import { Container } from "@/components/container";
import { MiniHeader } from "@/components/miniHeader";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <Container>
        <main className="mt-9 mb-2">
          <MiniHeader
            title={"Novo Chamado"}
            linkTitle={"Voltar"}
            href={"/dashboard"}
          />

          <form className="flex flex-col mt-6">
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <input
              className="h-11 mb-2 px-2 rounded-md border-2 w-full"
              type="text"
              placeholder="Digite o nome do chamado"
              required
            />
            <label className="mb-1 font-medium text-lg">
              Descreva o problema
            </label>
            <textarea
              className="h-24 mb-2 px-2 rounded-md border-2 w-full resize-none"
              placeholder="Digite o que está acontecendo..."
              required
            ></textarea>
            {customers.length !== 0 && (
              <>
                <label className="mb-1 font-medium text-lg">
                  Selecione um cliente
                </label>
                <select className="h-11 mb-2 px-2 rounded-md border-2 w-full bg-white">
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {customers.length === 0 && (
              <Link href="/dashboard/customer/new">
                Você ainda não possui clientes cadastrados.{" "}
                <span className="text-blue-600 font-medium">
                  Cadastre um cliente!
                </span>
              </Link>
            )}
          </form>
        </main>
      </Container>
    </>
  );
}
