const express = require('express');
const Clarifai = require('clarifai');
const bodyParser=require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 4001;

const clarifaiApi = new Clarifai.App({
	apiKey: '641529200e4742079d67230d6c230abc'
})

app.get('/',(req,res)=>{
	res.status(200).json('Welcome Dear!');
})

app.post('/imageurl',(req,res)=>{
	// console.log(req.body);
	const result = []
	clarifaiApi.models
	.predict('d16f390eb32cad478c7ae150069bd2c6',req.body.input)
	.then(data=>{
		obj=data.outputs[0].data.concepts;
		Object.keys(obj).forEach(key=>{
			let s= `Probability of `+obj[key].name + ' is ' + obj[key].value;
			result.push(s);
		})
		res.json(result);
	})
	.catch(err => res.status(400).json('unable to work with api'));
})

app.listen( PORT, ()=>{
	console.log(`Server is listening on ${PORT}`);
});
