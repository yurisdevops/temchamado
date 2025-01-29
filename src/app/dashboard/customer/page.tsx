import { Container } from "@/components/container";
import { SubMenu } from "@/app/dashboard/components/submenu";
import { CardCustomer } from "./components/card";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Customer() {
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
          <SubMenu
            title={"Clientes"}
            linkTitle={"Novo Cliente"}
            href={"/dashboard/customer/new"}
          />
          <section className="grid gap-3 mt-2 grid-cols-1 sm:grid-cols-2">
            {customers.map((customer) => (
              <CardCustomer key={customer.id} customer={customer} />
            ))}
          </section>
          {customers.length === 0 && (
            <p className="text-center text-lg font-medium mt-8">
              Nenhum cliente cadastrado
            </p>
          )}
        </main>
      </Container>
    </>
  );
}
