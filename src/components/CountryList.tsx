// import { Cities } from "../types/City";
import { useCities } from "../hooks/useCities";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

// interface CountryListProps {
//   cities: Cities;
//   isLoading: boolean;
// }

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countriesUnique = new Set(
    cities.map((city) =>
      JSON.stringify({ country: city.country, emoji: city.emoji })
    )
  );
  const countries = [...countriesUnique].map((each) => JSON.parse(each));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
