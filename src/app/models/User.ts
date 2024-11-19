export interface UserTypeI {
  id: number;
  description: string;
  status: boolean; 
}

export interface UserI {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  usertypeId: number;
  status: boolean;
  usertype : UserTypeI;
}