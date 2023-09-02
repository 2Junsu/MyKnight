import { useEffect, useState } from "react";

import { getBorderColor } from "../../utils/getBorderColor";
import TreasureItem from "../TreasureItem/TreasureItem";
import {
  NumberContainer,
  NumberText,
  NumberTextContainer,
  PositionText,
  SortedContainer,
  SortedItemContainer,
} from "./TreasureSortTab.style";
import type { TreasureType, TreasureSortType } from "../../types/treasure";

const TreasureSort = ({ treasureList, openModal }: TreasureSortType) => {
  const [sortedList, setSortedList] = useState<TreasureType[]>([]);
  const [treasureCnt, setTreasureCnt] = useState({
    final: 0,
    hit: 0,
    critical: 0,
  });

  const setSortAndNum = () => {
    let final = 0,
      hit = 0,
      critical = 0;
    let list = [...treasureList];

    list.forEach(({ type }) => {
      switch (type) {
        case "최종":
          final++;
          break;
        case "타격":
          hit++;
          break;
        case "치명타":
          critical++;
          break;
        default:
          break;
      }
    });
    setTreasureCnt({ final, hit, critical });

    list = list
      .filter((d) => d.value !== 0)
      .sort(function (a, b) {
        return a.value - b.value;
      })
      .slice(0, 5);

    setSortedList(list);
  };

  useEffect(() => {
    setSortAndNum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SortedContainer>
      {sortedList.map((treasure) => (
        <SortedItemContainer key={treasure.id}>
          <PositionText>
            {treasure.column}번째 줄 {treasure.row}
          </PositionText>
          <TreasureItem
            type={treasure.type}
            value={treasure.value}
            border={getBorderColor(treasure.value)}
            onClick={() => {
              if (treasure.column && treasure.row)
                openModal(treasure.type, treasure.value, treasure.id);
            }}
          />
        </SortedItemContainer>
      ))}
      <NumberContainer>
        <NumberTextContainer>
          <NumberText>최종 : {treasureCnt.final}</NumberText>
        </NumberTextContainer>
        <NumberTextContainer>
          <NumberText>타격 : {treasureCnt.hit}</NumberText>
        </NumberTextContainer>
        <NumberTextContainer>
          <NumberText>치명타 : {treasureCnt.critical}</NumberText>
        </NumberTextContainer>
      </NumberContainer>
    </SortedContainer>
  );
};

export default TreasureSort;
