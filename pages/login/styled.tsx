import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const Container = styled(MuiContainer)`
  margin-top: 1rem;
  margin-bottom: 4rem;
`;

export const FieldError = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
` as typeof Typography;
