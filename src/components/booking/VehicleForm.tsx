import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CAR_SIZES, MOTORCYCLE_MODELS, VEHICLE_SIZE_EXAMPLES } from '@/constants/booking';
import { NewVehicle, VehicleType } from '@/types/booking';
import { Bike, Car, X } from 'lucide-react';
import React from 'react';

interface VehicleFormProps {
  newVehicle: NewVehicle;
  onVehicleChange: (updates: Partial<NewVehicle>) => void;
  onAddVehicle: () => void;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  newVehicle,
  onVehicleChange,
  onAddVehicle,
  onCancel
}) => {
  const handleTypeChange = (type: VehicleType) => {
    onVehicleChange({ 
      type, 
      size: '' // Reset size when type changes
    });
  };

  const renderSizeOptions = () => {
    if (newVehicle.type === 'car') {
      return (
        <div className="space-y-3">
          {CAR_SIZES.map((size) => (
            <div key={size} className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border-2 border-transparent hover:border-pitstop-blue/20 transition-all duration-200">
                <input
                  type="radio"
                  name="carSize"
                  value={size}
                  checked={newVehicle.size === size}
                  onChange={(e) => onVehicleChange({ size: e.target.value })}
                  className="w-4 h-4 text-pitstop-blue bg-gray-100 border-gray-300 focus:ring-pitstop-blue focus:ring-2"
                />
                <span className="font-medium text-pitstop-darkGray">{size}</span>
              </label>
              <p className="text-sm text-pitstop-darkGray/70 ml-7">
                {VEHICLE_SIZE_EXAMPLES[size]}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {MOTORCYCLE_MODELS.map((model) => (
          <label key={model} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border-2 border-transparent hover:border-pitstop-blue/20 transition-all duration-200">
            <input
              type="radio"
              name="motorcycleModel"
              value={model}
              checked={newVehicle.size === model}
              onChange={(e) => onVehicleChange({ size: e.target.value })}
              className="w-4 h-4 text-pitstop-blue bg-gray-100 border-gray-300 focus:ring-pitstop-blue focus:ring-2"
            />
            <span className="font-medium text-pitstop-darkGray">{model}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-pitstop-darkGray">Adicionar Veículo</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Vehicle Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pitstop-darkGray">
            Nome do Veículo *
          </label>
          <Input
            placeholder="Ex: Civic 2020, Bros 160, etc."
            value={newVehicle.name}
            onChange={(e) => onVehicleChange({ name: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Vehicle Type Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-pitstop-darkGray">
            Tipo de Veículo *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleTypeChange('car')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                newVehicle.type === 'car'
                  ? 'border-pitstop-blue bg-pitstop-blue/5'
                  : 'border-gray-200 hover:border-pitstop-blue/30'
              }`}
            >
              <Car className={`w-8 h-8 ${newVehicle.type === 'car' ? 'text-pitstop-blue' : 'text-gray-400'}`} />
              <span className={`font-medium ${newVehicle.type === 'car' ? 'text-pitstop-blue' : 'text-gray-600'}`}>
                Carro
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('motorcycle')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                newVehicle.type === 'motorcycle'
                  ? 'border-pitstop-blue bg-pitstop-blue/5'
                  : 'border-gray-200 hover:border-pitstop-blue/30'
              }`}
            >
              <Bike className={`w-8 h-8 ${newVehicle.type === 'motorcycle' ? 'text-pitstop-blue' : 'text-gray-400'}`} />
              <span className={`font-medium ${newVehicle.type === 'motorcycle' ? 'text-pitstop-blue' : 'text-gray-600'}`}>
                Moto
              </span>
            </button>
          </div>
        </div>

        {/* Size/Model Selection */}
        {newVehicle.type && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-pitstop-darkGray">
              {newVehicle.type === 'car' ? 'Porte do Veículo *' : 'Modelo da Moto *'}
            </label>
            {renderSizeOptions()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onAddVehicle}
            className="flex-1 bg-pitstop-blue hover:bg-pitstop-darkBlue"
            disabled={!newVehicle.name.trim() || !newVehicle.size}
          >
            Adicionar Veículo
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-6"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
