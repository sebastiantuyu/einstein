import { IResultExtended } from "../DTOs/DTOs";

const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const dataSet = JSON.parse(fs.readFileSync("./einstein-dataset.json"));

let db_ = new sqlite3.Database("einstein.sqlite", (error: any) => {
    if (error) {
        throw error;
    } else {
        // Run initial migration
        const initalMigration_00 = `CREATE TABLE OPTIONS (
            "ID" INTEGER UNIQUE,
            "PHOTO"	TEXT,
            "SHORT_DESCRIPTION"	TEXT,
            "DESCRIPTION"	TEXT,
            "TITLE"	TEXT,
            PRIMARY KEY("ID" AUTOINCREMENT)
        )`;

        const initialMigration_01 = `CREATE TABLE TAGS (
            OPTION_ID INTEGER,
            TAG_0 TEXT,
            TAG_1 TEXT,
            TAG_2 TEXT,
            TAG_3 TEXT,
            TAG_4 TEXT,
            FOREIGN KEY (OPTION_ID) REFERENCES OPTIONS(ID)
        )`;

        db_.run(initalMigration_00, (error: any) => {
            if(!error) {
                console.log("Building options database...")
                const autoMigration = "INSERT INTO OPTIONS (ID, PHOTO, SHORT_DESCRIPTION, DESCRIPTION, TITLE) VALUES (?, ?, ?, ?, ?)";
                (dataSet.dataset as IResultExtended[]).map((item: IResultExtended) => {
                    console.log([item.id, item.photo, item.shortDescription, item.description, item.title])
                    db_.run(autoMigration, [item.id, item.photo, item.shortDescription, item.description, item.title]);
                })
            }
        })

        db_.run(initialMigration_01, (error: any) => {
            if (!error) {
                console.log("Building tags database...")
                const autoMigration = "INSERT INTO TAGS (OPTION_ID, TAG_0, TAG_1, TAG_2, TAG_3, TAG_4) VALUES (?, ?, ?, ?, ?, ?)";
                (dataSet.dataset as IResultExtended[]).map((item: IResultExtended) => {
                    console.log([parseInt(item.id), item.tags[0], item.tags[1], item.tags[2], item.tags[3], item.tags[4]])
                    db_.run(autoMigration, [parseInt(item.id), item.tags[0], item.tags[1], item.tags[2], item.tags[3], item.tags[4]]);
                })
            }
        })
    }
})

db_.close((error: any) => {
    if(error) {
        console.error(error)
    }
})