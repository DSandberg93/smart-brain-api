const Clarifai = require('clarifai');
// const secret = require('../secret');  // Using a separate untracked file is an easy way to keep sensitive information accessible to you but no to others

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY  // Make sure that the environment variable CLARIFAI_KEY exists with your api key, or just use the key directly here instead
    // apiKey: secret.clarifaiApiKey  // This is a simple alternative to using environmental variable while still keeping it secret
   });

const handleApiCall = (req, res) => {
    if (req.body.input != '') {
        app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to fetch data from API'));
    }
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entry count'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}