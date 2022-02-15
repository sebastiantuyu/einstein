const expect = require("chai").expect;
const mockFinder = require("../../services/FinderService");

const mockDataSet = [
    {
        id: "0",
        tags: [
            "cat",
            "pink",
            "bath",
            "bubles",
            "kitty"
        ]
    },
    {
        id: "1",
        tags: [
            "cook",
            "and",
            "green",
            "tomatoes",
            "water"
        ]
    },
    {
        id: "2",
        tags: [
            "sky",
            "blue",
            "clouds",
            "black",
            "sun"
        ]
    },
]

describe("Test FinderService", () => {
    before(() => {

    })

    it("If is an empty query, return empty", () => {
        const query = "";
        const response = mockFinder.splitAndSearch(query, mockDataSet);
        expect(response.length).to.equal(0);
    })

    it("If query doesn't match any tag, should return empty array", async () => {
        const query = "Some random word";
        const response = mockFinder.splitAndSearch(query, mockDataSet);
        expect(response.length).to.equal(0)
    })

    it("If at least some word mathces, return it", () => {
        const query = "how to cook";
        const response = mockFinder.splitAndSearch(query, mockDataSet);
        expect(response.length).to.equal(1);
    });

    it("Words matches no matter the case", () => {
        const query = "CoOk bLacK ClOudS";
        const response = mockFinder.splitAndSearch(query, mockDataSet);
        expect(response.length).to.equal(2);
    })

    it("Partial string should match too", () => {
        const query = "tomato"
        const response = mockFinder.splitAndSearch(query, mockDataSet);
        expect(response.length).to.equal(1);
    })

    it("Should return results matching blacklist words", () => {
        const query = "and";
        const response = mockFinder.splitAndSearch(query, mockDataSet);
        expect(response.length).to.equal(0);
    })
})