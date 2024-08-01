import { FC, PropsWithChildren } from "react";

declare global {
  //eslint-disable-next-line
  type FCC<T = {}> = FC<PropsWithChildren<T>>;
}
