const handleSignin = (req, res, database, bcrypt) => {
	const {email, password} = req.body;

	if(!email || !password){
		return res.status(400).json('incorrect form submission');
	}

	database.select('email', 'hash').from('login').where('email','=',email)
	.then(response => {
		const isvalid = bcrypt.compareSync(password, response[0].hash);
		if(isvalid){
			return database.select('*').from('users').where('email', '=', email)
			.then(data => {
				res.json(data[0]);
			})
			.catch(err => res.status(404).json('unable to get the user'));
		}
		else{
			res.status(400).json('wrong credentials');
		}
	})
	.catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
    handleSignin: handleSignin
}