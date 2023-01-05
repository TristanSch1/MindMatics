const request = require("supertest");
const app = require("../../../app");
const apiConfig = require("../../../api/_config/apiConfig");

describe("Test users routes : register", () => {

  const usernameTest = "userTest";
  const passwordTest = "passwordTest";

  afterEach(() => {
    request(app)
      .get(apiConfig.apiPath + "/users/remove")
      .send({
        username: usernameTest,
      });
  });

  test("It should response error with wrong parameters using the POST method register", () => {
    return request(app)
      .post(apiConfig.apiPath + "/users/register")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("It should response the user data using the POST method register", () => {
    return request(app)
      .post(apiConfig.apiPath + "/users/register")
      .send({
        username: usernameTest,
        password: passwordTest,
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });
});

describe("Test users routes", () => {

  const usernameTest = "userTest";
  const passwordTest = "passwordTest";

  beforeEach(() => {
    request(app)
      .post(apiConfig.apiPath + "/users/register")
      .send({
        username: usernameTest,
        password: passwordTest,
      });
  });
  
  afterEach(() => {
    request(app)
      .get(apiConfig.apiPath + "/users/remove")
      .send({
        username: usernameTest,
      });
  });

  test("Try to login using wrong data, it should response error using the POST method login", () => {
    return request(app)
      .post(apiConfig.apiPath + "/users/login")
      .send({
        username: 'nonexistant',
        password: 'nonexistant',
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });  

  test("Try to login using wrong password, it should response error using the POST method login", () => {
    return request(app)
      .post(apiConfig.apiPath + "/users/login")
      .send({
        username: usernameTest,
        password: 'wrongPassword',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("It should response the user token using the POST method login", () => {
    return request(app)
      .post(apiConfig.apiPath + "/users/login")
      .send({
        username: usernameTest,
        password: passwordTest,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });  

  test("It should response the user data using the GET method getUserByUsername", () => {
    return request(app)
      .get(apiConfig.apiPath + "/users/getUserByUsername")
      .send({
        username: usernameTest,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should response all the users using the GET method getAllUsers", () => {
    return request(app)
      .get(apiConfig.apiPath + "/users/getAllUsers")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should response all the users using the GET method get all", () => {
    return request(app)
      .get(apiConfig.apiPath + "/users")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

});

describe("Test users routes : remove", () => {

  const usernameTest = "userTest";
  const passwordTest = "passwordTest";

  beforeEach(() => {
    request(app)
      .get(apiConfig.apiPath + "/users/register")
      .send({
        username: usernameTest,
        password: passwordTest,
      });
  });

  test("It should response status code 200 using the GET method remove", () => {
    return request(app)
      .get(apiConfig.apiPath + "/users/remove")
      .send({
        username: usernameTest,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});