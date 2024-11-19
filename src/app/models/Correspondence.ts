

export interface CorrespondenceI {
  id: number;
  senderId: number;
  recipientId: number;
  employeeId: number;
  correspondenceTypeId: number;
  correspondenceStateId: number;
  originBranchId: number;
  destinationBranchId: number;
  transportId: number;
  sendDate: Date;
  deliveryDate: Date | null;
  description: string;
  status: boolean;
}