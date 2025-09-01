import { Button } from '@/components/ui/button';
import { BOOKING_STEPS } from '@/constants/booking';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  canProceed?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onPrevStep,
  onNextStep,
  canProceed = true
}) => {
  const getNextButtonText = () => {
    switch (currentStep) {
      case BOOKING_STEPS.CUSTOMER_INFO:
        return 'Adicionar Veículos';
      case BOOKING_STEPS.VEHICLE_SETUP:
        return 'Selecionar Serviços';
      case BOOKING_STEPS.SERVICE_SELECTION:
        return 'Revisar Pedido';
      case BOOKING_STEPS.SUMMARY:
        return 'Finalizar';
      default:
        return 'Próximo';
    }
  };

  const getPrevButtonText = () => {
    switch (currentStep) {
      case BOOKING_STEPS.VEHICLE_SETUP:
        return 'Voltar aos Dados';
      case BOOKING_STEPS.SERVICE_SELECTION:
        return 'Voltar aos Veículos';
      case BOOKING_STEPS.SUMMARY:
        return 'Voltar aos Serviços';
      default:
        return 'Voltar';
    }
  };

  if (currentStep === BOOKING_STEPS.SUMMARY) {
    // No navigation buttons in summary - actions are handled by the summary component
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
      {/* Previous Button */}
      {currentStep > BOOKING_STEPS.CUSTOMER_INFO && (
        <Button
          variant="outline"
          onClick={onPrevStep}
          className="sm:w-auto w-full flex items-center gap-2 h-12"
        >
          <ArrowLeft className="w-4 h-4" />
          {getPrevButtonText()}
        </Button>
      )}

      {/* Spacer for centering next button when no prev button */}
      <div className="flex-1"></div>

      {/* Next Button */}
      <Button
        onClick={onNextStep}
        className="sm:w-auto w-full bg-pitstop-blue hover:bg-pitstop-darkBlue flex items-center gap-2 h-12 font-semibold"
        disabled={!canProceed}
      >
        {getNextButtonText()}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NavigationButtons;
