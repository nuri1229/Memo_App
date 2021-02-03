import React from "react";
import { Label } from "label/model";
import styled from "styled-components";

interface LabelListProps {
  list: Label[];
  selectedLabelId: string;
}

const LabelList: React.FC<LabelListProps> = ({ list, selectedLabelId }) => {
  return (
    <StyledLabelListUl>
      {list.length !== 0 ? (
        list.map((e) => {
          return (
            <li key={e.id} className={selectedLabelId === e.id ? "on" : ""}>
              <a href={`/#/${e.id}`}>
                {e.title} ({e.memoCount})
              </a>
            </li>
          );
        })
      ) : (
        <li>등록된 라벨이 없습니다.</li>
      )}
    </StyledLabelListUl>
  );
};

const StyledLabelListUl = styled.ul`
  li {
    margin-bottom: 10px;
  }
`;

export default LabelList;
