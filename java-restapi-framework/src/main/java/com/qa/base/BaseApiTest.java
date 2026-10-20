package com.qa.base;

import com.qa.config.ConfigManager;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.testng.annotations.BeforeClass;

public class BaseApiTest {
    protected static ThreadLocal<RequestSpecification> requestSpec = new ThreadLocal<>();

    @BeforeClass
    public void setupRequestSpecification() {
        RestAssured.baseURI = ConfigManager.getProperty("base.url");

        RequestSpecification spec = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .addHeader("Accept", "application/json")
                .addFilter(new RequestLoggingFilter())
                .addFilter(new ResponseLoggingFilter())
                .build();

        requestSpec.set(spec);
    }
}
