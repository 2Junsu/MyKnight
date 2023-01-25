import React, { useState } from "react";
import Input from "../../components/common/Input";
import {
  Container,
  InputWrap,
  SignupButton,
  SignupWrap,
  PasswordInput,
  PasswordInputWrap,
  Wrap,
} from "./style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setCookie } from "../../utils/cookie";
import { doc, setDoc } from "firebase/firestore";
import { TreasureProps } from "../FindTreasure";

interface SignupInfoProps {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [SignupInfo, setSignupInfo] = useState<SignupInfoProps>({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });
  const { email, password, passwordCheck, nickname } = SignupInfo;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRegExp = (str: string) => {
    let regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRegExp(email)) {
      alert("이메일을 정확히 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (nickname === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: user.user.uid,
          email: user.user.email,
        })
      );

      let list = [];
      for (let i = 0; i < 50; i++) {
        let column = Math.ceil((i + 1) / 5);
        let row = (i + 1) % 5;
        if (row === 0) row = 5;
        const dummy: TreasureProps = {
          type: "",
          value: 9999,
          column,
          row,
        };
        list.push(dummy);
      }

      const userDB = {
        uid: user.user.uid,
        email: user.user.email,
        nickname,
        treasureList: list,
      };
      await setDoc(doc(db, "users", nickname), userDB);

      const accessToken = await user.user.getIdToken();
      //   const refreshToken=user.user.refreshToken;
      setCookie("accessToken", accessToken);
      alert("새로운 회원이 되신 걸 환영해요!");
      navigate("/treasure");
    } catch (error: any) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("이미 가입된 이메일입니다.");
          break;
        case "auth/weak-password":
          alert("비밀번호가 너무 취약합니다.");
          break;
        default:
          break;
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changed = {
      ...SignupInfo,
      [e.target.name]: e.target.value,
    };
    setSignupInfo(changed);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrap>
      <SignupWrap>
        <Container onSubmit={signup} method="post">
          <h2>회원가입</h2>
          <InputWrap>
            <Input
              placeholder="이메일"
              onChange={handleInput}
              name="email"
              type="email"
            />
          </InputWrap>
          <PasswordInputWrap>
            <PasswordInput
              placeholder="비밀번호"
              onChange={handleInput}
              name="password"
              type={showPassword ? "text" : "password"}
            />
            <span onClick={handleShowPassword}>표시</span>
          </PasswordInputWrap>
          <InputWrap>
            <Input
              placeholder="비밀번호 확인"
              onChange={handleInput}
              name="passwordCheck"
              type="password"
            />
          </InputWrap>
          <InputWrap>
            <Input
              placeholder="닉네임"
              onChange={handleInput}
              name="nickname"
            />
          </InputWrap>
          <SignupButton type="submit">회원가입</SignupButton>
        </Container>
      </SignupWrap>
    </Wrap>
  );
};

export default Signup;
