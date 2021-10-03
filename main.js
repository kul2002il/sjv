
class Sjv{
	constructor(schema)
	{
		if(typeof(schema) === "object")
		{
			if(Array.isArray(schema))
			{
				let name = schema[0].match(/([A-Za-z_0-9]+).*?/)[1];
				if ('validator_' + name in this)
				{
					this.validatorFunction = (data) => {
						return this['validator_' + name](data, schema)
					};
				}
				else
				{
					console.log(schema);
					throw 'Валидатор ' + name + ' не найден.';
				}
			}
			else
			{
				this.validators = {};
				this.required = schema['__required'];
				for(let key in schema)
				{
					if(key.search(/__.+/))
					{
						this.validators[key] = new Sjv(schema[key]);
					}
				}
			}
		}
	}
	run(data)
	{
		let log = {};
		if(this.required)
		{
			this.required.forEach((required)=>
			{
				if (!(required in data))
				{
					log[required] = 'Поле ' + required + ' обязательно.';
				}
			});
		}
		if(typeof(this.validators) === "object")
		{
			let keysValidators = Object.keys(this.validators);
			keysValidators.forEach((keyValidator)=>
			{
				for(let pin in data)
				{
					if(pin.search(keyValidator)+1)
					{
						let result = this.validators[keyValidator].run(data[pin]);
						if(result)
						{
							log[pin + ' — ' + keyValidator] = result;
						}
					}
				}
			});
		}
		else
		{
			return this.validatorFunction(data);
		}
		return Object.keys(log).length == 0 ? false : log;
	}
	validate(data)
	{
		return this.run(data) === false;
	}
	errors(data)
	{
		return this.run(data);
	}

	validator_int(data, schema)
	{
		if(!Number.isInteger(data))
		{
			return data + '— не число';
		}
	}
	validator_string(data, schema)
	{
		if(typeof(data) !== 'string')
		{
			return data + '— не число';
		}
	}
	validator_array(data, schema)
	{
		if(!Array.isArray(data))
		{
			return data + '— не массив';
		}
	}
}
