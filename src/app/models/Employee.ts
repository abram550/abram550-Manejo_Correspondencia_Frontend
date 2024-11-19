

export interface EmployeeI {
  id: number;
  name: string;
  email: string;
  phone: string;
  employeeTypeId: number;
  status: boolean;
  employeeType : EmployeeTypeI;
}


export interface EmployeeTypeI {
  id: number;
  jobTitle: string;
  status: boolean;
}

