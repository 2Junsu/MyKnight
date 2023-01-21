import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import {
  Container,
  InputWrap,
  LoginButton,
  LoginWrap,
  PasswordInput,
  PasswordInputWrap,
  SignupText,
  SignupWrap,
  Wrap,
} from "./style";

interface LoginInfoProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfoProps>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changed = {
      ...loginInfo,
      [e.target.name]: e.target.value,
    };
    setLoginInfo(changed);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrap>
      <LoginWrap>
        <Container>
          <h2>로그인</h2>
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
          <LoginButton>로그인</LoginButton>
        </Container>
      </LoginWrap>
      <SignupWrap>
        <SignupText>
          새로 오셨다면?
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원 가입
          </span>
        </SignupText>
      </SignupWrap>
    </Wrap>
  );
};

export default Login;
