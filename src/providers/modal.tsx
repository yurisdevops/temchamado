"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { ModalTicket } from "@/components/modal";
import { TicketProps } from "@/utils/tickets.type";
import { CustomerProps } from "@/utils/customer.type";

interface ContextData {
  visible: boolean;
  toggleVisibility: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const setDetailTicket = (detail: TicketInfo) => {
    setTicket(detail);
  };

  return (
    <ModalContext.Provider
      value={{ visible, toggleVisibility, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
