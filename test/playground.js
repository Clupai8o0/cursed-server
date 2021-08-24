const fs = require("fs");

const ItemId = (type='', feature='', duo=false, items=[]) => {
  const data = JSON.parse(fs.readFileSync("src/data/item.json"));

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

const itemFeature = (type="", feature="", duo=false) => {
  const data = JSON.parse(fs.readFileSync("src/data/item.json"));
  if (type.toLowerCase() === "sword") {
    for (let i=0; i < data.features_blade.length; i++) {
      if (data.features_blade[i].feature === feature && data.features_blade[i].duo === duo) 
        return data.features_blade[i].id;
    }
  }
}

console.log(ItemId('sword', 'long', true))
