import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
   max-width:390px;
   height:100%;
   margin:0 auto;

   button {
    all:unset;
    
    &:hover {
    cursor: pointer;
  }
   }
}
`;

export default GlobalStyle;
