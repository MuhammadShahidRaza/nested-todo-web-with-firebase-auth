import { Platform } from "react-native";

export function IsIOS() {
  return Platform.OS === "ios";
}


export function IsNullOrEmpty(list = []) {
  let isNull = true;
  if (list.length)
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      switch (typeof item) {
        case "boolean":
        case "string":
          isNull = item === null || item === "" ? true : false;
          break;
        case "object":
          isNull = false;
          break;
        default:
          isNull = !item ? true : false;
          break;
      }
    }
  return isNull;
}