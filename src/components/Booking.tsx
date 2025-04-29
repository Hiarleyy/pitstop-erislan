import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bike, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';

type VehicleType = 'car' | 'motorcycle';
type CarSize = 'Pequeno' | 'Médio' | 'Grande';
type MotorcycleSize = string;

interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  size: CarSize | MotorcycleSize;
  services: {
    id: string;
    category: string;
    name: string;
    price: number;
  }[];
}

const vehicleSizeExamples = {
  Pequeno: "Ex: HB20, Onix, Gol, Ka, Up",
  Médio: "Ex: Civic, Corolla, Cruze, Focus",
  Grande: "Ex: SW4, Hilux, Amarok, SUVs grandes"
};

const serviceCategories = {
  limpezaInterna: {
    name: "Limpeza Interna",
    description: "Serviços internos de limpeza para bancos, painéis e carpetes",
    services: [
      {
        id: "limpeza-bancos-couro",
        name: "Limpeza bancos de couro",
        description: "Limpeza detalhada dos bancos de couro",
        prices: { Pequeno: 120, Médio: 120, Grande: 120 }
      },
      {
        id: "limpeza-tecido",
        name: "Limpeza bancos de tecido",
        description: "Limpeza completa de bancos de tecido",
        prices: { Pequeno: 180, Médio: 180, Grande: 180 }
      },
      {
        id: "limpeza-teto",
        name: "Limpeza de teto e colunas",
        description: "Higienização das partes superiores internas do veículo",
        prices: { Pequeno: 80, Médio: 80, Grande: 80 }
      },
      {
        id: "painel-portas",
        name: "Painel, portas e plásticos",
        description: "Limpeza de painel, portas e condicionamento de plásticos",
        prices: { Pequeno: 40, Médio: 40, Grande: 40 }
      },
      {
        id: "carpete-feltro",
        name: "Limpeza carpete e feltro",
        description: "Limpeza profunda do carpete e feltro",
        prices: { Pequeno: 100, Médio: 100, Grande: 100 }
      }
    ]
  },
  estofados: {
    name: "Tratamentos para Estofados",
    description: "Serviços especializados para manter o estofamento do veículo conservado",
    services: [
      {
        id: "hidratante-couro",
        name: "Condicionamento hidratante bancos de couro",
        description: "Aplicação de condicionador para manter o couro hidratado",
        prices: { Pequeno: 20, Médio: 20, Grande: 20 }
      }
    ]
  },
  impermeabilizacao: {
    name: "Impermeabilização",
    description: "Serviços de proteção contra líquidos e sujeiras",
    services: [
      {
        id: "impermeabilizacao-bancos",
        name: "Impermeabilização de bancos",
        description: "Proteção dos bancos contra líquidos e sujeiras",
        prices: { Pequeno: 300, Médio: 300, Grande: 300 }
      }
    ]
  },
  combos: {
    name: "Combos de Higienização",
    description: "Combinações de serviços para limpeza completa do veículo",
    services: [
      {
        id: "combo-interna-cera",
        name: "Combo Higienização Interna + Lav. e Cera",
        description: "Combo de serviços internos com lavagem e cera",
        prices: { Pequeno: 300, Médio: 350, Grande: 400 }
      },
      {
        id: "combo-interna-geral",
        name: "Combo Higienização Interna + Lavagem Geral",
        description: "Higienização completa com lavagem total do veículo",
        prices: { Pequeno: 400, Médio: 450, Grande: 500 }
      }
    ]
  },
  lavagem: {
    name: "Lavagem",
    description: "Lavagens profissionais com diferentes níveis de cuidado",
    services: [
      {
        id: "lavagem-tradicional",
        name: "Lavagem tradicional",
        description: "Shampoo, aspiração, condicionamento de plásticos e pneus, aromatizante",
        prices: { Pequeno: 40, Médio: 60, Grande: 80 }
      },
      {
        id: "lavagem-classica",
        name: "Lavagem clássica",
        description: "Adição de cera limpadora ao serviço tradicional",
        prices: { Pequeno: 50, Médio: 70, Grande: 90 }
      },
      {
        id: "lavagem-premium",
        name: "Lavagem premium",
        description: "Inclui lavagem de chassi, cera premium, selante pneus e aromatizante",
        prices: { Pequeno: 80, Médio: 100, Grande: 120 }
      }
    ]
  },
  chassis: {
    name: "Serviços Chassi e Motor",
    description: "Tratamentos para parte inferior e motor do veículo",
    services: [
      {
        id: "lavagem-chassi",
        name: "Lavagem de chassi",
        description: "Limpeza da parte inferior do carro",
        prices: { Pequeno: 40, Médio: 40, Grande: 40 }
      },
      {
        id: "anticorrosivo",
        name: "Anticorrosivo chassi",
        description: "Proteção contra ferrugem no chassi",
        prices: { Pequeno: 30, Médio: 30, Grande: 30 }
      },
      {
        id: "lavagem-motor",
        name: "Lavagem motor + proteção",
        description: "Limpeza do motor com proteção contra oxidação",
        prices: { Pequeno: 50, Médio: 50, Grande: 50 }
      },
      {
        id: "impermeabilizacao-brisa",
        name: "Impermeabilização para brisa",
        description: "Proteção repelente para o para-brisa",
        prices: { Pequeno: 50, Médio: 50, Grande: 50 }
      },
      {
        id: "polimento-farois",
        name: "Polimento faróis",
        description: "Restauração e polimento dos faróis",
        prices: { Pequeno: 120, Médio: 120, Grande: 120 }
      },
      {
        id: "vitrificacao-farois",
        name: "Vitrificação faróis",
        description: "Aplicação de camada vitrificada para proteção dos faróis",
        prices: { Pequeno: 50, Médio: 50, Grande: 50 }
      }
    ]
  }
};


