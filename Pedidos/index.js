const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());



