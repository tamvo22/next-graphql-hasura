import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';

export const Container = styled(MuiContainer)`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Main = styled('main')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
