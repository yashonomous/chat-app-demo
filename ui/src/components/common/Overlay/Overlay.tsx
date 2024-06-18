import emotionStyled from '@emotion/styled';

const Overlay = emotionStyled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export default Overlay;
