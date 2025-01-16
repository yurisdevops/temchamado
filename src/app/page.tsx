import Image from "next/image";
import hero from "@/assets/hero.svg";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie seus chamados</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">
        Atendimentos, clientes e serviços
      </h1>
      <Image
        src={hero}
        alt={"Logo da plataforma"}
        width={600}
        className="max-w-sm md:max-w-xl "
      />
    </main>
  );
}
