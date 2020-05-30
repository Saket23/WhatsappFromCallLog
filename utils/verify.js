export function ifCountryCodeIsAdded(number) {
  if (number.length >= 13) {
    if (number[0] === '+') {
      return true;
    }
  }
  return false;
}
