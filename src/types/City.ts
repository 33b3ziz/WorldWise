export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string | Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id?: number;
};

export type Cities = City[];
