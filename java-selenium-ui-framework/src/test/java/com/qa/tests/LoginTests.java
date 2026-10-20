package com.qa.tests;

import com.qa.base.BaseTest;
import com.qa.base.DriverFactory;
import com.qa.pages.InventoryPage;
import com.qa.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTests extends BaseTest {

    @Test(description = "Verify successful login with valid credentials")
    public void testSuccessfulLogin() {
        LoginPage loginPage = new LoginPage(DriverFactory.getDriver());
        loginPage.enterUsername("standard_user")
                 .enterPassword("secret_sauce");
        loginPage.clickLogin();

        InventoryPage inventoryPage = new InventoryPage(DriverFactory.getDriver());
        Assert.assertEquals(inventoryPage.getPageHeaderTitle(), "Products", "Login failed or product header mismatch!");
    }

    @Test(description = "Verify locked out user error message handling")
    public void testLockedOutUserLogin() {
        LoginPage loginPage = new LoginPage(DriverFactory.getDriver());
        loginPage.enterUsername("locked_out_user")
                 .enterPassword("secret_sauce");
        loginPage.clickLogin();

        String errorText = loginPage.getErrorMessage();
        Assert.assertTrue(errorText.contains("locked out"), "Expected lock out error message not found!");
    }
}
