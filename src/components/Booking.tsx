import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bike, Plus, Check, ArrowLeft, ArrowRight, User, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';
import { getServiceCategories, formatPrice, calculateServicePrice as helperCalculateServicePrice } from '@/lib/serviceHelpers';

type VehicleType = 'car' | 'motorcycle';
type CarSize = 'Pequeno' | 'Médio' | 'Grande';
type MotorcycleSize = string;

interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  size: string;
  services: {
    id: string;
    category: string;
    name: string;
    price: number | string;
    quantity?: number;
    requer_quantidade?: boolean;
  }[];
}

const vehicleSizeExamples = {
  Pequeno: "Ex: HB20, Onix, Gol, Ka, Up",
  Médio: "Ex: Civic, Corolla, Cruze, Focus",
  Grande: "Ex: SW4, Hilux, Amarok, SUVs grandes"
};

// Get service categories from centralized data
const serviceCategories = getServiceCategories();

const generateId = () => Math.random().toString(36).substring(2, 10);

const Booking = () => {  
  // State para controlar as etapas
  const [currentStep, setCurrentStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("lavagem");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);  
  const [newVehicle, setNewVehicle] = useState<{
    name: string;
    type: VehicleType;
    size: string;
  }>({
    name: '',
    type: 'car',
    size: 'Pequeno'
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [serviceQuantities, setServiceQuantities] = useState<{[vehicleId: string]: {[serviceId: string]: number}}>({});
  const { toast } = useToast();

  const totalSteps = 5;
  // Funções para navegação entre etapas
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setIsAddingVehicle(false); // Fechar modo de adição ao avançar
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsAddingVehicle(false); // Fechar modo de adição ao voltar
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setIsAddingVehicle(false); // Fechar modo de adição ao mudar de etapa
      setCurrentStep(step);
    }
  };

  // Validações para cada etapa
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return customerName.trim().length > 0;
      case 2:
        return vehicles.length > 0;
      case 3:
        return vehicles.some(v => v.services.length > 0);
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      nextStep();
    } else {
      let message = '';
      switch (currentStep) {
        case 1:
          message = 'Por favor, informe seu nome para continuar.';
          break;
        case 2:
          message = 'Por favor, adicione pelo menos um veículo para continuar.';
          break;
        case 3:
          message = 'Por favor, selecione pelo menos um serviço para continuar.';
          break;
      }
      toast({
        title: "Informação obrigatória",
        description: message,
        variant: "destructive"
      });
    }
  };

  const calculateServicePrice = (service: any, vehicle: Vehicle, quantity: number = 1) => {
    return helperCalculateServicePrice(service, vehicle.type, vehicle.size, quantity);
  };
  
  
  
  const handleAddVehicle = () => {
    if (!newVehicle.name.trim()) {
      toast({
        title: "Nome do veículo obrigatório",
        description: "Por favor, informe o nome do seu veículo.",
        variant: "destructive"
      });
      return;
    }

    // Add validation for vehicle size selection
    if (!newVehicle.size || newVehicle.size.trim() === '') {
      toast({
        title: "Porte do veículo obrigatório",
        description: "Por favor, selecione o porte do seu veículo.",
        variant: "destructive"
      });
      return;
    }
    
    // Additional validation for car type to ensure it has one of the valid sizes
    if (newVehicle.type === 'car' && !['Pequeno', 'Médio', 'Grande'].includes(newVehicle.size)) {
      toast({
        title: "Porte do carro inválido",
        description: "Por favor, selecione um porte válido para o carro: Pequeno, Médio ou Grande.",
        variant: "destructive"
      });
      return;
    }
    
    // Additional validation specific to car type
    if (newVehicle.type === 'car' && !['Pequeno', 'Médio', 'Grande'].includes(newVehicle.size as string)) {
      toast({
        title: "Porte do carro inválido",
        description: "Por favor, selecione um porte válido para o carro.",
        variant: "destructive"
      });
      return;
    }

    const vehicleId = generateId();
    
    const vehicle: Vehicle = {
      id: vehicleId,
      name: newVehicle.name,
      type: newVehicle.type,
      size: newVehicle.type === 'car' ? 
        (newVehicle.size as CarSize) : 
        (newVehicle.size as MotorcycleSize),
      services: []
    };
    
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      name: '',
      type: 'car',
      size: 'Pequeno'
    });
    
    setIsAddingVehicle(false);
    setSelectedVehicleId(vehicleId);
    toast({
      title: "Veículo adicionado",
      description: `${newVehicle.name} foi adicionado com sucesso.`
    });
    
    // Sempre redirecionar para a etapa 2 após adicionar um veículo
    setCurrentStep(2);
  };

  const handleAddService = (vehicleId: string, categoryId: string, service: any) => {
    setVehicles(vehicles.map(vehicle => {
      if (vehicle.id === vehicleId) {
        const serviceExists = vehicle.services.some(s => s.id === service.id);
        
        if (!serviceExists) {
          const defaultQuantity = service.requer_quantidade ? 1 : undefined;
          const price = calculateServicePrice(service, vehicle, defaultQuantity || 1);
          
          // Initialize quantity for this service if it requires quantity
          if (service.requer_quantidade) {
            setServiceQuantities(prev => ({
              ...prev,
              [vehicleId]: {
                ...prev[vehicleId],
                [service.id]: defaultQuantity
              }
            }));
          }
          
          return {
            ...vehicle,
            services: [...vehicle.services, {
              id: service.id,
              category: categoryId,
              name: service.name,
              price: price,
              quantity: defaultQuantity,
              requer_quantidade: service.requer_quantidade
            }]
          };
        }
      }
      return vehicle;
    }));
    
    toast({
      title: "Serviço adicionado",
      description: `${service.name} foi adicionado à lista de serviços.`
    });
  };

  const handleRemoveService = (vehicleId: string, serviceId: string) => {
    // Remove from quantity tracking
    setServiceQuantities(prev => {
      const newQuantities = { ...prev };
      if (newQuantities[vehicleId]) {
        delete newQuantities[vehicleId][serviceId];
        if (Object.keys(newQuantities[vehicleId]).length === 0) {
          delete newQuantities[vehicleId];
        }
      }
      return newQuantities;
    });
    
    setVehicles(vehicles.map(vehicle => {
      if (vehicle.id === vehicleId) {
        return {
          ...vehicle,
          services: vehicle.services.filter(s => s.id !== serviceId)
        };
      }
      return vehicle;
    }));
  };

  const handleQuantityChange = (vehicleId: string, serviceId: string, newQuantity: number) => {
    // Update quantity tracking
    setServiceQuantities(prev => ({
      ...prev,
      [vehicleId]: {
        ...prev[vehicleId],
        [serviceId]: newQuantity
      }
    }));

    // Update vehicle services with new price calculation
    setVehicles(vehicles.map(vehicle => {
      if (vehicle.id === vehicleId) {
        return {
          ...vehicle,
          services: vehicle.services.map(service => {
            if (service.id === serviceId) {
              // Find the original service data to recalculate price
              const originalService = Object.values(serviceCategories)
                .flatMap(category => category.services)
                .find(s => s.id === serviceId);
              
              if (originalService) {
                const newPrice = calculateServicePrice(originalService, vehicle, newQuantity);
                return {
                  ...service,
                  quantity: newQuantity,
                  price: newPrice
                };
              }
            }
            return service;
          })
        };
      }
      return vehicle;
    }));
  };
  const handleRemoveVehicle = (vehicleId: string) => {
    setVehicles(vehicles.filter(v => v.id !== vehicleId));
    
    // Atualizar o veículo selecionado se necessário
    if (selectedVehicleId === vehicleId) {
      const remainingVehicles = vehicles.filter(v => v.id !== vehicleId);
      setSelectedVehicleId(remainingVehicles.length > 0 ? remainingVehicles[0].id : null);
    }
    
    // Se remover todos os veículos, voltar para etapa 2
    if (vehicles.length <= 1 && (currentStep === 3 || currentStep === 4 || currentStep === 5)) {
      setCurrentStep(2);
      toast({
        title: "Nenhum veículo restante",
        description: "Você precisa adicionar pelo menos um veículo para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Veículo removido",
      description: "O veículo foi removido da sua lista."
    });
  };

  const calculateTotal = () => {
    return vehicles.reduce((total, vehicle) => {
      return total + vehicle.services.reduce((subtotal, service) => {
        return subtotal + (typeof service.price === 'number' ? service.price : 0);
      }, 0);
    }, 0);
  };

  const getSelectedVehicle = () => {
    if (!selectedVehicleId) return null;
    return vehicles.find(v => v.id === selectedVehicleId) || null;
  };

  const handleScheduleService = () => {
    if (vehicles.length === 0 || vehicles.every(v => v.services.length === 0)) {
      toast({
        title: "Nenhum serviço selecionado",
        description: "Por favor, adicione pelo menos um veículo e selecione serviços para continuar.",
        variant: "destructive"
      });
      return;
    }
    
  };

  // Nova função para formatar a mensagem do WhatsApp
  const formatWhatsAppMessage = () => {
    const message = [];
    
    message.push("*Solicitação de Agendamento PitStop Estética Automotiva*");
    
    // Adicionar o nome do cliente
    if (customerName.trim()) {
      message.push(`\n*Cliente:* ${customerName}`);
    }
    
    message.push("\n");
    message.push("*Detalhes dos Serviços:*");
    
    // Adicionar detalhes de cada veículo e seus serviços
    vehicles.forEach(vehicle => {
      message.push(`\n📌 *${vehicle.name}* - ${vehicle.type === 'car' ? `Porte: ${vehicle.size}` : vehicle.size}`);
      
      if (vehicle.services.length === 0) {
        message.push("   _Nenhum serviço selecionado_");
      } else {
        vehicle.services.forEach(service => {
          const priceDisplay = typeof service.price === 'number' ? `R$ ${service.price}` : 'Preço variável';
          message.push(`   • ${service.name} - ${priceDisplay}`);
        });
        
        // Subtotal para este veículo
        const subtotal = vehicle.services.reduce((total, service) => 
          total + (typeof service.price === 'number' ? service.price : 0), 0
        );
      }
    });
    
    message.push("\n");
    message.push(`*Valor Total: R$ ${calculateTotal()}*`);
    message.push("\n");
    message.push("Por favor, gostaria de agendar estes serviços. Quais dias e horários estão disponíveis?");
    
    return message.join("\n");
  };

  // Nova função para lidar com o agendamento via WhatsApp
  const handleWhatsAppBooking = () => {
    if (vehicles.length === 0 || vehicles.every(v => v.services.length === 0)) {
      toast({
        title: "Nenhum serviço selecionado",
        description: "Por favor, adicione pelo menos um veículo e selecione serviços para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    const message = formatWhatsAppMessage();
    
    // Número da oficina (substitua pelo número real)
    
    // Criar a URL do WhatsApp com a mensagem
    const whatsappUrl = `https://wa.me/559180588823?text=${encodeURIComponent(message)}`;
    
    // Abrir em uma nova janela/aba
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será redirecionado para o WhatsApp para finalizar seu agendamento."
    });
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'bookingComplete') {
  
        toast({
          title: "Agendamento realizado com sucesso!",
          description: "Você será redirecionado para confirmar o pagamento.",
        });
        
        setTimeout(() => {
          window.location.href = "#contact";
        }, 1500);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toast]);  // Função para renderizar o indicador de progresso
  const renderProgressIndicator = () => {
    const steps = [
      { number: 1, title: 'Dados Pessoais', icon: User },
      { number: 2, title: 'Veículos', icon: Car },
      { number: 3, title: 'Serviços', icon: Settings },
      { number: 4, title: 'Revisão', icon: Check },
      { number: 5, title: 'Finalização', icon: CheckCircle }
    ];    return (
      <div className="flex justify-center mb-8 px-2">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto md:overflow-visible max-w-full">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const IconComponent = step.icon;
            
            return (
              <div key={step.number} className="flex items-center flex-shrink-0">
                <div 
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-pitstop-blue border-pitstop-blue text-white' 
                      : isCompleted 
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-gray-200 border-gray-300 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={14} className="sm:w-4 sm:h-4" />
                  ) : (
                    <IconComponent size={14} className="sm:w-4 sm:h-4" />
                  )}
                </div>
                <div className="ml-1 sm:ml-2 hidden md:block">
                  <div className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                    isActive ? 'text-pitstop-blue' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 sm:w-8 h-0.5 mx-2 sm:mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Função para renderizar a Etapa 1: Dados Pessoais
  const renderStep1 = () => (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-pitstop-darkGray mb-6 flex items-center justify-center gap-3">
        👤 <span>Bem-vindo!</span>
      </h3>
      <p className="text-lg text-pitstop-darkGray/80 mb-8">
        Vamos começar com suas informações básicas
      </p>
      <div className="max-w-md mx-auto">
        <label htmlFor="customer-name" className="block text-sm font-semibold mb-3 text-pitstop-darkGray">
          Nome Completo
        </label>
        <Input
          id="customer-name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Digite seu nome completo"
          className="w-full h-12 text-lg border-2 border-pitstop-silver/50 focus:border-pitstop-blue transition-all duration-300 rounded-xl"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && customerName.trim()) {
              handleNextStep();
            }
          }}
        />
      </div>
    </div>
  );

  // Função para renderizar a Etapa 2: Veículos
  const renderStep2 = () => (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-pitstop-darkGray mb-6 flex items-center justify-center gap-3">
          🚙 <span>Seus Veículos</span>
        </h3>
        <p className="text-lg text-pitstop-darkGray/80 mb-8">
          Adicione os veículos que receberão nossos serviços
        </p>
      </div>

      {vehicles.length === 0 && !isAddingVehicle ? (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border-2 border-dashed border-pitstop-silver/50">
          <div className="text-6xl mb-4">🚗</div>
          <p className="text-pitstop-darkGray/70 text-lg mb-6">
            Nenhum veículo adicionado ainda.<br />
            <span className="font-semibold text-pitstop-blue">Vamos adicionar o primeiro!</span>
          </p>
          <Button
            className="bg-pitstop-blue hover:bg-pitstop-darkBlue text-white px-8 py-3 rounded-xl font-semibold"
            onClick={() => setIsAddingVehicle(true)}
          >
            <Plus size={20} className="mr-2" />
            Adicionar Primeiro Veículo
          </Button>
        </div>
      ) : (
        <div>
          {vehicles.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-pitstop-darkGray">Veículos Adicionados</h4>                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-pitstop-blue text-pitstop-blue hover:bg-pitstop-blue hover:text-white"
                  onClick={() => {
                    setIsAddingVehicle(true);
                    setCurrentStep(2);
                  }}
                >
                  <Plus size={18} />
                  Adicionar Outro
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {vehicles.map(vehicle => (
                  <div 
                    key={vehicle.id} 
                    className="group p-4 sm:p-5 border-2 border-pitstop-silver/50 hover:border-pitstop-blue/70 bg-white rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="p-2 rounded-lg bg-pitstop-silver/30 text-pitstop-darkGray flex-shrink-0">
                          {vehicle.type === 'car' ? <Car size={18} className="sm:w-5 sm:h-5" /> : <Bike size={18} className="sm:w-5 sm:h-5" />}
                        </div>
                        <span className="font-semibold text-pitstop-darkGray truncate text-sm sm:text-base">{vehicle.name}</span>
                      </div>
                      <button 
                        className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50 flex-shrink-0 ml-2"
                        onClick={() => handleRemoveVehicle(vehicle.id)}
                        title="Remover veículo"
                      >
                        <span className="text-xs">❌</span>
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm text-pitstop-darkGray/70">
                      <span className="font-medium">
                        {vehicle.type === 'car' ? `Porte: ${vehicle.size}` : vehicle.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isAddingVehicle && (
            <div className="p-8 border-2 border-dashed border-pitstop-blue/30 rounded-xl bg-gradient-to-br from-blue-50/50 to-white">
              <h4 className="text-xl font-bold text-pitstop-darkGray mb-6 flex items-center gap-3">
                ➕ <span>Adicionar Novo Veículo</span>
              </h4>
              <div className="space-y-6">
                <div>
                  <label htmlFor="vehicle-name" className="block text-sm font-semibold mb-3 text-pitstop-darkGray">
                    Nome do Veículo
                  </label>
                  <Input
                    id="vehicle-name"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                    placeholder="Ex: Honda Civic, Yamaha CB500, Toyota Hilux..."
                    className="w-full h-12 text-lg border-2 border-pitstop-silver/50 focus:border-pitstop-blue transition-all duration-300 rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-pitstop-darkGray">Tipo de Veículo</label>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <label className="flex items-center gap-3 cursor-pointer p-3 sm:p-4 rounded-xl border-2 border-pitstop-silver/50 hover:border-pitstop-blue/50 transition-all duration-300 bg-white">
                      <input
                        type="radio"
                        checked={newVehicle.type === 'car'}
                        onChange={() => setNewVehicle({
                          ...newVehicle, 
                          type: 'car', 
                          size: 'Pequeno'
                        })}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-pitstop-blue flex-shrink-0"
                      />
                      <Car size={20} className="text-pitstop-blue flex-shrink-0 sm:w-6 sm:h-6" />
                      <span className="font-medium text-sm sm:text-base">Carro</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 sm:p-4 rounded-xl border-2 border-pitstop-silver/50 hover:border-pitstop-blue/50 transition-all duration-300 bg-white">
                      <input
                        type="radio"
                        checked={newVehicle.type === 'motorcycle'}
                        onChange={() => setNewVehicle({
                          ...newVehicle, 
                          type: 'motorcycle',
                          size: 'Biz, Pop'
                        })}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-pitstop-blue flex-shrink-0"
                      />
                      <Bike size={20} className="text-pitstop-blue flex-shrink-0 sm:w-6 sm:h-6" />
                      <span className="font-medium text-sm sm:text-base">Moto</span>
                    </label>
                  </div>
                </div>
                
                {newVehicle.type === 'car' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Porte do Veículo</label>
                    <div className="grid grid-cols-1 gap-3">
                      {['Pequeno', 'Médio', 'Grande'].map((size) => (
                        <label 
                          key={size}
                          className={`
                            p-3 rounded-lg border cursor-pointer
                            ${newVehicle.size === size 
                              ? 'border-pitstop-blue bg-blue-50' 
                              : 'border-gray-200 hover:border-pitstop-blue/50'}
                          `}
                        >
                          <input
                            type="radio"
                            name="car-size"
                            value={size}
                            checked={newVehicle.size === size}
                            onChange={() => setNewVehicle({...newVehicle, size: size})}
                            className="hidden"
                          />
                          <div className="font-medium text-sm sm:text-base">{size}</div>
                          <div className="text-xs text-pitstop-darkGray/70 mt-1 leading-tight">
                            {vehicleSizeExamples[size as keyof typeof vehicleSizeExamples]}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="motorcycle-model" className="block text-sm font-medium mb-1">Modelo da Moto</label>
                    <select
                      id="motorcycle-model"
                      value={newVehicle.size}
                      onChange={(e) => setNewVehicle({...newVehicle, size: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                    >
                      <option value="Biz, Pop">Biz, Pop</option>
                      <option value="Titan, Fan, Bros 125/150/160">Titan, Fan, Bros 125/150/160</option>
                      <option value="Fazer, CB, Twister, XRE 190/250/300">Fazer, CB, Twister, XRE 190/250/300</option>
                      <option value="300-600cc">300-600cc</option>
                      <option value="Acima de 600cc">Acima de 600cc</option>
                    </select>
                  </div>
                )}
                
                <div className="flex gap-4 pt-2">
                  <Button onClick={handleAddVehicle}>
                    Adicionar Veículo
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingVehicle(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Função para renderizar a Etapa 3: Seleção de Serviços
  const renderStep3 = () => (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-pitstop-darkGray mb-6 flex items-center justify-center gap-3">
          🔧 <span>Selecione os Serviços</span>
        </h3>
        <p className="text-lg text-pitstop-darkGray/80 mb-8">
          Escolha os serviços para cada veículo
        </p>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border-2 border-dashed border-pitstop-silver/50">          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-pitstop-darkGray/70 text-lg mb-4">
            Você precisa adicionar pelo menos um veículo primeiro.
          </p>
          <Button
            className="bg-pitstop-blue hover:bg-pitstop-darkBlue text-white px-6 py-2 rounded-xl font-semibold"
            onClick={() => {
              setIsAddingVehicle(true);
              setCurrentStep(2);
            }}
          >
            <Plus size={18} className="mr-2" />
            Adicionar Veículo Agora
          </Button>
        </div>
      ) : (
        <div>          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-pitstop-darkGray">
                Selecione o veículo para configurar serviços:
              </label>              <Button
                variant="outline"
                className="flex items-center gap-2 border-pitstop-blue text-pitstop-blue hover:bg-pitstop-blue hover:text-white"
                onClick={() => {
                  setIsAddingVehicle(true);
                  setCurrentStep(2);
                }}
                size="sm"
              >
                <Plus size={16} />
                Adicionar Veículo
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {vehicles.map(vehicle => (
                <div                  key={vehicle.id} 
                  className={`group p-4 sm:p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedVehicleId === vehicle.id 
                      ? 'border-pitstop-blue bg-gradient-to-br from-blue-50 to-white shadow-lg' 
                      : 'border-pitstop-silver/50 hover:border-pitstop-blue/70 bg-white'
                  }`}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className={`p-2 rounded-lg ${selectedVehicleId === vehicle.id ? 'bg-pitstop-blue text-white' : 'bg-pitstop-silver/30 text-pitstop-darkGray'}`}>
                        {vehicle.type === 'car' ? <Car size={18} className="sm:w-5 sm:h-5" /> : <Bike size={18} className="sm:w-5 sm:h-5" />}
                      </div>
                      <span className="font-semibold text-pitstop-darkGray text-sm sm:text-base truncate">{vehicle.name}</span>
                    </div>
                    <button 
                      className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50 flex-shrink-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Evitar que o clique selecione o veículo
                        handleRemoveVehicle(vehicle.id);
                      }}
                      title="Remover veículo"
                    >
                      <span className="text-xs">❌</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-pitstop-darkGray/70 mb-2">
                    <span className="font-medium">
                      {vehicle.type === 'car' ? `Porte: ${vehicle.size}` : vehicle.size}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    {vehicle.services.length === 0 
                      ? <span className="text-amber-600 font-medium">⚠️ Nenhum serviço selecionado</span>
                      : <span className="text-green-600 font-medium">✅ {vehicle.services.length} serviço(s) selecionado(s)</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedVehicleId && getSelectedVehicle() && (
            <div className="mb-10">
              <h4 className="text-xl font-semibold text-pitstop-darkGray mb-6">
                Serviços para: {getSelectedVehicle()?.name}
              </h4>
              <Tabs 
                defaultValue={getSelectedVehicle()?.type === 'motorcycle' ? 'moto' : 'lavagem'}
                value={getSelectedVehicle()?.type === 'motorcycle' ? (selectedCategory === 'moto' || selectedCategory === 'servicos_adicionais_moto' ? selectedCategory : 'moto') : (selectedCategory === 'moto' || selectedCategory === 'servicos_adicionais_moto' ? 'lavagem' : selectedCategory)}
                onValueChange={(value) => {
                  const selectedVehicle = getSelectedVehicle();
                  const isMotorcycleCategory = value === 'moto' || value === 'servicos_adicionais_moto';
                  
                  if (selectedVehicle?.type === 'motorcycle' && !isMotorcycleCategory) {
                    return;
                  }
                  if (selectedVehicle?.type === 'car' && isMotorcycleCategory) {
                    return;
                  }
                  setSelectedCategory(value);
                }}
                className="mt-6"
              >                <TabsList className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 mb-6 h-auto py-2 bg-gray-100 rounded-xl overflow-x-auto md:overflow-visible">
                  {Object.entries(serviceCategories).map(([key, category]) => {
                    const selectedVehicle = getSelectedVehicle();
                    const isMotorcycleCategory = key === 'moto' || key === 'servicos_adicionais_moto';
                    const isDisabled = selectedVehicle ? 
                      (selectedVehicle.type === 'motorcycle' && !isMotorcycleCategory) || 
                      (selectedVehicle.type === 'car' && isMotorcycleCategory) : false;
                    
                    return (
                      <TabsTrigger 
                        key={key} 
                        value={key} 
                        disabled={isDisabled}
                        className={`px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all flex-shrink-0 min-w-0 ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="truncate">{category.name}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <TabsContent key={key} value={key} className="pt-6">
                    <h5 className="text-xl font-medium text-center mb-4">{category.name}</h5>
                    <p className="text-center text-pitstop-darkGray/80 mb-8 text-base">{category.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {category.services.map(service => {
                        const selectedVehicle = getSelectedVehicle();
                        const isServiceSelected = selectedVehicle?.services.some(s => s.id === service.id);
                        const currentQuantity = selectedVehicle ? 
                          serviceQuantities[selectedVehicle.id]?.[service.id] || 1 : 1;
                        const servicePrice = selectedVehicle ? 
                          calculateServicePrice(service, selectedVehicle, service.requer_quantidade ? currentQuantity : 1) : 0;
                        
                        return (
                          <div 
                            key={service.id} 
                            className={`flex flex-col p-3 sm:p-4 border rounded-lg transition-all ${
                              isServiceSelected 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-pitstop-silver/30 hover:border-pitstop-blue/50 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                <h6 className="font-medium text-base sm:text-lg leading-tight">{service.name}</h6>
                                <div className="font-semibold text-pitstop-blue text-sm sm:text-base flex-shrink-0">
                                  {typeof servicePrice === 'number' ? formatPrice(servicePrice) : servicePrice}
                                </div>
                              </div>
                              <p className="text-pitstop-darkGray/80 text-xs sm:text-sm mt-1 mb-3">
                                {service.description}
                              </p>
                              
                              {service.requer_quantidade && isServiceSelected && selectedVehicle && (
                                <div className="mt-3 mb-3">
                                  <label className="block text-xs sm:text-sm font-medium mb-1">Quantidade</label>
                                  <div className="flex items-center gap-2 max-w-32">
                                    <Input
                                      type="number"
                                      min="1"
                                      max="99"
                                      value={currentQuantity}
                                      onChange={(e) => {
                                        const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                                        handleQuantityChange(selectedVehicle.id, service.id, newQuantity);
                                      }}
                                      className="text-center text-sm h-8"
                                    />
                                    <span className="text-xs text-pitstop-darkGray/70 whitespace-nowrap">unidade(s)</span>
                                  </div>
                                </div>
                              )}
                              
                              <div className="mt-3 text-right">
                                {isServiceSelected ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-500 border-red-500 hover:bg-red-50 text-xs sm:text-sm w-full sm:w-auto"
                                    onClick={() => handleRemoveService(selectedVehicleId, service.id)}
                                  >
                                    Remover
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-green-600 border-green-600 hover:bg-green-50 text-xs sm:text-sm w-full sm:w-auto"
                                    onClick={() => handleAddService(selectedVehicleId, key, service)}
                                  >
                                    Adicionar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Função para renderizar a Etapa 4: Revisão
  const renderStep4 = () => (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-pitstop-darkGray mb-6 flex items-center justify-center gap-3">
          📋 <span>Revise seu Pedido</span>
        </h3>
        <p className="text-lg text-pitstop-darkGray/80 mb-8">
          Confira todos os detalhes antes de finalizar
        </p>
      </div>      <div className="bg-white rounded-xl border border-pitstop-silver/30 overflow-hidden">
        <div className="bg-pitstop-blue/10 p-4 border-b flex justify-between items-center">
          <h4 className="text-xl font-semibold text-pitstop-darkGray flex items-center gap-2">
            👤 Cliente: {customerName}
          </h4>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-pitstop-blue text-pitstop-blue hover:bg-pitstop-blue hover:text-white"
            onClick={() => {
              setIsAddingVehicle(true);
              setCurrentStep(2);
            }}
            size="sm"
          >
            <Plus size={16} />
            Adicionar Veículo
          </Button>
        </div>
        
        {vehicles.length > 0 && vehicles.some(v => v.services.length > 0) ? (
          <div className="p-6 space-y-6">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="border rounded-lg overflow-hidden">                <div className="bg-gray-100 px-4 py-3 font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {vehicle.type === 'car' ? <Car size={18} /> : <Bike size={18} />}
                    <span>{vehicle.name}</span>
                    <span className="text-sm text-pitstop-darkGray/70">
                      {vehicle.type === 'car' ? `(Porte ${vehicle.size})` : `(${vehicle.size})`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 flex-shrink-0"
                      onClick={() => handleRemoveVehicle(vehicle.id)}
                      title="Remover veículo"
                    >
                      <span className="text-xs">❌</span>
                    </button>
                    <div 
                      className="text-pitstop-blue cursor-pointer hover:underline"
                      onClick={() => setCurrentStep(3)}
                    >
                      Editar
                    </div>
                  </div>
                </div>
                
                {vehicle.services.length === 0 ? (
                  <div className="p-4 text-center text-amber-600">
                    Nenhum serviço selecionado para este veículo
                  </div>
                ) : (
                  <div className="p-4">
                    <table className="w-full">
                      <thead className="text-left text-sm text-pitstop-darkGray/70">
                        <tr>
                          <th className="pb-2">Serviço</th>
                          <th className="pb-2 text-center">Qtd</th>
                          <th className="pb-2 text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicle.services.map(service => (
                          <tr key={service.id} className="border-t border-gray-100">
                            <td className="py-2">{service.name}</td>
                            <td className="py-2 text-center">
                              {service.requer_quantidade ? service.quantity || 1 : "-"}
                            </td>
                            <td className="py-2 text-right">
                              {typeof service.price === 'number' ? formatPrice(service.price) : service.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t">
                          <td className="py-2 font-medium">Total para este veículo</td>
                          <td className="py-2 text-center">-</td>
                          <td className="py-2 font-medium text-right">
                            {formatPrice(vehicle.services.reduce((total, service) => 
                              total + (typeof service.price === 'number' ? service.price : 0), 0
                            ))}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            ))}
            
            <div className="bg-pitstop-blue/10 p-6 rounded-lg">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total do Orçamento:</span>
                <span className="text-pitstop-blue">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-amber-700">
            <p>Nenhum serviço selecionado. Volte para adicionar serviços aos seus veículos.</p>
          </div>
        )}
      </div>
    </div>
  );
  // Função para renderizar a Etapa 5: Finalização
  const renderStep5 = () => (
    <div className="text-center">
      <div className="text-8xl mb-6">🎉</div>
      <h3 className="text-3xl font-bold text-pitstop-darkGray mb-6">
        Parabéns, {customerName}!
      </h3>
      <p className="text-lg text-pitstop-darkGray/80 mb-8">
        Seu agendamento está pronto! Vamos finalizar via WhatsApp.
      </p>      
      {vehicles.length > 0 && (
        <div className="mb-8 bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold text-pitstop-darkGray">Veículos incluídos:</h4>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-pitstop-blue text-pitstop-blue hover:bg-pitstop-blue hover:text-white"
              onClick={() => {
                setIsAddingVehicle(true);
                setCurrentStep(2);
              }}
              size="sm"
            >
              <Plus size={16} />
              Adicionar Veículo
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-2">
                  {vehicle.type === 'car' ? <Car size={16} /> : <Bike size={16} />}
                  <span className="font-medium">{vehicle.name}</span>
                  <span className="text-xs text-pitstop-darkGray/70">
                    ({vehicle.type === 'car' ? `Porte ${vehicle.size}` : vehicle.size})
                  </span>
                </div>
                <button 
                  className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 flex-shrink-0"
                  onClick={() => handleRemoveVehicle(vehicle.id)}
                  title="Remover veículo"
                >
                  <span className="text-xs">❌</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6 mb-8">
        <p className="text-green-700 font-medium mb-2 flex items-center justify-center gap-2">
          ✅ Total: {formatPrice(calculateTotal())}
        </p>
        <p className="text-sm text-green-600">
          Clique no botão abaixo para enviar os detalhes via WhatsApp e confirmar seu agendamento
        </p>
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <Button
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-4 px-8 flex items-center justify-center gap-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mx-auto"
          onClick={handleWhatsAppBooking}
        >
          <CheckCircle size={22} />
          🚀 Finalizar via WhatsApp
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setCurrentStep(4)}
          className="mx-auto"
        >
          ← Voltar para revisar
        </Button>
      </div>
    </div>
  );

  // Função para renderizar o conteúdo baseado na etapa atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  // Função para renderizar os botões de navegação
  const renderNavigationButtons = () => {
    return (
      <div className="flex flex-row justify-between items-center mt-8 gap-4">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 w-auto"
            >
              <ArrowLeft size={16} />
              <span className="hidden xs:inline">Anterior</span>
              <span className="xs:hidden">Voltar</span>
            </Button>
          )}
        </div>
        
        <div className="text-sm text-pitstop-darkGray/60">
          Etapa {currentStep} de {totalSteps}
        </div>
        
        <div>
          {currentStep < totalSteps && (
            <Button
              onClick={handleNextStep}
              className="flex items-center gap-2 bg-pitstop-blue hover:bg-pitstop-darkBlue w-auto"
              disabled={!validateStep(currentStep)}
            >
              <span className="hidden xs:inline">Próximo</span>
              <span className="xs:hidden">Avançar</span>
              <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-pitstop-silver/20 overflow-hidden" id="booking">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pitstop-blue/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pitstop-darkBlue/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pitstop-darkGray mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue bg-clip-text text-transparent">
              Agende seu Serviço
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-pitstop-darkGray/80 max-w-2xl mx-auto leading-relaxed px-4">
            Siga os passos para agendar seus serviços de forma rápida e prática.
            <span className="font-semibold text-pitstop-blue"> Vamos começar!</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12 border border-white/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-pitstop-blue/10 to-transparent rounded-full -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-tr from-pitstop-darkBlue/10 to-transparent rounded-full translate-y-12 sm:translate-y-24 -translate-x-12 sm:-translate-x-24"></div>
            
            <div className="relative">
              {/* Progress Indicator */}
              {renderProgressIndicator()}
              
              {/* Current Step Content */}
              {renderCurrentStep()}
              
              {/* Navigation Buttons */}
              {renderNavigationButtons()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;


