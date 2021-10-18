import { createRef } from "react";
import { IButtonsAlert, IHandleAlert } from "../components/Alert";
import { IHandleToast, ITagToast } from "../components/Toast";

export function masked(maskOf: string, text: string): string {
  const maskArray = maskOf.split("");
  const maskedArray: string[] = [];
  const value = text.replace(/\D/g, "");
  let index = 0;

  const valueArray = value.split("");

  maskArray.forEach((v, i) => {
    if (v === "$") {
      maskedArray[i] = valueArray[index] ?? "";
      index += 1;
    } else {
      maskedArray[i] = valueArray[index] ? v : "";
    }
  });

  const valueMasked = maskedArray.join("");
  return valueMasked;
}

export const toastReference = createRef<IHandleToast>();

export class Toast {
  static show(message: string, duration: number, tag: ITagToast) {
    toastReference.current?.show(message, duration, tag);
  }
}

export const alertReference = createRef<IHandleAlert>();

export class Alert {
  static alert(title: string, message: string, buttons?: IButtonsAlert[]) {
    alertReference.current?.alert(title, message, buttons);
  }
}

export function formatItensBullet(value: string) {
  console.log(value.split("\n"));
  return value
    ?.split("\n")
    .map((v, i) => {
      return v.includes("•")
        ? `${i > 0 ? `\n` : ""}${v}`
        : `${i > 0 ? `\n` : ""}• ${v}`;
    })
    .join("");
}

export function formatTime(timeMS: number) {
  const [MS_IN_SEC, SEC_IN_DAY, SEC_IN_HOUR, SEC_IN_MIN] = [
    1000, 86400, 3600, 60,
  ];
  let seconds = Math.round(Math.abs(timeMS) / MS_IN_SEC);
  const days = Math.floor(seconds / SEC_IN_DAY);
  seconds = Math.floor(seconds % SEC_IN_DAY);
  const hours = Math.floor(seconds / SEC_IN_HOUR);
  seconds = Math.floor(seconds % SEC_IN_HOUR);
  const minutes = Math.floor(seconds / SEC_IN_MIN);
  seconds = Math.floor(seconds % SEC_IN_MIN);
  const [dd, hh, mm, ss] = [days, hours, minutes, seconds].map((item) =>
    item < 10 ? "0" + item : item.toString()
  );
  return `${Number(dd) > 0 ? dd + " Dias " : ""}${
    Number(hh) > 0 ? hh + " Horas " : ""
  }${Number(mm) > 0 ? mm + " Minutos " : ""}${Number(ss) > 0 ? ss + " Segundo" : ""}`;
}
