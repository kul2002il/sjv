let examples = {
	simple:
	{
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
			"error": {
				"code": [
					"int",
					"422"
				],
				"message": [
					"string"
				],
				"errors": {
					"^[a-z]+$": [
						"array[1]",
						[
							"string"
						]
					],
					"__required": [
						"email",
						"password"
					]
				},
				"__required": [
					"code",
					"message",
					"errors"
				]
			},
			"__required": [
				"error"
			]
		},
		result: true,
	},
}


for(ex in examples)
{
	let validator = new Sjv(examples[ex].schema);
	let actual = validator.validate(examples[ex].data);
	if(JSON.stringify(actual) !== JSON.stringify(examples[ex].result))
	{
		console.log('Тест:');
		console.log(examples[ex]);
		console.log('Результат валидации:');
		console.log(actual);
		throw 'Тест ' + ex + ' не прошёл.';
	}
}

document.querySelectorAll('[data-source]').forEach((elem)=>{
	let source = examples[elem.getAttribute('data-source')];
	elem.innerText = 'let data = ' + JSON.stringify(source['data'], null, '\t')
		+ ';\nlet schema = ' + JSON.stringify(source['schema'], null, '\t')
		+ ';\n\nlet validator = new Sjv(schema);'
		+ '\nconsole.log(validator.validate(data);'
});

document.querySelectorAll('[data-result]').forEach((elem)=>{
	let source = examples[elem.getAttribute('data-result')];
	
	elem.innerText = JSON.stringify(source.result, null, '\t');
});
