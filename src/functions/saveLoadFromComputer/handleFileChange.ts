
import type{ DefaultValues } from "react-hook-form";
import { readFileAsJson } from "./readFileAsJson";

export const createHandleFileChange = <T extends object>(
  reset: (values: Partial<T>) => void,
  defaultValues: DefaultValues<T>,
  fileInputRef: React.RefObject<HTMLInputElement | null>
) => {
  return async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = await readFileAsJson<Partial<T>>(file);
        reset({ ...defaultValues, ...data });
      } catch (error) {
        alert("Błąd odczytu pliku: " + (error as Error).message);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
};