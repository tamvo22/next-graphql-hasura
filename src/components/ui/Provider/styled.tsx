import Image from 'next/image';
import { styled } from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const PaperProvider = styled(MuiPaper)`
  width: 100%;
  padding: 20px 40px;
`;

export const Title = styled(Typography)`
  margin: 20px;
` as typeof Typography;

export const Providers = styled('div')`
  width: 100%;
  margin: 0;
  .MuiButton-root {
    margin-bottom: 5px;
    padding: 10px;
  }
`;

export const GoogleIcon = styled(Image)`
  filter: ${({ theme }) => theme.palette.mode === 'dark' && 'brightness(0) invert(1)'};
`;

export const GitHubIcon = styled(Image)`
  filter: ${({ theme }) => theme.palette.mode === 'dark' && 'invert(1) sepia(1)'};
`;
