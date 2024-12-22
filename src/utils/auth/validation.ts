import { AUTH_CONFIG } from './constants';
import { AUTH_ERRORS } from './errors';

export const validateEmail = (email: string): boolean => {
  return email.length > 0 && AUTH_CONFIG.EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return AUTH_CONFIG.PASSWORD_REGEX.test(password);
};

export const validatePhone = (phone: string): boolean => {
  return AUTH_CONFIG.PHONE_REGEX.test(phone);
};

export const validateBirthDate = (date: string): boolean => {
  if (!date) return false;
  
  const birthDate = new Date(date);
  const today = new Date();
  
  // Check if date is valid
  if (isNaN(birthDate.getTime())) return false;
  
  // Check if date is in the past
  if (birthDate > today) return false;
  
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  const adjustedAge = m < 0 || (m === 0 && today.getDate() < birthDate.getDate())
    ? age - 1
    : age;
  
  return adjustedAge >= AUTH_CONFIG.MIN_AGE;
};

export const validateSignUpData = (data: {
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  address: string;
}) => {
  if (!validateEmail(data.email)) {
    throw AUTH_ERRORS.INVALID_EMAIL;
  }
  
  if (!validatePassword(data.password)) {
    throw AUTH_ERRORS.WEAK_PASSWORD;
  }
  
  if (!validatePhone(data.phone)) {
    throw AUTH_ERRORS.INVALID_PHONE;
  }
  
  if (!validateBirthDate(data.birthDate)) {
    throw AUTH_ERRORS.INVALID_AGE;
  }
};