import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma";

//Rota de cadastro de clientes
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Cliente criado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao criar o cliente" },
      { status: 400 }
    );
  }
}

//Rota para deletar um cliente
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "Falha ao tentar deletar um cliente" },
      { status: 400 }
    );
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId,
    },
  });

  if (findTicket) {
    return NextResponse.json(
      { error: "Não é possível deletar um cliente com tickets abertas" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao tentar deletar um cliente" },
      { status: 400 }
    );
  }
}

//Rota para buscar um cliente
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json(
      { error: "Falha ao tentar buscar um cliente" },
      { status: 400 }
    );
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar o cliente" },
      { status: 400 }
    );
  }
}
