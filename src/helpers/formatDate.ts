import { Weekday } from "../types/Weekday";

export const formatDate = (date: string | number | Date, weekday?: Weekday) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: weekday,
  }).format(new Date(date));
};
