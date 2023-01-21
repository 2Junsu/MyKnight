import React from "react";
import { _Input } from "./style";

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, name, type = "text", onChange }: InputProps) => {
  return (
    <_Input
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
