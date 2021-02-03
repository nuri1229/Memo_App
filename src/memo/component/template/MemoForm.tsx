import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { globalManipulationAction, ManipulationRequestPayload } from "global/action/global.manipulation.action";
import { memoService } from "memo/service";
import { MemoDomain } from "memo/model";
import { useDispatch } from "react-redux";
import { Memo } from "memo/model";
import { useLocation, useHistory } from "react-router-dom";
import { getSelectedLabelId } from "global/util/global.hash.util";
import { memoCreateAction } from "memo/action/memo.create.action";
import { globalDataRefreshAction } from "global/action/global.data.action";
import { getFormattedDate } from "global/util/global.date.util";

interface MemoFormProps {
  memo?: Memo;
  setReadOnly: (readOnly: boolean) => void;
  readOnly: boolean;
}

const MemoForm: React.FC<MemoFormProps> = ({ memo, setReadOnly, readOnly }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const hash = location.hash;
  const selectedLabelId = getSelectedLabelId(hash);
  const defaultValues = memo
    ? memo
    : {
        id: "",
        title: "",
        content: "",
      };
  const { register, handleSubmit, setValue, getValues } = useForm<typeof defaultValues>({ defaultValues });

  const onSubmit = (formData: typeof defaultValues) => {
    if (formData.id) updateMemo(formData);
    else createMemo(formData);
  };

  const createMemo = (formData: typeof defaultValues) => {
    const { title, content } = formData;
    const successCallback = (memoId: string) => {
      history.replace(`/#/${selectedLabelId}/${memoId}`);
    };
    dispatch(memoCreateAction({ title, content, labelId: selectedLabelId, successCallback }));
  };

  const updateMemo = (formData: typeof defaultValues) => {
    const payload: ManipulationRequestPayload<Pick<MemoDomain, "title" | "content" | "id">, MemoDomain> = {
      callService: memoService.put,
      callServiceParam: { id: formData.id, title: formData.title, content: formData.content },
      successCallback: () => {
        dispatch(globalDataRefreshAction(selectedLabelId));
      },
    };
    dispatch(globalManipulationAction(payload));
  };

  const deleteBtnOnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const id = getValues("id");
    if (id) {
      const payload: ManipulationRequestPayload<string, any> = {
        callService: memoService.delete,
        callServiceParam: id,
        successCallback: () => {
          dispatch(globalDataRefreshAction(selectedLabelId));
          setReadOnly(true);
          history.replace(`/#/${selectedLabelId}`);
        },
      };
      dispatch(globalManipulationAction(payload));
    } else {
      setReadOnly(true);
    }
  };

  useEffect(() => {
    if (memo) {
      const keys = ["title", "content", "id"];
      for (const key of keys) {
        setValue(key as keyof typeof defaultValues, memo[key]);
      }
    }
  }, [memo]);

  return (
    <StyledMemoFormWrapper onClick={(e) => setReadOnly(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" ref={register} />
        <div className="memo-title-wrapper">
          <input type="text" ref={register({ required: true })} name="title" readOnly={readOnly} />
          {!readOnly && (
            <button type="button" onClick={deleteBtnOnClickHandler}>
              삭제
            </button>
          )}
        </div>
        {memo && <div className="memo-updated-wrapper">최종수정일: {getFormattedDate(memo.updatedAt)}</div>}
        <div className="memo-content-wrapper">
          <textarea name="content" ref={register} readOnly={readOnly}></textarea>
        </div>
        {!readOnly && <input type="submit" value="저장" />}
      </form>
    </StyledMemoFormWrapper>
  );
};

const StyledMemoFormWrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  form {
    width: 100%;

    div {
      margin-bottom: 10px;
      box-sizing: border-box;
    }

    .memo-title-wrapper {
      position: relative;

      input[type="text"] {
        border: 1px solid #aaa;
        width: 80%;
        padding: 0 10px;
      }

      button {
        position: absolute;
        right: 0;
        font-size: 10px;
        padding: 3px;
        border: 1px solid #888;
        border-radius: 3px;
      }
    }

    .memo-updated-wrapper {
      position: relative;
      text-align: right;
    }

    .memo-content-wrapper {
      position: relative;
      width: 100%;

      textarea {
        width: 100%;
        min-height: 300px;
        box-sizing: border-box;

        padding: 10px;
      }
    }

    input[type="submit"] {
      width: 100%;
    }
  }
`;

export default MemoForm;
