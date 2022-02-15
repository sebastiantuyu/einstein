export interface IResult {
    id: string;
    photo: string;
    title: string;
    shortDescription: string;
    description: string;
}

export interface IResultExtended extends IResult {
    tags: string[];
}