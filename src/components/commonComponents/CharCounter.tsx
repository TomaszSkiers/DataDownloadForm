import {
  useWatch,
  type Control,
  type Path,
  type FieldValues,
} from "react-hook-form";

/**
 * Uniwersalny komponent licznika znaków do pól formularza react-hook-form.
 *
 * @template T Typ danych formularza (np. AddTechnicianForm)
 * @param control - Obiekt control z useForm (z react-hook-form)
 * @param name - Nazwa pola, którego długość ma być liczona (np. "fullName")
 * @param max - Maksymalna liczba znaków do wyświetlenia w liczniku
 *
 * @example
 *  W komponencie formularza:
 * <CharCounter control={control} name="fullName" max={40} />
 *
 *  Wyświetli np. "12/40" jeśli pole fullName ma 12 znaków
 *
 * Zalety:
 * - Renderuje się tylko przy zmianie wartości wskazanego pola (optymalizacja wydajności)
 * - Może być używany dla dowolnego pola tekstowego w react-hook-form
 */
export function CharCounter<T extends FieldValues>({
  control,
  name,
  max,
}: {
  control: Control<T>;
  name: Path<T>;
  max: number;
}) {
  // Subskrybuje tylko wskazane pole formularza i pobiera jego wartość
  const value = useWatch({ control, name }) || "";
  // Zwraca licznik znaków w formacie "aktualna_liczba_znaków/maksymalna"
  return <>{`${value.length}/${max}`}</>;
}
