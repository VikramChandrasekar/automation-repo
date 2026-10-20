package com.qa.tests;

import com.qa.base.BaseApiTest;
import com.qa.clients.UserClient;
import io.restassured.response.Response;
import org.testng.annotations.Test;

public class UserNegativeTests extends BaseApiTest {

    @Test(description = "Verify fetching a non-existent user ID returns 404 Not Found")
    public void testGetUserNotFound() {
        Response response = UserClient.getUserById(requestSpec.get(), 999999);
        response.then().statusCode(404);
    }
}
