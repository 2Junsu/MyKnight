import styled from "styled-components";
import { TreasureProps } from ".";
import { color } from "../../style/common/color";

export const Wrap = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
`;
export const Header = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    position: absolute;
    right: 5%;
  }
`;
export const Title = styled.h1``;
export const VerText=styled.span`
font-size:20px;
margin-left:8px;
`
export const NavContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
`;
export const NavItem = styled.button<{ navType: number }>`
  width: 50%;
  padding: 8px 0;
  border-bottom: 2px solid
    ${({ navType }) => (navType === 1 ? "black" : "transparent")};
  font-size: 18px;
  font-weight: ${({ navType }) => (navType === 1 ? "bold" : 400)};
`;
export const NavItem2 = styled(NavItem)`
  border-bottom: 2px solid
    ${(props) => (props.navType === 2 ? "black" : "transparent")};
  font-weight: ${(props) => (props.navType === 2 ? "bold" : 400)};
`;
export const Container = styled.div<{ treasureList: TreasureProps[] | null }>`
  margin: 30px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LoadingWrap = styled.div`
  height: 616px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TreasureListWrap = styled.div`
  width: 90%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
`;
export const SortedContainer = styled.div`
  margin-top: 60px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const PositionText = styled.span`
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  margin-right: 12px;
`;
export const SortedItemContainer = styled.div`
  margin: 4px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const NumberContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
export const NumberTextContainer = styled(SortedItemContainer)``;
export const NumberText = styled(PositionText)``;
export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const TextBox = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  & > span {
    font-size: 18px;
    font-weight: 600;
    margin-right: 8px;
  }
  & > input {
    font-size: 16px;
    font-weight: 500;
    width: 150px;
    border: none;
  }
  & > select {
    border: 2px solid ${color.blue};
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    &:focus {
      outline: none;
    }
  }
`;
export const ModalButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
export const ModalButton = styled.button`
  padding: 8px 24px;
  background-color: ${color.blue};
  border-radius: 8px;
  margin: 0 16px;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;
