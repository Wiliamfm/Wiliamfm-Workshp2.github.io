function upload() {

}
let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" }
];

/** 
 * Create table
*/
function generateTable() {
  let table = document.createElement("table");
  d3.dsv(";", "./data/pets-citizens.csv").then(function (data) {
    console.log(data);
    addTableHeads(table, data.columns);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
    }
  });
  //add the table to the body tag
  let body = document.querySelector("body");
  body.appendChild(table);
}

/**
 * Add the headers to the table
 * @param {Object} table the table tag
 * @param {String} keys the headers of the table
 */
function addTableHeads(table, keys) {
  let tr = document.createElement("tr");
  tr.className = "table";
  for (let h of keys) {
    let th = document.createElement("th");
    th.className = "table";
    let txt = document.createTextNode(h);
    th.appendChild(txt);
    tr.appendChild(th);
  }
  table.appendChild(tr);
  table.className = "table";
}

function addTableRows(table, rows) {
  let div = document.createElement("div");
  div.className = "table";
  for (let c of rows) {
    let tr = document.createElement("tr");
    tr.className = "table";
    for (const v of c) {
      let td = document.createElement("td");
      td.className = "table";
      let txt = document.createTextNode(c);
      td.appendChild(txt);
      tr.appendChild(td);
    }
    div.appendChild(tr);
  }
  table.appendChild(div);
}

function validate(f) {

  var id = document.getElementById("id").value;
  var ver = true;
  var msg = "This entries are wrong \n";
  var cor = 7;

  {
    if (isNaN(f.elements[0].value)) {
      msg += "- ID \n"
      cor--;
      ver = false;
    }
    if (isNaN(f.elements["microchip"].value)) {
      msg += "- Microchip \n";
      cor--;
      ver = false;
    }
    if (f.elements["species"].value == "") {
      msg += "- Species \n";
      cor--;
      ver = false;
    }
    if (f.elements["sex"].value == 0) {
      msg += "- Sex \n";
      cor--;
      ver = false;
    }
    if (isNaN(f.elements["size"].value)) {
      msg += "- Size \n";
      cor--;
      ver = false;
    }
    if (f.elements["potDangerous"].value == 0) {
      msg += "- Potentially Dangerous \n";
      cor--;
      ver = false;
    }
    if (f.elements["neighborhood"].value == "") {
      msg += "- Neighborhood \n";
      cor--;
      ver = false;
    }

    if (cor == 7) {
      alert(id + "The new animal has been registered.")
    }

    if (ok == false)
      alert(msg);
    return ok;
  }
}
