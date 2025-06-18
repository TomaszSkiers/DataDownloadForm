
export type Technician = {
  fullName: string;
  number: string;
};

export type Manufacturer = {
  name: string;
};

export type FormData = {
  serviceName: string;
  serviceAddress: string;
  technicians: Technician[];
  manufacturers: Manufacturer[];
}; 
