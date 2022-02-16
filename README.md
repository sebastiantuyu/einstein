# Einstein
> Einstein is the backend for the oracle search engine

# How it works

Einstein uses `sqlite3` + `express.js` to provide an api to compute the results

- Try examples like the following ones (using the `oracle` repo):
    - How to cook pink food?
    - Snow and farm
    - People at the beach
    - Computer and white tables
    - People
## How to use

- Install the packages with

```
npm install
```

- Create the `public/` folder at the root of the project
- Create the `.env` file with the following parameter

```
EINSTEIN_LOCAL_PORT=8000
```


> Einsten run the DB migrations on the initial run, so you don't have to worry of load the data.
> you can find all the datasets on the file `einstein-dataset.json`
## Run the app

The app will be available on port `8000` with the command
```
npm run start
```

