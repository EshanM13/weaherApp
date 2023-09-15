const express = require('express');
const router = express.Router();
const axios = require('axios');
const {getByLocation, getTemperature} = require('../controllers/weatherControllers')

router.get('/byLocationName',getByLocation); // if UI wants to get cordinates by entering name
router.get('/getTemperature',getTemperature ); // for getting temperature both through cordinates or through name 

module.exports =  router;