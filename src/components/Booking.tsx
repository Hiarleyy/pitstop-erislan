import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bike, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
  higienizacao: {
    name: "Higienização e Limpeza",
    description: "Serviços completos de limpeza e higienização para seu veículo",
    services: [
      { 
        id: "lavagem-completa", 
        name: "Lavagem completa", 
        description: "Limpeza minuciosa interna e externa do seu veículo.",
        prices: { Pequeno: 50, Médio: 60, Grande: 70 } 
      },
      { 
        id: "lavagem-tecnica", 
        name: "Lavagem técnica interna", 
        description: "Limpeza profunda de toda parte interna do veículo.",
        prices: { Pequeno: 100, Médio: 110, Grande: 120 } 
      },
      { 
        id: "higienizacao-tecido", 
        name: "Higienização interna + banco tecido", 
        description: "Processo completo de limpeza para eliminar sujeiras, odores e ácaros de bancos de tecido.",
        prices: { Pequeno: 250, Médio: 280, Grande: 300 } 
      },
      { 
        id: "higienizacao-couro", 
        name: "Higienização interna + banco couro", 
        description: "Processo especializado para limpeza e conservação de estofados em couro.",
        prices: { Pequeno: 200, Médio: 230, Grande: 250 } 
      }
    ]
  },
  estetica: {
    name: "Estética da Pintura",
    description: "Tratamentos para realçar e restaurar a beleza da pintura do seu veículo",
    services: [
      { 
        id: "polimento-comercial", 
        name: "Polimento comercial", 
        description: "Tratamento básico para melhorar o brilho da pintura.",
        prices: { Pequeno: 200, Médio: 250, Grande: 300 } 
      },
      { 
        id: "polimento-1estagio", 
        name: "Polimento técnico (1 estágio)", 
        description: "Remoção de riscos superficiais e restauração do brilho da pintura.",
        prices: { Pequeno: 300, Médio: 350, Grande: 400 } 
      },
      { 
        id: "polimento-2estagios", 
        name: "Polimento técnico (2 estágios)", 
        description: "Tratamento avançado para remoção de riscos mais profundos e restauração completa do brilho.",
        prices: { Pequeno: 400, Médio: 450, Grande: 500 } 
      },
      { 
        id: "polimento-tecnico", 
        name: "Polimento técnico completo", 
        description: "Tratamento completo para recuperação total da pintura.",
        prices: { Pequeno: 300, Médio: 400, Grande: 500 } 
      },
      { 
        id: "descontaminacao", 
        name: "Descontaminação da pintura + cera", 
        description: "Remoção de contaminantes impregnados na pintura e proteção com cera de carnaúba.",
        prices: { Pequeno: 150, Médio: 180, Grande: 200 } 
      }
    ]
  },
  protecao: {
    name: "Proteção de Pintura",
    description: "Produtos e tratamentos que protegem a pintura do seu veículo contra danos",
    services: [
      { 
        id: "vitrificacao", 
        name: "Vitrifica��ão (até 3 anos)", 
        description: "Proteção premium com durabilidade de até 3 anos, aumentando o brilho e facilitando a limpeza.",
        prices: { Pequeno: 750, Médio: 850, Grande: 1000 } 
      },
      { 
        id: "vitrificacao-vonixx", 
        name: "Vitrificação Vonixx", 
        description: "Proteção premium com tecnologia Vonixx para máxima durabilidade e brilho intenso.",
        prices: { Pequeno: 1300, Médio: 1500, Grande: 1700 } 
      },
      { 
        id: "vitrificacao-carpro", 
        name: "Vitrificação Car Pro", 
        description: "Proteção de alto desempenho com tecnologia Car Pro para proteção superior.",
        prices: { Pequeno: 1800, Médio: 2200, Grande: 2500 } 
      },
      { 
        id: "selante", 
        name: "Selante sintético (6 meses)", 
        description: "Proteção intermediária com durabilidade de até 6 meses.",
        prices: { Pequeno: 200, Médio: 250, Grande: 300 } 
      }
    ]
  },
  interiores: {
    name: "Interiores",
    description: "Serviços especializados para as partes internas do seu veículo",
    services: [
      { 
        id: "hidratacao", 
        name: "Hidratação de couro", 
        description: "Tratamento especial para hidratar e proteger bancos e estofados em couro.",
        prices: { Pequeno: 100, Médio: 120, Grande: 150 } 
      },
      { 
        id: "lavagem-teto", 
        name: "Lavagem de teto", 
        description: "Limpeza profunda do forro do teto.",
        prices: { Pequeno: 100, Médio: 130, Grande: 150 } 
      },
      { 
        id: "lavagem-banco", 
        name: "Lavagem de banco (individual)", 
        description: "Limpeza específica de um único banco.",
        prices: { Unidade: 60 } 
      },
      { 
        id: "lavagem-carpete", 
        name: "Lavagem de carpete + forro", 
        description: "Limpeza completa de carpetes e forros internos.",
        prices: { Pequeno: 150, Médio: 180, Grande: 200 } 
      }
    ]
  },
  motos: {
    name: "Serviços para Motos",
    description: "Serviços específicos para motocicletas",
    services: [
      { 
        id: "lavagem-moto-simples", 
        name: "Lavagem simples", 
        description: "Limpeza básica para diferentes modelos de motocicletas.",
        prices: { 
          "Biz, Pop": 20, 
          "Titan, Fan, Bros 125/150/160": 25, 
          "Fazer, CB, Twister, XRE 190/250/300": 30, 
          "300-600cc": 40, 
          "Acima de 600cc": 50 
        } 
      },
      { 
        id: "lavagem-moto-detalhada", 
        name: "Lavagem detalhada", 
        description: "Desmontagem de carenagem e banco quando necessário, limpeza de couro, aplicação de selante na pintura, selante de pneus, lubrificação.",
        priceMultiplier: 2,
        baseService: "lavagem-moto-simples"
      },
      { 
        id: "vitrificacao-moto", 
        name: "Vitrificação para motos", 
        description: "Proteção de alta durabilidade para a pintura da sua motocicleta.",
        priceRange: "R$ 150 a R$ 250" 
      },
      { 
        id: "polimento-tanque", 
        name: "Polimento de tanque", 
        description: "Tratamento específico para o tanque da motocicleta.",
        fixedPrice: 40 
      },
      { 
        id: "polimento-moto", 
        name: "Polimento completo", 
        description: "Tratamento para toda a pintura da motocicleta.",
        basePrice: 60 
      },
      { 
        id: "cera-v80", 
        name: "Aplicação de cera v80", 
        description: "Proteção básica para a pintura da motocicleta.",
        fixedPrice: 10 
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
    
    message.push("*Solicitação de Agendamento - PitStop Erislan*");
    
    // Adicionar o nome do cliente
    if (customerName.trim()) {
      message.push(`\n*Cliente:* ${customerName}`);
    }
    
    message.push("\n");
    message.push("*Detalhes dos Serviços:*");
    
    // Resto da função permanece igual
    vehicles.forEach(vehicle => {
      // ...código existente
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
    const phoneNumber = "5591988939655";
    
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
                  <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6 w-full">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.517 0-3.007-.4-4.313-1.152l-.31-.186-3.2.836.85-3.102-.203-.314a8.845 8.845 0 0 1-1.355-4.736c0-4.899 3.99-8.888 8.894-8.888 2.377 0 4.611.926 6.29 2.605a8.837 8.837 0 0 1 2.605 6.289c-.002 4.899-3.992 8.888-8.896 8.888m7.633-16.525A10.66 10.66 0 0 0 12.05 2.625c-5.89 0-10.683 4.793-10.683 10.683 0 1.888.497 3.73 1.436 5.36L2 23.718l5.215-.719a10.683 10.683 0 0 0 5.108 1.309c5.89 0 10.683-4.793 10.683-10.683 0-2.856-1.111-5.542-3.13-7.56"/>
                  </svg>
                  Agendar via WhatsApp
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


