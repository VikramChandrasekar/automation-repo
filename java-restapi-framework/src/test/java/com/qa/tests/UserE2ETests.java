package com.qa.tests;

import com.qa.base.BaseApiTest;
import com.qa.clients.UserClient;
import com.qa.models.UserPayload;
import com.github.javafaker.Faker;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.*;

public class UserE2ETests extends BaseApiTest {

    @Test(priority = 1, description = "Verify GET /users returns 200 and matches JSON Schema contract")
    public void testGetUsersContractAndData() {
        Response response = UserClient.getUsers(requestSpec.get());
        
        response.then()
                .statusCode(200)
                .body(matchesJsonSchemaInClasspath("schemas/user-schema.json"))
                .body("size()", greaterThan(0));
    }

    @Test(priority = 2, description = "Verify POST /users successfully creates a user using Faker data")
    public void testCreateUserE2E() {
        Faker faker = new Faker();
        UserPayload payload = new UserPayload(
            faker.name().fullName(),
            faker.name().username(),
            faker.internet().emailAddress()
        );

        Response response = UserClient.createUser(requestSpec.get(), payload);

        response.then()
                .statusCode(201)
                .body("name", equalTo(payload.getName()))
                .body("email", equalTo(payload.getEmail()))
                .body("id", notNullValue());
    }
}
