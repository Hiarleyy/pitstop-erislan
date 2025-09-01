import { Button } from '@/components/ui/button';
import { calculateServicePrice, formatPrice } from '@/lib/serviceHelpers';
import { Vehicle } from '@/types/booking';
import { Bike, Calendar, Car, MessageCircle, User } from 'lucide-react';
import React from 'react';

interface BookingSummaryProps {
  customerName: string;
  vehicles: Vehicle[];
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  customerName,
  vehicles
}) => {
  const calculateTotal = () => {
    return vehicles.reduce((total, vehicle) => {
      const vehicleTotal = vehicle.services.reduce((serviceTotal, service) => {
        const price = calculateServicePrice(service, vehicle.type, vehicle.size, service.quantity || 1);
        return serviceTotal + (typeof price === 'number' ? price : 0);
      }, 0);
      return total + vehicleTotal;
    }, 0);
  };

  const generateWhatsAppMessage = () => {
    let message = `🚗 *PITSTOP ERISLAN - Solicitação de Orçamento*\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📅 *Data:* ${new Date().toLocaleDateString('pt-BR')}\n\n`;

    vehicles.forEach((vehicle, vehicleIndex) => {
      message += `${vehicle.type === 'car' ? '🚗' : '🏍️'} *Veículo ${vehicleIndex + 1}:* ${vehicle.name}\n`;
      message += `📏 *Porte/Modelo:* ${vehicle.size}\n`;
      
      if (vehicle.services.length > 0) {
        message += `\n*Serviços Solicitados:*\n`;
        vehicle.services.forEach((service, serviceIndex) => {
          const price = calculateServicePrice(service, vehicle.type, vehicle.size, service.quantity || 1);
          message += `${serviceIndex + 1}. ${service.name}`;
          
          if (service.quantity && service.quantity > 1) {
            message += ` (Qtd: ${service.quantity})`;
          }
          
          if (typeof price === 'number') {
            message += ` - ${formatPrice(price)}`;
          } else if (service.valor_a_combinar) {
            message += ` - A combinar`;
          }
          message += `\n`;
        });
      }
      
      message += `\n`;
    });

    const total = calculateTotal();
    if (total > 0) {
      message += `💰 *Total Estimado:* ${formatPrice(total)}\n\n`;
    }

    message += `Por favor, confirme a disponibilidade e finalize o agendamento! 😊`;

    return encodeURIComponent(message);
  };

  const handleSendWhatsApp = () => {
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const hasServicesWithPrice = vehicles.some(vehicle => 
    vehicle.services.some(service => {
      const price = calculateServicePrice(service, vehicle.type, vehicle.size, service.quantity || 1);
      return typeof price === 'number' && price > 0;
    })
  );

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-pitstop-blue/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-pitstop-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pitstop-darkGray">Cliente</h3>
            <p className="text-pitstop-darkGray/70">Informações do solicitante</p>
          </div>
        </div>
        <p className="text-pitstop-darkGray font-medium text-lg">{customerName}</p>
      </div>

      {/* Vehicles and Services Summary */}
      <div className="space-y-4">
        {vehicles.map((vehicle, vehicleIndex) => (
          <div key={vehicle.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pitstop-blue/10 rounded-full flex items-center justify-center">
                {vehicle.type === 'car' ? (
                  <Car className="w-5 h-5 text-pitstop-blue" />
                ) : (
                  <Bike className="w-5 h-5 text-pitstop-blue" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-pitstop-darkGray">
                  {vehicle.name}
                </h3>
                <p className="text-pitstop-darkGray/70">
                  {vehicle.type === 'car' ? 'Carro' : 'Moto'} • {vehicle.size}
                </p>
              </div>
            </div>

            {vehicle.services.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-pitstop-darkGray mb-3">Serviços Selecionados:</h4>
                {vehicle.services.map((service) => {
                  const price = calculateServicePrice(service, vehicle.type, vehicle.size, service.quantity || 1);
                  
                  return (
                    <div key={service.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-pitstop-darkGray text-sm">
                          {service.name}
                        </p>
                        {service.quantity && service.quantity > 1 && (
                          <p className="text-xs text-pitstop-darkGray/70">
                            Quantidade: {service.quantity}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {typeof price === 'number' ? (
                          <span className="font-semibold text-pitstop-blue">
                            {formatPrice(price)}
                          </span>
                        ) : service.valor_a_combinar ? (
                          <span className="text-sm text-pitstop-blue font-medium">
                            A combinar
                          </span>
                        ) : (
                          <span className="text-sm text-pitstop-darkGray">
                            Consulte
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-pitstop-darkGray/50">Nenhum serviço selecionado</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total */}
      {hasServicesWithPrice && (
        <div className="bg-pitstop-blue/5 rounded-xl border border-pitstop-blue/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-pitstop-darkGray">
                Total Estimado
              </h3>
              <p className="text-sm text-pitstop-darkGray/70">
                Valores podem variar conforme avaliação
              </p>
            </div>
            <div className="text-2xl font-bold text-pitstop-blue">
              {formatPrice(calculateTotal())}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleSendWhatsApp}
          className="w-full h-14 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold flex items-center justify-center gap-3"
          disabled={vehicles.length === 0 || !vehicles.some(v => v.services.length > 0)}
        >
          <MessageCircle className="w-6 h-6" />
          Enviar pelo WhatsApp
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-pitstop-darkGray/70">
            Ao enviar, você será redirecionado para o WhatsApp para finalizar o agendamento
          </p>
        </div>
      </div>

      {/* Empty State */}
      {vehicles.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-pitstop-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-pitstop-blue" />
          </div>
          <h3 className="text-lg font-medium text-pitstop-darkGray mb-2">
            Nenhum serviço para agendar
          </h3>
          <p className="text-pitstop-darkGray/70">
            Volte e adicione veículos e serviços para criar seu agendamento.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
