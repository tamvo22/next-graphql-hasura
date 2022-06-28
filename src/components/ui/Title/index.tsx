import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const MuiTitle = styled(Typography)`
  margin: 20px;
` as typeof Typography;

interface TitleProps extends TypographyProps {
  component?: string;
}

const Title = (props: TitleProps) => {
  return <MuiTitle {...props}>{props.children}</MuiTitle>;
};

export default Title;