const generateId = () => Math.random().toString(36).substring(2, 10);

const Booking = () => {
  const [customerName, setCustomerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('higienizacao');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: 'car' as VehicleType,
    size: 'Pequeno' as CarSize
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const { toast } = useToast();

  const calculateServicePrice = (service: any, vehicle: Vehicle) => {
    if (vehicle.type === 'car') {
      if (service.prices && service.prices[vehicle.size as CarSize] !== undefined) {
        return service.prices[vehicle.size as CarSize];
      }
      return 0;
    } else if (vehicle.type === 'motorcycle') {
      if (service.priceMultiplier && service.baseService) {
        const baseService = serviceCategories.motos.services.find(s => s.id === service.baseService);
        if (baseService && baseService.prices) {
          const basePrice = Object.entries(baseService.prices).reduce((acc, [model, price]) => {
            const motorcycleSize = vehicle.size as string;
            if (motorcycleSize && model.includes(motorcycleSize)) return price as number;
            return acc;
          }, 0);
          return basePrice * service.priceMultiplier;
        }
      }
      
      if (service.priceRange) return service.priceRange;
      
      if (service.fixedPrice) return service.fixedPrice;
      
      if (service.basePrice) return service.basePrice;
      
      if (service.prices) {
        return Object.entries(service.prices).reduce((acc, [model, price]) => {
          const motorcycleSize = vehicle.size as string;
          if (motorcycleSize && model.includes(motorcycleSize)) return price;
          return acc;
        }, 'Preço variável');
      }
      
      return 'Consultar';
    }
    return 0;
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

    const vehicleId = generateId();
    
    const vehicle: Vehicle = {
      id: vehicleId,
      name: newVehicle.name,
      type: newVehicle.type,
      size: newVehicle.type === 'car' ? 
        (newVehicle.size as CarSize) : 
        (newVehicle.name as MotorcycleSize),
      services: []
    };
    
    setVehicles([...vehicles, vehicle]);
    
    setNewVehicle({
      name: '',
      type: 'car',
      size: 'Pequeno' as CarSize
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
          const price = calculateServicePrice(service, vehicle);
          return {
            ...vehicle,
            services: [...vehicle.services, {
              id: service.id,
              category: categoryId,
              name: service.name,
              price: typeof price === 'number' ? price : 0
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
    const phoneNumber = "5591980588823";
    
    // Criar a URL do WhatsApp com a mensagem
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
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
          <h2 className="text-3xl md:text-4xl font-bold text-pitstop-darkGray mb-4">Continuar</h2>
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
                      placeholder="Ex: Meu Carro, Minha Moto"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Veículo</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={newVehicle.type === 'car'}
                          onChange={() => setNewVehicle({...newVehicle, type: 'car'})}
                          className="w-4 h-4"
                        />
                        <Car size={18} />
                        <span>Carro</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={newVehicle.type === 'motorcycle'}
                          onChange={() => setNewVehicle({...newVehicle, type: 'motorcycle' as const})}
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
                        <option value="Biz, Pop">Biz, Pop (R$ 20)</option>
                        <option value="Titan, Fan, Bros 125/150/160">Titan, Fan, Bros 125/150/160 (R$ 25)</option>
                        <option value="Fazer, CB, Twister, XRE 190/250/300">Fazer, CB, Twister, XRE 190/250/300 (R$ 30)</option>
                        <option value="300-600cc">300-600cc (R$ 40)</option>
                        <option value="Acima de 600cc">Acima de 600cc (R$ 50)</option>
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
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-pitstop-darkGray mb-4">
                  Selecionar Serviços para: {getSelectedVehicle()?.name}
                </h3>
                
                <Tabs 
                  defaultValue={getSelectedVehicle()?.type === 'motorcycle' ? 'motos' : 'higienizacao'}
                  onValueChange={setSelectedCategory}
                >
                  <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-10 w-full mt-10">
                    {Object.entries(serviceCategories).map(([key, category]) => (
                      <TabsTrigger 
                        key={key} 
                        value={key} 
                        disabled={getSelectedVehicle()?.type === 'motorcycle' && key !== 'motos'}
                        className={getSelectedVehicle()?.type === 'motorcycle' && key !== 'motos' ? 'opacity-50' : ''}
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.entries(serviceCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className="pt-4">
                      <h4 className="text-lg font-medium text-center mb-2">{category.name}</h4>
                      <p className="text-center text-pitstop-darkGray/80 mb-6">{category.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.services.map(service => {
                          const selectedVehicle = getSelectedVehicle();
                          const isServiceSelected = selectedVehicle?.services.some(s => s.id === service.id);
                          const servicePrice = selectedVehicle ? calculateServicePrice(service, selectedVehicle) : 0;
                          
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
                                    {typeof servicePrice === 'number' ? `R$ ${servicePrice}` : servicePrice}
                                  </div>
                                </div>
                                <p className="text-pitstop-darkGray/80 text-sm mt-1">
                                  {service.description}
                                </p>
                                
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
                                  <th className="pb-2 text-right">Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vehicle.services.map(service => (
                                  <tr key={service.id} className="border-t border-gray-100">
                                    <td className="py-2">{service.name}</td>
                                    <td className="py-2 text-right">
                                      {typeof service.price === 'number' ? `R$ ${service.price}` : 'Variável'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr className="border-t">
                                  <td className="py-2 font-medium">Total para este veículo</td>
                                  <td className="py-2 font-medium text-right">
                                    R$ {vehicle.services.reduce((total, service) => 
                                      total + (typeof service.price === 'number' ? service.price : 0), 0
                                    )}
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
                        <span>R$ {calculateTotal()}</span>
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


