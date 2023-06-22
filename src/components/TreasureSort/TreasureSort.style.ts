import styled from "styled-components";

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
