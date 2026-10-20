package com.qa.clients;

import com.qa.models.UserPayload;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.given;

public class UserClient {

    public static Response getUsers(RequestSpecification spec) {
        return given().spec(spec).when().get("/users");
    }

    public static Response createUser(RequestSpecification spec, UserPayload payload) {
        return given().spec(spec).body(payload).when().post("/users");
    }

    public static Response getUserById(RequestSpecification spec, int userId) {
        return given().spec(spec).pathParam("id", userId).when().get("/users/{id}");
    }
}
