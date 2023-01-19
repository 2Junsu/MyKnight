import styled from "styled-components";

export const Container = styled.div<{ border: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid ${({ border }) => border};
  width: calc(100% - 12px);
  border-radius: 12px;
  &:hover {
    cursor: pointer;
  }
`;
export const Type = styled.div`
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
`;
export const Value = styled(Type)``;
