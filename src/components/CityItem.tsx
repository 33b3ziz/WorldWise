import { Link } from "react-router-dom";
import { City } from "../types/City";
import { useCities } from "../hooks/useCities";
import { formatDate } from "../helpers/formatDate";
import { flagEmojiToPNG } from "../helpers/flagEmoji";
import styles from "./CityItem.module.css";

interface CityItemProps {
  city: City;
}

function CityItem({ city }: CityItemProps) {
  const { currentCity, deleteCity } = useCities()!;
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCity(id!);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
