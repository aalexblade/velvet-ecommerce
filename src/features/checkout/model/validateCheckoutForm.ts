interface CheckoutFormData {
  phone: string;
  cityRef: string;
  warehouse: string;
}

export interface CheckoutValidationResult {
  errorMessage: string | null;
  phoneError: boolean;
}

export function validateCheckoutForm(
  formData: CheckoutFormData,
): CheckoutValidationResult {
  if (
    !formData.phone ||
    formData.phone.trim() === "+380" ||
    formData.phone.length < 13
  ) {
    return {
      errorMessage:
        "Будь ласка, введіть коректний та повний номер телефону (наприклад, +380931234567).",
      phoneError: true,
    };
  }

  if (!formData.cityRef || !formData.warehouse) {
    return {
      errorMessage:
        "Будь ласка, оберіть коректне місто та відділення Нової Пошти зі списку.",
      phoneError: false,
    };
  }

  return {
    errorMessage: null,
    phoneError: false,
  };
}