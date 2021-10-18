export interface IAddressClient {
  street: string;
  postcode: string;
  state: string;
  city: string;
  number: number;
}

export interface IClient {
  id: string;
  cnpj: string;
  comercialName: string;
  contact: string;
  phone: string;
  address: IAddressClient;
}

export interface IUser{
  id: string;
  name: string;
  userName: string;
}

export enum IStateMaintenance{
  AWAIT = 0,
  IN_PROGRESS = 1,
  FINISHED = 2
}

export interface IMaintenance{
  id: string;
  description: string;
  state: number;
  order: number;
}

export interface IContract{
  id: string;
  referenceName: string;
  client: IClient;
  maintenances: IMaintenance[];
  created?: string;
}

export interface IStructure{
  id: string;
  label: string;
  index: number;
  value: string | null;
  children: IStructure[] | [];
}