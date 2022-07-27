const { test, expect } = require("@playwright/test");
const {DiscountCalculator} = require('../pages/discount-calculator.page')

test.describe("Discount Calculator", async () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('https://www.calculator.net/discount-calculator.html'); // open discount calcultor page
    await expect(page).toHaveTitle("Discount Calculator"); // Expect a title "to contain" a string.
  });
  test("Calculate Discount - Original Price, Discount and Percent off check", async ({ page }) => {
    const discountCalculator =  new DiscountCalculator(page);
    await discountCalculator.inputPriceBeforeDiscount('40');
    await discountCalculator.discountPercent('10');
    await discountCalculator.clickCalculate();
    await expect(await page.locator("//p[text()='Price after discount: ']")).toBeVisible();
    await expect(await page.locator("//b[text()='$36.00']")).toBeVisible();
    await expect(await page.locator("//b[text()='$4.00']")).toBeVisible();
  });

  test("Calculate Discount - Original Price, Price After Discount and Percent off check", async ({ page }) => {
    const discountCalculator =  new DiscountCalculator(page);
    await discountCalculator.inputPriceBeforeDiscount('40');
    await discountCalculator.discountPercent('')
    await discountCalculator.inputPriceAfterDiscount('40');
    await discountCalculator.clickCalculate();
    await expect(await page.locator("//p[text()='Discount: ']")).toBeVisible();
    await expect(await page.locator("//b[text()='0%']")).toBeVisible();
    await expect(await page.locator("//b[text()='$0.00']")).toBeVisible();
  });

  test("Calculate Discount - Original Price, You saved amount and Percent off check", async ({ page }) => {
    const discountCalculator =  new DiscountCalculator(page);
    await discountCalculator.inputPriceBeforeDiscount('40');
    await discountCalculator.discountPercent('')
    await discountCalculator.inputPriceAfterDiscount('');
    await discountCalculator.savedAmount('10')
    await discountCalculator.clickCalculate();
    await expect(await page.locator("//p[text()='Discount: ']")).toBeVisible();
    await expect(await page.locator("//b[text()='25%']")).toBeVisible();
    await expect(await page.locator("//p[text()='Price after discount: ']")).toBeVisible();
    await expect(await page.locator("//b[text()='$30.00']")).toBeVisible();
  });

  test("Calculate Discount - Original Price, Price after discount and Fixed Amount Off check", async ({ page }) => {
    const discountCalculator =  new DiscountCalculator(page);
    await discountCalculator.FixedAmountOffDiscountType();
    await discountCalculator.inputPriceBeforeDiscount('40');
    await discountCalculator.discountPercent('')
    await discountCalculator.inputPriceAfterDiscount('30');
    await discountCalculator.clickCalculate();
    await expect(await page.locator("//p[text()='Discount amount: ']")).toBeVisible();
    await expect(await page.locator("//b[text()='$10.00']")).toBeVisible();
    await expect(await page.locator("//p[text()='Discount percentage: ']")).toBeVisible();
    await expect(await page.locator("//b[text()='25%']")).toBeVisible();
  });
});
