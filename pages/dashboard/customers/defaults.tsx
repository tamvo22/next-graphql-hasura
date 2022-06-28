import { TableHeader, TableForm } from '@/com/ui/tables/MuiTable';
import { GridContainer, Grid } from '@/com/forms/fields/FieldLayout';
import TextField from '@/com/forms/fields/TextField';
import Email from '@/com/forms/fields/Email';

export const Header: TableHeader[] = [
  { id: 'first_name', label: 'First Name', type: 'string' },
  { id: 'middle_name', label: 'Middle Name', type: 'string' },
  { id: 'last_name', label: 'Last Name', type: 'string' },
  { id: 'email', label: 'Email', type: 'string' },
  { id: 'phone', label: 'Phone', type: 'string' },
  { id: 'street', label: 'Street', type: 'string' },
  { id: 'city', label: 'City', type: 'string' },
  { id: 'state', label: 'State', type: 'string' },
  { id: 'zip', label: 'Zip', type: 'string' },
];

export const AddForm: TableForm = {
  submitLabel: 'Submit',
  form: (
    <GridContainer>
      <Grid md={4}>
        <TextField variant="outlined" name="first_name" label="First Name" fullWidth required />
      </Grid>
      <Grid md={4}>
        <TextField variant="outlined" name="middle_name" label="Middle Name" fullWidth />
      </Grid>
      <Grid md={4}>
        <TextField variant="outlined" name="last_name" label="Last Name" fullWidth required />
      </Grid>
      <Grid md={6}>
        <Email name="email" label="Email Address" fullWidth endIcon required />
      </Grid>
      <Grid md={6}>
        <TextField variant="outlined" name="phone" label="Phone" fullWidth required />
      </Grid>
      <Grid md={12}>
        <TextField variant="outlined" name="street" label="Street Address" fullWidth required />
      </Grid>
      <Grid md={8}>
        <TextField variant="outlined" name="city" label="City" fullWidth required />
      </Grid>
      <Grid xs={6} sm={6} md={2}>
        <TextField variant="outlined" name="state" label="State" required />
      </Grid>
      <Grid xs={6} sm={6} md={2}>
        <TextField variant="outlined" name="zip" label="Zip Code" required />
      </Grid>
    </GridContainer>
  ),
};

export const UpdateForm: TableForm = {
  submitLabel: 'Update',
  form: (
    <GridContainer>
      <Grid md={4}>
        <TextField variant="outlined" name="first_name" label="First Name" fullWidth required />
      </Grid>
      <Grid md={4}>
        <TextField variant="outlined" name="middle_name" label="Middle Name" fullWidth />
      </Grid>
      <Grid md={4}>
        <TextField variant="outlined" name="last_name" label="Last Name" fullWidth required />
      </Grid>
      <Grid md={6}>
        <Email name="email" label="Email Address" fullWidth endIcon required />
      </Grid>
      <Grid md={6}>
        <TextField variant="outlined" name="phone" label="Phone" fullWidth required />
      </Grid>
      <Grid md={12}>
        <TextField variant="outlined" name="street" label="Street Address" fullWidth required />
      </Grid>
      <Grid md={8}>
        <TextField variant="outlined" name="city" label="City" fullWidth required />
      </Grid>
      <Grid xs={6} sm={6} md={2}>
        <TextField variant="outlined" name="state" label="State" required />
      </Grid>
      <Grid xs={6} sm={6} md={2}>
        <TextField variant="outlined" name="zip" label="Zip Code" required />
      </Grid>
    </GridContainer>
  ),
};
