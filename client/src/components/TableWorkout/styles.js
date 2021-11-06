import styled from "styled-components";

export const TableWorkoutWrapper = styled.div`
  max-width: 1110px;
  margin: 0 auto;
  padding: 30px 30px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
  box-shadow:
  0.3px 2px 4.8px -37px rgba(0, 0, 0, 0.051),
  0.7px 4.8px 11.6px -37px rgba(0, 0, 0, 0.073),
  1.4px 9px 21.9px -37px rgba(0, 0, 0, 0.09),
  2.5px 16.1px 39.1px -37px rgba(0, 0, 0, 0.107),
  4.6px 30.1px 73.1px -37px rgba(0, 0, 0, 0.129),
  11px 72px 175px -37px rgba(0, 0, 0, 0.18)
;


  border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const OperationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h1`
  text-align: center;
`
