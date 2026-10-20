package com.qa.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends BasePage {

    @FindBy(id = "user-name")
    private WebElement usernameTxt;

    @FindBy(id = "password")
    private WebElement passwordTxt;

    @FindBy(id = "login-button")
    private WebElement loginBtn;

    @FindBy(css = "h3[data-test='error']")
    private WebElement errorMessage;

    public LoginPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public LoginPage enterUsername(String user) {
        waitForElementVisible(usernameTxt);
        usernameTxt.clear();
        usernameTxt.sendKeys(user);
        return this;
    }

    public LoginPage enterPassword(String pass) {
        passwordTxt.clear();
        passwordTxt.sendKeys(pass);
        return this;
    }

    public void clickLogin() {
        loginBtn.click();
    }

    public String getErrorMessage() {
        waitForElementVisible(errorMessage);
        return errorMessage.getText();
    }
}
