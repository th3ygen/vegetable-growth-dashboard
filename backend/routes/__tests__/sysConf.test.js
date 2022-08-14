const request = require("supertest");
const app = require("../../app");

describe("Get system config", () => {
	test("It should response the GET method", (done) => {
		request(app)
			.get("/api/sysConf")
			.then((response) => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});

describe("Update system config", () => {
	test("It should response the POST method", async () => {
		const response = await request(app)
			.post("/api/sysConf")
			.set("Accept", "application/json")
            .expect("Content-Type", /json/)
			.send({
				plantTypes: [
					{
						label: "test",
						short: "t",
						color: "#ffffff",
					},
				],
			});
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('success');
	});
});
