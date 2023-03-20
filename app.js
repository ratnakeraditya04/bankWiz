const express = require("express");
const path = require("path");
const app =  express();
const hbs = require("hbs");

const connectToMongo = require("./src/db/conn")
const register = require("./src/models/register");
const account = require("./src/models/account");
const contact = require("./src/models/contact");
const port = process.env.PORT || 3000;
const static = path.join(__dirname,'public'); 
const template = path.join(__dirname,'templates/views');
connectToMongo();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


// app.use(express.static(path.join(__dirname, 'public')));y8
//app.use(express.static(path.join(__dirname, '`${temp}`/views')));

//app.set('views', path.join(__dirname, 'views'));
app.set("view engine","hbs");
app.set("views", template)


app.use('/api/account',require('./src/routes/account'));
// app.use('/api/event',require('./routes/event'));

app.get("/", (req,res) => {
	res.render("index")
}); // workin

app.get("/signup", (req,res) => {
	res.render("login")
});
app.get("/signin", (req,res) => {
	res.render("login")
});
app.get("/contact", (req,res) => {
	res.render("contact")
});
app.get("/user", (req,res) => {
	res.render("user")
});
app.get("/admin", (req,res) => {
	res.render("admin")
});
app.post("/register", async(req,res) => {
	try{
		console.log(req.body)
		const password = req.body.password;
		const cpassword = req.body.conf_password;
		if(password === cpassword){
			const accountNumber = 100000 + Math.floor(Math.random() * 900000);
			const newAccount = new account({
				accountNumber,
			});
			const accountSaved = await newAccount.save();
			console.log(accountSaved)
	
			const registerUser = new register({
				name : req.body.name,
				address: req.body.address,
				contact : req.body.contact,
				dob : req.body.dob,
				user_name:req.body.username,
				password: req.body.password,
				conf_password:req.body.conf_password,
				gender:req.body.gender,
			})
			
			
			const registered = await registerUser.save();
			console.log(registered)
			if(registered){
				let cc = await register.findByIdAndUpdate(
					registered._id,
					{ "account" : accountSaved._id },
					{"new": true},
				)
			}
			console.log(registered)
			//res.status(201).render(index.hbs)
			res.redirect("/signup")
		}
		else{
			res.send("passwords are not matching");	
		}

		
	}catch(error){
		res.status(400).send(error);
	}
});

app.post("/contact", async(req,res) => {
	try{
		console.log(req.body)
		// const contact = req.body.contact;
			const registerUser = new contact({
				first_name : req.body.first_name,
				last_name : req.body.last_name,
				email : req.body.email,
				number : req.body.number,
				message : req.body.message,
			})
			//console.log(registerUser);
			const registered = await registerUser.save();
			//res.status(201).render(index.hbs)
			res.redirect("/index")
		
	}catch(error){
		res.status(400).send(error);
	}
});
app.listen(port, () =>{
	console.log(`server is running at port no ${port}`);
});
app.post("/regi", async(req,res) => {
	try{
		const username = req.body.username;
		const password = req.body.password;
		const user_email = await register.find({user_name: username});
		// res.send(user_email);
		console.log(user_email)
		console.log(password)
		if(user_email[0].password == password){
			//res.status(201).render("index")
			if(user_email[0].user_name == "admin") res.redirect("/admin")
			else res.redirect("/user")
		}else{
			res.send("Passwords are not matching")
		}

	}catch(error){
		res.status(400).send("invalid credentials");
	}
});



