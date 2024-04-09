import { useEffect, useState } from "react";

function useFormatCreditCardNumber(number) {
  const [formattedNumber, setFormattedNumber] = useState([]);

  useEffect(() => {
    if (number) {
      const numberString = number.toString();
      const groups = [];

      for (let i = 0; i < numberString.length; i += 4) {
        groups.push(numberString.slice(i, i + 4));
      }

      setFormattedNumber(groups);
    }
  }, [number]);

  return formattedNumber;
}

export default useFormatCreditCardNumber;
