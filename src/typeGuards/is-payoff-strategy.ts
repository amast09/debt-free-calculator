import { PayoffStrategy } from "../types/PayoffStrategy";
import includes from "lodash/includes";

export const isPayoffStrategy = (s: string): s is PayoffStrategy =>
  includes(Object.keys(PayoffStrategy), s);
