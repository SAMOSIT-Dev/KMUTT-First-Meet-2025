import type { CardType } from "../components/Card";
import { cardTypes } from "./constants";

const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomCardNumberAndType = (): {
  type: CardType;
  number: number;
} => {
  const type = cardTypes[random(0, cardTypes.length)];
  const number = random(1, 13);
  return { type, number };
};
