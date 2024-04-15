function useFormatBalance(value) {
  // Convert value to number
  const numValue = Number(value);

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return "Invalid number";
  }

  // Determine if the number is negative
  const isNegative = numValue < 0;

  // Separate whole number and cents
  const parts = Math.abs(numValue).toFixed(2).split(".");
  let wholeNumber = parts[0];
  const cents = parts[1];

  // Add commas for thousands, millions, billions
  wholeNumber = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine whole number and cents with dollar sign and negative sign
  let formattedValue = `$${wholeNumber}`;
  if (cents) {
    formattedValue += `.${cents}`;
  }

  // Add negative sign if the number is negative
  if (isNegative) {
    formattedValue = `-$${formattedValue.slice(1)}`;
  }

  return formattedValue;
}

export default useFormatBalance;
