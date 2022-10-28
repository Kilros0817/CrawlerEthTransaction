import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

describe("POST /login", () => {
    it("should return Success with status 200", (done) => {
        request(app).post("/login")
            .field("email", "justin424w@gmail.com")
            .field("password", "qwre1234")
            .expect(200)
            .end((err, res) => {
                expect(res.error).not.to.be.undefined;
                done();
            });

    });
});
