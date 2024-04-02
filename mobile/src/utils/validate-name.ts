export function validatedName(name: string) {
  const regex = /^[^A-Za-z0-9]+$/;
  const isValidFormat = !regex.test(name);
  return isValidFormat && name.length > 3;
}
