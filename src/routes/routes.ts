import { IResult } from "../DTOs/DTOs";

const _express = require("express");
const router = _express.Router();
const FinderService = require("../services/finderService")

router.get("/search/:query", (req: any, res: any) => {
    const { query } = req.params;
    const matchedResults = FinderService.findByQuery(query)
    res.status(200).json({ "status": query })
})

router.get("/result/:id", (req: any, res: any) => {
    const { id } = req.params;

    const a: IResult = {
        id,
        photo: "aosmdoas",
        title: "",
        description: "",
        shortDescription: "",
    }
    res.status(200).json({ "content": a })
})

module.exports = router;