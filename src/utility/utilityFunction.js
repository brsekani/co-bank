export function completionPercentage(total_amount, target_amount) {
  console.log(typeof total_amount, typeof target_amount);
  const Percentage = (target_amount / total_amount) * 100;
  return Percentage;
}

export function accountIdInfo() {
  return "2ba2831e-6007-4f40-9cc2-d1e7e326b2ea";
  // return "8b5961d1-68cd-4752-aa21-a825ec8fae48";
}

export function customerIdInfo() {
  return "e85d8cea-b4bb-4a45-a8ac-6541112f51ec";
  // return "f5dfd8be-72cd-4d95-b70b-6df952b8bed2";
}
