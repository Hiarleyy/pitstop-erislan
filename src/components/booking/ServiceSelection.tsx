import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateServicePrice, formatPrice, getServiceCategories } from '@/lib/serviceHelpers';
import { ServiceFromLib, Vehicle } from '@/types/booking';
import { Check, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

interface ServiceSelectionProps {
  vehicles: Vehicle[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAddService: (vehicleId: string, service: ServiceFromLib & { category?: string; price?: number | string }) => void;
  onRemoveService: (vehicleId: string, serviceId: string) => void;
  onUpdateQuantity: (vehicleId: string, serviceId: string, quantity: number) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  vehicles,
  selectedCategory,
  onCategoryChange,
  onAddService,
  onRemoveService,
  onUpdateQuantity
}) => {
  const serviceCategories = getServiceCategories();
  
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (key: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [key]: Math.max(1, quantity) }));
  };

  const isServiceSelected = (vehicleId: string, serviceName: string): boolean => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle?.services.some(service => service.name === serviceName) || false;
  };

  const getSelectedServiceQuantity = (vehicleId: string, serviceName: string): number => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    const service = vehicle?.services.find(service => service.name === serviceName);
    return service?.quantity || 1;
  };

  const handleServiceToggle = (vehicleId: string, service: ServiceFromLib) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    if (isServiceSelected(vehicleId, service.name)) {
      const selectedService = vehicle.services.find(s => s.name === service.name);
      if (selectedService) {
        onRemoveService(vehicleId, selectedService.id);
      }
    } else {
      onAddService(vehicleId, service);
    }
  };

  const renderServicePrice = (service: ServiceFromLib, vehicle: Vehicle) => {
    const price = calculateServicePrice(service, vehicle.type, vehicle.size, 1);
    
    if (service.valor_a_combinar) {
      return <span className="text-pitstop-blue font-semibold">A combinar</span>;
    }
    
    if (typeof price === 'number') {
      return (
        <span className="text-pitstop-blue font-semibold">
          {formatPrice(price)}
        </span>
      );
    }
    
    return <span className="text-pitstop-darkGray">Consulte</span>;
  };

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-pitstop-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-pitstop-blue" />
        </div>
        <h3 className="text-lg font-medium text-pitstop-darkGray mb-2">
          Adicione um veículo primeiro
        </h3>
        <p className="text-pitstop-darkGray/70">
          Para selecionar serviços, você precisa adicionar pelo menos um veículo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Service Categories Tabs */}
      <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
        <TabsList className="flex w-full flex-wrap gap-1 h-auto p-2 mb-6 bg-gray-50">
          {Object.entries(serviceCategories).map(([key, category]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className="flex-1 min-w-[100px] text-xs px-3 py-2 font-medium transition-all duration-200 data-[state=active]:bg-pitstop-blue data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-100"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(serviceCategories).map(([categoryKey, category]) => (
          <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-pitstop-darkGray mb-2">
                {category.name}
              </h3>
              <p className="text-pitstop-darkGray/70">
                {category.description}
              </p>
            </div>

            {vehicles.map((vehicle) => {
              const hasSelectedServices = vehicle.services && vehicle.services.length > 0;
              
              return (
                <div 
                  key={vehicle.id} 
                  className={`bg-white rounded-xl border transition-all duration-200 p-6 ${
                    hasSelectedServices 
                      ? 'border-pitstop-blue/50 shadow-lg ring-2 ring-pitstop-blue/10' 
                      : 'border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    hasSelectedServices 
                      ? 'bg-pitstop-blue shadow-lg ring-2 ring-pitstop-blue/30' 
                      : 'bg-gray-400'
                  }`}></div>
                  <h4 className={`text-lg font-semibold transition-colors ${
                    hasSelectedServices 
                      ? 'text-pitstop-blue' 
                      : 'text-pitstop-darkGray'
                  }`}>
                    {vehicle.name} ({vehicle.size})
                    {hasSelectedServices && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pitstop-blue text-white">
                        {vehicle.services.length} serviço{vehicle.services.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </h4>
                </div>

                <div className="space-y-3">
                  {category.services.map((service) => {
                    const isSelected = isServiceSelected(vehicle.id, service.name);
                    const selectedQuantity = getSelectedServiceQuantity(vehicle.id, service.name);

                    return (
                      <div
                        key={service.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-pitstop-blue bg-gradient-to-r from-pitstop-blue/10 to-pitstop-blue/5 shadow-md ring-2 ring-pitstop-blue/20'
                            : 'border-gray-200 hover:border-pitstop-blue/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleServiceToggle(vehicle.id, service)}
                                className={`w-8 h-8 p-0 rounded-full border-2 transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-pitstop-blue border-pitstop-blue text-white shadow-lg scale-110'
                                    : 'border-gray-300 hover:border-pitstop-blue hover:bg-pitstop-blue/10'
                                }`}
                              >
                                {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                              </Button>
                              <div>
                                <h5 className={`font-medium transition-colors ${
                                  isSelected 
                                    ? 'text-pitstop-blue font-semibold' 
                                    : 'text-pitstop-darkGray'
                                }`}>
                                  {service.name}
                                  {isSelected && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pitstop-blue text-white">
                                      Selecionado
                                    </span>
                                  )}
                                </h5>
                                <p className="text-sm text-pitstop-darkGray/70">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`${isSelected ? 'p-2 bg-white rounded-lg shadow-sm border border-pitstop-blue/20' : ''}`}>
                              {renderServicePrice(service, vehicle)}
                            </div>
                          </div>
                        </div>

                        {/* Quantity controls for services that require quantity */}
                        {isSelected && service.requer_quantidade && (
                          <div className="flex items-center gap-3 mt-4 pl-11 p-3 bg-pitstop-blue/5 rounded-lg border border-pitstop-blue/20">
                            <span className="text-sm font-medium text-pitstop-blue">Quantidade:</span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newQuantity = Math.max(1, selectedQuantity - 1);
                                  onUpdateQuantity(vehicle.id, vehicle.services.find(s => s.name === service.name)?.id || '', newQuantity);
                                }}
                                className="w-8 h-8 p-0 border-pitstop-blue/50 hover:bg-pitstop-blue hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={selectedQuantity}
                                onChange={(e) => {
                                  const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                                  onUpdateQuantity(vehicle.id, vehicle.services.find(s => s.name === service.name)?.id || '', newQuantity);
                                }}
                                className="w-16 text-center border-pitstop-blue/50 focus:ring-pitstop-blue focus:border-pitstop-blue"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newQuantity = selectedQuantity + 1;
                                  onUpdateQuantity(vehicle.id, vehicle.services.find(s => s.name === service.name)?.id || '', newQuantity);
                                }}
                                className="w-8 h-8 p-0 border-pitstop-blue/50 hover:bg-pitstop-blue hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ServiceSelection;
