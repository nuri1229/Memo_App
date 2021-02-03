import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMemoList } from "memo/selector";
import { getSelectedMemoId } from "global/util/global.hash.util";
import { useLocation } from "react-router-dom";
import MemoForm from "./MemoForm";

const MemoDetailView: React.FC = () => {
  const memoList = useSelector(selectMemoList);
  const history = useLocation();
  const hash = history.hash;
  const selectedMemoId = getSelectedMemoId(hash);
  const memo = memoList.find((e) => e.id === selectedMemoId);

  const [readOnly, setReadOnly] = useState<boolean>(true);

  const toggleReadOnly = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setReadOnly(!readOnly);
  };

  useEffect(() => {
    if (!readOnly) setReadOnly(true);
  }, [selectedMemoId, hash]);

  return (
    <StyledMemoDetailWrapper>
      {memo ? (
        <MemoForm memo={memo} setReadOnly={setReadOnly} readOnly={readOnly} />
      ) : readOnly ? (
        <StyledNotSelectedWrapper onClick={toggleReadOnly}>
          메모가 선택되지 않았습니다. <br />
          클릭시 메모 등록창이 나타납니다.
        </StyledNotSelectedWrapper>
      ) : (
        <MemoForm setReadOnly={setReadOnly} readOnly={readOnly} />
      )}
    </StyledMemoDetailWrapper>
  );
};

export default MemoDetailView;

const StyledMemoDetailWrapper = styled.div`
  box-sizing: border-box;

  width: 100%;
  height: 100%;
`;

const StyledNotSelectedWrapper = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  background: #e0e0e0;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  min-height: 412px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
