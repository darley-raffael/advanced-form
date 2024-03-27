"use client";
import { Dropzone } from "@/components/Dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const fileInputSchema = z.object({
  message: z.string().optional(),
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
    formState: { errors },
    control,
  } = form;

  console.log(errors);

  const onSubmit = (data: FormFileProps) => {
    console.log({ data: data });
    console.log(errors.file);
    console.log(data.file);
    alert(`Enviado ${JSON.stringify(data)}`);
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
            <input type="text" placeholder="Mensagem" className="input" />
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
