import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectLabelList } from "label/selector";
import { useLocation, useHistory } from "react-router-dom";
import { getSelectedLabelId } from "global/util/global.hash.util";
import { labelListAction } from "label/action/label.list.action";
import LabelList from "label/component/organisms/LabelList";
import { globalManipulationAction, ManipulationRequestPayload } from "global/action/global.manipulation.action";
import { LabelDomain } from "label/model";
import { labelService } from "label/service";
import { ModalContext } from "global/context/ModalContext";
import LabelModal from "label/component/template/LabelModal";
import { selectMemoCount } from "memo/selector";
import { memoCountAction } from "memo/action/memo.count.action";

const LabelListView: React.FC = () => {
  const labelList = useSelector(selectLabelList);
  const memoCount = useSelector(selectMemoCount);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const hash = location.hash;
  const selectedLabelId = getSelectedLabelId(hash);

  const { setModalContent } = useContext(ModalContext);

  useEffect(() => {
    dispatch(labelListAction.request(null));
    dispatch(memoCountAction.request(null));
  }, [selectedLabelId]);

  const addBtnOnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const onSubmit = (formData: { title: string }) => {
      const payload: ManipulationRequestPayload<{ title: string }, { data: LabelDomain }> = {
        callService: labelService.post,
        callServiceParam: { title: formData.title },
        successCallback: (response: { data: LabelDomain }) => {
          if (setModalContent) setModalContent({ content: null, headerText: null });
          dispatch(labelListAction.request(null));
          history.push(`/#/${response.data.id}`);
        },
      };

      dispatch(globalManipulationAction(payload));
    };

    if (setModalContent) setModalContent({ content: <LabelModal onSubmit={onSubmit} />, headerText: "라벨 추가하기" });
  };

  return (
    <StyledLabelListWrapper>
      <h5 className={selectedLabelId === "all" ? "on" : ""}>
        <a href={`/#`}>전체메모 ({memoCount})</a>
      </h5>
      <LabelList list={labelList} selectedLabelId={selectedLabelId} />
      <button onClick={addBtnOnClickHandler}>추가하기</button>
    </StyledLabelListWrapper>
  );
};

export default LabelListView;

const StyledLabelListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;

  h5 {
    margin-bottom: 10px;
  }

  .on {
    font-weight: bold;
    color: blue;
  }

  .btn_wrapper {
    border: 1px solid red;
  }
`;
