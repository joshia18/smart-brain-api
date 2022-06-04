const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '8677d6f01ab944b184ab41f0bc92c6af'
});

const apiCallHandler = (req, res) => {
	const imageUrl = req.body.imageUrl;

	app.models.predict(Clarifai.FACE_DETECT_MODEL,imageUrl)
	.then(response => res.json(response))
	.catch(err => res.status(400).json('error fetching API Call'));
}

const imageEntriesHandler = (req, res, database) => {
	const {id} = req.body;
	
	database('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		if(entries.length){
			res.json(entries[0].entries)
		}
		else{
			res.status(404).json('no user found');
		}
	})
	.catch(err => res.status(404).json('error getting user'));
	
}

module.exports = {
    imageEntriesHandler,
		apiCallHandler
}