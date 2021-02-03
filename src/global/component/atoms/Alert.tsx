import React from "react";
import styled from "styled-components";
import Dim from "global/component/atoms/Dim";
import { useSelector, useDispatch } from "react-redux";
import { selectAlert } from "global/selector";
import { globalAlertAction } from "global/action/global.alert.action";

const Alert: React.FC = () => {
  const { message } = useSelector(selectAlert);
  const dispatch = useDispatch();

  const okBtnOnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(
      globalAlertAction({
        isOpen: false,
        message: "",
      }),
    );
  };

  return (
    <Dim>
      <StyledAlertWrapper>
        <div className="message-area">{message}</div>
        <div className="button-area">
          <button type="button" onClick={okBtnOnClickHandler}>
            확인
          </button>
        </div>
      </StyledAlertWrapper>
    </Dim>
  );
};

const StyledAlertWrapper = styled.div`
  width: 350px;
  padding: 25px;
  background: #fff;
  border-radius: 5px;

  .message-area {
    font-size: 15px;
    text-align: center;
  }

  .button-area {
    margin-top: 15px;
    text-align: center;
  }
`;

export default Alert;
