import { useState, useEffect, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
} from "./Login.style";
import Input from "../../components/common/Input/Input";
import { auth } from "../../firebase-config";
import { getCookie, setCookie } from "../../utils/cookie";
import type { LoginInfo } from "../../types/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const { email, password } = loginInfo;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken !== undefined) navigate("/treasure");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const changed = {
      ...loginInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setLoginInfo(changed);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      const accessToken = await userCredential.user.getIdToken();
      setCookie("accessToken", accessToken);
      navigate("/treasure");
    } catch (error: any) {
      console.error(error.code);
      switch (error.code) {
        case "auth/user-not-found":
          alert("존재하지 않는 계정입니다.");
          break;
        case "auth/wrong-password":
          alert("잘못된 비밀번호입니다.");
          break;
        default:
          break;
      }
    }
  };

  return (
    <Wrap>
      <LoginWrap>
        <Container onSubmit={login} method="post">
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
          <LoginButton type="submit">로그인</LoginButton>
        </Container>
      </LoginWrap>
      <SignupWrap>
        <SignupText>
          새로 오셨다면?
          <span
            onClick={() => {
              navigate("/signup");
            }}>
            회원 가입
          </span>
        </SignupText>
      </SignupWrap>
    </Wrap>
  );
};

export default Login;
