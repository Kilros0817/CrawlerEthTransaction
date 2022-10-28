import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

// jest.useFakeTimers();
describe("POST /crawler", () => {
  let accessToken = "";

  it("Crawl the transactions of user's wallet", async () => {
    let update_data = { mintQuantity: 76 };
    await request(app)
      .post("/crawler")
      .set("Authorization", "bearer " + accessToken)
      .send(update_data)
      .expect(200);
  });

  beforeAll(async () => {
    jest.setTimeout(10000);
    await request(app)
      .post("/login")
      .send({
        email: "justin424w@gmail.com",
        password: "qwerqwer",
      })
      .then(async (res) => {
        accessToken = res.body.token;
      });
  });
});
