"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(3, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O campo email é obrigatório"),
  phone: z.string().refine(
    (val) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(val) ||
        /^\d{2}\s\d{9}/.test(val) ||
        /^\d{11}$/.test(val)
      );
    },
    {
      message: "O campo telefone precisa seguir o padrão (99) 9999-9999",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCostumerForm({ userId }: { userId: string }) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegister(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId,
    });
    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <>
      <form
        className="flex flex-col mt-6"
        onSubmit={handleSubmit(handleRegister)}
      >
        <label htmlFor="" className="mb-1 text-lg font-medium">
          Nome Completo:
        </label>
        <Input
          placeholder="Digite seu nome completo"
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
        />

        <section className="flex flex-col sm:flex-row gap-3 mt-3">
          <div className="flex-1 ">
            <label htmlFor="" className="mb-1 text-lg font-medium">
              Telefone:
            </label>
            <Input
              placeholder="(DDD) 999999999"
              name="phone"
              type="text"
              register={register}
              error={errors.phone?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="" className="mb-1 text-lg font-medium ">
              Email:
            </label>
            <Input
              placeholder="teste@teste.com"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
            />
          </div>
        </section>
        <label htmlFor="" className="mb-1 text-lg font-medium">
          Endereço:
        </label>
        <Input
          placeholder="Rua do Carmo, 71"
          name="address"
          type="text"
          register={register}
          error={errors.address?.message}
        />

        <button
          type="submit"
          className="bg-blue-500 my-4 px-2 h-11 text-white font-bold rounded"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
