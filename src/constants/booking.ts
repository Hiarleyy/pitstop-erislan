export const VEHICLE_SIZE_EXAMPLES = {
  Pequeno: "Ex: HB20, Onix, Gol, Ka, Up",
  Médio: "Ex: Civic, Corolla, Cruze, Focus",
  Grande: "Ex: SW4, Hilux, Amarok, SUVs grandes"
} as const;

export const CAR_SIZES = ['Pequeno', 'Médio', 'Grande'] as const;

export const MOTORCYCLE_MODELS = [
  'Biz, Pop (Até 125cc)',
  'Titan, Fan, Bros 125/150/160',
  'Fazer, CB, Twister, XRE 190/250/300',
  '300-600cc',
  'Acima de 600cc'
] as const;

export const BOOKING_STEPS = {
  CUSTOMER_INFO: 1,
  VEHICLE_SETUP: 2,
  SERVICE_SELECTION: 3,
  SUMMARY: 4
} as const;

export const STEP_TITLES = {
  [BOOKING_STEPS.CUSTOMER_INFO]: 'Seus Dados',
  [BOOKING_STEPS.VEHICLE_SETUP]: 'Seus Veículos',
  [BOOKING_STEPS.SERVICE_SELECTION]: 'Selecione os Serviços',
  [BOOKING_STEPS.SUMMARY]: 'Confirme seu Pedido'
} as const;

export const STEP_DESCRIPTIONS = {
  [BOOKING_STEPS.CUSTOMER_INFO]: 'Vamos começar com suas informações básicas',
  [BOOKING_STEPS.VEHICLE_SETUP]: 'Adicione os veículos que deseja incluir no agendamento',
  [BOOKING_STEPS.SERVICE_SELECTION]: 'Escolha os serviços desejados para cada veículo',
  [BOOKING_STEPS.SUMMARY]: 'Revise todos os detalhes antes de enviar seu pedido'
} as const;
