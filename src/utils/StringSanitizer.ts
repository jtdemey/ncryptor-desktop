export const sanitizeInput = (raw: string): string => {
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === " ") {
      raw = raw.slice(0, i) + raw.slice(i + 1);
      i--;
    }
  }
  return raw.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
};
