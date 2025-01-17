import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";

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
