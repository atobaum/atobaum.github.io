import { format } from "date-fns";

export default function formatDate(date) {
  if (typeof date === "string") date = new Date(date);
  return format(date, "d MMM, y");
}
