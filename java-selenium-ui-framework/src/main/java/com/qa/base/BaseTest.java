package com.qa.base;

import com.qa.config.ConfigReader;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;

public class BaseTest {

    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(String browser) {
        String targetBrowser = (browser != null && !browser.isEmpty()) ? browser : ConfigReader.getProperty("browser");
        DriverFactory.initDriver(targetBrowser);
        DriverFactory.getDriver().get(ConfigReader.getProperty("base.url"));
    }

    @AfterMethod
    public void tearDown() {
        DriverFactory.quitDriver();
    }
}
