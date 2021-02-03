import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectMemoList, selectMemoCount } from "memo/selector";
import { getSelectedLabelId, getSelectedMemoId } from "global/util/global.hash.util";
import { useLocation, useHistory } from "react-router-dom";
import { memoListAction } from "memo/action/memo.list.action";
import { selectLabelList } from "label/selector";
import { ModalContext } from "global/context/ModalContext";
import { globalManipulationAction, ManipulationRequestPayload } from "global/action/global.manipulation.action";
import { LabelDomain } from "label/model";
import { labelService } from "label/service";
import { labelListAction } from "label/action/label.list.action";
import LabelModal from "label/component/template/LabelModal";
import MemoList from "memo/component/organisms/MemoList";
import { useForm } from "react-hook-form";
import LabelListModal from "label/component/template/LabelListModal";
import { globalDataRefreshAction } from "global/action/global.data.action";

const MemoListView: React.FC = () => {
  const dispatch = useDispatch();
  const memoList = useSelector(selectMemoList);
  const memoCount = useSelector(selectMemoCount);

  const location = useLocation();
  const history = useHistory();
  const hash = location.hash;
  const selectedLabelId = getSelectedLabelId(hash);
  const selectedLabel = useSelector(selectLabelList).find((e) => e.id === selectedLabelId);
  const selectedMemoId = getSelectedMemoId(hash);
  const { setModalContent } = useContext(ModalContext);
  const { register, getValues } = useForm();

  useEffect(() => {
    dispatch(memoListAction.request(selectedLabelId));
  }, [selectedLabelId, dispatch, memoCount]);

  const updateLabelTitle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const onSubmit = (formData: { title: string }) => {
      const payload: ManipulationRequestPayload<{ title: string; id: string }, { data: LabelDomain }> = {
        callService: labelService.put,
        callServiceParam: { title: formData.title, id: selectedLabelId },
        successCallback: () => {
          if (setModalContent) setModalContent({ content: null, headerText: null });
          dispatch(labelListAction.request(null));
        },
      };

      dispatch(globalManipulationAction(payload));
    };

    if (setModalContent) setModalContent({ content: <LabelModal onSubmit={onSubmit} />, headerText: "라벨명 수정하기" });
  };

  const addMemoToLabel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formValues = getValues();
    const selectedIds = Object.entries(formValues)
      .filter((e) => e[1])
      .map((e) => e[0]);

    if (selectedIds.length === 0) {
      alert("선택된 메모가 없습니다.");
      return;
    }

    const successCallback = (labelId: string) => {
      dispatch(globalDataRefreshAction(selectedLabelId));
      if (setModalContent) setModalContent({ content: null, headerText: null });
      history.replace(`/#/${labelId}`);
    };

    if (setModalContent) setModalContent({ content: <LabelListModal selectedIds={selectedIds} successCallback={successCallback} />, headerText: "지정할 라벨을 선택해주세요" });
  };

  const removeLabel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const payload: ManipulationRequestPayload<string, any> = {
      callService: labelService.delete,
      callServiceParam: selectedLabel!.id,
      successCallback: () => {
        history.replace("/#");
      },
    };

    dispatch(globalManipulationAction(payload));
  };

  const removeMemoToLabel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const formValues = getValues();
    const selectedIds = Object.entries(formValues)
      .filter((e) => e[1])
      .map((e) => e[0]);

    if (selectedIds.length === 0) {
      alert("선택된 메모가 없습니다.");
      return;
    }

    const payload: ManipulationRequestPayload<{ id: string; memoIds: string[] }, { data: LabelDomain }> = {
      callService: labelService.removeMemoToLabel,
      callServiceParam: { id: selectedLabelId, memoIds: selectedIds },
      successCallback: () => {
        dispatch(globalDataRefreshAction(selectedLabelId));
      },
    };

    dispatch(globalManipulationAction(payload));
  };

  return (
    <StyledTitleListWrapper>
      <form>
        <div className="label-view-header">
          <h5>{selectedLabel ? selectedLabel.title : "전체목록"}</h5>
          <div className="label-btn-wrapper">
            {selectedLabel && <button onClick={updateLabelTitle}>이름변경</button>}
            <button onClick={addMemoToLabel} type="button">
              라벨설정
            </button>
            {selectedLabel && (
              <button type="button" onClick={removeMemoToLabel}>
                라벨취소
              </button>
            )}
            {selectedLabel && (
              <button type="button" onClick={removeLabel}>
                라벨삭제
              </button>
            )}
          </div>
        </div>
        <MemoList list={memoList} selectedLabelId={selectedLabelId} selectedMemoId={selectedMemoId} register={register} />
      </form>
    </StyledTitleListWrapper>
  );
};

export default MemoListView;

const StyledTitleListWrapper = styled.div`
  box-sizing: border-box;

  width: 100%;
  height: 100%;

  .label-view-header {
    position: relative;
    width: 100%;
    margin-bottom: 10px;

    h5 {
      display: inline-block;
    }
  }

  .label-btn-wrapper {
    position: absolute;
    top: 0;
    right: 0%;

    button {
      font-size: 10px;
      padding: 3px;
      border: 1px solid #888;
      border-radius: 3px;
    }
  }

  .on {
    font-weight: bold;
    color: blue;
  }
`;
