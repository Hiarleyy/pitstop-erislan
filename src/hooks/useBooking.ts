import { BOOKING_STEPS } from '@/constants/booking';
import { useToast } from '@/hooks/use-toast';
import { BookingState, NewVehicle, ServiceFromLib, Vehicle } from '@/types/booking';
import { generateId, validateNewVehicle, validateStep } from '@/utils/bookingValidation';
import { useState } from 'react';

const initialNewVehicle: NewVehicle = {
  name: '',
  type: 'car',
  size: ''
};

const initialState: BookingState = {
  currentStep: BOOKING_STEPS.CUSTOMER_INFO,
  customerName: '',
  selectedCategory: 'lavagem',
  vehicles: [],
  isAddingVehicle: false,
  newVehicle: initialNewVehicle
};

export const useBooking = () => {
  const { toast } = useToast();
  const [state, setState] = useState<BookingState>(initialState);

  const updateState = (updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const setCurrentStep = (step: number) => {
    updateState({ currentStep: step });
  };

  const setCustomerName = (name: string) => {
    updateState({ customerName: name });
  };

  const setSelectedCategory = (category: string) => {
    updateState({ selectedCategory: category });
  };

  const setIsAddingVehicle = (isAdding: boolean) => {
    updateState({ 
      isAddingVehicle: isAdding,
      newVehicle: isAdding ? initialNewVehicle : state.newVehicle
    });
  };

  const setNewVehicle = (vehicle: Partial<NewVehicle>) => {
    updateState({
      newVehicle: { ...state.newVehicle, ...vehicle }
    });
  };

  const nextStep = () => {
    const validation = validateStep(state.currentStep, state);
    
    if (validation.isValid) {
      if (state.currentStep < 4) {
        setCurrentStep(state.currentStep + 1);
      }
    } else {
      toast({
        title: "Informação obrigatória",
        description: validation.message,
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setCurrentStep(state.currentStep - 1);
    }
  };

  const addVehicle = () => {
    const validation = validateNewVehicle(state.newVehicle);
    
    if (!validation.isValid) {
      toast({
        title: "Erro na validação",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }

    const newVehicle: Vehicle = {
      id: generateId(),
      name: state.newVehicle.name,
      type: state.newVehicle.type,
      size: state.newVehicle.size,
      services: []
    };

    updateState({
      vehicles: [...state.vehicles, newVehicle],
      isAddingVehicle: false,
      newVehicle: initialNewVehicle
    });

    toast({
      title: "Veículo adicionado",
      description: `${newVehicle.name} foi adicionado com sucesso!`,
    });
  };

  const removeVehicle = (vehicleId: string) => {
    updateState({
      vehicles: state.vehicles.filter(v => v.id !== vehicleId)
    });
    
    toast({
      title: "Veículo removido",
      description: "Veículo removido com sucesso!",
    });
  };

  const addServiceToVehicle = (vehicleId: string, service: ServiceFromLib & { category?: string; price?: number | string }) => {
    updateState({
      vehicles: state.vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          const serviceWithId = {
            id: generateId(),
            category: service.category,
            name: service.name,
            price: service.price,
            quantity: service.requer_quantidade ? 1 : undefined,
            requer_quantidade: service.requer_quantidade
          };
          
          return {
            ...vehicle,
            services: [...vehicle.services, serviceWithId]
          };
        }
        return vehicle;
      })
    });
  };

  const removeServiceFromVehicle = (vehicleId: string, serviceId: string) => {
    updateState({
      vehicles: state.vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          return {
            ...vehicle,
            services: vehicle.services.filter(service => service.id !== serviceId)
          };
        }
        return vehicle;
      })
    });
  };

  const updateServiceQuantity = (vehicleId: string, serviceId: string, quantity: number) => {
    updateState({
      vehicles: state.vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          return {
            ...vehicle,
            services: vehicle.services.map(service => {
              if (service.id === serviceId) {
                return { ...service, quantity };
              }
              return service;
            })
          };
        }
        return vehicle;
      })
    });
  };

  return {
    state,
    actions: {
      setCurrentStep,
      setCustomerName,
      setSelectedCategory,
      setIsAddingVehicle,
      setNewVehicle,
      nextStep,
      prevStep,
      addVehicle,
      removeVehicle,
      addServiceToVehicle,
      removeServiceFromVehicle,
      updateServiceQuantity
    }
  };
};
