import React, { useEffect, useState } from "react";
import TreasureItem from "../../components/TreasureItem";
import Modal from "../../components/Modal";
import { color } from "../../style/common/color";
import { Container, ModalButton, ModalButtonWrap, ModalWrap, NavContainer, NavItem, NavItem2, NumberContainer, NumberText, NumberTextContainer, PositionText, SortedContainer, SortedItemContainer, TextBox, Title, Wrap } from "./style";

let l = [
  { type: "타격", value: 390.7 },
  { type: "타격", value: 393.1 },
  { type: "타격", value: 489.2 },
  { type: "타격", value: 389 },
  { type: "최종", value: 392.2 },
  { type: "최종", value: 456.5 },
  { type: "타격", value: 399.5 },
  { type: "타격", value: 483.2 },
  { type: "최종", value: 487.1 },
  { type: "최종", value: 456.7 },
  { type: "타격", value: 383 },
  { type: "타격", value: 400.8 },
  { type: "타격", value: 391.6 },
  { type: "타격", value: 392.8 },
  { type: "최종", value: 397.2 },
  { type: "타격", value: 400.1 },
  { type: "최종", value: 493.5 },
  { type: "최종", value: 476.9 },
  { type: "최종", value: 393.3 },
  { type: "타격", value: 400.9 },
  { type: "타격", value: 400.1 },
  { type: "최종", value: 476.3 },
  { type: "최종", value: 392.1 },
  { type: "타격", value: 462.5 },
  { type: "치명타", value: 473.2 },
  { type: "타격", value: 384.2 },
  { type: "타격", value: 385.1 },
  { type: "최종", value: 393.2 },
  { type: "타격", value: 389.5 },
  { type: "치명타", value: 487.9 },
  { type: "최종", value: 385.2 },
  { type: "최종", value: 384.2 },
  { type: "타격", value: 384.4 },
  { type: "타격", value: 381.1 },
  { type: "치명타", value: 494.2 },
  { type: "타격", value: 387.8 },
  { type: "최종", value: 385.2 },
  { type: "최종", value: 478 },
  { type: "최종", value: 497.4 },
  { type: "최종", value: 378.3 },
  { type: "최종", value: 377.4 },
  { type: "최종", value: 392.3 },
  { type: "최종", value: 465 },
  { type: "타격", value: 380.2 },
  { type: "최종", value: 380.1 },
  { type: "타격", value: 465.6 },
  { type: "타격", value: 481.8 },
  { type: "최종", value: 468.2 },
  { type: "최종", value: 464.1 },
  { type: "타격", value: 491.6 },
];

export interface TreasureProps {
  type: string;
  value: number;
  column?: number;
  row?: number;
}

interface ModalInfoProps extends TreasureProps {
  id: number;
}

const FindTreasure = () => {
  const initData: TreasureProps[] =
    JSON.parse(localStorage.getItem("treasureList") || "{}") === null
      ? l
      : JSON.parse(localStorage.getItem("treasureList") || "{}");
  const [treasureList, setTreasureList] = useState<TreasureProps[]>(initData);
  const [sortedList, setSortedList] = useState<TreasureProps[]>([]);
  const [navType, setNavType] = useState<number>(1);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfoProps>({
    type: "",
    value: 0,
    id: 0,
  });
  const [number, setNumber] = useState({
    final: 0,
    hit: 0,
    critical: 0,
  });

  useEffect(() => {
    let list = [...treasureList];
    list.forEach((d, i) => {
      let column = Math.ceil((i + 1) / 5);
      let row = (i + 1) % 5;
      if (row === 0) row = 5;
      d.column = column;
      d.row = row;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("treasureList", JSON.stringify(treasureList));
    let list = [...treasureList];
    let final = 0,
      hit = 0,
      critical = 0;
    list.forEach((d) => {
      switch (d.type) {
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
    setNumber({ final, hit, critical });

    list.sort(function (a, b) {
      return a.value - b.value;
    });
    list = list.slice(0, 5);
    setSortedList(list);
  }, [treasureList]);

  const setBorder = (value: number): string => {
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

  const openModal = (type: string, value: number, id: number): void => {
    setModalOpened(true);
    setModalInfo({ type, value, id });
  };

  const closeModal = (): void => {
    setModalOpened(false);
  };

  const handleModalInfo = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    const changed: ModalInfoProps = {
      ...modalInfo,
      [e.target.name]: e.target.value,
    };
    setModalInfo(changed);
  };

  const submit = (): void => {
    const { type, value, id } = modalInfo;
    let list = [...treasureList];
    list[id].type = type;
    list[id].value = value;
    setTreasureList(list);
    closeModal();
  };

  return (
    <Wrap>
      <Title>보물 찾기</Title>
      <NavContainer>
        <NavItem
          onClick={() => {
            setNavType(1);
          }}
          navType={navType}
        >
          보물 리스트
        </NavItem>
        <NavItem2
          onClick={() => {
            setNavType(2);
          }}
          navType={navType}
        >
          보물 정렬
        </NavItem2>
      </NavContainer>
      {navType === 1 ? (
        <Container>
          {treasureList.map((d, i) => (
            <TreasureItem
              key={`list-item ${i + 1}`}
              type={d.type}
              value={d.value}
              border={setBorder(d.value)}
              onClick={() => {
                openModal(d.type, d.value, i);
              }}
            />
          ))}
        </Container>
      ) : (
        <SortedContainer>
          {sortedList.map((d, i) => (
            <SortedItemContainer key={`sorted-list-item ${i + 1}`}>
              <PositionText>
                {d.column}번째 줄 {d.row}
              </PositionText>
              <TreasureItem
                key={`sorted-list-item ${i + 1}`}
                type={d.type}
                value={d.value}
                border={setBorder(d.value)}
              />
            </SortedItemContainer>
          ))}
          <NumberContainer>
            <NumberTextContainer>
              <NumberText>최종 : {number.final}</NumberText>
            </NumberTextContainer>
            <NumberTextContainer>
              <NumberText>타격 : {number.hit}</NumberText>
            </NumberTextContainer>
            <NumberTextContainer>
              <NumberText>치명타 : {number.critical}</NumberText>
            </NumberTextContainer>
          </NumberContainer>
        </SortedContainer>
      )}

      <Modal width={300} isOpen={modalOpened} closeModal={closeModal}>
        <ModalWrap>
          <TextBox>
            <span>보물 종류 : </span>
            <select
              name="type"
              defaultValue={modalInfo?.type}
              onChange={handleModalInfo}
            >
              <option value="최종">최종</option>
              <option value="타격">타격</option>
              <option value="치명타">치명타</option>
            </select>
          </TextBox>
          <TextBox>
            <span>수치 : </span>
            <input
              name="value"
              value={modalInfo?.value}
              onChange={handleModalInfo}
            />
          </TextBox>
          <ModalButtonWrap>
            <ModalButton onClick={submit}>적용</ModalButton>
            <ModalButton onClick={closeModal}>취소</ModalButton>
          </ModalButtonWrap>
        </ModalWrap>
      </Modal>
    </Wrap>
  );
};


export default FindTreasure;
