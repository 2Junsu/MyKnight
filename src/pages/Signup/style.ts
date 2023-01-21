import styled from "styled-components";
import { _Input } from "../../components/common/Input/style";
import { color } from "../../style/common/color";

export const Wrap = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
`;
export const SignupWrap = styled.div`
  width: 100%;
  height: fit-content;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;
export const Container = styled.div`
  padding: 20px;
`;
export const InputWrap = styled.div`
  margin: 20px 0;
`;
export const PasswordInputWrap = styled(InputWrap)`
  border: 1px solid black;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;

  & > span {
    font-size: 16px;
    font-weight: bold;
    color: ${color.blue};
    white-space: nowrap;
    margin-left: 12px;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const PasswordInput = styled(_Input)`
  border: none;
  padding: 0;
`;
export const SignupButton = styled.button`
  background-color: ${color.blue};
  border-radius: 24px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 0;
  width: 100%;
  text-align: center;
`;