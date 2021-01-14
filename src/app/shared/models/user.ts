export interface User {
  username: string;
  token: string;
  rmId: string;
  superAdmin: boolean;
  admin: boolean;
  accessTokenType: string;
}

export interface UserDetails {
  id: string;
  username: string;
  staff_id: string;
  email: string;
  groups: Array<string>;
  name: string;
  created_date: string;
  employee_id: string;
  enabled: boolean;
  department: string;
}
