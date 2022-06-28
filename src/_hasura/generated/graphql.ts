import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { AxiosFetcher } from 'src/_hasura/generated/axiosFetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "cart" */
export type Cart = {
  __typename?: 'cart';
  /** An object relationship */
  customer: Customers;
  customer_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  product: Products;
  product_id: Scalars['uuid'];
  /** An object relationship */
  store: Stores;
  store_id: Scalars['uuid'];
};

/** aggregated selection of "cart" */
export type Cart_Aggregate = {
  __typename?: 'cart_aggregate';
  aggregate?: Maybe<Cart_Aggregate_Fields>;
  nodes: Array<Cart>;
};

/** aggregate fields of "cart" */
export type Cart_Aggregate_Fields = {
  __typename?: 'cart_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Cart_Max_Fields>;
  min?: Maybe<Cart_Min_Fields>;
};


/** aggregate fields of "cart" */
export type Cart_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cart_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "cart" */
export type Cart_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Cart_Max_Order_By>;
  min?: InputMaybe<Cart_Min_Order_By>;
};

/** input type for inserting array relation for remote table "cart" */
export type Cart_Arr_Rel_Insert_Input = {
  data: Array<Cart_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Cart_On_Conflict>;
};

/** Boolean expression to filter rows from the table "cart". All fields are combined with a logical 'AND'. */
export type Cart_Bool_Exp = {
  _and?: InputMaybe<Array<Cart_Bool_Exp>>;
  _not?: InputMaybe<Cart_Bool_Exp>;
  _or?: InputMaybe<Array<Cart_Bool_Exp>>;
  customer?: InputMaybe<Customers_Bool_Exp>;
  customer_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  product?: InputMaybe<Products_Bool_Exp>;
  product_id?: InputMaybe<Uuid_Comparison_Exp>;
  store?: InputMaybe<Stores_Bool_Exp>;
  store_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "cart" */
export enum Cart_Constraint {
  /** unique or primary key constraint */
  CartPkey = 'cart_pkey',
  /** unique or primary key constraint */
  CartProductIdStoreIdKey = 'cart_product_id_store_id_key'
}

/** input type for inserting data into table "cart" */
export type Cart_Insert_Input = {
  customer?: InputMaybe<Customers_Obj_Rel_Insert_Input>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  product?: InputMaybe<Products_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['uuid']>;
  store?: InputMaybe<Stores_Obj_Rel_Insert_Input>;
  store_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Cart_Max_Fields = {
  __typename?: 'cart_max_fields';
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  product_id?: Maybe<Scalars['uuid']>;
  store_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "cart" */
export type Cart_Max_Order_By = {
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  store_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Cart_Min_Fields = {
  __typename?: 'cart_min_fields';
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  product_id?: Maybe<Scalars['uuid']>;
  store_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "cart" */
export type Cart_Min_Order_By = {
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  store_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "cart" */
export type Cart_Mutation_Response = {
  __typename?: 'cart_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Cart>;
};

/** on_conflict condition type for table "cart" */
export type Cart_On_Conflict = {
  constraint: Cart_Constraint;
  update_columns?: Array<Cart_Update_Column>;
  where?: InputMaybe<Cart_Bool_Exp>;
};

/** Ordering options when selecting data from "cart". */
export type Cart_Order_By = {
  customer?: InputMaybe<Customers_Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product?: InputMaybe<Products_Order_By>;
  product_id?: InputMaybe<Order_By>;
  store?: InputMaybe<Stores_Order_By>;
  store_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cart */
export type Cart_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "cart" */
export enum Cart_Select_Column {
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  StoreId = 'store_id'
}

/** input type for updating data in table "cart" */
export type Cart_Set_Input = {
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  product_id?: InputMaybe<Scalars['uuid']>;
  store_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "cart" */
export enum Cart_Update_Column {
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  StoreId = 'store_id'
}

/** columns and relationships of "customers" */
export type Customers = {
  __typename?: 'customers';
  auth_uid?: Maybe<Scalars['String']>;
  /** An array relationship */
  carts: Array<Cart>;
  /** An aggregate relationship */
  carts_aggregate: Cart_Aggregate;
  city?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  last_name?: Maybe<Scalars['String']>;
  middle_name?: Maybe<Scalars['String']>;
  /** An array relationship */
  orders: Array<Orders>;
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate;
  phone?: Maybe<Scalars['String']>;
  /** An array relationship */
  ship_tos: Array<Ship_To>;
  /** An aggregate relationship */
  ship_tos_aggregate: Ship_To_Aggregate;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  zip?: Maybe<Scalars['String']>;
};


/** columns and relationships of "customers" */
export type CustomersCartsArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "customers" */
export type CustomersCarts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "customers" */
export type CustomersOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


/** columns and relationships of "customers" */
export type CustomersOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


/** columns and relationships of "customers" */
export type CustomersShip_TosArgs = {
  distinct_on?: InputMaybe<Array<Ship_To_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ship_To_Order_By>>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};


/** columns and relationships of "customers" */
export type CustomersShip_Tos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ship_To_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ship_To_Order_By>>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};

/** aggregated selection of "customers" */
export type Customers_Aggregate = {
  __typename?: 'customers_aggregate';
  aggregate?: Maybe<Customers_Aggregate_Fields>;
  nodes: Array<Customers>;
};

/** aggregate fields of "customers" */
export type Customers_Aggregate_Fields = {
  __typename?: 'customers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Customers_Max_Fields>;
  min?: Maybe<Customers_Min_Fields>;
};


/** aggregate fields of "customers" */
export type Customers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Customers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "customers". All fields are combined with a logical 'AND'. */
export type Customers_Bool_Exp = {
  _and?: InputMaybe<Array<Customers_Bool_Exp>>;
  _not?: InputMaybe<Customers_Bool_Exp>;
  _or?: InputMaybe<Array<Customers_Bool_Exp>>;
  auth_uid?: InputMaybe<String_Comparison_Exp>;
  carts?: InputMaybe<Cart_Bool_Exp>;
  city?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  middle_name?: InputMaybe<String_Comparison_Exp>;
  orders?: InputMaybe<Orders_Bool_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  ship_tos?: InputMaybe<Ship_To_Bool_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  street?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  zip?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "customers" */
export enum Customers_Constraint {
  /** unique or primary key constraint */
  CustomersAuthUidKey = 'customers_auth_uid_key',
  /** unique or primary key constraint */
  CustomersEmailAuthUidKey = 'customers_email_auth_uid_key',
  /** unique or primary key constraint */
  CustomersEmailKey = 'customers_email_key',
  /** unique or primary key constraint */
  CustomersPkey = 'customers_pkey'
}

/** input type for inserting data into table "customers" */
export type Customers_Insert_Input = {
  auth_uid?: InputMaybe<Scalars['String']>;
  carts?: InputMaybe<Cart_Arr_Rel_Insert_Input>;
  city?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  middle_name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<Orders_Arr_Rel_Insert_Input>;
  phone?: InputMaybe<Scalars['String']>;
  ship_tos?: InputMaybe<Ship_To_Arr_Rel_Insert_Input>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Customers_Max_Fields = {
  __typename?: 'customers_max_fields';
  auth_uid?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  middle_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  zip?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Customers_Min_Fields = {
  __typename?: 'customers_min_fields';
  auth_uid?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  middle_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  zip?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "customers" */
export type Customers_Mutation_Response = {
  __typename?: 'customers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Customers>;
};

/** input type for inserting object relation for remote table "customers" */
export type Customers_Obj_Rel_Insert_Input = {
  data: Customers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Customers_On_Conflict>;
};

/** on_conflict condition type for table "customers" */
export type Customers_On_Conflict = {
  constraint: Customers_Constraint;
  update_columns?: Array<Customers_Update_Column>;
  where?: InputMaybe<Customers_Bool_Exp>;
};

/** Ordering options when selecting data from "customers". */
export type Customers_Order_By = {
  auth_uid?: InputMaybe<Order_By>;
  carts_aggregate?: InputMaybe<Cart_Aggregate_Order_By>;
  city?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  middle_name?: InputMaybe<Order_By>;
  orders_aggregate?: InputMaybe<Orders_Aggregate_Order_By>;
  phone?: InputMaybe<Order_By>;
  ship_tos_aggregate?: InputMaybe<Ship_To_Aggregate_Order_By>;
  state?: InputMaybe<Order_By>;
  street?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  zip?: InputMaybe<Order_By>;
};

/** primary key columns input for table: customers */
export type Customers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "customers" */
export enum Customers_Select_Column {
  /** column name */
  AuthUid = 'auth_uid',
  /** column name */
  City = 'city',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  MiddleName = 'middle_name',
  /** column name */
  Phone = 'phone',
  /** column name */
  State = 'state',
  /** column name */
  Street = 'street',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Zip = 'zip'
}

/** input type for updating data in table "customers" */
export type Customers_Set_Input = {
  auth_uid?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  middle_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** update columns of table "customers" */
export enum Customers_Update_Column {
  /** column name */
  AuthUid = 'auth_uid',
  /** column name */
  City = 'city',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  MiddleName = 'middle_name',
  /** column name */
  Phone = 'phone',
  /** column name */
  State = 'state',
  /** column name */
  Street = 'street',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Zip = 'zip'
}

/** columns and relationships of "employees" */
export type Employees = {
  __typename?: 'employees';
  auth_uid?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  last_name: Scalars['String'];
  role: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "employees" */
export type Employees_Aggregate = {
  __typename?: 'employees_aggregate';
  aggregate?: Maybe<Employees_Aggregate_Fields>;
  nodes: Array<Employees>;
};

/** aggregate fields of "employees" */
export type Employees_Aggregate_Fields = {
  __typename?: 'employees_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Employees_Max_Fields>;
  min?: Maybe<Employees_Min_Fields>;
};


/** aggregate fields of "employees" */
export type Employees_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Employees_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "employees". All fields are combined with a logical 'AND'. */
export type Employees_Bool_Exp = {
  _and?: InputMaybe<Array<Employees_Bool_Exp>>;
  _not?: InputMaybe<Employees_Bool_Exp>;
  _or?: InputMaybe<Array<Employees_Bool_Exp>>;
  auth_uid?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "employees" */
export enum Employees_Constraint {
  /** unique or primary key constraint */
  EmployeesEmailKey = 'employees_email_key',
  /** unique or primary key constraint */
  EmployeesPkey = 'employees_pkey'
}

/** input type for inserting data into table "employees" */
export type Employees_Insert_Input = {
  auth_uid?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Employees_Max_Fields = {
  __typename?: 'employees_max_fields';
  auth_uid?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Employees_Min_Fields = {
  __typename?: 'employees_min_fields';
  auth_uid?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "employees" */
export type Employees_Mutation_Response = {
  __typename?: 'employees_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Employees>;
};

/** on_conflict condition type for table "employees" */
export type Employees_On_Conflict = {
  constraint: Employees_Constraint;
  update_columns?: Array<Employees_Update_Column>;
  where?: InputMaybe<Employees_Bool_Exp>;
};

/** Ordering options when selecting data from "employees". */
export type Employees_Order_By = {
  auth_uid?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: employees */
export type Employees_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "employees" */
export enum Employees_Select_Column {
  /** column name */
  AuthUid = 'auth_uid',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "employees" */
export type Employees_Set_Input = {
  auth_uid?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "employees" */
export enum Employees_Update_Column {
  /** column name */
  AuthUid = 'auth_uid',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "inventory" */
export type Inventory = {
  __typename?: 'inventory';
  id: Scalars['uuid'];
  product_id?: Maybe<Scalars['uuid']>;
  stock_quantity: Scalars['Int'];
  store_id: Scalars['uuid'];
};

/** aggregated selection of "inventory" */
export type Inventory_Aggregate = {
  __typename?: 'inventory_aggregate';
  aggregate?: Maybe<Inventory_Aggregate_Fields>;
  nodes: Array<Inventory>;
};

/** aggregate fields of "inventory" */
export type Inventory_Aggregate_Fields = {
  __typename?: 'inventory_aggregate_fields';
  avg?: Maybe<Inventory_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Inventory_Max_Fields>;
  min?: Maybe<Inventory_Min_Fields>;
  stddev?: Maybe<Inventory_Stddev_Fields>;
  stddev_pop?: Maybe<Inventory_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Inventory_Stddev_Samp_Fields>;
  sum?: Maybe<Inventory_Sum_Fields>;
  var_pop?: Maybe<Inventory_Var_Pop_Fields>;
  var_samp?: Maybe<Inventory_Var_Samp_Fields>;
  variance?: Maybe<Inventory_Variance_Fields>;
};


/** aggregate fields of "inventory" */
export type Inventory_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Inventory_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "inventory" */
export type Inventory_Aggregate_Order_By = {
  avg?: InputMaybe<Inventory_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Inventory_Max_Order_By>;
  min?: InputMaybe<Inventory_Min_Order_By>;
  stddev?: InputMaybe<Inventory_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Inventory_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Inventory_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Inventory_Sum_Order_By>;
  var_pop?: InputMaybe<Inventory_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Inventory_Var_Samp_Order_By>;
  variance?: InputMaybe<Inventory_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "inventory" */
export type Inventory_Arr_Rel_Insert_Input = {
  data: Array<Inventory_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Inventory_On_Conflict>;
};

/** aggregate avg on columns */
export type Inventory_Avg_Fields = {
  __typename?: 'inventory_avg_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "inventory" */
export type Inventory_Avg_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "inventory". All fields are combined with a logical 'AND'. */
export type Inventory_Bool_Exp = {
  _and?: InputMaybe<Array<Inventory_Bool_Exp>>;
  _not?: InputMaybe<Inventory_Bool_Exp>;
  _or?: InputMaybe<Array<Inventory_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  product_id?: InputMaybe<Uuid_Comparison_Exp>;
  stock_quantity?: InputMaybe<Int_Comparison_Exp>;
  store_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "inventory" */
export enum Inventory_Constraint {
  /** unique or primary key constraint */
  InventoryPkey = 'inventory_pkey',
  /** unique or primary key constraint */
  InventoryStoreIdProductIdKey = 'inventory_store_id_product_id_key'
}

/** input type for incrementing numeric columns in table "inventory" */
export type Inventory_Inc_Input = {
  stock_quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "inventory" */
export type Inventory_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  product_id?: InputMaybe<Scalars['uuid']>;
  stock_quantity?: InputMaybe<Scalars['Int']>;
  store_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Inventory_Max_Fields = {
  __typename?: 'inventory_max_fields';
  id?: Maybe<Scalars['uuid']>;
  product_id?: Maybe<Scalars['uuid']>;
  stock_quantity?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "inventory" */
export type Inventory_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  stock_quantity?: InputMaybe<Order_By>;
  store_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Inventory_Min_Fields = {
  __typename?: 'inventory_min_fields';
  id?: Maybe<Scalars['uuid']>;
  product_id?: Maybe<Scalars['uuid']>;
  stock_quantity?: Maybe<Scalars['Int']>;
  store_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "inventory" */
export type Inventory_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  stock_quantity?: InputMaybe<Order_By>;
  store_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "inventory" */
export type Inventory_Mutation_Response = {
  __typename?: 'inventory_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Inventory>;
};

/** on_conflict condition type for table "inventory" */
export type Inventory_On_Conflict = {
  constraint: Inventory_Constraint;
  update_columns?: Array<Inventory_Update_Column>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};

/** Ordering options when selecting data from "inventory". */
export type Inventory_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  stock_quantity?: InputMaybe<Order_By>;
  store_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: inventory */
export type Inventory_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "inventory" */
export enum Inventory_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  StockQuantity = 'stock_quantity',
  /** column name */
  StoreId = 'store_id'
}

/** input type for updating data in table "inventory" */
export type Inventory_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  product_id?: InputMaybe<Scalars['uuid']>;
  stock_quantity?: InputMaybe<Scalars['Int']>;
  store_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Inventory_Stddev_Fields = {
  __typename?: 'inventory_stddev_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "inventory" */
export type Inventory_Stddev_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Inventory_Stddev_Pop_Fields = {
  __typename?: 'inventory_stddev_pop_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "inventory" */
export type Inventory_Stddev_Pop_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Inventory_Stddev_Samp_Fields = {
  __typename?: 'inventory_stddev_samp_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "inventory" */
export type Inventory_Stddev_Samp_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Inventory_Sum_Fields = {
  __typename?: 'inventory_sum_fields';
  stock_quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "inventory" */
export type Inventory_Sum_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** update columns of table "inventory" */
export enum Inventory_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  StockQuantity = 'stock_quantity',
  /** column name */
  StoreId = 'store_id'
}

/** aggregate var_pop on columns */
export type Inventory_Var_Pop_Fields = {
  __typename?: 'inventory_var_pop_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "inventory" */
export type Inventory_Var_Pop_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Inventory_Var_Samp_Fields = {
  __typename?: 'inventory_var_samp_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "inventory" */
export type Inventory_Var_Samp_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Inventory_Variance_Fields = {
  __typename?: 'inventory_variance_fields';
  stock_quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "inventory" */
export type Inventory_Variance_Order_By = {
  stock_quantity?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "cart" */
  delete_cart?: Maybe<Cart_Mutation_Response>;
  /** delete single row from the table: "cart" */
  delete_cart_by_pk?: Maybe<Cart>;
  /** delete data from the table: "customers" */
  delete_customers?: Maybe<Customers_Mutation_Response>;
  /** delete single row from the table: "customers" */
  delete_customers_by_pk?: Maybe<Customers>;
  /** delete data from the table: "employees" */
  delete_employees?: Maybe<Employees_Mutation_Response>;
  /** delete single row from the table: "employees" */
  delete_employees_by_pk?: Maybe<Employees>;
  /** delete data from the table: "inventory" */
  delete_inventory?: Maybe<Inventory_Mutation_Response>;
  /** delete single row from the table: "inventory" */
  delete_inventory_by_pk?: Maybe<Inventory>;
  /** delete data from the table: "orders" */
  delete_orders?: Maybe<Orders_Mutation_Response>;
  /** delete single row from the table: "orders" */
  delete_orders_by_pk?: Maybe<Orders>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "ship_to" */
  delete_ship_to?: Maybe<Ship_To_Mutation_Response>;
  /** delete single row from the table: "ship_to" */
  delete_ship_to_by_pk?: Maybe<Ship_To>;
  /** delete data from the table: "stores" */
  delete_stores?: Maybe<Stores_Mutation_Response>;
  /** delete single row from the table: "stores" */
  delete_stores_by_pk?: Maybe<Stores>;
  /** insert data into the table: "cart" */
  insert_cart?: Maybe<Cart_Mutation_Response>;
  /** insert a single row into the table: "cart" */
  insert_cart_one?: Maybe<Cart>;
  /** insert data into the table: "customers" */
  insert_customers?: Maybe<Customers_Mutation_Response>;
  /** insert a single row into the table: "customers" */
  insert_customers_one?: Maybe<Customers>;
  /** insert data into the table: "employees" */
  insert_employees?: Maybe<Employees_Mutation_Response>;
  /** insert a single row into the table: "employees" */
  insert_employees_one?: Maybe<Employees>;
  /** insert data into the table: "inventory" */
  insert_inventory?: Maybe<Inventory_Mutation_Response>;
  /** insert a single row into the table: "inventory" */
  insert_inventory_one?: Maybe<Inventory>;
  /** insert data into the table: "orders" */
  insert_orders?: Maybe<Orders_Mutation_Response>;
  /** insert a single row into the table: "orders" */
  insert_orders_one?: Maybe<Orders>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "ship_to" */
  insert_ship_to?: Maybe<Ship_To_Mutation_Response>;
  /** insert a single row into the table: "ship_to" */
  insert_ship_to_one?: Maybe<Ship_To>;
  /** insert data into the table: "stores" */
  insert_stores?: Maybe<Stores_Mutation_Response>;
  /** insert a single row into the table: "stores" */
  insert_stores_one?: Maybe<Stores>;
  /** update data of the table: "cart" */
  update_cart?: Maybe<Cart_Mutation_Response>;
  /** update single row of the table: "cart" */
  update_cart_by_pk?: Maybe<Cart>;
  /** update data of the table: "customers" */
  update_customers?: Maybe<Customers_Mutation_Response>;
  /** update single row of the table: "customers" */
  update_customers_by_pk?: Maybe<Customers>;
  /** update data of the table: "employees" */
  update_employees?: Maybe<Employees_Mutation_Response>;
  /** update single row of the table: "employees" */
  update_employees_by_pk?: Maybe<Employees>;
  /** update data of the table: "inventory" */
  update_inventory?: Maybe<Inventory_Mutation_Response>;
  /** update single row of the table: "inventory" */
  update_inventory_by_pk?: Maybe<Inventory>;
  /** update data of the table: "orders" */
  update_orders?: Maybe<Orders_Mutation_Response>;
  /** update single row of the table: "orders" */
  update_orders_by_pk?: Maybe<Orders>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update data of the table: "ship_to" */
  update_ship_to?: Maybe<Ship_To_Mutation_Response>;
  /** update single row of the table: "ship_to" */
  update_ship_to_by_pk?: Maybe<Ship_To>;
  /** update data of the table: "stores" */
  update_stores?: Maybe<Stores_Mutation_Response>;
  /** update single row of the table: "stores" */
  update_stores_by_pk?: Maybe<Stores>;
};


/** mutation root */
export type Mutation_RootDelete_CartArgs = {
  where: Cart_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cart_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CustomersArgs = {
  where: Customers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Customers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_EmployeesArgs = {
  where: Employees_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Employees_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_InventoryArgs = {
  where: Inventory_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Inventory_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_OrdersArgs = {
  where: Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Orders_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Ship_ToArgs = {
  where: Ship_To_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ship_To_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_StoresArgs = {
  where: Stores_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Stores_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_CartArgs = {
  objects: Array<Cart_Insert_Input>;
  on_conflict?: InputMaybe<Cart_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cart_OneArgs = {
  object: Cart_Insert_Input;
  on_conflict?: InputMaybe<Cart_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CustomersArgs = {
  objects: Array<Customers_Insert_Input>;
  on_conflict?: InputMaybe<Customers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Customers_OneArgs = {
  object: Customers_Insert_Input;
  on_conflict?: InputMaybe<Customers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EmployeesArgs = {
  objects: Array<Employees_Insert_Input>;
  on_conflict?: InputMaybe<Employees_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Employees_OneArgs = {
  object: Employees_Insert_Input;
  on_conflict?: InputMaybe<Employees_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InventoryArgs = {
  objects: Array<Inventory_Insert_Input>;
  on_conflict?: InputMaybe<Inventory_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Inventory_OneArgs = {
  object: Inventory_Insert_Input;
  on_conflict?: InputMaybe<Inventory_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrdersArgs = {
  objects: Array<Orders_Insert_Input>;
  on_conflict?: InputMaybe<Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Orders_OneArgs = {
  object: Orders_Insert_Input;
  on_conflict?: InputMaybe<Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ship_ToArgs = {
  objects: Array<Ship_To_Insert_Input>;
  on_conflict?: InputMaybe<Ship_To_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ship_To_OneArgs = {
  object: Ship_To_Insert_Input;
  on_conflict?: InputMaybe<Ship_To_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StoresArgs = {
  objects: Array<Stores_Insert_Input>;
  on_conflict?: InputMaybe<Stores_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Stores_OneArgs = {
  object: Stores_Insert_Input;
  on_conflict?: InputMaybe<Stores_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CartArgs = {
  _set?: InputMaybe<Cart_Set_Input>;
  where: Cart_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cart_By_PkArgs = {
  _set?: InputMaybe<Cart_Set_Input>;
  pk_columns: Cart_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CustomersArgs = {
  _set?: InputMaybe<Customers_Set_Input>;
  where: Customers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Customers_By_PkArgs = {
  _set?: InputMaybe<Customers_Set_Input>;
  pk_columns: Customers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_EmployeesArgs = {
  _set?: InputMaybe<Employees_Set_Input>;
  where: Employees_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Employees_By_PkArgs = {
  _set?: InputMaybe<Employees_Set_Input>;
  pk_columns: Employees_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InventoryArgs = {
  _inc?: InputMaybe<Inventory_Inc_Input>;
  _set?: InputMaybe<Inventory_Set_Input>;
  where: Inventory_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Inventory_By_PkArgs = {
  _inc?: InputMaybe<Inventory_Inc_Input>;
  _set?: InputMaybe<Inventory_Set_Input>;
  pk_columns: Inventory_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrdersArgs = {
  _inc?: InputMaybe<Orders_Inc_Input>;
  _set?: InputMaybe<Orders_Set_Input>;
  where: Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Orders_By_PkArgs = {
  _inc?: InputMaybe<Orders_Inc_Input>;
  _set?: InputMaybe<Orders_Set_Input>;
  pk_columns: Orders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _inc?: InputMaybe<Products_Inc_Input>;
  _set?: InputMaybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _inc?: InputMaybe<Products_Inc_Input>;
  _set?: InputMaybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ship_ToArgs = {
  _set?: InputMaybe<Ship_To_Set_Input>;
  where: Ship_To_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ship_To_By_PkArgs = {
  _set?: InputMaybe<Ship_To_Set_Input>;
  pk_columns: Ship_To_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_StoresArgs = {
  _set?: InputMaybe<Stores_Set_Input>;
  where: Stores_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Stores_By_PkArgs = {
  _set?: InputMaybe<Stores_Set_Input>;
  pk_columns: Stores_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "orders" */
export type Orders = {
  __typename?: 'orders';
  cost: Scalars['numeric'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  customer: Customers;
  customer_id: Scalars['uuid'];
  id: Scalars['uuid'];
  order_no: Scalars['String'];
  price: Scalars['numeric'];
  product_id: Scalars['uuid'];
  quantity: Scalars['numeric'];
  ship_to_id: Scalars['uuid'];
  status: Scalars['String'];
  total_price: Scalars['numeric'];
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "orders" */
export type Orders_Aggregate = {
  __typename?: 'orders_aggregate';
  aggregate?: Maybe<Orders_Aggregate_Fields>;
  nodes: Array<Orders>;
};

/** aggregate fields of "orders" */
export type Orders_Aggregate_Fields = {
  __typename?: 'orders_aggregate_fields';
  avg?: Maybe<Orders_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Orders_Max_Fields>;
  min?: Maybe<Orders_Min_Fields>;
  stddev?: Maybe<Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Orders_Sum_Fields>;
  var_pop?: Maybe<Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Orders_Var_Samp_Fields>;
  variance?: Maybe<Orders_Variance_Fields>;
};


/** aggregate fields of "orders" */
export type Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Orders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "orders" */
export type Orders_Aggregate_Order_By = {
  avg?: InputMaybe<Orders_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Orders_Max_Order_By>;
  min?: InputMaybe<Orders_Min_Order_By>;
  stddev?: InputMaybe<Orders_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Orders_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Orders_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Orders_Sum_Order_By>;
  var_pop?: InputMaybe<Orders_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Orders_Var_Samp_Order_By>;
  variance?: InputMaybe<Orders_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "orders" */
export type Orders_Arr_Rel_Insert_Input = {
  data: Array<Orders_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Orders_On_Conflict>;
};

/** aggregate avg on columns */
export type Orders_Avg_Fields = {
  __typename?: 'orders_avg_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "orders" */
export type Orders_Avg_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "orders". All fields are combined with a logical 'AND'. */
export type Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Orders_Bool_Exp>>;
  _not?: InputMaybe<Orders_Bool_Exp>;
  _or?: InputMaybe<Array<Orders_Bool_Exp>>;
  cost?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  customer?: InputMaybe<Customers_Bool_Exp>;
  customer_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  order_no?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  product_id?: InputMaybe<Uuid_Comparison_Exp>;
  quantity?: InputMaybe<Numeric_Comparison_Exp>;
  ship_to_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_price?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "orders" */
export enum Orders_Constraint {
  /** unique or primary key constraint */
  OrderItemsPkey = 'order_items_pkey'
}

/** input type for incrementing numeric columns in table "orders" */
export type Orders_Inc_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
  quantity?: InputMaybe<Scalars['numeric']>;
  total_price?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "orders" */
export type Orders_Insert_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer?: InputMaybe<Customers_Obj_Rel_Insert_Input>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  order_no?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  product_id?: InputMaybe<Scalars['uuid']>;
  quantity?: InputMaybe<Scalars['numeric']>;
  ship_to_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  total_price?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Orders_Max_Fields = {
  __typename?: 'orders_max_fields';
  cost?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  order_no?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  product_id?: Maybe<Scalars['uuid']>;
  quantity?: Maybe<Scalars['numeric']>;
  ship_to_id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  total_price?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "orders" */
export type Orders_Max_Order_By = {
  cost?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_no?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  ship_to_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Orders_Min_Fields = {
  __typename?: 'orders_min_fields';
  cost?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  order_no?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  product_id?: Maybe<Scalars['uuid']>;
  quantity?: Maybe<Scalars['numeric']>;
  ship_to_id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  total_price?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "orders" */
export type Orders_Min_Order_By = {
  cost?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_no?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  ship_to_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "orders" */
export type Orders_Mutation_Response = {
  __typename?: 'orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Orders>;
};

/** on_conflict condition type for table "orders" */
export type Orders_On_Conflict = {
  constraint: Orders_Constraint;
  update_columns?: Array<Orders_Update_Column>;
  where?: InputMaybe<Orders_Bool_Exp>;
};

/** Ordering options when selecting data from "orders". */
export type Orders_Order_By = {
  cost?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer?: InputMaybe<Customers_Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_no?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  ship_to_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: orders */
export type Orders_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "orders" */
export enum Orders_Select_Column {
  /** column name */
  Cost = 'cost',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  OrderNo = 'order_no',
  /** column name */
  Price = 'price',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ShipToId = 'ship_to_id',
  /** column name */
  Status = 'status',
  /** column name */
  TotalPrice = 'total_price',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "orders" */
export type Orders_Set_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  order_no?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  product_id?: InputMaybe<Scalars['uuid']>;
  quantity?: InputMaybe<Scalars['numeric']>;
  ship_to_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  total_price?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Orders_Stddev_Fields = {
  __typename?: 'orders_stddev_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "orders" */
export type Orders_Stddev_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Orders_Stddev_Pop_Fields = {
  __typename?: 'orders_stddev_pop_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "orders" */
export type Orders_Stddev_Pop_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Orders_Stddev_Samp_Fields = {
  __typename?: 'orders_stddev_samp_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "orders" */
export type Orders_Stddev_Samp_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Orders_Sum_Fields = {
  __typename?: 'orders_sum_fields';
  cost?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['numeric']>;
  total_price?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "orders" */
export type Orders_Sum_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** update columns of table "orders" */
export enum Orders_Update_Column {
  /** column name */
  Cost = 'cost',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  OrderNo = 'order_no',
  /** column name */
  Price = 'price',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ShipToId = 'ship_to_id',
  /** column name */
  Status = 'status',
  /** column name */
  TotalPrice = 'total_price',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Orders_Var_Pop_Fields = {
  __typename?: 'orders_var_pop_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "orders" */
export type Orders_Var_Pop_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Orders_Var_Samp_Fields = {
  __typename?: 'orders_var_samp_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "orders" */
export type Orders_Var_Samp_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Orders_Variance_Fields = {
  __typename?: 'orders_variance_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  total_price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "orders" */
export type Orders_Variance_Order_By = {
  cost?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  total_price?: InputMaybe<Order_By>;
};

/** columns and relationships of "products" */
export type Products = {
  __typename?: 'products';
  /** An array relationship */
  carts: Array<Cart>;
  /** An aggregate relationship */
  carts_aggregate: Cart_Aggregate;
  cost: Scalars['numeric'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  /** An array relationship */
  inventory: Array<Inventory>;
  /** An aggregate relationship */
  inventory_aggregate: Inventory_Aggregate;
  is_active: Scalars['Boolean'];
  name: Scalars['String'];
  /** An array relationship */
  orders: Array<Orders>;
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate;
  price: Scalars['numeric'];
};


/** columns and relationships of "products" */
export type ProductsCartsArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsCarts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsInventoryArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsInventory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};

/** aggregated selection of "products" */
export type Products_Aggregate = {
  __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

/** aggregate fields of "products" */
export type Products_Aggregate_Fields = {
  __typename?: 'products_aggregate_fields';
  avg?: Maybe<Products_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
  stddev?: Maybe<Products_Stddev_Fields>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Fields>;
  sum?: Maybe<Products_Sum_Fields>;
  var_pop?: Maybe<Products_Var_Pop_Fields>;
  var_samp?: Maybe<Products_Var_Samp_Fields>;
  variance?: Maybe<Products_Variance_Fields>;
};


/** aggregate fields of "products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Products_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Products_Avg_Fields = {
  __typename?: 'products_avg_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Bool_Exp>>;
  _not?: InputMaybe<Products_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Bool_Exp>>;
  carts?: InputMaybe<Cart_Bool_Exp>;
  cost?: InputMaybe<Numeric_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inventory?: InputMaybe<Inventory_Bool_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  orders?: InputMaybe<Orders_Bool_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  ProductsPkey = 'products_pkey'
}

/** input type for incrementing numeric columns in table "products" */
export type Products_Inc_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  carts?: InputMaybe<Cart_Arr_Rel_Insert_Input>;
  cost?: InputMaybe<Scalars['numeric']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  inventory?: InputMaybe<Inventory_Arr_Rel_Insert_Input>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<Orders_Arr_Rel_Insert_Input>;
  price?: InputMaybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'products_max_fields';
  cost?: Maybe<Scalars['numeric']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'products_min_fields';
  cost?: Maybe<Scalars['numeric']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** on_conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  carts_aggregate?: InputMaybe<Cart_Aggregate_Order_By>;
  cost?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inventory_aggregate?: InputMaybe<Inventory_Aggregate_Order_By>;
  is_active?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  orders_aggregate?: InputMaybe<Orders_Aggregate_Order_By>;
  price?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  Cost = 'cost',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Products_Stddev_Fields = {
  __typename?: 'products_stddev_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Products_Stddev_Pop_Fields = {
  __typename?: 'products_stddev_pop_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Products_Stddev_Samp_Fields = {
  __typename?: 'products_stddev_samp_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Products_Sum_Fields = {
  __typename?: 'products_sum_fields';
  cost?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  Cost = 'cost',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price'
}

/** aggregate var_pop on columns */
export type Products_Var_Pop_Fields = {
  __typename?: 'products_var_pop_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Products_Var_Samp_Fields = {
  __typename?: 'products_var_samp_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Products_Variance_Fields = {
  __typename?: 'products_variance_fields';
  cost?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "cart" */
  cart: Array<Cart>;
  /** fetch aggregated fields from the table: "cart" */
  cart_aggregate: Cart_Aggregate;
  /** fetch data from the table: "cart" using primary key columns */
  cart_by_pk?: Maybe<Cart>;
  /** fetch data from the table: "customers" */
  customers: Array<Customers>;
  /** fetch aggregated fields from the table: "customers" */
  customers_aggregate: Customers_Aggregate;
  /** fetch data from the table: "customers" using primary key columns */
  customers_by_pk?: Maybe<Customers>;
  /** fetch data from the table: "employees" */
  employees: Array<Employees>;
  /** fetch aggregated fields from the table: "employees" */
  employees_aggregate: Employees_Aggregate;
  /** fetch data from the table: "employees" using primary key columns */
  employees_by_pk?: Maybe<Employees>;
  /** An array relationship */
  inventory: Array<Inventory>;
  /** An aggregate relationship */
  inventory_aggregate: Inventory_Aggregate;
  /** fetch data from the table: "inventory" using primary key columns */
  inventory_by_pk?: Maybe<Inventory>;
  /** An array relationship */
  orders: Array<Orders>;
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "ship_to" */
  ship_to: Array<Ship_To>;
  /** fetch aggregated fields from the table: "ship_to" */
  ship_to_aggregate: Ship_To_Aggregate;
  /** fetch data from the table: "ship_to" using primary key columns */
  ship_to_by_pk?: Maybe<Ship_To>;
  /** fetch data from the table: "stores" */
  stores: Array<Stores>;
  /** fetch aggregated fields from the table: "stores" */
  stores_aggregate: Stores_Aggregate;
  /** fetch data from the table: "stores" using primary key columns */
  stores_by_pk?: Maybe<Stores>;
};


export type Query_RootCartArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Query_RootCart_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Query_RootCart_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCustomersArgs = {
  distinct_on?: InputMaybe<Array<Customers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customers_Order_By>>;
  where?: InputMaybe<Customers_Bool_Exp>;
};


export type Query_RootCustomers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customers_Order_By>>;
  where?: InputMaybe<Customers_Bool_Exp>;
};


export type Query_RootCustomers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEmployeesArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Query_RootEmployees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Query_RootEmployees_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootInventoryArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


export type Query_RootInventory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


export type Query_RootInventory_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Query_RootOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Query_RootOrders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootShip_ToArgs = {
  distinct_on?: InputMaybe<Array<Ship_To_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ship_To_Order_By>>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};


export type Query_RootShip_To_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ship_To_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ship_To_Order_By>>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};


export type Query_RootShip_To_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootStoresArgs = {
  distinct_on?: InputMaybe<Array<Stores_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Stores_Order_By>>;
  where?: InputMaybe<Stores_Bool_Exp>;
};


export type Query_RootStores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stores_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Stores_Order_By>>;
  where?: InputMaybe<Stores_Bool_Exp>;
};


export type Query_RootStores_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "ship_to" */
export type Ship_To = {
  __typename?: 'ship_to';
  address_1: Scalars['String'];
  address_2?: Maybe<Scalars['String']>;
  address_city: Scalars['String'];
  address_country: Scalars['String'];
  address_state: Scalars['String'];
  address_zip: Scalars['String'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  customer: Customers;
  customer_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An array relationship */
  orders: Array<Orders>;
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate;
};


/** columns and relationships of "ship_to" */
export type Ship_ToOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


/** columns and relationships of "ship_to" */
export type Ship_ToOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};

/** aggregated selection of "ship_to" */
export type Ship_To_Aggregate = {
  __typename?: 'ship_to_aggregate';
  aggregate?: Maybe<Ship_To_Aggregate_Fields>;
  nodes: Array<Ship_To>;
};

/** aggregate fields of "ship_to" */
export type Ship_To_Aggregate_Fields = {
  __typename?: 'ship_to_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Ship_To_Max_Fields>;
  min?: Maybe<Ship_To_Min_Fields>;
};


/** aggregate fields of "ship_to" */
export type Ship_To_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ship_To_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ship_to" */
export type Ship_To_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ship_To_Max_Order_By>;
  min?: InputMaybe<Ship_To_Min_Order_By>;
};

/** input type for inserting array relation for remote table "ship_to" */
export type Ship_To_Arr_Rel_Insert_Input = {
  data: Array<Ship_To_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ship_To_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ship_to". All fields are combined with a logical 'AND'. */
export type Ship_To_Bool_Exp = {
  _and?: InputMaybe<Array<Ship_To_Bool_Exp>>;
  _not?: InputMaybe<Ship_To_Bool_Exp>;
  _or?: InputMaybe<Array<Ship_To_Bool_Exp>>;
  address_1?: InputMaybe<String_Comparison_Exp>;
  address_2?: InputMaybe<String_Comparison_Exp>;
  address_city?: InputMaybe<String_Comparison_Exp>;
  address_country?: InputMaybe<String_Comparison_Exp>;
  address_state?: InputMaybe<String_Comparison_Exp>;
  address_zip?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  customer?: InputMaybe<Customers_Bool_Exp>;
  customer_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  orders?: InputMaybe<Orders_Bool_Exp>;
};

/** unique or primary key constraints on table "ship_to" */
export enum Ship_To_Constraint {
  /** unique or primary key constraint */
  OrdersPkey = 'orders_pkey'
}

/** input type for inserting data into table "ship_to" */
export type Ship_To_Insert_Input = {
  address_1?: InputMaybe<Scalars['String']>;
  address_2?: InputMaybe<Scalars['String']>;
  address_city?: InputMaybe<Scalars['String']>;
  address_country?: InputMaybe<Scalars['String']>;
  address_state?: InputMaybe<Scalars['String']>;
  address_zip?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer?: InputMaybe<Customers_Obj_Rel_Insert_Input>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  orders?: InputMaybe<Orders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Ship_To_Max_Fields = {
  __typename?: 'ship_to_max_fields';
  address_1?: Maybe<Scalars['String']>;
  address_2?: Maybe<Scalars['String']>;
  address_city?: Maybe<Scalars['String']>;
  address_country?: Maybe<Scalars['String']>;
  address_state?: Maybe<Scalars['String']>;
  address_zip?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "ship_to" */
export type Ship_To_Max_Order_By = {
  address_1?: InputMaybe<Order_By>;
  address_2?: InputMaybe<Order_By>;
  address_city?: InputMaybe<Order_By>;
  address_country?: InputMaybe<Order_By>;
  address_state?: InputMaybe<Order_By>;
  address_zip?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ship_To_Min_Fields = {
  __typename?: 'ship_to_min_fields';
  address_1?: Maybe<Scalars['String']>;
  address_2?: Maybe<Scalars['String']>;
  address_city?: Maybe<Scalars['String']>;
  address_country?: Maybe<Scalars['String']>;
  address_state?: Maybe<Scalars['String']>;
  address_zip?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "ship_to" */
export type Ship_To_Min_Order_By = {
  address_1?: InputMaybe<Order_By>;
  address_2?: InputMaybe<Order_By>;
  address_city?: InputMaybe<Order_By>;
  address_country?: InputMaybe<Order_By>;
  address_state?: InputMaybe<Order_By>;
  address_zip?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ship_to" */
export type Ship_To_Mutation_Response = {
  __typename?: 'ship_to_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Ship_To>;
};

/** on_conflict condition type for table "ship_to" */
export type Ship_To_On_Conflict = {
  constraint: Ship_To_Constraint;
  update_columns?: Array<Ship_To_Update_Column>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};

/** Ordering options when selecting data from "ship_to". */
export type Ship_To_Order_By = {
  address_1?: InputMaybe<Order_By>;
  address_2?: InputMaybe<Order_By>;
  address_city?: InputMaybe<Order_By>;
  address_country?: InputMaybe<Order_By>;
  address_state?: InputMaybe<Order_By>;
  address_zip?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer?: InputMaybe<Customers_Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orders_aggregate?: InputMaybe<Orders_Aggregate_Order_By>;
};

/** primary key columns input for table: ship_to */
export type Ship_To_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ship_to" */
export enum Ship_To_Select_Column {
  /** column name */
  Address_1 = 'address_1',
  /** column name */
  Address_2 = 'address_2',
  /** column name */
  AddressCity = 'address_city',
  /** column name */
  AddressCountry = 'address_country',
  /** column name */
  AddressState = 'address_state',
  /** column name */
  AddressZip = 'address_zip',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "ship_to" */
export type Ship_To_Set_Input = {
  address_1?: InputMaybe<Scalars['String']>;
  address_2?: InputMaybe<Scalars['String']>;
  address_city?: InputMaybe<Scalars['String']>;
  address_country?: InputMaybe<Scalars['String']>;
  address_state?: InputMaybe<Scalars['String']>;
  address_zip?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "ship_to" */
export enum Ship_To_Update_Column {
  /** column name */
  Address_1 = 'address_1',
  /** column name */
  Address_2 = 'address_2',
  /** column name */
  AddressCity = 'address_city',
  /** column name */
  AddressCountry = 'address_country',
  /** column name */
  AddressState = 'address_state',
  /** column name */
  AddressZip = 'address_zip',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id'
}

/** columns and relationships of "stores" */
export type Stores = {
  __typename?: 'stores';
  address: Scalars['String'];
  /** An array relationship */
  carts: Array<Cart>;
  /** An aggregate relationship */
  carts_aggregate: Cart_Aggregate;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An array relationship */
  inventory: Array<Inventory>;
  /** An aggregate relationship */
  inventory_aggregate: Inventory_Aggregate;
  name: Scalars['String'];
};


/** columns and relationships of "stores" */
export type StoresCartsArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "stores" */
export type StoresCarts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "stores" */
export type StoresInventoryArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


/** columns and relationships of "stores" */
export type StoresInventory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};

/** aggregated selection of "stores" */
export type Stores_Aggregate = {
  __typename?: 'stores_aggregate';
  aggregate?: Maybe<Stores_Aggregate_Fields>;
  nodes: Array<Stores>;
};

/** aggregate fields of "stores" */
export type Stores_Aggregate_Fields = {
  __typename?: 'stores_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Stores_Max_Fields>;
  min?: Maybe<Stores_Min_Fields>;
};


/** aggregate fields of "stores" */
export type Stores_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stores_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "stores". All fields are combined with a logical 'AND'. */
export type Stores_Bool_Exp = {
  _and?: InputMaybe<Array<Stores_Bool_Exp>>;
  _not?: InputMaybe<Stores_Bool_Exp>;
  _or?: InputMaybe<Array<Stores_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  carts?: InputMaybe<Cart_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inventory?: InputMaybe<Inventory_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "stores" */
export enum Stores_Constraint {
  /** unique or primary key constraint */
  StoresPkey = 'stores_pkey'
}

/** input type for inserting data into table "stores" */
export type Stores_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  carts?: InputMaybe<Cart_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  inventory?: InputMaybe<Inventory_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Stores_Max_Fields = {
  __typename?: 'stores_max_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Stores_Min_Fields = {
  __typename?: 'stores_min_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "stores" */
export type Stores_Mutation_Response = {
  __typename?: 'stores_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Stores>;
};

/** input type for inserting object relation for remote table "stores" */
export type Stores_Obj_Rel_Insert_Input = {
  data: Stores_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Stores_On_Conflict>;
};

/** on_conflict condition type for table "stores" */
export type Stores_On_Conflict = {
  constraint: Stores_Constraint;
  update_columns?: Array<Stores_Update_Column>;
  where?: InputMaybe<Stores_Bool_Exp>;
};

/** Ordering options when selecting data from "stores". */
export type Stores_Order_By = {
  address?: InputMaybe<Order_By>;
  carts_aggregate?: InputMaybe<Cart_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inventory_aggregate?: InputMaybe<Inventory_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: stores */
export type Stores_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "stores" */
export enum Stores_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "stores" */
export type Stores_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "stores" */
export enum Stores_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "cart" */
  cart: Array<Cart>;
  /** fetch aggregated fields from the table: "cart" */
  cart_aggregate: Cart_Aggregate;
  /** fetch data from the table: "cart" using primary key columns */
  cart_by_pk?: Maybe<Cart>;
  /** fetch data from the table: "customers" */
  customers: Array<Customers>;
  /** fetch aggregated fields from the table: "customers" */
  customers_aggregate: Customers_Aggregate;
  /** fetch data from the table: "customers" using primary key columns */
  customers_by_pk?: Maybe<Customers>;
  /** fetch data from the table: "employees" */
  employees: Array<Employees>;
  /** fetch aggregated fields from the table: "employees" */
  employees_aggregate: Employees_Aggregate;
  /** fetch data from the table: "employees" using primary key columns */
  employees_by_pk?: Maybe<Employees>;
  /** An array relationship */
  inventory: Array<Inventory>;
  /** An aggregate relationship */
  inventory_aggregate: Inventory_Aggregate;
  /** fetch data from the table: "inventory" using primary key columns */
  inventory_by_pk?: Maybe<Inventory>;
  /** An array relationship */
  orders: Array<Orders>;
  /** An aggregate relationship */
  orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "ship_to" */
  ship_to: Array<Ship_To>;
  /** fetch aggregated fields from the table: "ship_to" */
  ship_to_aggregate: Ship_To_Aggregate;
  /** fetch data from the table: "ship_to" using primary key columns */
  ship_to_by_pk?: Maybe<Ship_To>;
  /** fetch data from the table: "stores" */
  stores: Array<Stores>;
  /** fetch aggregated fields from the table: "stores" */
  stores_aggregate: Stores_Aggregate;
  /** fetch data from the table: "stores" using primary key columns */
  stores_by_pk?: Maybe<Stores>;
};


export type Subscription_RootCartArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Subscription_RootCart_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Subscription_RootCart_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCustomersArgs = {
  distinct_on?: InputMaybe<Array<Customers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customers_Order_By>>;
  where?: InputMaybe<Customers_Bool_Exp>;
};


export type Subscription_RootCustomers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customers_Order_By>>;
  where?: InputMaybe<Customers_Bool_Exp>;
};


export type Subscription_RootCustomers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEmployeesArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Subscription_RootEmployees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Subscription_RootEmployees_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootInventoryArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


export type Subscription_RootInventory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Order_By>>;
  where?: InputMaybe<Inventory_Bool_Exp>;
};


export type Subscription_RootInventory_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Subscription_RootOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Subscription_RootOrders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootShip_ToArgs = {
  distinct_on?: InputMaybe<Array<Ship_To_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ship_To_Order_By>>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};


export type Subscription_RootShip_To_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ship_To_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ship_To_Order_By>>;
  where?: InputMaybe<Ship_To_Bool_Exp>;
};


export type Subscription_RootShip_To_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootStoresArgs = {
  distinct_on?: InputMaybe<Array<Stores_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Stores_Order_By>>;
  where?: InputMaybe<Stores_Bool_Exp>;
};


export type Subscription_RootStores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stores_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Stores_Order_By>>;
  where?: InputMaybe<Stores_Bool_Exp>;
};


export type Subscription_RootStores_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type MySubscriptionSubscriptionVariables = Exact<{
  where?: InputMaybe<Customers_Bool_Exp>;
}>;


export type MySubscriptionSubscription = { __typename?: 'subscription_root', customers: Array<{ __typename?: 'customers', id: any, first_name: string, middle_name?: string | null, last_name?: string | null, email: string, phone?: string | null, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, created_at: any, updated_at: any }> };

export type GetCustomerByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetCustomerByIdQuery = { __typename?: 'query_root', customers_by_pk?: { __typename?: 'customers', id: any, first_name: string, middle_name?: string | null, last_name?: string | null, email: string, phone?: string | null, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, created_at: any, updated_at: any } | null };

export type GetCustomerWhereQueryVariables = Exact<{
  where: Customers_Bool_Exp;
}>;


export type GetCustomerWhereQuery = { __typename?: 'query_root', customers: Array<{ __typename?: 'customers', id: any, first_name: string, middle_name?: string | null, last_name?: string | null, email: string, phone?: string | null, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, created_at: any, updated_at: any }> };

export type GetCustomersPaginationQueryVariables = Exact<{
  order_by?: InputMaybe<Array<Customers_Order_By> | Customers_Order_By>;
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetCustomersPaginationQuery = { __typename?: 'query_root', customers_aggregate: { __typename?: 'customers_aggregate', aggregate?: { __typename?: 'customers_aggregate_fields', totalCount: number } | null }, customers: Array<{ __typename?: 'customers', id: any, first_name: string, middle_name?: string | null, last_name?: string | null, email: string, phone?: string | null, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, created_at: any, updated_at: any }> };

export type AddCustomerMutationVariables = Exact<{
  object: Customers_Insert_Input;
}>;


export type AddCustomerMutation = { __typename?: 'mutation_root', insert_customers_one?: { __typename?: 'customers', id: any, first_name: string, middle_name?: string | null, last_name?: string | null, email: string, phone?: string | null, street?: string | null, city?: string | null, state?: string | null, zip?: string | null, created_at: any } | null };

export type UpdateCustomerByIdMutationVariables = Exact<{
  pk: Customers_Pk_Columns_Input;
  update: Customers_Set_Input;
}>;


export type UpdateCustomerByIdMutation = { __typename?: 'mutation_root', update_customers_by_pk?: { __typename?: 'customers', id: any, updated_at: any } | null };

export type UpdateCustomerWhereMutationVariables = Exact<{
  where: Customers_Bool_Exp;
  set?: InputMaybe<Customers_Set_Input>;
}>;


export type UpdateCustomerWhereMutation = { __typename?: 'mutation_root', update_customers?: { __typename?: 'customers_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'customers', id: any, updated_at: any }> } | null };

export type DeleteCustomerByIdMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteCustomerByIdMutation = { __typename?: 'mutation_root', delete_customers_by_pk?: { __typename?: 'customers', id: any } | null };

export type DeleteCustomerWhereMutationVariables = Exact<{
  where: Customers_Bool_Exp;
}>;


export type DeleteCustomerWhereMutation = { __typename?: 'mutation_root', delete_customers?: { __typename?: 'customers_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'customers', id: any }> } | null };


export const MySubscriptionDocument = `
    subscription MySubscription($where: customers_bool_exp) {
  customers(where: $where) {
    id
    first_name
    middle_name
    last_name
    email
    phone
    street
    city
    state
    zip
    created_at
    updated_at
  }
}
    `;
export const GetCustomerByIdDocument = `
    query GetCustomerByID($id: uuid!) {
  customers_by_pk(id: $id) {
    id
    first_name
    middle_name
    last_name
    email
    phone
    street
    city
    state
    zip
    created_at
    updated_at
  }
}
    `;
export const useGetCustomerByIdQuery = <
      TData = GetCustomerByIdQuery,
      TError = unknown
    >(
      variables: GetCustomerByIdQueryVariables,
      options?: UseQueryOptions<GetCustomerByIdQuery, TError, TData>
    ) =>
    useQuery<GetCustomerByIdQuery, TError, TData>(
      ['GetCustomerByID', variables],
      AxiosFetcher<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument).bind(null, variables),
      options
    );
export const GetCustomerWhereDocument = `
    query GetCustomerWhere($where: customers_bool_exp!) {
  customers(where: $where) {
    id
    first_name
    middle_name
    last_name
    email
    phone
    street
    city
    state
    zip
    created_at
    updated_at
  }
}
    `;
export const useGetCustomerWhereQuery = <
      TData = GetCustomerWhereQuery,
      TError = unknown
    >(
      variables: GetCustomerWhereQueryVariables,
      options?: UseQueryOptions<GetCustomerWhereQuery, TError, TData>
    ) =>
    useQuery<GetCustomerWhereQuery, TError, TData>(
      ['GetCustomerWhere', variables],
      AxiosFetcher<GetCustomerWhereQuery, GetCustomerWhereQueryVariables>(GetCustomerWhereDocument).bind(null, variables),
      options
    );
export const GetCustomersPaginationDocument = `
    query GetCustomersPagination($order_by: [customers_order_by!], $offset: Int!, $limit: Int!) {
  customers_aggregate {
    aggregate {
      totalCount: count
    }
  }
  customers(order_by: $order_by, offset: $offset, limit: $limit) {
    id
    first_name
    middle_name
    last_name
    email
    phone
    street
    city
    state
    zip
    created_at
    updated_at
  }
}
    `;
export const useGetCustomersPaginationQuery = <
      TData = GetCustomersPaginationQuery,
      TError = unknown
    >(
      variables: GetCustomersPaginationQueryVariables,
      options?: UseQueryOptions<GetCustomersPaginationQuery, TError, TData>
    ) =>
    useQuery<GetCustomersPaginationQuery, TError, TData>(
      ['GetCustomersPagination', variables],
      AxiosFetcher<GetCustomersPaginationQuery, GetCustomersPaginationQueryVariables>(GetCustomersPaginationDocument).bind(null, variables),
      options
    );
export const AddCustomerDocument = `
    mutation AddCustomer($object: customers_insert_input!) {
  insert_customers_one(object: $object) {
    id
    first_name
    middle_name
    last_name
    email
    phone
    street
    city
    state
    zip
    created_at
  }
}
    `;
export const useAddCustomerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddCustomerMutation, TError, AddCustomerMutationVariables, TContext>) =>
    useMutation<AddCustomerMutation, TError, AddCustomerMutationVariables, TContext>(
      ['AddCustomer'],
      AxiosFetcher<AddCustomerMutation, AddCustomerMutationVariables>(AddCustomerDocument),
      options
    );
export const UpdateCustomerByIdDocument = `
    mutation UpdateCustomerById($pk: customers_pk_columns_input!, $update: customers_set_input!) {
  update_customers_by_pk(pk_columns: $pk, _set: $update) {
    id
    updated_at
  }
}
    `;
export const useUpdateCustomerByIdMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCustomerByIdMutation, TError, UpdateCustomerByIdMutationVariables, TContext>) =>
    useMutation<UpdateCustomerByIdMutation, TError, UpdateCustomerByIdMutationVariables, TContext>(
      ['UpdateCustomerById'],
      AxiosFetcher<UpdateCustomerByIdMutation, UpdateCustomerByIdMutationVariables>(UpdateCustomerByIdDocument),
      options
    );
export const UpdateCustomerWhereDocument = `
    mutation UpdateCustomerWhere($where: customers_bool_exp!, $set: customers_set_input) {
  update_customers(where: $where, _set: $set) {
    affected_rows
    returning {
      id
      updated_at
    }
  }
}
    `;
export const useUpdateCustomerWhereMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCustomerWhereMutation, TError, UpdateCustomerWhereMutationVariables, TContext>) =>
    useMutation<UpdateCustomerWhereMutation, TError, UpdateCustomerWhereMutationVariables, TContext>(
      ['UpdateCustomerWhere'],
      AxiosFetcher<UpdateCustomerWhereMutation, UpdateCustomerWhereMutationVariables>(UpdateCustomerWhereDocument),
      options
    );
export const DeleteCustomerByIdDocument = `
    mutation DeleteCustomerById($id: uuid!) {
  delete_customers_by_pk(id: $id) {
    id
  }
}
    `;
export const useDeleteCustomerByIdMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCustomerByIdMutation, TError, DeleteCustomerByIdMutationVariables, TContext>) =>
    useMutation<DeleteCustomerByIdMutation, TError, DeleteCustomerByIdMutationVariables, TContext>(
      ['DeleteCustomerById'],
      AxiosFetcher<DeleteCustomerByIdMutation, DeleteCustomerByIdMutationVariables>(DeleteCustomerByIdDocument),
      options
    );
export const DeleteCustomerWhereDocument = `
    mutation DeleteCustomerWhere($where: customers_bool_exp!) {
  delete_customers(where: $where) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export const useDeleteCustomerWhereMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCustomerWhereMutation, TError, DeleteCustomerWhereMutationVariables, TContext>) =>
    useMutation<DeleteCustomerWhereMutation, TError, DeleteCustomerWhereMutationVariables, TContext>(
      ['DeleteCustomerWhere'],
      AxiosFetcher<DeleteCustomerWhereMutation, DeleteCustomerWhereMutationVariables>(DeleteCustomerWhereDocument),
      options
    );


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int_comparison_exp: Int_Comparison_Exp;
  String: ResolverTypeWrapper<Scalars['String']>;
  String_comparison_exp: String_Comparison_Exp;
  cart: ResolverTypeWrapper<Cart>;
  cart_aggregate: ResolverTypeWrapper<Cart_Aggregate>;
  cart_aggregate_fields: ResolverTypeWrapper<Cart_Aggregate_Fields>;
  cart_aggregate_order_by: Cart_Aggregate_Order_By;
  cart_arr_rel_insert_input: Cart_Arr_Rel_Insert_Input;
  cart_bool_exp: Cart_Bool_Exp;
  cart_constraint: Cart_Constraint;
  cart_insert_input: Cart_Insert_Input;
  cart_max_fields: ResolverTypeWrapper<Cart_Max_Fields>;
  cart_max_order_by: Cart_Max_Order_By;
  cart_min_fields: ResolverTypeWrapper<Cart_Min_Fields>;
  cart_min_order_by: Cart_Min_Order_By;
  cart_mutation_response: ResolverTypeWrapper<Cart_Mutation_Response>;
  cart_on_conflict: Cart_On_Conflict;
  cart_order_by: Cart_Order_By;
  cart_pk_columns_input: Cart_Pk_Columns_Input;
  cart_select_column: Cart_Select_Column;
  cart_set_input: Cart_Set_Input;
  cart_update_column: Cart_Update_Column;
  customers: ResolverTypeWrapper<Customers>;
  customers_aggregate: ResolverTypeWrapper<Customers_Aggregate>;
  customers_aggregate_fields: ResolverTypeWrapper<Customers_Aggregate_Fields>;
  customers_bool_exp: Customers_Bool_Exp;
  customers_constraint: Customers_Constraint;
  customers_insert_input: Customers_Insert_Input;
  customers_max_fields: ResolverTypeWrapper<Customers_Max_Fields>;
  customers_min_fields: ResolverTypeWrapper<Customers_Min_Fields>;
  customers_mutation_response: ResolverTypeWrapper<Customers_Mutation_Response>;
  customers_obj_rel_insert_input: Customers_Obj_Rel_Insert_Input;
  customers_on_conflict: Customers_On_Conflict;
  customers_order_by: Customers_Order_By;
  customers_pk_columns_input: Customers_Pk_Columns_Input;
  customers_select_column: Customers_Select_Column;
  customers_set_input: Customers_Set_Input;
  customers_update_column: Customers_Update_Column;
  employees: ResolverTypeWrapper<Employees>;
  employees_aggregate: ResolverTypeWrapper<Employees_Aggregate>;
  employees_aggregate_fields: ResolverTypeWrapper<Employees_Aggregate_Fields>;
  employees_bool_exp: Employees_Bool_Exp;
  employees_constraint: Employees_Constraint;
  employees_insert_input: Employees_Insert_Input;
  employees_max_fields: ResolverTypeWrapper<Employees_Max_Fields>;
  employees_min_fields: ResolverTypeWrapper<Employees_Min_Fields>;
  employees_mutation_response: ResolverTypeWrapper<Employees_Mutation_Response>;
  employees_on_conflict: Employees_On_Conflict;
  employees_order_by: Employees_Order_By;
  employees_pk_columns_input: Employees_Pk_Columns_Input;
  employees_select_column: Employees_Select_Column;
  employees_set_input: Employees_Set_Input;
  employees_update_column: Employees_Update_Column;
  inventory: ResolverTypeWrapper<Inventory>;
  inventory_aggregate: ResolverTypeWrapper<Inventory_Aggregate>;
  inventory_aggregate_fields: ResolverTypeWrapper<Inventory_Aggregate_Fields>;
  inventory_aggregate_order_by: Inventory_Aggregate_Order_By;
  inventory_arr_rel_insert_input: Inventory_Arr_Rel_Insert_Input;
  inventory_avg_fields: ResolverTypeWrapper<Inventory_Avg_Fields>;
  inventory_avg_order_by: Inventory_Avg_Order_By;
  inventory_bool_exp: Inventory_Bool_Exp;
  inventory_constraint: Inventory_Constraint;
  inventory_inc_input: Inventory_Inc_Input;
  inventory_insert_input: Inventory_Insert_Input;
  inventory_max_fields: ResolverTypeWrapper<Inventory_Max_Fields>;
  inventory_max_order_by: Inventory_Max_Order_By;
  inventory_min_fields: ResolverTypeWrapper<Inventory_Min_Fields>;
  inventory_min_order_by: Inventory_Min_Order_By;
  inventory_mutation_response: ResolverTypeWrapper<Inventory_Mutation_Response>;
  inventory_on_conflict: Inventory_On_Conflict;
  inventory_order_by: Inventory_Order_By;
  inventory_pk_columns_input: Inventory_Pk_Columns_Input;
  inventory_select_column: Inventory_Select_Column;
  inventory_set_input: Inventory_Set_Input;
  inventory_stddev_fields: ResolverTypeWrapper<Inventory_Stddev_Fields>;
  inventory_stddev_order_by: Inventory_Stddev_Order_By;
  inventory_stddev_pop_fields: ResolverTypeWrapper<Inventory_Stddev_Pop_Fields>;
  inventory_stddev_pop_order_by: Inventory_Stddev_Pop_Order_By;
  inventory_stddev_samp_fields: ResolverTypeWrapper<Inventory_Stddev_Samp_Fields>;
  inventory_stddev_samp_order_by: Inventory_Stddev_Samp_Order_By;
  inventory_sum_fields: ResolverTypeWrapper<Inventory_Sum_Fields>;
  inventory_sum_order_by: Inventory_Sum_Order_By;
  inventory_update_column: Inventory_Update_Column;
  inventory_var_pop_fields: ResolverTypeWrapper<Inventory_Var_Pop_Fields>;
  inventory_var_pop_order_by: Inventory_Var_Pop_Order_By;
  inventory_var_samp_fields: ResolverTypeWrapper<Inventory_Var_Samp_Fields>;
  inventory_var_samp_order_by: Inventory_Var_Samp_Order_By;
  inventory_variance_fields: ResolverTypeWrapper<Inventory_Variance_Fields>;
  inventory_variance_order_by: Inventory_Variance_Order_By;
  mutation_root: ResolverTypeWrapper<{}>;
  numeric: ResolverTypeWrapper<Scalars['numeric']>;
  numeric_comparison_exp: Numeric_Comparison_Exp;
  order_by: Order_By;
  orders: ResolverTypeWrapper<Orders>;
  orders_aggregate: ResolverTypeWrapper<Orders_Aggregate>;
  orders_aggregate_fields: ResolverTypeWrapper<Orders_Aggregate_Fields>;
  orders_aggregate_order_by: Orders_Aggregate_Order_By;
  orders_arr_rel_insert_input: Orders_Arr_Rel_Insert_Input;
  orders_avg_fields: ResolverTypeWrapper<Orders_Avg_Fields>;
  orders_avg_order_by: Orders_Avg_Order_By;
  orders_bool_exp: Orders_Bool_Exp;
  orders_constraint: Orders_Constraint;
  orders_inc_input: Orders_Inc_Input;
  orders_insert_input: Orders_Insert_Input;
  orders_max_fields: ResolverTypeWrapper<Orders_Max_Fields>;
  orders_max_order_by: Orders_Max_Order_By;
  orders_min_fields: ResolverTypeWrapper<Orders_Min_Fields>;
  orders_min_order_by: Orders_Min_Order_By;
  orders_mutation_response: ResolverTypeWrapper<Orders_Mutation_Response>;
  orders_on_conflict: Orders_On_Conflict;
  orders_order_by: Orders_Order_By;
  orders_pk_columns_input: Orders_Pk_Columns_Input;
  orders_select_column: Orders_Select_Column;
  orders_set_input: Orders_Set_Input;
  orders_stddev_fields: ResolverTypeWrapper<Orders_Stddev_Fields>;
  orders_stddev_order_by: Orders_Stddev_Order_By;
  orders_stddev_pop_fields: ResolverTypeWrapper<Orders_Stddev_Pop_Fields>;
  orders_stddev_pop_order_by: Orders_Stddev_Pop_Order_By;
  orders_stddev_samp_fields: ResolverTypeWrapper<Orders_Stddev_Samp_Fields>;
  orders_stddev_samp_order_by: Orders_Stddev_Samp_Order_By;
  orders_sum_fields: ResolverTypeWrapper<Orders_Sum_Fields>;
  orders_sum_order_by: Orders_Sum_Order_By;
  orders_update_column: Orders_Update_Column;
  orders_var_pop_fields: ResolverTypeWrapper<Orders_Var_Pop_Fields>;
  orders_var_pop_order_by: Orders_Var_Pop_Order_By;
  orders_var_samp_fields: ResolverTypeWrapper<Orders_Var_Samp_Fields>;
  orders_var_samp_order_by: Orders_Var_Samp_Order_By;
  orders_variance_fields: ResolverTypeWrapper<Orders_Variance_Fields>;
  orders_variance_order_by: Orders_Variance_Order_By;
  products: ResolverTypeWrapper<Products>;
  products_aggregate: ResolverTypeWrapper<Products_Aggregate>;
  products_aggregate_fields: ResolverTypeWrapper<Products_Aggregate_Fields>;
  products_avg_fields: ResolverTypeWrapper<Products_Avg_Fields>;
  products_bool_exp: Products_Bool_Exp;
  products_constraint: Products_Constraint;
  products_inc_input: Products_Inc_Input;
  products_insert_input: Products_Insert_Input;
  products_max_fields: ResolverTypeWrapper<Products_Max_Fields>;
  products_min_fields: ResolverTypeWrapper<Products_Min_Fields>;
  products_mutation_response: ResolverTypeWrapper<Products_Mutation_Response>;
  products_obj_rel_insert_input: Products_Obj_Rel_Insert_Input;
  products_on_conflict: Products_On_Conflict;
  products_order_by: Products_Order_By;
  products_pk_columns_input: Products_Pk_Columns_Input;
  products_select_column: Products_Select_Column;
  products_set_input: Products_Set_Input;
  products_stddev_fields: ResolverTypeWrapper<Products_Stddev_Fields>;
  products_stddev_pop_fields: ResolverTypeWrapper<Products_Stddev_Pop_Fields>;
  products_stddev_samp_fields: ResolverTypeWrapper<Products_Stddev_Samp_Fields>;
  products_sum_fields: ResolverTypeWrapper<Products_Sum_Fields>;
  products_update_column: Products_Update_Column;
  products_var_pop_fields: ResolverTypeWrapper<Products_Var_Pop_Fields>;
  products_var_samp_fields: ResolverTypeWrapper<Products_Var_Samp_Fields>;
  products_variance_fields: ResolverTypeWrapper<Products_Variance_Fields>;
  query_root: ResolverTypeWrapper<{}>;
  ship_to: ResolverTypeWrapper<Ship_To>;
  ship_to_aggregate: ResolverTypeWrapper<Ship_To_Aggregate>;
  ship_to_aggregate_fields: ResolverTypeWrapper<Ship_To_Aggregate_Fields>;
  ship_to_aggregate_order_by: Ship_To_Aggregate_Order_By;
  ship_to_arr_rel_insert_input: Ship_To_Arr_Rel_Insert_Input;
  ship_to_bool_exp: Ship_To_Bool_Exp;
  ship_to_constraint: Ship_To_Constraint;
  ship_to_insert_input: Ship_To_Insert_Input;
  ship_to_max_fields: ResolverTypeWrapper<Ship_To_Max_Fields>;
  ship_to_max_order_by: Ship_To_Max_Order_By;
  ship_to_min_fields: ResolverTypeWrapper<Ship_To_Min_Fields>;
  ship_to_min_order_by: Ship_To_Min_Order_By;
  ship_to_mutation_response: ResolverTypeWrapper<Ship_To_Mutation_Response>;
  ship_to_on_conflict: Ship_To_On_Conflict;
  ship_to_order_by: Ship_To_Order_By;
  ship_to_pk_columns_input: Ship_To_Pk_Columns_Input;
  ship_to_select_column: Ship_To_Select_Column;
  ship_to_set_input: Ship_To_Set_Input;
  ship_to_update_column: Ship_To_Update_Column;
  stores: ResolverTypeWrapper<Stores>;
  stores_aggregate: ResolverTypeWrapper<Stores_Aggregate>;
  stores_aggregate_fields: ResolverTypeWrapper<Stores_Aggregate_Fields>;
  stores_bool_exp: Stores_Bool_Exp;
  stores_constraint: Stores_Constraint;
  stores_insert_input: Stores_Insert_Input;
  stores_max_fields: ResolverTypeWrapper<Stores_Max_Fields>;
  stores_min_fields: ResolverTypeWrapper<Stores_Min_Fields>;
  stores_mutation_response: ResolverTypeWrapper<Stores_Mutation_Response>;
  stores_obj_rel_insert_input: Stores_Obj_Rel_Insert_Input;
  stores_on_conflict: Stores_On_Conflict;
  stores_order_by: Stores_Order_By;
  stores_pk_columns_input: Stores_Pk_Columns_Input;
  stores_select_column: Stores_Select_Column;
  stores_set_input: Stores_Set_Input;
  stores_update_column: Stores_Update_Column;
  subscription_root: ResolverTypeWrapper<{}>;
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']>;
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  uuid: ResolverTypeWrapper<Scalars['uuid']>;
  uuid_comparison_exp: Uuid_Comparison_Exp;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Int_comparison_exp: Int_Comparison_Exp;
  String: Scalars['String'];
  String_comparison_exp: String_Comparison_Exp;
  cart: Cart;
  cart_aggregate: Cart_Aggregate;
  cart_aggregate_fields: Cart_Aggregate_Fields;
  cart_aggregate_order_by: Cart_Aggregate_Order_By;
  cart_arr_rel_insert_input: Cart_Arr_Rel_Insert_Input;
  cart_bool_exp: Cart_Bool_Exp;
  cart_insert_input: Cart_Insert_Input;
  cart_max_fields: Cart_Max_Fields;
  cart_max_order_by: Cart_Max_Order_By;
  cart_min_fields: Cart_Min_Fields;
  cart_min_order_by: Cart_Min_Order_By;
  cart_mutation_response: Cart_Mutation_Response;
  cart_on_conflict: Cart_On_Conflict;
  cart_order_by: Cart_Order_By;
  cart_pk_columns_input: Cart_Pk_Columns_Input;
  cart_set_input: Cart_Set_Input;
  customers: Customers;
  customers_aggregate: Customers_Aggregate;
  customers_aggregate_fields: Customers_Aggregate_Fields;
  customers_bool_exp: Customers_Bool_Exp;
  customers_insert_input: Customers_Insert_Input;
  customers_max_fields: Customers_Max_Fields;
  customers_min_fields: Customers_Min_Fields;
  customers_mutation_response: Customers_Mutation_Response;
  customers_obj_rel_insert_input: Customers_Obj_Rel_Insert_Input;
  customers_on_conflict: Customers_On_Conflict;
  customers_order_by: Customers_Order_By;
  customers_pk_columns_input: Customers_Pk_Columns_Input;
  customers_set_input: Customers_Set_Input;
  employees: Employees;
  employees_aggregate: Employees_Aggregate;
  employees_aggregate_fields: Employees_Aggregate_Fields;
  employees_bool_exp: Employees_Bool_Exp;
  employees_insert_input: Employees_Insert_Input;
  employees_max_fields: Employees_Max_Fields;
  employees_min_fields: Employees_Min_Fields;
  employees_mutation_response: Employees_Mutation_Response;
  employees_on_conflict: Employees_On_Conflict;
  employees_order_by: Employees_Order_By;
  employees_pk_columns_input: Employees_Pk_Columns_Input;
  employees_set_input: Employees_Set_Input;
  inventory: Inventory;
  inventory_aggregate: Inventory_Aggregate;
  inventory_aggregate_fields: Inventory_Aggregate_Fields;
  inventory_aggregate_order_by: Inventory_Aggregate_Order_By;
  inventory_arr_rel_insert_input: Inventory_Arr_Rel_Insert_Input;
  inventory_avg_fields: Inventory_Avg_Fields;
  inventory_avg_order_by: Inventory_Avg_Order_By;
  inventory_bool_exp: Inventory_Bool_Exp;
  inventory_inc_input: Inventory_Inc_Input;
  inventory_insert_input: Inventory_Insert_Input;
  inventory_max_fields: Inventory_Max_Fields;
  inventory_max_order_by: Inventory_Max_Order_By;
  inventory_min_fields: Inventory_Min_Fields;
  inventory_min_order_by: Inventory_Min_Order_By;
  inventory_mutation_response: Inventory_Mutation_Response;
  inventory_on_conflict: Inventory_On_Conflict;
  inventory_order_by: Inventory_Order_By;
  inventory_pk_columns_input: Inventory_Pk_Columns_Input;
  inventory_set_input: Inventory_Set_Input;
  inventory_stddev_fields: Inventory_Stddev_Fields;
  inventory_stddev_order_by: Inventory_Stddev_Order_By;
  inventory_stddev_pop_fields: Inventory_Stddev_Pop_Fields;
  inventory_stddev_pop_order_by: Inventory_Stddev_Pop_Order_By;
  inventory_stddev_samp_fields: Inventory_Stddev_Samp_Fields;
  inventory_stddev_samp_order_by: Inventory_Stddev_Samp_Order_By;
  inventory_sum_fields: Inventory_Sum_Fields;
  inventory_sum_order_by: Inventory_Sum_Order_By;
  inventory_var_pop_fields: Inventory_Var_Pop_Fields;
  inventory_var_pop_order_by: Inventory_Var_Pop_Order_By;
  inventory_var_samp_fields: Inventory_Var_Samp_Fields;
  inventory_var_samp_order_by: Inventory_Var_Samp_Order_By;
  inventory_variance_fields: Inventory_Variance_Fields;
  inventory_variance_order_by: Inventory_Variance_Order_By;
  mutation_root: {};
  numeric: Scalars['numeric'];
  numeric_comparison_exp: Numeric_Comparison_Exp;
  orders: Orders;
  orders_aggregate: Orders_Aggregate;
  orders_aggregate_fields: Orders_Aggregate_Fields;
  orders_aggregate_order_by: Orders_Aggregate_Order_By;
  orders_arr_rel_insert_input: Orders_Arr_Rel_Insert_Input;
  orders_avg_fields: Orders_Avg_Fields;
  orders_avg_order_by: Orders_Avg_Order_By;
  orders_bool_exp: Orders_Bool_Exp;
  orders_inc_input: Orders_Inc_Input;
  orders_insert_input: Orders_Insert_Input;
  orders_max_fields: Orders_Max_Fields;
  orders_max_order_by: Orders_Max_Order_By;
  orders_min_fields: Orders_Min_Fields;
  orders_min_order_by: Orders_Min_Order_By;
  orders_mutation_response: Orders_Mutation_Response;
  orders_on_conflict: Orders_On_Conflict;
  orders_order_by: Orders_Order_By;
  orders_pk_columns_input: Orders_Pk_Columns_Input;
  orders_set_input: Orders_Set_Input;
  orders_stddev_fields: Orders_Stddev_Fields;
  orders_stddev_order_by: Orders_Stddev_Order_By;
  orders_stddev_pop_fields: Orders_Stddev_Pop_Fields;
  orders_stddev_pop_order_by: Orders_Stddev_Pop_Order_By;
  orders_stddev_samp_fields: Orders_Stddev_Samp_Fields;
  orders_stddev_samp_order_by: Orders_Stddev_Samp_Order_By;
  orders_sum_fields: Orders_Sum_Fields;
  orders_sum_order_by: Orders_Sum_Order_By;
  orders_var_pop_fields: Orders_Var_Pop_Fields;
  orders_var_pop_order_by: Orders_Var_Pop_Order_By;
  orders_var_samp_fields: Orders_Var_Samp_Fields;
  orders_var_samp_order_by: Orders_Var_Samp_Order_By;
  orders_variance_fields: Orders_Variance_Fields;
  orders_variance_order_by: Orders_Variance_Order_By;
  products: Products;
  products_aggregate: Products_Aggregate;
  products_aggregate_fields: Products_Aggregate_Fields;
  products_avg_fields: Products_Avg_Fields;
  products_bool_exp: Products_Bool_Exp;
  products_inc_input: Products_Inc_Input;
  products_insert_input: Products_Insert_Input;
  products_max_fields: Products_Max_Fields;
  products_min_fields: Products_Min_Fields;
  products_mutation_response: Products_Mutation_Response;
  products_obj_rel_insert_input: Products_Obj_Rel_Insert_Input;
  products_on_conflict: Products_On_Conflict;
  products_order_by: Products_Order_By;
  products_pk_columns_input: Products_Pk_Columns_Input;
  products_set_input: Products_Set_Input;
  products_stddev_fields: Products_Stddev_Fields;
  products_stddev_pop_fields: Products_Stddev_Pop_Fields;
  products_stddev_samp_fields: Products_Stddev_Samp_Fields;
  products_sum_fields: Products_Sum_Fields;
  products_var_pop_fields: Products_Var_Pop_Fields;
  products_var_samp_fields: Products_Var_Samp_Fields;
  products_variance_fields: Products_Variance_Fields;
  query_root: {};
  ship_to: Ship_To;
  ship_to_aggregate: Ship_To_Aggregate;
  ship_to_aggregate_fields: Ship_To_Aggregate_Fields;
  ship_to_aggregate_order_by: Ship_To_Aggregate_Order_By;
  ship_to_arr_rel_insert_input: Ship_To_Arr_Rel_Insert_Input;
  ship_to_bool_exp: Ship_To_Bool_Exp;
  ship_to_insert_input: Ship_To_Insert_Input;
  ship_to_max_fields: Ship_To_Max_Fields;
  ship_to_max_order_by: Ship_To_Max_Order_By;
  ship_to_min_fields: Ship_To_Min_Fields;
  ship_to_min_order_by: Ship_To_Min_Order_By;
  ship_to_mutation_response: Ship_To_Mutation_Response;
  ship_to_on_conflict: Ship_To_On_Conflict;
  ship_to_order_by: Ship_To_Order_By;
  ship_to_pk_columns_input: Ship_To_Pk_Columns_Input;
  ship_to_set_input: Ship_To_Set_Input;
  stores: Stores;
  stores_aggregate: Stores_Aggregate;
  stores_aggregate_fields: Stores_Aggregate_Fields;
  stores_bool_exp: Stores_Bool_Exp;
  stores_insert_input: Stores_Insert_Input;
  stores_max_fields: Stores_Max_Fields;
  stores_min_fields: Stores_Min_Fields;
  stores_mutation_response: Stores_Mutation_Response;
  stores_obj_rel_insert_input: Stores_Obj_Rel_Insert_Input;
  stores_on_conflict: Stores_On_Conflict;
  stores_order_by: Stores_Order_By;
  stores_pk_columns_input: Stores_Pk_Columns_Input;
  stores_set_input: Stores_Set_Input;
  subscription_root: {};
  timestamptz: Scalars['timestamptz'];
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  uuid: Scalars['uuid'];
  uuid_comparison_exp: Uuid_Comparison_Exp;
};

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean'];
  ttl?: Scalars['Int'];
};

export type CachedDirectiveResolver<Result, Parent, ContextType = any, Args = CachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['cart'] = ResolversParentTypes['cart']> = {
  customer?: Resolver<ResolversTypes['customers'], ParentType, ContextType>;
  customer_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['products'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  store?: Resolver<ResolversTypes['stores'], ParentType, ContextType>;
  store_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Cart_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['cart_aggregate'] = ResolversParentTypes['cart_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['cart_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['cart']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Cart_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['cart_aggregate_fields'] = ResolversParentTypes['cart_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Cart_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['cart_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['cart_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Cart_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['cart_max_fields'] = ResolversParentTypes['cart_max_fields']> = {
  customer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  store_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Cart_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['cart_min_fields'] = ResolversParentTypes['cart_min_fields']> = {
  customer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  store_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Cart_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['cart_mutation_response'] = ResolversParentTypes['cart_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['cart']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomersResolvers<ContextType = any, ParentType extends ResolversParentTypes['customers'] = ResolversParentTypes['customers']> = {
  auth_uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  carts?: Resolver<Array<ResolversTypes['cart']>, ParentType, ContextType, Partial<CustomersCartsArgs>>;
  carts_aggregate?: Resolver<ResolversTypes['cart_aggregate'], ParentType, ContextType, Partial<CustomersCarts_AggregateArgs>>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middle_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['orders']>, ParentType, ContextType, Partial<CustomersOrdersArgs>>;
  orders_aggregate?: Resolver<ResolversTypes['orders_aggregate'], ParentType, ContextType, Partial<CustomersOrders_AggregateArgs>>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ship_tos?: Resolver<Array<ResolversTypes['ship_to']>, ParentType, ContextType, Partial<CustomersShip_TosArgs>>;
  ship_tos_aggregate?: Resolver<ResolversTypes['ship_to_aggregate'], ParentType, ContextType, Partial<CustomersShip_Tos_AggregateArgs>>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Customers_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['customers_aggregate'] = ResolversParentTypes['customers_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['customers_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['customers']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Customers_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['customers_aggregate_fields'] = ResolversParentTypes['customers_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Customers_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['customers_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['customers_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Customers_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['customers_max_fields'] = ResolversParentTypes['customers_max_fields']> = {
  auth_uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middle_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Customers_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['customers_min_fields'] = ResolversParentTypes['customers_min_fields']> = {
  auth_uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middle_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Customers_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['customers_mutation_response'] = ResolversParentTypes['customers_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['customers']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmployeesResolvers<ContextType = any, ParentType extends ResolversParentTypes['employees'] = ResolversParentTypes['employees']> = {
  auth_uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Employees_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['employees_aggregate'] = ResolversParentTypes['employees_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['employees_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['employees']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Employees_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['employees_aggregate_fields'] = ResolversParentTypes['employees_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Employees_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['employees_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['employees_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Employees_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['employees_max_fields'] = ResolversParentTypes['employees_max_fields']> = {
  auth_uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Employees_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['employees_min_fields'] = ResolversParentTypes['employees_min_fields']> = {
  auth_uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Employees_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['employees_mutation_response'] = ResolversParentTypes['employees_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['employees']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory'] = ResolversParentTypes['inventory']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  stock_quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  store_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_aggregate'] = ResolversParentTypes['inventory_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['inventory_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['inventory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_aggregate_fields'] = ResolversParentTypes['inventory_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['inventory_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Inventory_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['inventory_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['inventory_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['inventory_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['inventory_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['inventory_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['inventory_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['inventory_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['inventory_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['inventory_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_avg_fields'] = ResolversParentTypes['inventory_avg_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_max_fields'] = ResolversParentTypes['inventory_max_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  stock_quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  store_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_min_fields'] = ResolversParentTypes['inventory_min_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  stock_quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  store_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_mutation_response'] = ResolversParentTypes['inventory_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['inventory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_stddev_fields'] = ResolversParentTypes['inventory_stddev_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_stddev_pop_fields'] = ResolversParentTypes['inventory_stddev_pop_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_stddev_samp_fields'] = ResolversParentTypes['inventory_stddev_samp_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_sum_fields'] = ResolversParentTypes['inventory_sum_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_var_pop_fields'] = ResolversParentTypes['inventory_var_pop_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_var_samp_fields'] = ResolversParentTypes['inventory_var_samp_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Inventory_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['inventory_variance_fields'] = ResolversParentTypes['inventory_variance_fields']> = {
  stock_quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Mutation_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['mutation_root'] = ResolversParentTypes['mutation_root']> = {
  delete_cart?: Resolver<Maybe<ResolversTypes['cart_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_CartArgs, 'where'>>;
  delete_cart_by_pk?: Resolver<Maybe<ResolversTypes['cart']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Cart_By_PkArgs, 'id'>>;
  delete_customers?: Resolver<Maybe<ResolversTypes['customers_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_CustomersArgs, 'where'>>;
  delete_customers_by_pk?: Resolver<Maybe<ResolversTypes['customers']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Customers_By_PkArgs, 'id'>>;
  delete_employees?: Resolver<Maybe<ResolversTypes['employees_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_EmployeesArgs, 'where'>>;
  delete_employees_by_pk?: Resolver<Maybe<ResolversTypes['employees']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Employees_By_PkArgs, 'id'>>;
  delete_inventory?: Resolver<Maybe<ResolversTypes['inventory_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_InventoryArgs, 'where'>>;
  delete_inventory_by_pk?: Resolver<Maybe<ResolversTypes['inventory']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Inventory_By_PkArgs, 'id'>>;
  delete_orders?: Resolver<Maybe<ResolversTypes['orders_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_OrdersArgs, 'where'>>;
  delete_orders_by_pk?: Resolver<Maybe<ResolversTypes['orders']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Orders_By_PkArgs, 'id'>>;
  delete_products?: Resolver<Maybe<ResolversTypes['products_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_ProductsArgs, 'where'>>;
  delete_products_by_pk?: Resolver<Maybe<ResolversTypes['products']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Products_By_PkArgs, 'id'>>;
  delete_ship_to?: Resolver<Maybe<ResolversTypes['ship_to_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Ship_ToArgs, 'where'>>;
  delete_ship_to_by_pk?: Resolver<Maybe<ResolversTypes['ship_to']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Ship_To_By_PkArgs, 'id'>>;
  delete_stores?: Resolver<Maybe<ResolversTypes['stores_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_StoresArgs, 'where'>>;
  delete_stores_by_pk?: Resolver<Maybe<ResolversTypes['stores']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Stores_By_PkArgs, 'id'>>;
  insert_cart?: Resolver<Maybe<ResolversTypes['cart_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_CartArgs, 'objects'>>;
  insert_cart_one?: Resolver<Maybe<ResolversTypes['cart']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Cart_OneArgs, 'object'>>;
  insert_customers?: Resolver<Maybe<ResolversTypes['customers_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_CustomersArgs, 'objects'>>;
  insert_customers_one?: Resolver<Maybe<ResolversTypes['customers']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Customers_OneArgs, 'object'>>;
  insert_employees?: Resolver<Maybe<ResolversTypes['employees_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_EmployeesArgs, 'objects'>>;
  insert_employees_one?: Resolver<Maybe<ResolversTypes['employees']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Employees_OneArgs, 'object'>>;
  insert_inventory?: Resolver<Maybe<ResolversTypes['inventory_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_InventoryArgs, 'objects'>>;
  insert_inventory_one?: Resolver<Maybe<ResolversTypes['inventory']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Inventory_OneArgs, 'object'>>;
  insert_orders?: Resolver<Maybe<ResolversTypes['orders_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_OrdersArgs, 'objects'>>;
  insert_orders_one?: Resolver<Maybe<ResolversTypes['orders']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Orders_OneArgs, 'object'>>;
  insert_products?: Resolver<Maybe<ResolversTypes['products_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_ProductsArgs, 'objects'>>;
  insert_products_one?: Resolver<Maybe<ResolversTypes['products']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Products_OneArgs, 'object'>>;
  insert_ship_to?: Resolver<Maybe<ResolversTypes['ship_to_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Ship_ToArgs, 'objects'>>;
  insert_ship_to_one?: Resolver<Maybe<ResolversTypes['ship_to']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Ship_To_OneArgs, 'object'>>;
  insert_stores?: Resolver<Maybe<ResolversTypes['stores_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_StoresArgs, 'objects'>>;
  insert_stores_one?: Resolver<Maybe<ResolversTypes['stores']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Stores_OneArgs, 'object'>>;
  update_cart?: Resolver<Maybe<ResolversTypes['cart_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_CartArgs, 'where'>>;
  update_cart_by_pk?: Resolver<Maybe<ResolversTypes['cart']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Cart_By_PkArgs, 'pk_columns'>>;
  update_customers?: Resolver<Maybe<ResolversTypes['customers_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_CustomersArgs, 'where'>>;
  update_customers_by_pk?: Resolver<Maybe<ResolversTypes['customers']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Customers_By_PkArgs, 'pk_columns'>>;
  update_employees?: Resolver<Maybe<ResolversTypes['employees_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_EmployeesArgs, 'where'>>;
  update_employees_by_pk?: Resolver<Maybe<ResolversTypes['employees']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Employees_By_PkArgs, 'pk_columns'>>;
  update_inventory?: Resolver<Maybe<ResolversTypes['inventory_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_InventoryArgs, 'where'>>;
  update_inventory_by_pk?: Resolver<Maybe<ResolversTypes['inventory']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Inventory_By_PkArgs, 'pk_columns'>>;
  update_orders?: Resolver<Maybe<ResolversTypes['orders_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_OrdersArgs, 'where'>>;
  update_orders_by_pk?: Resolver<Maybe<ResolversTypes['orders']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Orders_By_PkArgs, 'pk_columns'>>;
  update_products?: Resolver<Maybe<ResolversTypes['products_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_ProductsArgs, 'where'>>;
  update_products_by_pk?: Resolver<Maybe<ResolversTypes['products']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Products_By_PkArgs, 'pk_columns'>>;
  update_ship_to?: Resolver<Maybe<ResolversTypes['ship_to_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Ship_ToArgs, 'where'>>;
  update_ship_to_by_pk?: Resolver<Maybe<ResolversTypes['ship_to']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Ship_To_By_PkArgs, 'pk_columns'>>;
  update_stores?: Resolver<Maybe<ResolversTypes['stores_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_StoresArgs, 'where'>>;
  update_stores_by_pk?: Resolver<Maybe<ResolversTypes['stores']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Stores_By_PkArgs, 'pk_columns'>>;
};

export interface NumericScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['numeric'], any> {
  name: 'numeric';
}

export type OrdersResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders'] = ResolversParentTypes['orders']> = {
  cost?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['customers'], ParentType, ContextType>;
  customer_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  order_no?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  ship_to_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_price?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_aggregate'] = ResolversParentTypes['orders_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['orders_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['orders']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_aggregate_fields'] = ResolversParentTypes['orders_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['orders_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Orders_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['orders_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['orders_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['orders_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['orders_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['orders_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['orders_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['orders_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['orders_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['orders_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_avg_fields'] = ResolversParentTypes['orders_avg_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_max_fields'] = ResolversParentTypes['orders_max_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  customer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  order_no?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  ship_to_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_min_fields'] = ResolversParentTypes['orders_min_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  customer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  order_no?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  product_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  ship_to_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_mutation_response'] = ResolversParentTypes['orders_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['orders']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_stddev_fields'] = ResolversParentTypes['orders_stddev_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_stddev_pop_fields'] = ResolversParentTypes['orders_stddev_pop_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_stddev_samp_fields'] = ResolversParentTypes['orders_stddev_samp_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_sum_fields'] = ResolversParentTypes['orders_sum_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_var_pop_fields'] = ResolversParentTypes['orders_var_pop_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_var_samp_fields'] = ResolversParentTypes['orders_var_samp_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orders_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['orders_variance_fields'] = ResolversParentTypes['orders_variance_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products'] = ResolversParentTypes['products']> = {
  carts?: Resolver<Array<ResolversTypes['cart']>, ParentType, ContextType, Partial<ProductsCartsArgs>>;
  carts_aggregate?: Resolver<ResolversTypes['cart_aggregate'], ParentType, ContextType, Partial<ProductsCarts_AggregateArgs>>;
  cost?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  inventory?: Resolver<Array<ResolversTypes['inventory']>, ParentType, ContextType, Partial<ProductsInventoryArgs>>;
  inventory_aggregate?: Resolver<ResolversTypes['inventory_aggregate'], ParentType, ContextType, Partial<ProductsInventory_AggregateArgs>>;
  is_active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['orders']>, ParentType, ContextType, Partial<ProductsOrdersArgs>>;
  orders_aggregate?: Resolver<ResolversTypes['orders_aggregate'], ParentType, ContextType, Partial<ProductsOrders_AggregateArgs>>;
  price?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_aggregate'] = ResolversParentTypes['products_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['products_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['products']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_aggregate_fields'] = ResolversParentTypes['products_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['products_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Products_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['products_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['products_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['products_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['products_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['products_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['products_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['products_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['products_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['products_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_avg_fields'] = ResolversParentTypes['products_avg_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_max_fields'] = ResolversParentTypes['products_max_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_min_fields'] = ResolversParentTypes['products_min_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_mutation_response'] = ResolversParentTypes['products_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['products']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_stddev_fields'] = ResolversParentTypes['products_stddev_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_stddev_pop_fields'] = ResolversParentTypes['products_stddev_pop_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_stddev_samp_fields'] = ResolversParentTypes['products_stddev_samp_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_sum_fields'] = ResolversParentTypes['products_sum_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_var_pop_fields'] = ResolversParentTypes['products_var_pop_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_var_samp_fields'] = ResolversParentTypes['products_var_samp_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Products_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['products_variance_fields'] = ResolversParentTypes['products_variance_fields']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Query_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']> = {
  cart?: Resolver<Array<ResolversTypes['cart']>, ParentType, ContextType, Partial<Query_RootCartArgs>>;
  cart_aggregate?: Resolver<ResolversTypes['cart_aggregate'], ParentType, ContextType, Partial<Query_RootCart_AggregateArgs>>;
  cart_by_pk?: Resolver<Maybe<ResolversTypes['cart']>, ParentType, ContextType, RequireFields<Query_RootCart_By_PkArgs, 'id'>>;
  customers?: Resolver<Array<ResolversTypes['customers']>, ParentType, ContextType, Partial<Query_RootCustomersArgs>>;
  customers_aggregate?: Resolver<ResolversTypes['customers_aggregate'], ParentType, ContextType, Partial<Query_RootCustomers_AggregateArgs>>;
  customers_by_pk?: Resolver<Maybe<ResolversTypes['customers']>, ParentType, ContextType, RequireFields<Query_RootCustomers_By_PkArgs, 'id'>>;
  employees?: Resolver<Array<ResolversTypes['employees']>, ParentType, ContextType, Partial<Query_RootEmployeesArgs>>;
  employees_aggregate?: Resolver<ResolversTypes['employees_aggregate'], ParentType, ContextType, Partial<Query_RootEmployees_AggregateArgs>>;
  employees_by_pk?: Resolver<Maybe<ResolversTypes['employees']>, ParentType, ContextType, RequireFields<Query_RootEmployees_By_PkArgs, 'id'>>;
  inventory?: Resolver<Array<ResolversTypes['inventory']>, ParentType, ContextType, Partial<Query_RootInventoryArgs>>;
  inventory_aggregate?: Resolver<ResolversTypes['inventory_aggregate'], ParentType, ContextType, Partial<Query_RootInventory_AggregateArgs>>;
  inventory_by_pk?: Resolver<Maybe<ResolversTypes['inventory']>, ParentType, ContextType, RequireFields<Query_RootInventory_By_PkArgs, 'id'>>;
  orders?: Resolver<Array<ResolversTypes['orders']>, ParentType, ContextType, Partial<Query_RootOrdersArgs>>;
  orders_aggregate?: Resolver<ResolversTypes['orders_aggregate'], ParentType, ContextType, Partial<Query_RootOrders_AggregateArgs>>;
  orders_by_pk?: Resolver<Maybe<ResolversTypes['orders']>, ParentType, ContextType, RequireFields<Query_RootOrders_By_PkArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['products']>, ParentType, ContextType, Partial<Query_RootProductsArgs>>;
  products_aggregate?: Resolver<ResolversTypes['products_aggregate'], ParentType, ContextType, Partial<Query_RootProducts_AggregateArgs>>;
  products_by_pk?: Resolver<Maybe<ResolversTypes['products']>, ParentType, ContextType, RequireFields<Query_RootProducts_By_PkArgs, 'id'>>;
  ship_to?: Resolver<Array<ResolversTypes['ship_to']>, ParentType, ContextType, Partial<Query_RootShip_ToArgs>>;
  ship_to_aggregate?: Resolver<ResolversTypes['ship_to_aggregate'], ParentType, ContextType, Partial<Query_RootShip_To_AggregateArgs>>;
  ship_to_by_pk?: Resolver<Maybe<ResolversTypes['ship_to']>, ParentType, ContextType, RequireFields<Query_RootShip_To_By_PkArgs, 'id'>>;
  stores?: Resolver<Array<ResolversTypes['stores']>, ParentType, ContextType, Partial<Query_RootStoresArgs>>;
  stores_aggregate?: Resolver<ResolversTypes['stores_aggregate'], ParentType, ContextType, Partial<Query_RootStores_AggregateArgs>>;
  stores_by_pk?: Resolver<Maybe<ResolversTypes['stores']>, ParentType, ContextType, RequireFields<Query_RootStores_By_PkArgs, 'id'>>;
};

export type Ship_ToResolvers<ContextType = any, ParentType extends ResolversParentTypes['ship_to'] = ResolversParentTypes['ship_to']> = {
  address_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['customers'], ParentType, ContextType>;
  customer_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['orders']>, ParentType, ContextType, Partial<Ship_ToOrdersArgs>>;
  orders_aggregate?: Resolver<ResolversTypes['orders_aggregate'], ParentType, ContextType, Partial<Ship_ToOrders_AggregateArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Ship_To_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ship_to_aggregate'] = ResolversParentTypes['ship_to_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['ship_to_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['ship_to']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Ship_To_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ship_to_aggregate_fields'] = ResolversParentTypes['ship_to_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Ship_To_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['ship_to_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['ship_to_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Ship_To_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ship_to_max_fields'] = ResolversParentTypes['ship_to_max_fields']> = {
  address_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  customer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Ship_To_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ship_to_min_fields'] = ResolversParentTypes['ship_to_min_fields']> = {
  address_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address_zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  customer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Ship_To_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ship_to_mutation_response'] = ResolversParentTypes['ship_to_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['ship_to']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoresResolvers<ContextType = any, ParentType extends ResolversParentTypes['stores'] = ResolversParentTypes['stores']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  carts?: Resolver<Array<ResolversTypes['cart']>, ParentType, ContextType, Partial<StoresCartsArgs>>;
  carts_aggregate?: Resolver<ResolversTypes['cart_aggregate'], ParentType, ContextType, Partial<StoresCarts_AggregateArgs>>;
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  inventory?: Resolver<Array<ResolversTypes['inventory']>, ParentType, ContextType, Partial<StoresInventoryArgs>>;
  inventory_aggregate?: Resolver<ResolversTypes['inventory_aggregate'], ParentType, ContextType, Partial<StoresInventory_AggregateArgs>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Stores_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['stores_aggregate'] = ResolversParentTypes['stores_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['stores_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['stores']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Stores_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['stores_aggregate_fields'] = ResolversParentTypes['stores_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Stores_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['stores_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['stores_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Stores_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['stores_max_fields'] = ResolversParentTypes['stores_max_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Stores_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['stores_min_fields'] = ResolversParentTypes['stores_min_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Stores_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['stores_mutation_response'] = ResolversParentTypes['stores_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['stores']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Subscription_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']> = {
  cart?: SubscriptionResolver<Array<ResolversTypes['cart']>, "cart", ParentType, ContextType, Partial<Subscription_RootCartArgs>>;
  cart_aggregate?: SubscriptionResolver<ResolversTypes['cart_aggregate'], "cart_aggregate", ParentType, ContextType, Partial<Subscription_RootCart_AggregateArgs>>;
  cart_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['cart']>, "cart_by_pk", ParentType, ContextType, RequireFields<Subscription_RootCart_By_PkArgs, 'id'>>;
  customers?: SubscriptionResolver<Array<ResolversTypes['customers']>, "customers", ParentType, ContextType, Partial<Subscription_RootCustomersArgs>>;
  customers_aggregate?: SubscriptionResolver<ResolversTypes['customers_aggregate'], "customers_aggregate", ParentType, ContextType, Partial<Subscription_RootCustomers_AggregateArgs>>;
  customers_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['customers']>, "customers_by_pk", ParentType, ContextType, RequireFields<Subscription_RootCustomers_By_PkArgs, 'id'>>;
  employees?: SubscriptionResolver<Array<ResolversTypes['employees']>, "employees", ParentType, ContextType, Partial<Subscription_RootEmployeesArgs>>;
  employees_aggregate?: SubscriptionResolver<ResolversTypes['employees_aggregate'], "employees_aggregate", ParentType, ContextType, Partial<Subscription_RootEmployees_AggregateArgs>>;
  employees_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['employees']>, "employees_by_pk", ParentType, ContextType, RequireFields<Subscription_RootEmployees_By_PkArgs, 'id'>>;
  inventory?: SubscriptionResolver<Array<ResolversTypes['inventory']>, "inventory", ParentType, ContextType, Partial<Subscription_RootInventoryArgs>>;
  inventory_aggregate?: SubscriptionResolver<ResolversTypes['inventory_aggregate'], "inventory_aggregate", ParentType, ContextType, Partial<Subscription_RootInventory_AggregateArgs>>;
  inventory_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['inventory']>, "inventory_by_pk", ParentType, ContextType, RequireFields<Subscription_RootInventory_By_PkArgs, 'id'>>;
  orders?: SubscriptionResolver<Array<ResolversTypes['orders']>, "orders", ParentType, ContextType, Partial<Subscription_RootOrdersArgs>>;
  orders_aggregate?: SubscriptionResolver<ResolversTypes['orders_aggregate'], "orders_aggregate", ParentType, ContextType, Partial<Subscription_RootOrders_AggregateArgs>>;
  orders_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['orders']>, "orders_by_pk", ParentType, ContextType, RequireFields<Subscription_RootOrders_By_PkArgs, 'id'>>;
  products?: SubscriptionResolver<Array<ResolversTypes['products']>, "products", ParentType, ContextType, Partial<Subscription_RootProductsArgs>>;
  products_aggregate?: SubscriptionResolver<ResolversTypes['products_aggregate'], "products_aggregate", ParentType, ContextType, Partial<Subscription_RootProducts_AggregateArgs>>;
  products_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['products']>, "products_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProducts_By_PkArgs, 'id'>>;
  ship_to?: SubscriptionResolver<Array<ResolversTypes['ship_to']>, "ship_to", ParentType, ContextType, Partial<Subscription_RootShip_ToArgs>>;
  ship_to_aggregate?: SubscriptionResolver<ResolversTypes['ship_to_aggregate'], "ship_to_aggregate", ParentType, ContextType, Partial<Subscription_RootShip_To_AggregateArgs>>;
  ship_to_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['ship_to']>, "ship_to_by_pk", ParentType, ContextType, RequireFields<Subscription_RootShip_To_By_PkArgs, 'id'>>;
  stores?: SubscriptionResolver<Array<ResolversTypes['stores']>, "stores", ParentType, ContextType, Partial<Subscription_RootStoresArgs>>;
  stores_aggregate?: SubscriptionResolver<ResolversTypes['stores_aggregate'], "stores_aggregate", ParentType, ContextType, Partial<Subscription_RootStores_AggregateArgs>>;
  stores_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['stores']>, "stores_by_pk", ParentType, ContextType, RequireFields<Subscription_RootStores_By_PkArgs, 'id'>>;
};

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type Resolvers<ContextType = any> = {
  cart?: CartResolvers<ContextType>;
  cart_aggregate?: Cart_AggregateResolvers<ContextType>;
  cart_aggregate_fields?: Cart_Aggregate_FieldsResolvers<ContextType>;
  cart_max_fields?: Cart_Max_FieldsResolvers<ContextType>;
  cart_min_fields?: Cart_Min_FieldsResolvers<ContextType>;
  cart_mutation_response?: Cart_Mutation_ResponseResolvers<ContextType>;
  customers?: CustomersResolvers<ContextType>;
  customers_aggregate?: Customers_AggregateResolvers<ContextType>;
  customers_aggregate_fields?: Customers_Aggregate_FieldsResolvers<ContextType>;
  customers_max_fields?: Customers_Max_FieldsResolvers<ContextType>;
  customers_min_fields?: Customers_Min_FieldsResolvers<ContextType>;
  customers_mutation_response?: Customers_Mutation_ResponseResolvers<ContextType>;
  employees?: EmployeesResolvers<ContextType>;
  employees_aggregate?: Employees_AggregateResolvers<ContextType>;
  employees_aggregate_fields?: Employees_Aggregate_FieldsResolvers<ContextType>;
  employees_max_fields?: Employees_Max_FieldsResolvers<ContextType>;
  employees_min_fields?: Employees_Min_FieldsResolvers<ContextType>;
  employees_mutation_response?: Employees_Mutation_ResponseResolvers<ContextType>;
  inventory?: InventoryResolvers<ContextType>;
  inventory_aggregate?: Inventory_AggregateResolvers<ContextType>;
  inventory_aggregate_fields?: Inventory_Aggregate_FieldsResolvers<ContextType>;
  inventory_avg_fields?: Inventory_Avg_FieldsResolvers<ContextType>;
  inventory_max_fields?: Inventory_Max_FieldsResolvers<ContextType>;
  inventory_min_fields?: Inventory_Min_FieldsResolvers<ContextType>;
  inventory_mutation_response?: Inventory_Mutation_ResponseResolvers<ContextType>;
  inventory_stddev_fields?: Inventory_Stddev_FieldsResolvers<ContextType>;
  inventory_stddev_pop_fields?: Inventory_Stddev_Pop_FieldsResolvers<ContextType>;
  inventory_stddev_samp_fields?: Inventory_Stddev_Samp_FieldsResolvers<ContextType>;
  inventory_sum_fields?: Inventory_Sum_FieldsResolvers<ContextType>;
  inventory_var_pop_fields?: Inventory_Var_Pop_FieldsResolvers<ContextType>;
  inventory_var_samp_fields?: Inventory_Var_Samp_FieldsResolvers<ContextType>;
  inventory_variance_fields?: Inventory_Variance_FieldsResolvers<ContextType>;
  mutation_root?: Mutation_RootResolvers<ContextType>;
  numeric?: GraphQLScalarType;
  orders?: OrdersResolvers<ContextType>;
  orders_aggregate?: Orders_AggregateResolvers<ContextType>;
  orders_aggregate_fields?: Orders_Aggregate_FieldsResolvers<ContextType>;
  orders_avg_fields?: Orders_Avg_FieldsResolvers<ContextType>;
  orders_max_fields?: Orders_Max_FieldsResolvers<ContextType>;
  orders_min_fields?: Orders_Min_FieldsResolvers<ContextType>;
  orders_mutation_response?: Orders_Mutation_ResponseResolvers<ContextType>;
  orders_stddev_fields?: Orders_Stddev_FieldsResolvers<ContextType>;
  orders_stddev_pop_fields?: Orders_Stddev_Pop_FieldsResolvers<ContextType>;
  orders_stddev_samp_fields?: Orders_Stddev_Samp_FieldsResolvers<ContextType>;
  orders_sum_fields?: Orders_Sum_FieldsResolvers<ContextType>;
  orders_var_pop_fields?: Orders_Var_Pop_FieldsResolvers<ContextType>;
  orders_var_samp_fields?: Orders_Var_Samp_FieldsResolvers<ContextType>;
  orders_variance_fields?: Orders_Variance_FieldsResolvers<ContextType>;
  products?: ProductsResolvers<ContextType>;
  products_aggregate?: Products_AggregateResolvers<ContextType>;
  products_aggregate_fields?: Products_Aggregate_FieldsResolvers<ContextType>;
  products_avg_fields?: Products_Avg_FieldsResolvers<ContextType>;
  products_max_fields?: Products_Max_FieldsResolvers<ContextType>;
  products_min_fields?: Products_Min_FieldsResolvers<ContextType>;
  products_mutation_response?: Products_Mutation_ResponseResolvers<ContextType>;
  products_stddev_fields?: Products_Stddev_FieldsResolvers<ContextType>;
  products_stddev_pop_fields?: Products_Stddev_Pop_FieldsResolvers<ContextType>;
  products_stddev_samp_fields?: Products_Stddev_Samp_FieldsResolvers<ContextType>;
  products_sum_fields?: Products_Sum_FieldsResolvers<ContextType>;
  products_var_pop_fields?: Products_Var_Pop_FieldsResolvers<ContextType>;
  products_var_samp_fields?: Products_Var_Samp_FieldsResolvers<ContextType>;
  products_variance_fields?: Products_Variance_FieldsResolvers<ContextType>;
  query_root?: Query_RootResolvers<ContextType>;
  ship_to?: Ship_ToResolvers<ContextType>;
  ship_to_aggregate?: Ship_To_AggregateResolvers<ContextType>;
  ship_to_aggregate_fields?: Ship_To_Aggregate_FieldsResolvers<ContextType>;
  ship_to_max_fields?: Ship_To_Max_FieldsResolvers<ContextType>;
  ship_to_min_fields?: Ship_To_Min_FieldsResolvers<ContextType>;
  ship_to_mutation_response?: Ship_To_Mutation_ResponseResolvers<ContextType>;
  stores?: StoresResolvers<ContextType>;
  stores_aggregate?: Stores_AggregateResolvers<ContextType>;
  stores_aggregate_fields?: Stores_Aggregate_FieldsResolvers<ContextType>;
  stores_max_fields?: Stores_Max_FieldsResolvers<ContextType>;
  stores_min_fields?: Stores_Min_FieldsResolvers<ContextType>;
  stores_mutation_response?: Stores_Mutation_ResponseResolvers<ContextType>;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  timestamptz?: GraphQLScalarType;
  uuid?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>;
};
