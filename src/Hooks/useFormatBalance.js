function useFormatBalance(value) {
  // Convert value to number
  const numValue = Number(value);

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return "Invalid number";
  }

  // Separate whole number and cents
  const parts = numValue.toFixed(2).split(".");
  let wholeNumber = parts[0];
  const cents = parts[1];

  // Add commas for thousands, millions, billions
  wholeNumber = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine whole number and cents
  let formattedValue = wholeNumber;
  if (cents) {
    formattedValue += `.${cents}`;
  }

  return formattedValue;
}

export default useFormatBalance;
