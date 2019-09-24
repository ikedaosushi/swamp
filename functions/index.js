const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');

// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: true,
    allowedHeaders: ["Authorization", "Content-Type"]
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.all("/spotify", (req, resp) => {
    const baseUrl = "https://api.spotify.com"
    const path = req.query.path
    const url = baseUrl + path
    let headers = {
        "Authorization": req.get('Authorization')
    }

    axios({
        method: req.method,
        url: url,
        headers: headers
    }).then(r => {
        resp.status(r.status).json(r.data)
    }).catch(e => {
        resp.status(e.response.status).json(e.response.data)
    })
})

app.all("/spotify/api/token", (req, resp) => {
    const url = "https://accounts.spotify.com/api/token"
    let headers = {
        "Authorization": req.get('Authorization')
    }
    const data = querystring.stringify(req.query)

    axios({
        method: "POST",
        url: url,
        data: data,
        headers: headers
    }).then(r => {
        resp.status(r.status).json(r.data)
    }).catch(e => {
        console.log(e)
        resp.status(500).json("error")
    })
})

exports.api = functions.https.onRequest(app);
