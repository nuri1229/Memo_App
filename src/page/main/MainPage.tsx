import React from "react";
import styled from "styled-components";
import MemoDetailView from "memo/component/template/MemoDetailView";
import MemoListView from "memo/component/template/MemoListView";
import LabelListView from "label/component/template/LabelListView";

const MainPage: React.FC = () => {
  return (
    <section>
      <StyledMainPageWrapper>
        <article className="label-wrapper">
          <LabelListView />
        </article>
        <article className="title-wrapper">
          <MemoListView />
        </article>
        <article className="memo-wrapper">
          <MemoDetailView />
        </article>
      </StyledMainPageWrapper>
    </section>
  );
};

const StyledMainPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;

  @media only screen and (max-width: 1023px) {
    flex-direction: column;
  }

  .label-wrapper {
    flex: 0.2;
    padding: 20px;
  }
  .title-wrapper {
    flex: 0.3;
    padding: 20px;
  }
  .memo-wrapper {
    flex: 0.5;
    padding: 20px;
  }
`;

export default MainPage;
