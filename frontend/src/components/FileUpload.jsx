import { useState, useRef } from "react";
import { Upload, FileCheck, X } from "lucide-react";

const FileUpload = ({ label, accept, acceptLabel, onFileSelect }) => {
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onFileSelect(file);
  };

  const handleClear = () => {
    setFileName(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div
          className={`flex items-center gap-3 p-4 border-2 border-dashed rounded-lg transition-colors ${
            fileName
              ? "border-success bg-success/5"
              : "border-border hover:border-primary/50 bg-muted/30"
          }`}
        >
          {fileName ? (
            <>
              <FileCheck className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-sm text-foreground truncate flex-1">
                {fileName}
              </span>
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-muted rounded-full z-20 relative"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm text-muted-foreground">
                  Click to upload
                </span>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Accepted: {acceptLabel}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;