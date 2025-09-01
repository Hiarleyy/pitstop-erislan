import { BOOKING_STEPS } from '@/constants/booking';
import { useBooking } from '@/hooks/useBooking';
import React from 'react';

// Components
import BookingSummary from './BookingSummary';
import CustomerInfo from './CustomerInfo';
import NavigationButtons from './NavigationButtons';
import ProgressIndicator from './ProgressIndicator';
import ServiceSelection from './ServiceSelection';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';

const BookingWizard: React.FC = () => {
  const { state, actions } = useBooking();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case BOOKING_STEPS.CUSTOMER_INFO:
        return (
          <CustomerInfo
            customerName={state.customerName}
            onCustomerNameChange={actions.setCustomerName}
          />
        );

      case BOOKING_STEPS.VEHICLE_SETUP:
        return (
          <div className="space-y-6">
            {state.isAddingVehicle ? (
              <VehicleForm
                newVehicle={state.newVehicle}
                onVehicleChange={actions.setNewVehicle}
                onAddVehicle={actions.addVehicle}
                onCancel={() => actions.setIsAddingVehicle(false)}
              />
            ) : (
              <VehicleList
                vehicles={state.vehicles}
                onAddVehicle={() => actions.setIsAddingVehicle(true)}
                onRemoveVehicle={actions.removeVehicle}
              />
            )}
          </div>
        );

      case BOOKING_STEPS.SERVICE_SELECTION:
        return (
          <ServiceSelection
            vehicles={state.vehicles}
            selectedCategory={state.selectedCategory}
            onCategoryChange={actions.setSelectedCategory}
            onAddService={actions.addServiceToVehicle}
            onRemoveService={actions.removeServiceFromVehicle}
            onUpdateQuantity={actions.updateServiceQuantity}
          />
        );

      case BOOKING_STEPS.SUMMARY:
        return (
          <BookingSummary
            customerName={state.customerName}
            vehicles={state.vehicles}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-pitstop-lightGray via-white to-pitstop-lightGray min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pitstop-darkGray mb-4">
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
              <ProgressIndicator currentStep={state.currentStep} />
              
              {/* Current Step Content */}
              {renderCurrentStep()}
              
              {/* Navigation Buttons */}
              <NavigationButtons
                currentStep={state.currentStep}
                onPrevStep={actions.prevStep}
                onNextStep={actions.nextStep}
                canProceed={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingWizard;
