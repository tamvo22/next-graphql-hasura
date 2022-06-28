import { styled } from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const PaperCredential = styled(MuiPaper)`
  width: 100%;
  padding: 20px 40px;
`;

export const Form = styled('form')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .MuiTextField-root {
    padding-bottom: 10px;
  }
  .MuiButton-root {
    margin: 10px auto;
    padding: 12px 64px;
  }
`;

export const Title = styled(Typography)`
  margin: 20px;
` as typeof Typography;
