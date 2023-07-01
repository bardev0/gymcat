import app from "../../src/app";
import request from "supertest";

describe("testExport path", () => {
    test("check if route has response", () => {
        return request(app).get("/testExport").expect(200);
    });
});
