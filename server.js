const express = require('express');
require('dotenv').config();
const https = require('https');
const axios = require('axios');
const app = express();
const weatherRoutes = require('./routes/weatherRoutes');

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/api/weather', weatherRoutes);


app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
});
