import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export const Wrapper = styled('footer')`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export default function Footer() {
  return (
    <Wrapper>
      <hr />
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://mui.com/">
          Your Website
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Wrapper>
  );
}
