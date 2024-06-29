"use client";
import { Dropzone } from "@/components/Dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const fileInputSchema = z.object({
  name: z.string().min(1, "O nome e obrigatório"),
  email: z.string().email("Email invalido"),
  message: z.string().optional(),
  price: z.string(),
  file: z.instanceof(File),
  iceCreamChoice: z.string(),
});

export type FormFileProps = z.infer<typeof fileInputSchema>;

export default function Home() {
  const form = useForm<FormFileProps>({
    mode: "all",
    resolver: zodResolver(fileInputSchema),
  });

  const {
    watch,
    setValue,
    formState: { errors },
    control,
  } = form;

  const price = watch("price");

  const maskPrice = (value: string) => {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    return Number(value).toLocaleString("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    setValue("price", maskPrice(price));
  }, [price]);

  const onSubmit = (data: FormFileProps) => {
    console.log({ data: data });
    console.log(errors.file);
    console.log(data.file);
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">File Input</h1>
      <div className="max-w-2xl  min-w-96 rounded-lg border border-gray-200 bg-white p-6 shadow">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="w-full">
              <label htmlFor="name" className="label">
                Nome
              </label>
              <input
                type="text"
                placeholder="Nome Complet0"
                className="input w-full"
                {...form.register("name")}
                id="name"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input w-full"
                {...form.register("email")}
                id="email"
              />
            </div>
            <div className="w-full">
              <label htmlFor="message" className="label">
                Mensagem
              </label>
              <input
                type="text"
                placeholder="Mensagem"
                className="input w-full"
                {...form.register("message")}
                id="message"
              />
            </div>
            <div className="w-full">
              <label htmlFor="price" className="label">
                price
              </label>
              <input
                type="text"
                placeholder="price"
                className="input w-full"
                {...form.register("price")}
                id="price"
              />
            </div>
            <Controller
              name="iceCreamChoice"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  list="ice-cream-flavors"
                  placeholder="Escolha um sabor de sorvete"
                  className="input"
                  {...field}
                />
              )}
            />
            <datalist id="ice-cream-flavors">
              <option value="Chocolate" />
              <option value="Coconut" />
              <option value="Mint" />
              <option value="Strawberry" />
              <option value="Vanilla" />
            </datalist>
            <Dropzone />
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
