"use client";
import { FormFileProps } from "@/app/page";
import { CloudUploadIcon } from "lucide-react";
import { DropzoneState } from "react-dropzone";
import { useFormContext } from "react-hook-form";

interface InputFileProps {
  dropzone: DropzoneState;
}

export function InputFile({ dropzone }: InputFileProps) {
  const { getRootProps, getInputProps, isDragActive } = dropzone;
  const { register } = useFormContext<FormFileProps>();

  return (
    <div
      className="flex items-center justify-center w-full"
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center 
        justify-center w-full h-64 border-2
        border-gray-300 border-dashed 
        rounded-lg cursor-pointer 
        bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 
        dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <CloudUploadIcon
            className={`transition-all  ${
              isDragActive
                ? "text-blue-500 dark:text-blue-200 w-12 h-12"
                : "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 "
            }`}
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            KML (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          {...getInputProps()}
          {...register("file")}
        />
      </label>
    </div>
  );
}
