export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phones: IPhone[];
}

export interface IPhone {
  phoneNumber: string;
}
