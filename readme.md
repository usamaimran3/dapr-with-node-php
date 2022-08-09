# Dapr Example with Node & PHP

## Prerequisites
This example requires you to have the following installed on your machine:
- [Docker](https://docs.docker.com/)
- [Node.js version 14 or greater](https://nodejs.org/en/)
- [PHP 8.0+](https://www.php.net/downloads)
- [Postman](https://www.getpostman.com/) [Optional]



## Step 1 - Setup Dapr

Follow [instructions](https://docs.dapr.io/getting-started/install-dapr-cli/) to download and install the Dapr CLI and initialize Dapr.

## Step 2 - Clone the repo

Now that Dapr is set up locally, clone the repo, then navigate to the Node.js version:

```sh
git clone https://github.com/usamaimran3/dapr-with-node-php.git
cd dapr-with-node-php/node-app
```

## Step 3 - Install dependencies

   ```bash
   npm install
   ```

## Step 4 - Run Node.js app with Dapr

   ```bash
   dapr run --app-id nodeapp --app-port 3002 --dapr-http-port 3500 node app.js
   ```
The command should output text that looks like the following, along with logs:
```
Starting Dapr with id nodeapp. HTTP Port: 3500. gRPC Port: 9165
You're up and running! Both Dapr and your app logs will appear here.
...
```

## Running the services

using the Visual Studio Code [Rest Client Plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

[sample.http](sample.http)
```http
POST http://localhost:3500/v1.0/invoke/nodeapp/method/set-page-views

{
    "pageViews": 30
}
```

## Confirm successful persistence

Now, to verify the page views were successfully persisted to the state store, create a GET request against: `http://localhost:3500/v1.0/invoke/nodeapp/method/show-page-views`


[sample.http](sample.http)
```http
GET http://localhost:3500/v1.0/invoke/nodeapp/method/show-page-views
```


