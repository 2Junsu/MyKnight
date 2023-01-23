import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
   max-width:576px;
   height:100vh;
   margin:0 auto;
}

button {
    all:unset;
    transition:0.2s all ease-in-out;
    &:hover {
        cursor: pointer;
        filter:brightness(80%);
        transition:0.2s all ease-in-out;
    }
}

input{
    &:focus{
        outline:none;
    }
}
`;

export default GlobalStyle;
