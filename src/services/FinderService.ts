import { IOptionTags, IResult } from "../DTOs/DTOs";
const sqlite3 = require("node-sqlite3");

class Service {
    db: any;

    constructor() {
        this.db = new sqlite3("einstein.sqlite");
        this.db.open()
    }

    splitAndSearch(query: string, optionsTagsArray: IOptionTags[]): IOptionTags[] {
        const BLACKLIST = ["for", "and", "how", "but", "while", "too", "also"]

        if (query === '') {
            return [];
        }
        const words_ = query.split(' ')
                    .filter((word: string) => {
                        return !BLACKLIST.some((bk) => bk === word.toLowerCase())
                    });
        return optionsTagsArray.filter((option: IOptionTags) => {
            return option.tags.some(((op) =>
                words_.some((word) => {
                    return op.includes(word.toLowerCase())
                })
            ))
        })
    }

    parseRawSQLToTagObject(row: any[]): IOptionTags[] {
        const transformed_ = row.map((item: any) => {
            const tags: any[] = []
            for(let e = 0; e < 5; e++) {
                tags.push(item[`TAG_${e}`])
            }

            return ({ id: item.OPTION_ID, tags: tags } as IOptionTags)
        })
        return transformed_;
    }

    parseRawSQLToResultObject(row: any): IResult {
        return {
            id: row.ID,
            photo: row.PHOTO,
            description: row.DESCRIPTION,
            shortDescription: row.SHORT_DESCRIPTION,
            title: row.TITLE
        } as IResult;
    }

    async findByQuery (query: string): Promise<IResult[]> {
        if(this.db.db) {
            const _sql = "SELECT * FROM TAGS";
            let resultsTable: any[] = [];
            let tagsTable = this.parseRawSQLToTagObject(await this.db.all(_sql, []));
            const selectedTags = this.splitAndSearch(query, tagsTable);
            for (const selected of selectedTags) {
                resultsTable.push(await this.findById(selected.id))
            }
            return (resultsTable);
        }
        return ([] as IResult[]);
    }

    async findById(id: string): Promise<IResult> {
        if(id === undefined) {
            throw Error("Not provided id")
        }
        const _sql_getbyId = `SELECT * FROM OPTIONS WHERE ID=${id}`;
        try {
            const result = this.parseRawSQLToResultObject(await this.db.get(_sql_getbyId, []));
            return (result as IResult);

        } catch {
            return {} as IResult;
        }
    }
}
const FinderService = new Service();

module.exports = FinderService;