import app from "../../src/app";
import request from "supertest";

describe("testExport path", () => {
    it("check if route has response", async () => {
        const req = await request(app).get("/testExport");
        expect(req.status).toBe(200);
    });
    it("check if response is JSON", async () => {
        const req = await request(app).get("/testExport");
        expect(req.type).toEqual("application/json");
    });
});
