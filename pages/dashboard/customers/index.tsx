import { ReactElement } from 'react';
import withProtect from '@/utils/auth/protect';
import LayoutAdmin from '@/com/layouts/LayoutAdmin';
import Container from '@/com/ui/surfaces/Container';
import { useQuery } from 'react-query';
import { useSubscription } from '@/utils/hasura/useSubscription';
import MuiTable from '@/com/ui/tables/MuiTable';
import { Header, AddForm, UpdateForm } from './defaults';
import { Customers, useAddCustomerMutation, useUpdateCustomerWhereMutation, useDeleteCustomerWhereMutation } from '@/hasura/generated/graphql';

const SampleIds = [
  '3447e074-34b4-46b6-b13e-da5950f84a17',
  '728cd951-0b84-4d86-a73d-89b1489fb84e',
  'dfac61ac-08ea-45b6-8caf-1ea6e738f133',
  '3e0f3e8c-bbc6-443c-8c61-21d0d9b304f0',
  '6f6297d7-e42c-4393-826a-eb6d9cec1ef9',
  '492e95f6-4139-4b42-b5e7-9dcded644e10',
];

interface CustomersProps {}

function Customers(props: CustomersProps) {
  const subCustomers = useQuery(['customers'], () => [], {
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  const { isSubscribing, isSubscribingSuccess } = useSubscription(
    ['customers'],
    `subscription GetCustomers {
        customers {
          id
          email
          first_name
          middle_name
          last_name
          phone
          street
          city
          state
          zip
        }
      }`,
  );

  const AddNewCustomer = useAddCustomerMutation({ retry: 2 });
  const handleAddCustomer = (data: Partial<Customers>) => {
    const { id, ...rest } = data;
    try {
      AddNewCustomer.mutate({
        // @ts-ignore
        object: {
          ...rest,
        },
      });
      return { success: 'New Customer created successful.' };
    } catch (error) {
      return { error: 'Error: New Customer creation failed.' };
    }
  };

  const UpdateCustomerWhere = useUpdateCustomerWhereMutation({ retry: 2 });
  const handleUpdateCustomer = (data: Partial<Customers>) => {
    const { id, ...rest } = data;
    const notSampleData = SampleIds.indexOf(id) === -1;
    if (notSampleData) {
      try {
        UpdateCustomerWhere.mutate({
          where: { id: { _eq: id } },
          set: {
            ...rest,
          },
        });
        return { success: 'Customer record updated successful.' };
      } catch (error) {
        return { error: 'Error: Customer record updating failed.' };
      }
    } else {
      return { error: 'Sorry Sample data cannot be modify or deleted.' };
    }
  };

  const DeleteCustomerWhere = useDeleteCustomerWhereMutation({ retry: 2 });
  const handleDeleteCustomer = (data: string[]) => {
    let notSampleData = true;
    data.forEach((i) => SampleIds.indexOf(i) !== -1 && (notSampleData = false));

    if (notSampleData) {
      try {
        DeleteCustomerWhere.mutate({
          where: { id: { _in: data } },
        });
        return { success: 'Customer record(s) deleted successful.' };
      } catch (error) {
        return { error: 'Error: Customer record(s) deletion failed.' };
      }
    } else {
      return { error: 'Sorry Sample data cannot be modify or deleted.' };
    }
  };

  // Add custom column buttons function
  /* const header: TableHeader[] = baseHeader.concat([
    {
      id: 'access',
      label: 'Access',
      type: 'button',
      colFnc: handleAccess,
    },
    {
      id: 'courses',
      label: 'Courses',
      type: 'button',
      colFnc: handleCourses,
    },
  ]); */

  return (
    <Container maxWidth={false}>
      <MuiTable<Customers>
        title="Customer Management"
        header={Header}
        data={subCustomers.data as any}
        options={{ stickyHeader: true }}
        addForm={AddForm}
        updateForm={UpdateForm}
        addAction={handleAddCustomer}
        updateAction={handleUpdateCustomer}
        deleteAction={handleDeleteCustomer}
        isLoading={isSubscribingSuccess}
      />
    </Container>
  );
}

const ProtectedCustomers = withProtect(Customers) as NextPageWithLayout;
export default ProtectedCustomers;

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
}; */

ProtectedCustomers.getLayout = (page: ReactElement) => (
  <LayoutAdmin meta={{ title: 'Admin dashboard page', description: 'Back office admin portal.' }}>{page}</LayoutAdmin>
);
