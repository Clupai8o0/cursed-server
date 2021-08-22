const express = require("express");
const cors = require("cors");
const path = require("path");
const idGenerator = require("./algorithm");
const bodyParser = require("body-parser");

//* database
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.MONGODB_URL; // * if u had used localhost instead of 127.0... it slows down the app
const databaseName = "cursed-bot-database"; // ? database name\
let db = undefined;
MongoClient.connect(
	connectionURL,
	{
		useNewUrlParser: true,
	},
	(error, client) => {
		if (error) return console.log("Unable to connect to database");
		console.log("Successfully connected to database");
		db = client.db(databaseName);
	}
);

const app = express();
const port = process.env.PORT;
const publicDirPath = path.join(__dirname, "../public");
app.use(cors());
app.use(express.static(publicDirPath));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/adventures", async (req, res) => {
	const adventures = await db.collection("adventures").find({}).toArray();
	res.status(200).send(adventures);
});
app.get("/items", async (req, res) => {
	const items = await db.collection("items").find({}).toArray();
	res.status(200).send(items);
});

app.delete("/adventure/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await db.collection("adventures").deleteOne({ id });
		res.status(200).send("success");
	} catch (e) {
		res.status(500).send(e);
	}
});
app.delete("/item/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await db.collection("items").deleteOne({ id });
		res.status(200).send("success");
	} catch (e) {
		res.status(500).send(e);
	}
});

app.post("/adventure/add", async (req, res) => {
	console.log(req.body)
	const { name, description, level, time, money, xp, url } = req.body;
	if (
		name === undefined ||
		description === undefined ||
		level === undefined ||
		xp === undefined ||
		url === undefined ||
		money === undefined
	)
    res.status(500).send("Invaid datatype (There are null values)");
	const adventure = {
		name,
		description,
		id: idGenerator(
			level,
			await db.collection("adventures").find({}).toArray()
		),
		requirements: {
			level: parseInt(level),
			time: parseInt(time),
			atk: (parseInt(level) ** 2 * 100) / 1000,
			def: (parseInt(level) ** 2 * 100) / 1000,
		},
		reward: {
			money: parseInt(money),
			xp: parseInt(xp),
		},
		url,
	};
	await db.collection("adventures").insertOne(adventure);
	res.status(200).send({
		status: "success"
	});
});

app.get("*", (req, res) => {
	res.status(400).send("<h1>Page not found</h1>");
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
