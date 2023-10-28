import { createContext, useCallback, useEffect, useReducer } from "react";
import { Cities, City } from "../types/City";
import { CitiesContext } from "../types/CitiesContextType";
import { Action } from "../types/Action";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext<CitiesContext | null>(null);

type initial = {
  cities: Cities;
  isLoading: boolean;
  currentCity: City | Record<string, never>;
  error: string;
};

const initialState: initial = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state: initial, action: Action): initial {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload as Cities };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload as City,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload as City],
        currentCity: action.payload as City,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload as string };
    default:
      return state;
  }
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState<Cities | []>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [currentCity, setCurrentCity] = useState<City | Record<string, never>>(
  //   {}
  // );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (+id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity: City) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
