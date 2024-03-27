"use client";

import { FormFileProps } from "@/app/page";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { HasFile } from "./HasFile";
import { InputFile } from "./InputFile";

export function Dropzone() {
  const [file, setFile] = useState<File | null>(null);
  const { setValue } = useFormContext<FormFileProps>();

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  const onDrop = useCallback(
    (file: File[]) => {
      setFile(file[0]);
      setValue("file", file[0]);
    },
    [setValue]
  );

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "application/vnd.google-earth.kml+xml": [".kml"], // kml filles type
    },
  });

  if (file) return <HasFile file={file} removeFile={removeFile} />;
  return <InputFile dropzone={dropzone} />;
}
