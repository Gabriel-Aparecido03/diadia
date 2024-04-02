const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

function validateMinutesAndHours(input: string) {
  return timeRegex.test(input);
}