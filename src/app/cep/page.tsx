"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const cepSchemaData = z.object({
  address: z.object({
    zipCode: z
      .string()
      .min(1, "O Cep e obrigatório")
      .refine(
        (value) => /\d+/g.test(value),
        "O Cep deve conter apenas números"
      ),
    street: z.string().min(1, "A Rua e obrigatório"),
    number: z.string().min(1, "O Numero e obrigatório"),
    neighborhood: z.string().min(1, "O Bairro e obrigatório"),
    complement: z.string(),
    city: z.string().min(1, "A Cidade e obrigatório"),
    state: z.string().min(1, "O Estado e obrigatório"),
  }),
});

type FormCepProps = z.infer<typeof cepSchemaData>;

type AddressProps = {
  bairro: string;
  cep: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: string;
};

export default function Cep() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormCepProps>({
    mode: "all",

    criteriaMode: "all",
    resolver: zodResolver(cepSchemaData),
  });

  const handleSetDataAddress = useCallback(
    (data: AddressProps) => {
      setValue("address.city", data.localidade);
      setValue("address.state", data.uf);
      setValue("address.neighborhood", data.bairro);
      setValue("address.street", data.logradouro);
      setValue("address.complement", data.complemento);
    },
    [setValue]
  );

  const handleSubmitForm = (data: any) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const result = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((result) => result.json())
        .catch((err) => console.log(err));
      handleSetDataAddress(result);
    },
    [handleSetDataAddress]
  );

  const zipCode = watch("address.zipCode", "");
  useEffect(() => {
    if (zipCode.length !== 8 && /\D*/g.test(zipCode)) return;

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Cep</h1>
      <div className="max-w-2xl  min-w-96 rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Cep"
            className="input input-primary"
            {...register("address.zipCode")}
          />
          {errors.address?.zipCode?.message && (
            <span className="text-red-500 italic text-xs">
              {errors.address?.zipCode.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Rua"
            className="input input-primary"
            {...register("address.street")}
          />
          {errors.address?.street?.message && (
            <span className="text-red-500 italic text-xs">
              {errors.address?.street.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Número"
            className="input input-primary"
            {...register("address.number")}
          />
          {errors.address?.number?.message && (
            <span className="text-red-500 italic text-xs">
              {errors.address?.number.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Bairro"
            className="input input-primary"
            {...register("address.neighborhood")}
          />
          {errors.address?.neighborhood?.message && (
            <span className="text-red-500 italic text-xs">
              {errors.address?.neighborhood.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Complemento"
            className="input input-primary"
            {...register("address.complement")}
          />

          <input
            type="text"
            placeholder="Cidade"
            className="input input-primary"
            {...register("address.city")}
          />
          {errors.address?.city?.message && (
            <span className="text-red-500 italic text-xs">
              {errors.address?.city.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Estado"
            className="input input-primary"
            {...register("address.state")}
          />
          {errors.address?.state?.message && (
            <span className="text-red-500 italic text-xs">
              {errors.address?.state.message}
            </span>
          )}
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
