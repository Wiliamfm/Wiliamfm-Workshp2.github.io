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
  addTableHeads(table, Object.keys(mountains[0]));
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
  for (let h of keys) {
    let th = document.createElement("th");
    th.className = "table";
    let txt = document.createTextNode(h);
    th.appendChild(txt);
    tr.appendChild(th);
  }
  table.appendChild(tr);
  table.className = "table";
  tr.className = "table";
}

function validar() {

  var todo_correcto = true;

  if (document.getElementById('nombre').value.length < 2) {
    todo_correcto = false;
  }
  if (document.getElementById('direccion').value.length < 10) {
    todo_correcto = false;
  }
  if (isNaN(document.getElementById('edad').value)) {
    todo_correcto = false;
  }
  var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
  var email = document.form1.email.value;
  if (!expresion.test(email)) {
    todo_correcto = false;
  }
  if (document.getElementById('estudios').value == '') {
    todo_correcto = false;
  }
  if (!document.getElementById('acepto').checked) {
    todo_correcto = false;
  }
  if (!todo_correcto) {
    alert('Algunos campos no están correctos, vuelva a revisarlos');
  }
  return todo_correcto;
}
