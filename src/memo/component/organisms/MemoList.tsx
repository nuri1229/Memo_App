import React from "react";
import styled from "styled-components";
import { Memo } from "memo/model";
import { useHistory } from "react-router-dom";
import { getFormattedDate } from "global/util/global.date.util";

interface MemoListProps {
  list: Memo[];
  selectedLabelId: string;
  selectedMemoId: string;
  register: any;
}

const MemoList: React.FC<MemoListProps> = ({ list, selectedLabelId, selectedMemoId, register }) => {
  const history = useHistory();

  return (
    <StyledMemoListUl>
      {list.length !== 0 ? (
        list.map((memo) => {
          return (
            <li key={memo.id} className={memo.id === selectedMemoId ? "on" : ""}>
              <div className="wrapper">
                <input type="checkbox" name={memo.id} ref={register} />
                <div
                  className="memo-content-wrapper"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/#/${selectedLabelId}/${memo.id}`);
                  }}>
                  {memo.title}
                  <span>{getFormattedDate(memo.updatedAt)}</span>
                  <div className="content-area">
                    <p>{memo.content}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <li>등록된 메모가 없습니다.</li>
      )}
    </StyledMemoListUl>
  );
};

const StyledMemoListUl = styled.ul`
  width: 100%;
  li {
    margin-bottom: 30px;
    width: 100%;
    cursor: pointer;

    .wrapper {
      display: flex;
      width: 100%;

      align-items: center;

      input[type="checkbox"] {
        display: block;
      }

      .memo-content-wrapper {
        flex: 1;
        position: relative;
        margin-left: 5px;

        span {
          position: absolute;
          right: 0;
          top: 2px;
          font-size: 7px;
        }

        .content-area {
          margin-top: 5px;
          height: 14px;
          padding: 0;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 30vw;
            white-space: nowrap;

            @media only screen and (max-width: 1023px) {
              max-width: 80vw;
            }
          }
        }
      }
    }
  }
`;

export default MemoList;
