const { getDayText, getIconFilename } = require('../util')

const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("Integration testing for the API", () => {
  it("should connect to the location endpoint", async done => {
    const response = await request.get("/weather/Sydney");

    expect(response.status).toBe(200);
    done();
  });

  it("should not connect to an unknown endpoint", async done => {
    const response = await request.get("/unknown");

    expect(response.status).toBe(404);
    done();
  });

  it("should connect to today's location endpoint", async done => {
    const response = await request.get("/weather/Sydney/today");

    expect(response.status).toBe(200);
    done();
  });

  it("should connect to Monday's location endpoint", async done => {
    const response = await request.get("/weather/Sydney/Monday");

    expect(response.status).toBe(200);
    done();
  });
});
