const { expect } = require('@playwright/test');
const locators = require('../locators/discount-calculator.locators.json')

class DiscountCalculator{
    
    constructor(page){
        this.page = page;
    }

    async inputPriceBeforeDiscount(originalAmount){
        try {
            await expect(await this.page.locator(locators.PriceBeforeDiscount.css)).toBeVisible(); // check if element is visible
            const PriceBeforeDiscount = await this.page.locator(locators.PriceBeforeDiscount.css)
            await PriceBeforeDiscount.click({clickCount: 3});
            await PriceBeforeDiscount.press('Backspace'); // remove the already present data in field
            await this.page.fill(locators.PriceBeforeDiscount.css, originalAmount) // fill the input field with the original amount value
        } catch (error) {
            throw new Error("Error in filling price before discount\n", error)
        }
    }

    async discountPercent(discount){
        try {
            await expect(await this.page.locator(locators.DiscountPercentage.id)).toBeVisible();
            const Discount = await this.page.locator(locators.DiscountPercentage.id)
            await Discount.click({clickCount: 3});
            await Discount.press('Backspace');
            await this.page.fill(locators.DiscountPercentage.id, discount)
        } catch (error) {
            throw new Error("Error in filling discount\n", error)
        }
    }

    async inputPriceAfterDiscount(amountAfterDiscount){
        try {
            await expect(await this.page.locator(locators.PriceAfterDiscount.css)).toBeVisible();
            const PriceAfterDiscount = await this.page.locator(locators.PriceAfterDiscount.css)
            await PriceAfterDiscount.click({clickCount: 3});
            await PriceAfterDiscount.press('Backspace');
            await this.page.fill(locators.PriceAfterDiscount.css, amountAfterDiscount)
        } catch (error) {
            throw new Error("Error in filling price after discount\n", error)
        }
    }

    async savedAmount(savedAmount){
        try {
            await expect(await this.page.locator(locators.SavedAmount.id)).toBeVisible();
            const SavedAmount = await this.page.locator(locators.SavedAmount.id)
            await SavedAmount.click({clickCount: 3});
            await SavedAmount.press('Backspace');
            await this.page.fill(locators.SavedAmount.id, savedAmount)
        } catch (error) {
            throw new Error("Error in filling saved amount\n", error)
        }
    }

    async percentOffDiscountType(){
        try {
            await expect(await this.page.locator(locators.DiscountTypePercentOff.css)).toBeVisible();
            await this.page.locator(locators.DiscountTypePercentOff.css).click();
        } catch (error) {
            throw new Error("Error in selecting percent off discount type\n", error)
        }
    }

    async FixedAmountOffDiscountType(){
        try {
            await expect(await this.page.locator(locators.DiscountTypeFixedAmountOff.css)).toBeVisible();
            await this.page.locator(locators.DiscountTypeFixedAmountOff.css).click();
        } catch (error) {
            throw new Error("Error in selecting Fixed amount off discount type\n", error)
        }
    }

    async clickCalculate(){
        try {
            await expect(await this.page.locator(locators.CalculateButton.css)).toBeVisible();
            await this.page.locator(locators.CalculateButton.css).click();
        } catch (error) {
            throw new Error("Error in clicking Calculate button\n", error)
        }
    }
}

module.exports = {DiscountCalculator} //to use class across the framework