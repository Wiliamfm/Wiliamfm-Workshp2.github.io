/**
 * Upload table.
 */
function upload() {
  generateTable();
}

async function loadData() {
  let d = await d3.dsv(";", "./data/pets-citizens.csv")
  let dJson = JSON.stringify(d);
  localStorage.setItem("data", dJson);
}


/** 
 * Create table
*/
function generateTable() {
  let d = JSON.parse(localStorage.getItem("data"));
  if (d) {
    document.getElementById("h6").innerHTML = "";
    let table = document.createElement("table");
    table.id = "dataTable";
    let heads = ["Index"];
    for (const title in d[0]) {
      heads.push(title);
    }
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
  } else {
    loadData().then(function () {
      let d = JSON.parse(localStorage.getItem("data"));
      document.getElementById("h6").innerHTML = "";
      table = document.createElement("table");
      table.id = "dataTable";
      let heads = ["Index"];
      for (const title in d[0]) {
        heads.push(title);
      }
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
  let d = JSON.parse(localStorage.getItem("data"));
  if (d) {
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
  } else {
    loadData().then(function () {
      let d = JSON.parse(localStorage.getItem("data"));
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

}

function upgradePet() {
  alert("Mascota registrada")
  let id = document.getElementById("id").value;
  let microchip = document.getElementById("microship").value;
  let specie = document.getElementById("specie").value;
  let sex = document.getElementById("sex").value;
  let size = document.getElementById("size").value;
  let potentDangerous = document.getElementById("potentDangerous").value;
  let neighborhood = document.getElementById("neighborhood").value;
  addPetToData(microchip, specie, sex, size, potentDangerous, neighborhood);
}

function addPetToData(micro, spe, s, si, potentD, neighb) {
  let item = { microchip: micro, specie: spe, sex: s, size: si, potentDangerous: potentD, neighborhood: neighb };
  let d = JSON.parse(localStorage.getItem("data"));
  if (d) {
    d.unshift(item);
  }
  localStorage.removeItem("data");
  d = JSON.stringify(d);
  localStorage.setItem("data", d);
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
