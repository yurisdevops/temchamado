import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

//Rota de atualização de chamados
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Falha ao tentar atualizar o chamado." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.update({
      where: { id: id as string },
      data: {
        status: "FECHADO",
      },
    });
    return NextResponse.json({ message: "Chamado fechado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao tentar atualizar o chamado." },
      { status: 400 }
    );
  }
}

//Rota de criaçao de chamado
export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json(
      { error: "Todos os dados são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name: name,
        description: description,
        customerId: customerId,
        status: "ABERTO",
      },
    });

    return NextResponse.json({ message: "Chamado criado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao tentar criar o chamado." },
      { status: 400 }
    );
  }
}
