import { Container } from "@/components/container";
import { NewCostumerForm } from "../components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MiniHeader } from "@/components/miniHeader";

export default async function NewCostumer() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <>
      <Container>
        <main className="flex flex-col mt-9 mb-2">
          <MiniHeader
            title={"Novo Cliente"}
            linkTitle={"Voltar"}
            href="/dashboard/customer"
          />
          <NewCostumerForm userId={session.user.id} />
        </main>
      </Container>
    </>
  );
}
