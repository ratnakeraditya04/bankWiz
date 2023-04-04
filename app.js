const express = require("express");
const path = require("path");
const app =  express();
const hbs = require("hbs");

const connectToMongo = require("./src/db/conn")
const register = require("./src/models/register");
const account = require("./src/models/account");
const contact = require("./src/models/contact");
const loan = require("./src/models/loan");
const port = process.env.PORT || 3000;
const static = path.join(__dirname,'public'); 
const template = path.join(__dirname,'templates/views');
const bodyParser = require('body-parser')
let accountNumber = ""
app.use(bodyParser.urlencoded({ extended: false }));
//connectToMongo();
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
app.get("/loan", (req,res) => {
	res.render("loan")
});
app.get("/signin", (req,res) => {
	res.render("login")
});
app.get("/contact", (req,res) => {
	res.render("contact")
});
app.get("/user", (req,res) => {
	// var accountNumber = localStorage.getItem('accountNumber')
	console.log(accountNumber)
	res.render("user", {accountNumber:accountNumber})
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
			const accountNum = 100000 + Math.floor(Math.random() * 900000);
			const newAccount = new account({
				accountNumber:accountNum,
                name:req.body.name,
			});
			newAccount.save().then((newAccount)=>{
				console.log(newAccount._id);
				const registerUser = new register({
					name : req.body.name,
					address: req.body.address,
					contact : req.body.contact,
					dob : req.body.dob,
					user_name:req.body.username,
					password: req.body.password,
					conf_password:req.body.conf_password,
					gender:req.body.gender,
					accountNumber: newAccount,
				})
				
				
				registerUser.save().then((reg)=>{
					res.redirect("/signup")
				})				//res.status(201).render(index.hbs)
			})
			
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
		const data=user_email[0];
		console.log(data);
		console.log(password)
		if(user_email[0].password == password){
			//res.status(201).render("index")
			// accountNumber = user_email[0].accountNumber;
			// console.log(accountNumber);
			// console.log(user_email[0])
			console.log("hi");
			if(user_email[0].user_name == "admin") res.json({
				message:"/admin"
			})
			else res.json({
				message:"/user"
			})
		}else{
			res.json({error:"Passwords are not matching"})
		}

	}catch(error){
		res.status(400).send("invalid credentials");
	}
});
app.post("/loan", async(req,res) => {
	try{
		console.log(req.body)
		const anumber = req.body.accountNumber;
		const an = await account.findOne({accountNumber : anumber});
		if(an){
			const loan_new = new loan({
				accountNumber : req.body.accountNumber,
		        amount : req.body.amount,
		        duration : req.body.years,
		        type : req.body.type,
				
			})
			const amount = req.body.amount
			const a  = await loan_new.save();
			console.log(a)
			console.log("line 164")
			const ty = req.body.type;
			const years = req.body.years;
			const and = await account.findOne({accountNumber : anumber});
			if(and){
				and.balance += a.amount
				await and.save() 
				const interest = 10;
				if(ty == "Education Loan"){
					interest = 3;
				}
				else if(ty == "Vehicle Loan"){
					interest =  4;
				}
				else if(ty == "Gold Loan"){
					interest =  5;
				}
				else if(ty == "Home Loan"){
					interest =  6;
				}
				else if(ty == "Personal Loan"){
					interest =  7;
				}
				const debt = amount*(100+ interest)/100;
				console.log("Total amount to return : ");
				console.log(debt);
				console.log("Total time : ");
				console.log(years);
				console.log("Amount to return per month : ");
				const perm  = (debt/years)/12;
				console.log(perm);
			
			}
			//res.redirect("/user")
			
				//console.log(an)
				//await account.save()
				
		}
			
		}catch(error){
			console.log(error)
			res.status(400).send(error)
			// "Account does not exist"
		}
		
		
		
		

	
});




