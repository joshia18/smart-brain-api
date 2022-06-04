const handleRegister = (req, res, database, bcrypt) => {
	const {name, email, password} = req.body;

    if(!name || !email || !password){
		return res.status(400).json('incorrect form submission');
	}

	const hash = bcrypt.hashSync(password);
	
	database.transaction(trx => {
		trx.insert({
			email: email,
			name: name,
			joined: new Date()
		})
		.into('users')
		.returning('*')
		.then(user => {
			return trx('login')
			.insert({
				email: user[0].email,
				hash: hash
			})
			.then(res.status(200).json(user[0]));
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err => res.status(400).json('unable to register'));
	
}

module.exports = {
    handleRegister: handleRegister
}