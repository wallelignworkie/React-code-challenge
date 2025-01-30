export const formatPhoneNumber = (phone: string): string => {
  let formattedPhone = phone.replace(/\D/g, ""); // Remove all non-numeric characters

  if (formattedPhone.startsWith("251")) {
    return `+${formattedPhone}`; // Ensure it has "+"
  }
  if (formattedPhone.startsWith("0")) {
    return `+251${formattedPhone.slice(1)}`; // Replace leading "0" with "+251"
  }
  if (formattedPhone.length === 9) {
    return `+251${formattedPhone}`; // If 9-digit, assume it's an Ethiopian number
  }

  return phone; // Default case (already in correct format)
};
