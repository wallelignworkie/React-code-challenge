export interface Sender {
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
}

interface MetaData {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface Customer {
  data: Sender[];
  meta: MetaData;
}
