import { Cities, City } from "./City";

export type CitiesContext = {
  cities: Cities;
  isLoading: boolean;
  currentCity: City | Record<string, never>;
  error: string;
  getCity: (id: string) => void;
  createCity: (newCity: City) => void;
  deleteCity: (id: number) => void;
};
