const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const resp = require("./helper/response")

require("./db/mongoose.js"); // ensures that mongoose.js runs
const adventureRouter = require('./routers/adventure');
const itemRouter = require("./routers/item");
const classRouter = require("./routers/classes");
const elementRouter = require("./routers/elements");
const complainRouter = require("./routers/complain");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(adventureRouter);
app.use(itemRouter);
app.use(classRouter);
app.use(elementRouter);
app.use(complainRouter);

app.get("*", (req, res) => {
  res.status(400).send(resp(false, 'The given url does not exist.'));
});

app.listen(port, () => console.log(`Server is up on port ${port}`));

