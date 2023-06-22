import { ChangeEvent } from "react";

import { CustomInput } from "./Input.style";

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, name, type = "text", onChange }: InputProps) => {
  return (
    <CustomInput
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
