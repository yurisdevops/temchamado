"use client";
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";
import { useState } from "react";

export function ButtonRefresh() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 1000); // Ajuste o tempo conforme necessário
  };

  return (
    <button onClick={handleClick} className={spinning ? "animate-spin" : ""}>
      <FiRefreshCcw size={24} color="#4169E1" />
    </button>
  );
}
