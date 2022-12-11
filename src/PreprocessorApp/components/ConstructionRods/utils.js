export const isNaNValidate = (newValue) => {
  if (isNaN(newValue)) {
    return {
      valid: false,
      message: "Введите число",
    };
  }
  return true;
};
