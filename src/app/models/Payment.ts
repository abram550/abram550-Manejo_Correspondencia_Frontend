

export interface PaymentI {
  id?: number;
  correspondenceId: number;
  amount: number;
  paymentDate: Date;
  paymentTypeId: number;
  status: boolean;
  paymentType : PaymentTypeI;
}

export interface PaymentTypeI {
  id: number;
  name: string;
  status: boolean;
}
