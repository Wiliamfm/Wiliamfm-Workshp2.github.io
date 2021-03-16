/**
 * Upload table.
 */
function upload() {
  generateTable();
}

/** 
 * Create table
*/
function generateTable() {
  let table = document.createElement("table");
  table.id = "putatabla";
  d3.dsv(";", "./data/pets-citizens.csv").then(function (data) {
    let heads = ["Index"];
    data.columns.forEach(element => {
      heads.push(element);
    });
    addTableHeads(table, heads);
    let rows = [];
    let i = 0;
    for (const values of data) {
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
  });
  addPagination();
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
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}

function addPagination() {
  $(document).ready(function () {
    $('#putatabla').DataTable({
      'bSort': false,
      'aoColumns': [
        { sWidth: "45%", bSearchable: false, bSortable: false },
        { sWidth: "45%", bSearchable: false, bSortable: false },
        { sWidth: "10%", bSearchable: false, bSortable: false }
      ],
      "scrollCollapse": true,
      "info": true,
      "paging": true
    });
  });
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
