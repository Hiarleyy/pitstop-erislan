import { BOOKING_STEPS, STEP_DESCRIPTIONS, STEP_TITLES } from '@/constants/booking';
import { Car, CheckCircle, Settings, User } from 'lucide-react';
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { 
      number: BOOKING_STEPS.CUSTOMER_INFO, 
      icon: User, 
      title: STEP_TITLES[BOOKING_STEPS.CUSTOMER_INFO],
      description: STEP_DESCRIPTIONS[BOOKING_STEPS.CUSTOMER_INFO]
    },
    { 
      number: BOOKING_STEPS.VEHICLE_SETUP, 
      icon: Car, 
      title: STEP_TITLES[BOOKING_STEPS.VEHICLE_SETUP],
      description: STEP_DESCRIPTIONS[BOOKING_STEPS.VEHICLE_SETUP]
    },
    { 
      number: BOOKING_STEPS.SERVICE_SELECTION, 
      icon: Settings, 
      title: STEP_TITLES[BOOKING_STEPS.SERVICE_SELECTION],
      description: STEP_DESCRIPTIONS[BOOKING_STEPS.SERVICE_SELECTION]
    },
    { 
      number: BOOKING_STEPS.SUMMARY, 
      icon: CheckCircle, 
      title: STEP_TITLES[BOOKING_STEPS.SUMMARY],
      description: STEP_DESCRIPTIONS[BOOKING_STEPS.SUMMARY]
    }
  ];

  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-pitstop-darkGray">
            Etapa {currentStep} de 4
          </span>
          <span className="text-sm text-pitstop-darkGray/70">
            {Math.round((currentStep / 4) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-pitstop-blue h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold text-pitstop-darkGray">
            {STEP_TITLES[currentStep]}
          </h3>
          <p className="text-sm text-pitstop-darkGray/70">
            {STEP_DESCRIPTIONS[currentStep]}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            const IconComponent = step.icon;

            return (
              <div key={step.number} className="flex items-center">
                {/* Step */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-pitstop-blue text-white'
                        : isActive
                        ? 'bg-pitstop-blue text-white ring-4 ring-pitstop-blue/20'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-center max-w-32">
                    <h4
                      className={`text-sm font-medium ${
                        isActive || isCompleted ? 'text-pitstop-darkGray' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-xs mt-1 ${
                        isActive ? 'text-pitstop-blue' : 'text-gray-400'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4">
                    <div
                      className={`h-full transition-all duration-500 ${
                        step.number < currentStep ? 'bg-pitstop-blue' : 'bg-gray-200'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
