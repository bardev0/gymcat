import { transformCSV, readCSV } from  "../import_csv"

describe("check if import CVS returns not empty array", () => {

	let result: any[]

	beforeEach(() => {
		result = transformCSV("greg",  readCSV("workouts_to_enter.csv"))
	})


	it("should be an array", async () => {
		
    expect(result).toBeInstanceOf(Array);

	})
})
