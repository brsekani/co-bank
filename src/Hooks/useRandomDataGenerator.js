const useRandomDataGenerator = () => {
  const getRandomName = () => {
    const names = [
      "Black Beauty",
      "White Beauty",
      "Green Beauty",
      "Blue Beauty",
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const getRandomDate = () => {
    const startDate = new Date("2023-01-01");
    const endDate = new Date();
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    return randomDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRandomAmount = (type) => {
    const baseAmount = Math.floor(Math.random() * 9000) + 1000;
    return type === "sent" ? -baseAmount : baseAmount;
  };

  const getRandomStatus = () => {
    const statuses = ["Success", "Failed", "Pending"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const generateRandomTransactions = () => {
    const transactions = [];
    for (let i = 0; i < 20; i++) {
      const type = Math.random() < 0.5 ? "received" : "sent";
      transactions.push({
        id: i + 1,
        name: getRandomName(),
        date: getRandomDate(),
        amount: getRandomAmount(type),
        status: getRandomStatus(),
        details: "Details",
        type: type,
      });
    }
    return transactions;
  };

  const mixedTransactions = generateRandomTransactions();

  return mixedTransactions;
};

export default useRandomDataGenerator;
