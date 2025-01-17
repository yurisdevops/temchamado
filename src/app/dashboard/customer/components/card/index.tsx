"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();
  async function handleDeleteCustomer() {
    try {
      await api.delete(`/api/customer`, {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <article className="flex flex-col bg-gray-100 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
        <h2 className="flex gap-2">
          <a className="font-bold">Nome:</a>
          {customer.name}
        </h2>
        <p className="flex gap-2">
          <a className="font-bold">Email:</a>
          {customer.email}
        </p>
        <p className="flex gap-2">
          <a className="font-bold">Telefone:</a>
          {customer.phone}
        </p>
        {customer.address ? (
          <p className="flex gap-2">
            <a className="font-bold">Endereço:</a>
            {customer.address}
          </p>
        ) : (
          <></>
        )}
        <button
          onClick={handleDeleteCustomer}
          className="bg-red-500 px-4 rounded text-white mt-2 self-start"
        >
          Deletar
        </button>
      </article>
    </>
  );
}
