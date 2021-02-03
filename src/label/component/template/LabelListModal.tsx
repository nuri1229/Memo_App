import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLabelList } from "label/selector";
import styled from "styled-components";
import { globalManipulationAction, ManipulationRequestPayload } from "global/action/global.manipulation.action";
import { labelService } from "label/service";
import { LabelDomain } from "label/model";

interface LabelListModalProps {
  selectedIds: string[];
  successCallback: (labelId: string) => void;
}

const LabelListModal: React.FC<LabelListModalProps> = ({ successCallback, selectedIds }) => {
  const labelList = useSelector(selectLabelList);
  const dispatch = useDispatch();

  const mapMemoToLabel = (labelId: string) => {
    const payload: ManipulationRequestPayload<{ id: string; memoIds: string[] }, { data: LabelDomain }> = {
      callService: labelService.addMemoToLabel,
      callServiceParam: { id: labelId, memoIds: selectedIds },
      successCallback: () => {
        successCallback(labelId);
      },
    };

    dispatch(globalManipulationAction(payload));
  };

  return (
    <StyledLabelListModal>
      <ul>
        {labelList.map((label) => (
          <li
            key={label.id}
            onClick={(e) => {
              e.preventDefault();
              mapMemoToLabel(label.id);
            }}>
            {label.title}
          </li>
        ))}
      </ul>
    </StyledLabelListModal>
  );
};

export default LabelListModal;

const StyledLabelListModal = styled.div`
  width: 100%;
  padding: 5px;

  ul li {
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;
  }
`;
