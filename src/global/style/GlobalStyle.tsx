import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

font-family: Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Nanum Gothic", "Malgun Gothic", sans-serif;

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video,
button {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  background: transparent;
  outline: none;
  text-decoration: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
html, body {
  height: 100%;
  font-size: 14px;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
button, a {
  cursor: pointer;
}
body {
  font-family: "Roboto";
}


/* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
input::-ms-clear {
  display: none;
}
/* input type number 에서 화살표 제거 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
/* Select box 스타일 초기화 */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
/* IE 에서 Select box 화살표 제거 */
select::-ms-expand {
  display: none;
}
/* 이미지 드레그, 클릭 불가 */
img {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

a:link, a:visited, a:hover {color: inherit;text-decoration: none;}


`;

export default GlobalStyle;
