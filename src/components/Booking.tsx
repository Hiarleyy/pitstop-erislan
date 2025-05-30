import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bike, Plus, Check } from 'lucide-react';
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

const Booking = () => {  const [customerName, setCustomerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("lavagem");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);  const [newVehicle, setNewVehicle] = useState<{
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
    if (selectedVehicleId === vehicleId) {
      setSelectedVehicleId(vehicles.length > 1 ? vehicles[0].id : null);
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
  }, [toast]);

  return (
    <section id="booking" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pitstop-darkGray mb-4">Agende seu Serviço</h2>
          <div className="w-20 h-1 bg-pitstop-blue mx-auto mb-6"></div>
          <p className="text-lg text-pitstop-darkGray/80 max-w-2xl mx-auto">
            Escolha os serviços para seus veículos e agende o melhor dia e horário.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-lg shadow-md p-6 md:p-8 border border-pitstop-silver/30">
            {/* Adicione esta seção para o nome do cliente */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-pitstop-darkGray mb-4">Seus Dados</h3>
              <div className="max-w-md">
                <label htmlFor="customer-name" className="block text-sm font-medium mb-2">Nome Completo</label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Resto do código existente */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-pitstop-darkGray">Seus Veículos</h3>
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => setIsAddingVehicle(true)}
                >
                  <Plus size={16} />
                  <span>Adicionar Veículo</span>
                </Button>
              </div>

              {vehicles.length === 0 ? (
                <div className="text-center py-8 bg-gray-100 rounded-lg">
                  <p className="text-pitstop-darkGray/70">Nenhum veículo adicionado. Adicione um veículo para começar.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {vehicles.map(vehicle => (
                    <div 
                      key={vehicle.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedVehicleId === vehicle.id 
                          ? 'border-pitstop-blue bg-blue-50' 
                          : 'border-gray-200 hover:border-pitstop-blue/50'
                      }`}
                      onClick={() => setSelectedVehicleId(vehicle.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {vehicle.type === 'car' ? <Car size={18} /> : <Bike size={18} />}
                          <span className="font-medium">{vehicle.name}</span>
                        </div>
                        <button 
                          className="text-red-500 text-sm hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveVehicle(vehicle.id);
                          }}
                        >
                          Remover
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-pitstop-darkGray/70">
                        {vehicle.type === 'car' ? `Porte: ${vehicle.size}` : vehicle.size}
                      </div>
                      <div className="mt-1 text-sm">
                        {vehicle.services.length === 0 
                          ? <span className="text-amber-600">Nenhum serviço selecionado</span>
                          : <span className="text-green-600">{vehicle.services.length} serviço(s) selecionado(s)</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isAddingVehicle && (
              <div className="mb-8 p-6 border border-dashed rounded-lg">
                <h4 className="text-lg font-medium mb-4">Adicionar Veículo</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="vehicle-name" className="block text-sm font-medium mb-1">Nome do Veículo</label>
                    <Input
                      id="vehicle-name"
                      value={newVehicle.name}
                      onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                      placeholder="Ex: Cb 500, Civic, etc."
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Veículo</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={newVehicle.type === 'car'}                          onChange={() => setNewVehicle({
                            ...newVehicle, 
                            type: 'car', 
                            size: 'Pequeno' // Always set default car size
                          })}
                          className="w-4 h-4"
                        />
                        <Car size={18} />
                        <span>Carro</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={newVehicle.type === 'motorcycle'}                          onChange={() => setNewVehicle({
                            ...newVehicle, 
                            type: 'motorcycle',
                            size: 'Biz, Pop' // Always set default motorcycle size
                          })}
                          className="w-4 h-4"
                        />
                        <Bike size={18} />
                        <span>Moto</span>
                      </label>
                    </div>
                  </div>
                  
                  {newVehicle.type === 'car' ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">Porte do Veículo</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Pequeno', 'Médio', 'Grande'].map((size) => (
                          <label 
                            key={size}
                            className={`
                              p-3 rounded-lg border cursor-pointer text-center
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
                            <div className="font-medium">{size}</div>
                            <div className="text-xs text-pitstop-darkGray/70 mt-1">
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
                        className="w-full p-2 border border-gray-300 rounded-md"
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

            {selectedVehicleId && getSelectedVehicle() && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-pitstop-darkGray mb-20">
                  Selecionar Serviços para: {getSelectedVehicle()?.name}
                </h3>
                  <Tabs 
                  defaultValue={getSelectedVehicle()?.type === 'motorcycle' ? 'moto' : 'lavagem'}
                  value={getSelectedVehicle()?.type === 'motorcycle' ? (selectedCategory === 'moto' || selectedCategory === 'servicos_adicionais_moto' ? selectedCategory : 'moto') : (selectedCategory === 'moto' || selectedCategory === 'servicos_adicionais_moto' ? 'lavagem' : selectedCategory)}
                  onValueChange={(value) => {
                    const selectedVehicle = getSelectedVehicle();
                    const isMotorcycleCategory = value === 'moto' || value === 'servicos_adicionais_moto';
                    
                    // Se for moto, só permite categorias de moto
                    if (selectedVehicle?.type === 'motorcycle' && !isMotorcycleCategory) {
                      return;
                    }
                    // Se for carro, impede a seleção das categorias de moto
                    if (selectedVehicle?.type === 'car' && isMotorcycleCategory) {
                      return;
                    }
                    setSelectedCategory(value);
                  }}
                  className="mt-6"
                >
                  <TabsList className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-1 h-full py-2 bg-gray-100 rounded-xl">
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
                          className={`px-4 py-3 text-base font-medium transition-all ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {category.name}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  
                  {Object.entries(serviceCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className="pt-20">
                      <h4 className="text-xl font-medium text-center mb-4">{category.name}</h4>
                      <p className="text-center text-pitstop-darkGray/80 mb-8 text-base">{category.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                              className={`flex p-4 border rounded-lg transition-all ${
                                isServiceSelected 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-pitstop-silver/30 hover:border-pitstop-blue/50 hover:shadow-sm'
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-lg">{service.name}</h5>
                                  <div className="font-semibold text-pitstop-blue">
                                    {typeof servicePrice === 'number' ? formatPrice(servicePrice) : servicePrice}
                                  </div>
                                </div>
                                <p className="text-pitstop-darkGray/80 text-sm mt-1">
                                  {service.description}
                                </p>
                                
                                {/* Quantity input for services that require it */}
                                {service.requer_quantidade && isServiceSelected && selectedVehicle && (
                                  <div className="mt-3 mb-3">
                                    <label className="block text-sm font-medium mb-1">Quantidade</label>
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
                                        className="text-center"
                                      />
                                      <span className="text-sm text-pitstop-darkGray/70">unidade(s)</span>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="mt-3 text-right">
                                  {isServiceSelected ? (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-red-500 border-red-500 hover:bg-red-50"
                                      onClick={() => handleRemoveService(selectedVehicleId, service.id)}
                                    >
                                      Remover
                                    </Button>
                                  ) : (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-green-600 border-green-600 hover:bg-green-50"
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

            {vehicles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-pitstop-darkGray mb-4">Resumo do Agendamento</h3>
                
                {vehicles.some(v => v.services.length > 0) ? (
                  <div className="space-y-6">
                    {vehicles.map(vehicle => (
                      <div key={vehicle.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-100 px-4 py-3 font-medium flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {vehicle.type === 'car' ? <Car size={18} /> : <Bike size={18} />}
                            <span>{vehicle.name}</span>
                            <span className="text-sm text-pitstop-darkGray/70">
                              {vehicle.type === 'car' ? `(Porte ${vehicle.size})` : `(${vehicle.size})`}
                            </span>
                          </div>
                          <div 
                            className="text-pitstop-blue cursor-pointer hover:underline"
                            onClick={() => setSelectedVehicleId(vehicle.id)}
                          >
                            Editar
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
                    
                    <div className="bg-pitstop-blue/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total do Orçamento:</span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-amber-50 rounded-lg text-amber-700">
                    <p>Nenhum serviço selecionado. Adicione serviços aos seus veículos para continuar.</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="text-center mt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white text-lg py-3 px-8 flex items-center gap-2"
                  onClick={handleWhatsAppBooking}
                  disabled={vehicles.length === 0 || vehicles.every(v => v.services.length === 0)}
                >
                  <CheckCircle size={20} />
                  Agendar seu Horário
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;


