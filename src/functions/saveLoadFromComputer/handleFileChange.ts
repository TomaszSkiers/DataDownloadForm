/**
 * Utility function for creating file change handlers that load form data from JSON files
 * 
 * This factory function generates an event handler for file input elements that:
 * - Reads JSON data from user-selected files
 * - Merges the data with default form values
 * - Resets the form with the combined data
 * - Provides error handling and input cleanup
 * 
 * @template T - Type parameter representing the form values structure
 * @param reset - Form reset function from react-hook-form
 * @param defaultValues - Default values for the form
 * @param fileInputRef - React ref to the file input element
 * @returns Async event handler function for file input onChange events
 */
import type { DefaultValues } from "react-hook-form";
import { readFileAsJson } from "./readFileAsJson";

export const createHandleFileChange = <T extends object>(
  reset: (values: Partial<T>) => void,
  defaultValues: DefaultValues<T>,
  fileInputRef: React.RefObject<HTMLInputElement | null>
) => {
  /**
   * Event handler for file input change events
   * @param event - File input change event
   */
  return async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first selected file (if any)
    const file = event.target.files?.[0];
    
    if (file) {
      try {
        // Read and parse JSON data from the file
        const data = await readFileAsJson<Partial<T>>(file);
        
        // Reset form with merged values (defaults + file data)
        reset({ ...defaultValues, ...data });
        
      } catch (error) {
        // Handle potential errors during file processing
        alert("Błąd odczytu pliku: " + (error as Error).message);
      }
    }
    
    // Reset file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
};
