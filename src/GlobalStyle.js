import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Ownglyph_ryuttung-Rg';
  src: url('./fonts/온글잎\ 류뚱체.ttf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: "GowunDodum-Regular";
}

#root {
  max-width: 1000px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  unicode-bidi: isolate;
  text-align: center;
  margin-top: 20px;
}
`
export default GlobalStyle;
