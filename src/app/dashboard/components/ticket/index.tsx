"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/tickets.type";
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useModalContext } from "@/providers/modal";

interface TicketItem {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItem) {
  const router = useRouter();
  const { toggleVisibility, setDetailTicket } = useModalContext();

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenModal() {
    toggleVisibility();
    setDetailTicket({
      ticket: ticket,
      customer: customer,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-BR")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-4" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#131313" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
