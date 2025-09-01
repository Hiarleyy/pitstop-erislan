export type VehicleType = 'car' | 'motorcycle';
export type CarSize = 'Pequeno' | 'Médio' | 'Grande';
export type MotorcycleSize = string;

export interface ServiceFromLib {
  id: string;
  name: string;
  description: string;
  prices?: { [key: string]: number };
  priceMultiplier?: number;
  baseService?: string;
  fixedPrice?: number;
  basePrice?: number;
  requer_quantidade?: boolean;
  valor_a_combinar?: boolean;
  valor_unitario?: string | null;
}

export interface ServiceItem {
  id: string;
  category: string;
  name: string;
  price: number | string;
  quantity?: number;
  requer_quantidade?: boolean;
  valor_a_combinar?: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  size: string;
  services: ServiceItem[];
}

export interface NewVehicle {
  name: string;
  type: VehicleType;
  size: string;
}

export interface BookingState {
  currentStep: number;
  customerName: string;
  selectedCategory: string;
  vehicles: Vehicle[];
  isAddingVehicle: boolean;
  newVehicle: NewVehicle;
}

export interface StepValidation {
  isValid: boolean;
  message: string;
}
