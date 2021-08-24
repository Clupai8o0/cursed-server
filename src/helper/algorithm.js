const fs = require("fs");

const AdventureId = (level, adventures) => {
  let rank = "";
  if (level < 10) rank = "f";
  else if (level < 20) rank = "e";
  else if (level < 30) rank = "d";
  else if (level < 40) rank = "c";
  else if (level < 60) rank = "b";
  else if (level < 90) rank = "a";
  else if (level < 200) rank = "s";
  else rank = "u";

  //* generating unicode
  const length = adventures.filter((adventure) => {
    return adventure.id.includes(rank);
  }).length;
  let code = "";
  if (length === 0) code += "000";
  else if (length.toString().length == 1) code += "000";
  else if (length.toString().length == 2) code += "00";
  else if (length.toString().length == 3) code += "0";
  code += (length + 1).toString();

  //* adding date
  const dt = new Date();
  const day =
    dt.getDate().toString().length == 1
      ? "0" + dt.getDate().toString()
      : dt.getDate().toString();
  const month =
    dt.getMonth().toString().length == 1
      ? "0" + dt.getMonth().toString()
      : dt.getMonth().toString();
  return "q" + rank + code + month + day;
};

const ItemId = (type = "", feature = "", duo = false, items = []) => {
  const data = JSON.parse(fs.readFileSync("src/data/json/item.json"));

  //* type
  let mark = "";
  const types = data.types;
  for (let i = 0; i < types.length; i++) {
    if (types[i].name.toLowerCase() === type.toLowerCase()) {
      mark = types[i].id;
      break;
    }
  }

  //* feature
  const _feature = itemFeature(type, feature, duo);

  //* generating unicode
  const length = items.filter((item) => {
    return item.id.includes(mark);
  }).length;
  let code = "";
  if (length === 0) code += "000";
  else if (length.toString().length == 1) code += "000";
  else if (length.toString().length == 2) code += "00";
  else if (length.toString().length == 3) code += "0";
  code += (length + 1).toString();

  //* adding date
  const dt = new Date();
  const day =
    dt.getDate().toString().length == 1
      ? "0" + dt.getDate().toString()
      : dt.getDate().toString();
  const month =
    dt.getMonth().toString().length == 1
      ? "0" + dt.getMonth().toString()
      : dt.getMonth().toString();

  return mark + _feature + code + month + day;
};

const itemFeature = (type = "", feature = "", duo = false) => {
  const data = JSON.parse(fs.readFileSync("src/data/json/item.json"));
  if (type.toLowerCase() === "sword") {
    for (let i = 0; i < data.features_blade.length; i++) {
      if (
        data.features_blade[i].feature === feature &&
        data.features_blade[i].duo === duo
      )
        return data.features_blade[i].id;
    }
  }
};

module.exports = { AdventureId, ItemId };
