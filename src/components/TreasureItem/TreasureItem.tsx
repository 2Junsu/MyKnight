import type { TreasureItemType } from "../../types/treasure";
import { Container, Type, Value } from "./TreasureItem.style";
// 종류, 수치

const TreasureItem = ({
  type,
  value,
  border,
  idx,
  onClick,
}: TreasureItemType) => {
  return (
    <Container border={border} onClick={onClick}>
      {type === "" ? (
        <Value>Lv.&nbsp;{Number(idx) * 20}</Value>
      ) : (
        <>
          <Type>{type}</Type>
          <Value>{value}</Value>
        </>
      )}
    </Container>
  );
};

export default TreasureItem;
