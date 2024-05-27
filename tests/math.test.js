const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
} = require("../server/math");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate fahrenheit to celsius", () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

test("Should calculate celsius to fahrenheit", () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});
