import React from "react";
import { TreasureProps } from "../../pages/FindTreasure";
import { Container, Type, Value } from "./style";
// 종류, 수치

export interface TreasureItemProps extends TreasureProps {
  border: string;
  onClick?: () => void;
}
const TreasureItem = ({ type, value, border, onClick }: TreasureItemProps) => {
  return (
    <Container border={border} onClick={onClick}>
      <Type>{type}</Type>
      <Value>{value}</Value>
    </Container>
  );
};

export default TreasureItem;
