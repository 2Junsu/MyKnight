import { Container, Type, Value } from "./TreasureItem.style";
// 종류, 수치

export interface TreasureItemProps {
  type: string;
  value: number;
  border: string;
  idx?: number;
  onClick?: () => void;
}
const TreasureItem = ({
  type,
  value,
  border,
  idx,
  onClick,
}: TreasureItemProps) => {
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
