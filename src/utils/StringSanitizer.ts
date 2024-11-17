export const sanitizeEmail = (raw: string): string => {
  return raw.replace(/[^a-zA-Z0-9_@ ]+/gi, "");
};

export const sanitizeInput = (raw: string): string => {
  return raw.replace(/[^a-zA-Z0-9_ ]+/gi, "");
};
