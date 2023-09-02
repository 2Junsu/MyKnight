import { useEffect, useState, ChangeEvent, Suspense, lazy } from "react";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import {
  Header,
  LoadingWrap,
  ModalButton,
  ModalButtonWrap,
  ModalWrap,
  NavContainer,
  NavItem,
  NavItem2,
  TextBox,
  Title,
  VerText,
  Wrap,
} from "./FindTreasure.style";
import { ReactComponent as Logout } from "../../assets/icon/ic-logout.svg";
import Loading from "../../components/common/Loading.tsx/Loading";
import Modal from "../../components/Modal/Modal";
import { auth, db } from "../../firebase-config";
import { removeCookie } from "../../utils/cookie";
import TreasureList from "../../components/TreasureList/TreasureList";
import type { TreasureType } from "../../types/treasure";
// const TreasureList = lazy(
//   () => import("../../components/TreasureList/TreasureList")
// );
const TreasureSort = lazy(
  () => import("../../components/TreasureSort/TreasureSort")
);

const FindTreasure = () => {
  const uid = JSON.parse(localStorage.getItem("userInfo") || "{}").uid;
  const navigate = useNavigate();
  const [treasureList, setTreasureList] = useState<TreasureType[]>([]);
  const [navType, setNavType] = useState(1);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalInfo, setModalInfo] = useState<TreasureType>({
    type: "",
    value: 0,
    id: 0,
  });

  const openModal = (type: string, value: number, id: number) => {
    setModalOpened(true);
    setModalInfo({ type, value, id });
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const handleModalInfo = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const changed: TreasureType = {
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

    if (value < 5) {
      alert("5 이상의 수치를 입력해주세요");
      return;
    }

    if (treasureList !== null) {
      let list: TreasureType[] = treasureList.map((treasure) =>
        treasure.id === id ? { ...treasure, type, value } : treasure
      );
      const ref = doc(db, "users", uid);
      updateDoc(ref, { treasureList: list });
      closeModal();
    }
  };

  const logout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await signOut(auth);
        removeCookie("accessToken");
        localStorage.removeItem("userInfo");
        navigate("/");
        window.location.reload();
      } catch (error: any) {
        console.error(error.code);
      }
    }
  };

  useEffect(() => {
    const ref = doc(db, "users", uid);
    const unsubscription = onSnapshot(ref, (doc) => {
      setTreasureList(doc.data()?.treasureList ?? []);
    });

    return unsubscription;
  }, [uid]);

  return (
    <Wrap>
      <Header>
        <Title>
          보물 찾기<VerText>Ver 1.0.1</VerText>
        </Title>
        <button aria-label="logout" onClick={logout}>
          <Logout />
        </button>
      </Header>
      <NavContainer>
        <NavItem onClick={() => setNavType(1)} navType={navType}>
          보물 리스트
        </NavItem>
        <NavItem2 onClick={() => setNavType(2)} navType={navType}>
          보물 정렬
        </NavItem2>
      </NavContainer>
      {navType === 1 ? (
        treasureList.length === 0 ? (
          <LoadingWrap>
            <Loading />
          </LoadingWrap>
        ) : (
          <TreasureList treasureList={treasureList} openModal={openModal} />
        )
      ) : (
        <Suspense
          fallback={
            <LoadingWrap>
              <Loading />
            </LoadingWrap>
          }>
          <TreasureSort treasureList={treasureList} openModal={openModal} />
        </Suspense>
      )}

      <Modal width={300} isOpen={modalOpened} closeModal={closeModal}>
        <ModalWrap>
          <TextBox>
            <span>보물 종류 : </span>
            <select
              name="type"
              defaultValue={modalInfo.type ? modalInfo.type : "default"}
              onChange={handleModalInfo}>
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
              value={modalInfo.value}
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
