import { IResult } from "../DTOs/DTOs";

class Service {
    private splitAndSearch(query: string): string[] {
        const words_ = query.split(' ');
        return words_;
    }

    async findByQuery (query: string): Promise<IResult[]> {

        const pr_ = new Promise((resolve, reject) => {
            () => setTimeout(() => {
                resolve(([] as IResult[]))
            }, 100)
        })
        pr_.then((result) => result);
        const response = await pr_
        return (response as IResult[]);
    }

    async findById(id: string): Promise<IResult> {
        const pr_ = new Promise((resolve, reject) => {
            () => setTimeout(() => {
                resolve(({} as IResult))
            }, 100)
        })
        pr_.then((result) => result);
        const response = await pr_
        return (response as IResult);
    }
}
const FinderService = new Service();

module.exports = FinderService;