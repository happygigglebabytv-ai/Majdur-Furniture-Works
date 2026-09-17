export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.startsWith('91') && digits.length === 12) {
    return digits;
  }
  return `91${digits.slice(-10)}`;
}

export function formatIndianPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '').slice(-10);
  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function getProductEnquiryMessage(productName: string): string {
  return `Namaste Majdur Furniture Works, mujhe "${productName}" ke baare mein jankari chahiye. Kripya price aur details batayein.`;
}

export function getPriceEnquiryMessage(productName: string): string {
  return `Namaste, mujhe "${productName}" ki price ke baare mein jankari chahiye. Main size/design/material ki details share kar sakta/sakti hoon.`;
}

export function getCustomFurnitureMessage(): string {
  return `Namaste, mujhe custom furniture banwana hai. Main apna design/photo, size aur requirement share karna chahta/chahti hoon.`;
}

export function getGeneralEnquiryMessage(): string {
  return `Namaste Majdur Furniture Works, mujhe furniture ke baare mein enquiry karni hai.`;
}
