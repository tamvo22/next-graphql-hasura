import { styled } from '@mui/material/styles';
import MuiFormControl from '@mui/material/FormControl';
import MuiRadioGroup from '@mui/material/RadioGroup';
import MuiPaper from '@mui/material/Paper';

export const FormControl = styled(MuiFormControl)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const RadioGroup = styled(MuiRadioGroup)`
  display: flex;
  flex-direction: row;
`;

export const Paper = styled(MuiPaper)`
  margin: 10px 0;
  box-shadow: 1px 2px 1px 1px rgb(0 0 0 / 20%), 0px 1px 1px 2px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const TodoDiv = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px 18px;
  border-radius: 4px;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid rgb(197 197 197);
  :last-child {
    border-bottom: none;
  }
  p {
    flex-grow: 1;
  }
`;
