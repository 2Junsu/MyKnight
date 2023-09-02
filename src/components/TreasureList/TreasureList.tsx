import { Container, TreasureListWrap } from "./TreasureList.style";

import { getBorderColor } from "../../utils/getBorderColor";
import TreasureItem from "../TreasureItem/TreasureItem";
import type { TreasureSortType } from "../../types/treasure";

const TreasureList = ({ treasureList, openModal }: TreasureSortType) => {
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
