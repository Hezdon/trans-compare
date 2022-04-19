import React from "react";
import styled from "styled-components";

const Wrapper = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  font-size: 12px;
  gap: 5px;
  justify-items: flex-start;
`;

export const ItemRow = ({ title, content, style }) => {
  return (
    <Wrapper style={style}>
      <div className="truncate">{title}</div>
      <div className="truncate bold">{content || "N/A"}</div>
    </Wrapper>
  );
};
