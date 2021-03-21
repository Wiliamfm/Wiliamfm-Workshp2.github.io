var d;
var table;
/**
 * Upload table.
 */
function upload() {
  generateTable();
}

async function loadData() {
  d = await d3.dsv(";", "./data/pets-citizens.csv");
}


/** 
 * Create table
*/
function generateTable() {
  loadData().then(function () {
    document.getElementById("h6").innerHTML = "";
    table = document.createElement("table");
    table.id = "dataTable";
    let heads = ["Index"];
    d.columns.forEach(element => {
      heads.push(element);
    });
    heads.push("ACTUALIZAR");
    addTableHeads(table, heads);
    let rows = [];
    let i = 0;
    for (const values of d) {
      let row = [];
      i++;
      row.push(i);
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          row.push(values[key]);
        }
      }
      rows.push(row);
    }
    addTableRows(table, rows);
    //add the table to the body tag
    let divTable = document.getElementById("divTable");
    divTable.appendChild(table);
  });
}

/**
 * Add the headers to the table
 * @param {Object} table the table tag
 * @param {String} keys the headers of the table
 */
function addTableHeads(table, keys) {
  let thead = document.createElement("thead");
  thead.className = "table";
  let tr = document.createElement("tr");
  tr.className = "table";
  for (let h of keys) {
    let th = document.createElement("th");
    th.className = "table";
    let txt = document.createTextNode(h);
    th.appendChild(txt);
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  table.className = "table";
}

/**
 * Add rows to the table.
 * @param {Object} table the table tag
 * @param {Array} rows the rows of the table
 */
function addTableRows(table, rows) {
  let tbody = document.createElement("tbody");
  tbody.className = "table";
  for (let c of rows) {
    let tr = document.createElement("tr");
    tr.className = "table";
    for (const v of c) {
      let td = document.createElement("td");
      td.className = "table";
      let txt = document.createTextNode(v);
      td.appendChild(txt);
      tr.appendChild(td);
    }
    let td = document.createElement("button");
    td.innerHTML = "ACTUALIZAR DATOS";
    td.className = "btn btn-outline-primary";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}

/**
 * create the options for the select form of neighborhood 
 * @param {object} d the data of the pets 
 */
function addNeighborhoodForm() {
  loadData().then(function () {
    let selectForm = document.getElementById("neighborhood");
    let items = [];
    for (const row of d) {
      if (!items.includes(row.neighborhood) && row.neighborhood != "") {
        let neighborhood = document.createElement("option");
        items.push(row.neighborhood);
        neighborhood.value = row.neighborhood;
        neighborhood.text = row.neighborhood;
        selectForm.appendChild(neighborhood);
      }
    }
  });
}

function upgradePet() {
  alert("Mascota registrada")
  let id = document.getElementById("id");
  let microchip = document.getElementById("microship");
  let specie = document.getElementById("specie");
  let sex = document.getElementById("sex");
  let size = document.getElementById("size");
  let potentDangerous = document.getElementById("potentDangerous");
  let neighborhood = document.getElementById("neighborhood");
  addPetToData();
  alert(d);
}

function addPetToData() {
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
