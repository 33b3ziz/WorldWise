import { Cities, City } from "./City";

export type Action = {
  type: string;
  payload?: Cities | City | string | number;
};
