const fs = require("fs");
const resp = require("../../helper/response");

const readJson = () =>
  JSON.parse(fs.readFileSync("src/data/json/classes.json"));
const writeJson = (data) => 
  fs.writeFileSync("src/data/json/classes.json", JSON.stringify(data));

const addClass = (name='', info='', thumbnail='', img='') => {
  const _class = {
    name: name.toLowerCase(),
    info,
    thumbnail,
    img
  };
  let data = readJson()
  data.push(_class);
  writeJson(data);
  return resp(true, '');
}

module.exports = addClass;
