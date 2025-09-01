/**
 * Formats a number as Brazilian currency (BRL)
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

/**
 * Formats a phone number to Brazilian format
 */
export const formatPhoneNumber = (phone: string): string => {
  const numbers = phone.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  
  return phone;
};

/**
 * Validates Brazilian phone number
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, '');
  return numbers.length === 10 || numbers.length === 11;
};

/**
 * Converts string price to number
 */
export const parsePrice = (priceStr: string): number => {
  // Remove R$ and spaces
  let cleanStr = priceStr.replace(/R\$\s*/g, '').trim();
  // Remove thousands separators (1.500 -> 1500)
  cleanStr = cleanStr.replace(/\./g, '');
  // Replace comma with dot for decimal (500,00 -> 500.00)
  cleanStr = cleanStr.replace(',', '.');
  return parseFloat(cleanStr) || 0;
};

/**
 * Generates a unique ID
 */
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Capitalizes the first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Validates if a string is not empty or only whitespace
 */
export const isValidString = (str: string): boolean => {
  return str.trim().length > 0;
};

/**
 * Formats a date to Brazilian format
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formats date and time to Brazilian format
 */
export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
