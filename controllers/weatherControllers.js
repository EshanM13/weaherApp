const axios = require('axios');
const {locationUrl, byCordinatesUrl , formatData} = require('../helpers/weatherHelpers');

const getByLocation = async (req,res) => {
    if(!req.query.city){
        const err =  new Error('Invalid city')
        return res.status(400).json({
            message: 'Please enter valid city name',
            error: err.message
        });
    }
    try {
        const url = locationUrl(req);
        const response = await axios.get(url);
        const data = response.data;
        const lattitude = data[0].lat;
        const longitude = data[0].lon;
        const cordinates = {
            lattitude : `${lattitude}`,
            longitude: `${longitude}`
        };
        // return res.status(200).json({
        //     lattitude : `${lattitude}`,
        //     longitude: `${longitude}`
        // });
        return cordinates;
    }
    catch (err){
        console.log(err.stack);
        return res.status(500).json({
            message: 'Error occured in axios call',
            err: err.message
        });
    }
};

const getTemperature = async(req,res) => {
    try{
        const long = req.query?.long;
        const lat = req.query?.lat;
        if (!long || !lat){
            const cordinates =  await getByLocation(req, res);
            const url = byCordinatesUrl(cordinates);
            const response = await axios.get(url);
            const data = response.data;
            const formattedData = formatData(data);
            console.log('through name');
            return res.status(200).json({
                message: formattedData
            });
        }
        else {
            const cordinates = {
                lattitude: `${lat}` , 
                longitude: `${long}`
            }
            const url = byCordinatesUrl(cordinates);
            const response = await axios.get(url);
            const data = response.data;
            const formattedData = formatData(data);
            console.log('through cords')
            return res.status(200).json({
                message: formattedData
            });
        }
    }
    catch (err){
        console.log('An error occured while getting temperature:', err.message);
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {getByLocation, getTemperature };