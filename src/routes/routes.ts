import { IResult } from "../DTOs/DTOs";

const _express = require("express");
const router = _express.Router();
const FinderService = require("../services/finderService")

router.get("/search/:query", async (req: any, res: any) => {
    const { query } = req.params;
    const matchedResults = await FinderService.findByQuery(query)
    res.status(200).json({ "matched": matchedResults })
})

router.get("/result/:id", async (req: any, res: any) => {
    const { id } = req.params;
    const matchedResult = await FinderService.findById(id)
    res.status(200).json(matchedResult)
})

module.exports = router;