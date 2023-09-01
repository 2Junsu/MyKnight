import { color } from "../style/common/color";

export const getBorderColor = (value: number): string => {
  let borderColor = "";
  if (5 <= value && value <= 7.5) borderColor = color.gray;
  else if (8.5 <= value && value <= 9.9) borderColor = color.green;
  else if (19.8 <= value && value <= 29.8) borderColor = color.blue;
  else if (79.3 <= value && value <= 128.8) borderColor = color.purple;
  else if (227.7 <= value && value <= 302) borderColor = color.red;
  else if (351.5 <= value && value <= 401) borderColor = color.orange;
  else if (450.5 <= value && value <= 500) borderColor = color.yellow;
  return borderColor;
};
