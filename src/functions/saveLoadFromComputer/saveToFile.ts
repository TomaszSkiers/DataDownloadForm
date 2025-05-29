import type { FormValues } from "../../components/home2/Home2.types";
import { generateFileName } from "../other/filenameUtils";

/**
 * Universal utility function for saving data to a file download
 * 
 * Handles the complete workflow of:
 * - Data serialization (with pretty-printing for JSON)
 * - Automatic filename generation
 * - Blob creation and URL handling
 * - Safe DOM operations for file download
 * - Resource cleanup
 * 
 * @param data - The data to be saved (FormValues type or any serializable data)
 * @param mimeType - The MIME type for the file (defaults to 'application/json')
 * 
 * @example
 * // Save as JSON
 * saveToFile(formData);
 * 
 * // Save with custom MIME type
 * saveToFile(csvData, 'text/csv');
 */
export function saveToFile(
  data: FormValues,
  mimeType: string = "application/json"
) {
  // Serialize data based on MIME type
  const fileData = mimeType === "application/json"
    ? JSON.stringify(data, null, 2)  // Pretty-print JSON
    : String(data);                  // Fallback to string conversion

  // Generate filename using utility function
  const fileName = generateFileName(data);
  console.log('Generated filename:', fileName);

  // Create Blob with proper MIME type
  const blob = new Blob([fileData], { type: mimeType });
  
  // Create and manage temporary download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  // Configure download link
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  
  // Execute download sequence
  document.body.appendChild(link);
  link.click();
  
  // Cleanup DOM and memory
  document.body.removeChild(link);
  URL.revokeObjectURL(url);  // Release object URL to prevent memory leaks
}
