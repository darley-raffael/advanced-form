export function useMaskInput() {
  function inputMaskHook(value: string, mask: string) {
    if (!value) return "";
    let maskedValue = "";
    let inputIndex = 0;

    // contar quantos caracteres # tem na máscara
    const maskLength = mask.replace(/[^#]/g, "").length;

    console.log(maskLength);

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === "#") {
        if (value[inputIndex]) {
          maskedValue += value[inputIndex];
          inputIndex++;
        }
      } else {
        maskedValue += mask[i];
      }
    }

    const indexMaskedValue = mask.indexOf("#", value.length);
    console.log(indexMaskedValue);
    if (value.length < maskLength) {
      return maskedValue.substring(0, indexMaskedValue + 1);
    }
    return maskedValue;
  }

  return {
    inputMask: inputMaskHook,
  };
}
