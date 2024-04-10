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
    const startDate = new Date("2024-01-01");
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

  const getRandomAmount = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const getRandomStatus = () => {
    const statuses = ["Success", "Failed", "Pending"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const generateRandomTransactions = () => {
    const transactions = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: getRandomName(),
      date: getRandomDate(),
      amount: getRandomAmount(),
      status: getRandomStatus(),
      details: "Details",
    }));
    return transactions;
  };

  const randomTransactions = generateRandomTransactions();
  return randomTransactions;
};

export default useRandomDataGenerator;
