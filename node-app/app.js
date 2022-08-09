const express = require('express');
require('isomorphic-fetch');

const app = express();
app.use(express.json());

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const stateStoreName = `statestore`;
const stateUrl = `http://localhost:${daprPort}/v1.0/state/${stateStoreName}`;
const port = process.env.APP_PORT ?? '3000';


app.post('/set-page-views', async (req, res) => {
    const data = req.body;
    const pageViews = data.pageViews;
    console.log("Page Views: " + pageViews);

    const state = [{
        key: "page_views",
        value: pageViews
    }];

    try {
        const response = await fetch(stateUrl, {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw "Failed to persist page views state.";
        }
        
        console.log("Successfully persisted page views state.");
        res.status(200).send();

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error});
    }
});

app.get('/show-page-views', async (_req, res) => {
    try {

        const response = await fetch(`${stateUrl}/page_views`);
        if (!response.ok) {
            throw "Could not get page views state.";
        }
        const pageViews = await response.text();
        console.log(`Page Views: ${pageViews}`)
        res.send(pageViews);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error});
    }
});


app.listen(port, () => console.log(`Node App listening on port ${port}!`));
