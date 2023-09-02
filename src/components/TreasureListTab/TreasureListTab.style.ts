import styled from "styled-components";

export const Container = styled.div`
  margin: 30px 0;
  width: 100%;
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
