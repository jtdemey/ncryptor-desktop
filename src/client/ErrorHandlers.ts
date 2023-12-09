type GpgResponse = {
  status: number;
  text: string;
};

export const handleGpgError = (
  response: GpgResponse,
  setErrorText: Function
): boolean => {
  if (response.status >= 400) {
    setErrorText(response.text);
    return false;
  }
  return true;
};
