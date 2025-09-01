import { CAR_SIZES } from '@/constants/booking';
import { BookingState, CarSize, StepValidation, Vehicle } from '@/types/booking';

export const validateCustomerName = (name: string): StepValidation => {
  const isValid = name.trim().length > 0;
  return {
    isValid,
    message: isValid ? '' : 'Por favor, informe seu nome para continuar.'
  };
};

export const validateVehicleList = (vehicles: Vehicle[]): StepValidation => {
  const isValid = vehicles.length > 0;
  return {
    isValid,
    message: isValid ? '' : 'Por favor, adicione pelo menos um veículo para continuar.'
  };
};

export const validateServiceSelection = (vehicles: Vehicle[]): StepValidation => {
  const hasServices = vehicles.some(vehicle => vehicle.services.length > 0);
  return {
    isValid: hasServices,
    message: hasServices ? '' : 'Por favor, selecione pelo menos um serviço para continuar.'
  };
};

export const validateStep = (step: number, state: BookingState): StepValidation => {
  switch (step) {
    case 1:
      return validateCustomerName(state.customerName);
    case 2:
      return validateVehicleList(state.vehicles);
    case 3:
      return validateServiceSelection(state.vehicles);
    default:
      return { isValid: true, message: '' };
  }
};

export const validateNewVehicle = (vehicle: { name: string; size: string; type: 'car' | 'motorcycle' }) => {
  if (!vehicle.name.trim()) {
    return {
      isValid: false,
      message: 'Por favor, informe o nome do seu veículo.'
    };
  }

  if (!vehicle.size || vehicle.size.trim() === '') {
    return {
      isValid: false,
      message: 'Por favor, selecione o porte do seu veículo.'
    };
  }

  if (vehicle.type === 'car' && !CAR_SIZES.includes(vehicle.size as CarSize)) {
    return {
      isValid: false,
      message: 'Porte do carro inválido. Selecione: Pequeno, Médio ou Grande.'
    };
  }

  return { isValid: true, message: '' };
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};
