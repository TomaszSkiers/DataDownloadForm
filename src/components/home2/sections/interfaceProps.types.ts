import type { FormValues } from "../Home2.types";
import type { Control, FieldErrors } from "react-hook-form";

export interface Props {
  control: Control<FormValues>; // wbudowane typy kontrolera 
  errors: FieldErrors<FormValues>; //wbudowane typy FieldErrors
}