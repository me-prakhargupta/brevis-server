import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import connectDb from "../config/db.js";

process.env.NODE_ENV = "test";

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Rate Limit Testing", () => {
    it("should block after too many requests", async () => {
        for (let i = 0; i < 5; i++) {
            await request(app)
                .post("/api/v1/auth/signin")
                .send({
                    identifier: "meprakhargupta",
                    password: "Infinix@0980"
                });
        }

        const res = await request(app)
            .post("/api/v1/auth/signin")
            .send({
                identifier: "meprakhargupta",
                password: "Infinix@0980"
            });

        expect(res.status).toBe(429);
    }, 15000);

});