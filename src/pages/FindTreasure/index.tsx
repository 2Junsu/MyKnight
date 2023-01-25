import React, { useEffect, useState } from "react";
import TreasureItem from "../../components/TreasureItem";
import Modal from "../../components/Modal";
import { color } from "../../style/common/color";
import {
  Container,
  Header,
  LoadingWrap,
  ModalButton,
  ModalButtonWrap,
  ModalWrap,
  NavContainer,
  NavItem,
  NavItem2,
  NumberContainer,
  NumberText,
  NumberTextContainer,
  PositionText,
  SortedContainer,
  SortedItemContainer,
  TextBox,
  Title,
  TreasureListWrap,
  Wrap,
} from "./style";
import { ReactComponent as Logout } from "../../assets/icon/ic-logout.svg";
import { auth, db } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { removeCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Loading from "../../components/common/Loading.tsx";

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
  const uid = JSON.parse(localStorage.getItem("userInfo") || "{}").uid;
  const navigate = useNavigate();
  const [treasureList, setTreasureList] = useState<TreasureProps[] | null>(
    null
  );
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
    const getTreasureList = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const docRef = await getDocs(q);
        docRef.forEach((doc) => {
          setTreasureList(doc.data().treasureList);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getTreasureList();
  }, []);

  const setSortAndNum = (list: TreasureProps[]) => {
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

    list = list.filter((d) => d.value !== 9999).slice(0, 5);
    setSortedList(list);
  };

  useEffect(() => {
    if (treasureList !== null) {
      let list = [...treasureList];
      setSortAndNum(list);
    }
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

  const submit = async () => {
    const { type, value, id } = modalInfo;
    if (type === "") {
      alert("보물 종류를 선택해주세요.");
      return;
    }

    if (treasureList !== null) {
      let list = [...treasureList];
      list[id].type = type;
      list[id].value = value;
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      let nickname: string = "";
      querySnapshot.forEach((doc) => {
        nickname = doc.data().nickname;
      });

      if (nickname)
        updateDoc(doc(db, "users", nickname), { treasureList: list });
      setSortAndNum(list);
      closeModal();
    }
  };

  const logout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        const response = await signOut(auth);
        removeCookie("accessToken");
        localStorage.removeItem("userInfo");
        navigate("/");
        window.location.reload();
      } catch (error: any) {
        console.error(error.code);
      }
    }
  };

  return (
    <Wrap>
      <Header>
        <Title>보물 찾기</Title>
        <button onClick={logout}>
          <Logout />
        </button>
      </Header>
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
        <Container treasureList={treasureList}>
          {treasureList === null ? (
            <LoadingWrap>
              <Loading />
            </LoadingWrap>
          ) : (
            <TreasureListWrap>
              {treasureList.map((d, i) => (
                <TreasureItem
                  key={`list-item ${i + 1}`}
                  type={d.type}
                  value={d.value}
                  border={setBorder(d.value)}
                  idx={i + 1}
                  onClick={() => {
                    if (i > 0 && treasureList[i - 1].value === 9999) {
                      alert("이전 보물부터 등록해주세요!");
                    } else openModal(d.type, d.value, i);
                  }}
                />
              ))}
            </TreasureListWrap>
          )}
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
              defaultValue={modalInfo?.type ? modalInfo?.type : "default"}
              onChange={handleModalInfo}
            >
              <option value="default" disabled>
                선택하세요.
              </option>
              <option value="최종">최종</option>
              <option value="타격">타격</option>
              <option value="치명타">치명타</option>
            </select>
          </TextBox>
          <TextBox>
            <span>수치 : </span>
            <input
              name="value"
              value={modalInfo?.value === 9999 ? 0 : modalInfo?.value}
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
