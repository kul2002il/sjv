let examples = {
	simple:
	{
		h: 'Простой пример',
		data: {
			"error": {
				"code": 422,
				"message": "Validation error",
				"errors": {
					"email": [
						"The email field is required."
					],
					"password": [
						"The password field is required."
					]
				}
			}
		},
		schema: {
			code: ['int', '422'],
			message: ['string'],
			errors:
			{
				'^[a-z]+$': ['array[1]',
					['string'],
				],
				'__required': ['email, password'],
			},
			'__required': ['code, message', 'errors'],
		}
	},
}

document.querySelectorAll('[data-source]').forEach((elem)=>{
	let source = examples[elem.getAttribute('data-source')];
	elem.innerText = 'let data = ' + JSON.stringify(source['data'], null, '\t')
		+ ';\nlet schema = ' + JSON.stringify(source['schema'], null, '\t')
		+ ';\n\nlet validator = new Validator(schema);'
		+ '\nconsole.log(validator.validate(data);'
});

document.querySelectorAll('[data-result]').forEach((elem)=>{
	let source = examples[elem.getAttribute('data-result')];
	let validator = new Validator(source.schema);
	elem.innerText = JSON.stringify(validator.validate(source.data), null, '\t');
});
