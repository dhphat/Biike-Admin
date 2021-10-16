import { useReducer } from "react";

interface Props {}

const defaultToggleFunction = (state: boolean, action?: any): boolean => {
  return typeof action === "boolean" ? action : !state;
};

export const useToggle = (
  initialValue = false,
  toggleFunction = defaultToggleFunction
): [boolean, (action?: any) => void] => {
  return useReducer(toggleFunction, initialValue);
};
