import { Container, TreasureListWrap } from "./TreasureList.style";
import { TreasureProps } from "../../pages/FindTreasure/FindTreasure";
import { getBorderColor } from "../../utils/getBorderColor";
import TreasureItem from "../TreasureItem/TreasureItem";

interface TreasureSortProps {
  treasureList: TreasureProps[];
  openModal: (type: string, value: number, id: number) => void;
}

const TreasureList = ({ treasureList, openModal }: TreasureSortProps) => {
  return (
    <Container>
      <TreasureListWrap>
        {treasureList.map((treasure, idx) => (
          <TreasureItem
            key={treasure.id}
            type={treasure.type}
            value={treasure.value}
            border={getBorderColor(treasure.value)}
            idx={idx + 1}
            onClick={() => {
              if (idx > 0 && treasureList[idx - 1].value === 9999) {
                alert("이전 보물부터 등록해주세요!");
              } else openModal(treasure.type, treasure.value, treasure.id);
            }}
          />
        ))}
      </TreasureListWrap>
    </Container>
  );
};

export default TreasureList;
