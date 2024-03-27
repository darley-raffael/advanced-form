import { FileBox, Trash2 } from "lucide-react";

interface HasFileProps {
  file: File;
  removeFile: () => void;
}

export function HasFile({ file, removeFile }: HasFileProps) {
  return (
    <div className="border-2 border-dashed border-gray-400 bg-gray-200 rounded px-4 py-5">
      <div className="flex items-center justify-between bg-white  rounded py-3 px-4">
        <FileBox />

        <span className="font-semibold">{file.name}</span>
        <button type="button" onClick={removeFile}>
          <Trash2 className="hover:text-red-400 transition-all" />
        </button>
      </div>
    </div>
  );
}
