import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface LabelModalProps {
  title?: string;
  onSubmit: (formData: { title: string }) => void;
}

const LabelModal: React.FC<LabelModalProps> = ({ title = "", onSubmit }) => {
  const defaultValues = {
    title,
  };

  const { register, handleSubmit } = useForm<typeof defaultValues>({ defaultValues });

  return (
    <StyledLabelModalWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" ref={register({ required: true })} name="title" />
        <input type="submit" value="전송" />
      </form>
    </StyledLabelModalWrapper>
  );
};

const StyledLabelModalWrapper = styled.div`
  background: #fff;
  width: 100%;
  text-align: center;

  form input[type="text"],
  form input[type="submit"] {
    width: 100%;
    margin: 3px 0;
    padding: 0 5px;
    box-sizing: border-box;
  }
`;

export default LabelModal;
