export interface UserTypeI {
  id: number;
  description: string;
  status: boolean; 
}

export interface UserI {
  id?: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  status: boolean; // New status field for soft deletion
  password: string;
  avatar?: string;

}

