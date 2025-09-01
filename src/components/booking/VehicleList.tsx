import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types/booking';
import { Bike, Car, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface VehicleListProps {
  vehicles: Vehicle[];
  onAddVehicle: () => void;
  onRemoveVehicle: (vehicleId: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onAddVehicle,
  onRemoveVehicle
}) => {
  return (
    <div className="space-y-4">
      {/* Add Vehicle Button */}
      <Button
        onClick={onAddVehicle}
        className="w-full h-16 border-2 border-dashed border-pitstop-blue/30 bg-transparent hover:bg-pitstop-blue/5 text-pitstop-blue hover:text-pitstop-darkBlue flex items-center justify-center gap-2 rounded-xl transition-all duration-200"
        variant="ghost"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Adicionar Veículo</span>
      </Button>

      {/* Vehicle List */}
      {vehicles.length > 0 && (
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-pitstop-blue/30 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {vehicle.type === 'car' ? (
                    <Car className="w-6 h-6 text-pitstop-blue" />
                  ) : (
                    <Bike className="w-6 h-6 text-pitstop-blue" />
                  )}
                  <div>
                    <h4 className="font-medium text-pitstop-darkGray">
                      {vehicle.name}
                    </h4>
                    <p className="text-sm text-pitstop-darkGray/70">
                      {vehicle.type === 'car' ? 'Carro' : 'Moto'} • {vehicle.size}
                    </p>
                    {vehicle.services.length > 0 && (
                      <p className="text-xs text-pitstop-blue mt-1">
                        {vehicle.services.length} serviço{vehicle.services.length > 1 ? 's' : ''} selecionado{vehicle.services.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveVehicle(vehicle.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {vehicles.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-pitstop-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-pitstop-blue" />
          </div>
          <h3 className="text-lg font-medium text-pitstop-darkGray mb-2">
            Nenhum veículo adicionado
          </h3>
          <p className="text-pitstop-darkGray/70">
            Adicione pelo menos um veículo para continuar com o agendamento.
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
