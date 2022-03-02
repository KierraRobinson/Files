let device = [
  { Name: 'smss.exe', Device: 'Stark', Path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', Status: 'scheduled' },
  { Name: 'netsh.exe', Device: 'Targaryen', Path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', Status: 'available' },
  { Name: 'uxtheme.dll', Device: 'Lannister', Path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', Status: 'available' },
  { Name: 'cryptbase.dll', Device: 'Martell', Path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', Status: 'scheduled' },
  { Name: '7za.exe', Device: 'Baratheon', Path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', Status: 'scheduled' }
];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow(0);

  row.insertAdjacentHTML('beforebegin', "<th> <input id='select_all_chck' type='checkbox' /> \
  </th> <th> <label id='txt' class='txt'> </label> </th> \ <th> <button id='btn' class='btn'><i class='fa-solid fa-download'></i> Download Selected</button </th>")

  //Have an empty row for checkbox
  row.insertAdjacentHTML('afterbegin', "<th> <label for='chk' class='chk'></label> </th>")

  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

//Generate rows and cells
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    row.insertAdjacentHTML('afterbegin', " <td> <input class='row' id='rowChk' type='checkbox'/> \
    </td>");
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key])
      cell.appendChild(text);
    }
  }
}

function selectAll() {
  let count = 0
  let itemRow = document.querySelectorAll('.row')
  let selectAllChk = document.getElementById('select_all_chck')
  let txt = document.querySelector('.txt')
  let btn = document.getElementById('btn')
  let rows = document.getElementsByTagName('tr')

  for (let i = 0; i < itemRow.length; i++) {
    itemRow[i].addEventListener('click', () => {
      //This doesn't select the correct row
      // rows[i].className = 'row-color'
      if (itemRow[i].checked && ++count === 5) {
        txt.innerText = 'Selected' + ' ' + `${count}`
        selectAllChk.indeterminate = false
        selectAllChk.checked = true

      } else if (itemRow[i].checked && count !== 5) {
        txt.innerText = 'Selected' + ' ' + `${count}`
        selectAllChk.indeterminate = true
        selectAllChk.checked = false

      } else if (itemRow[i].checked === false && count !== 0) {
        txt.innerText = 'Selected' + ' ' + `${--count}`
      }
    });
    selectAllChk.addEventListener('click', () => {
      if (selectAllChk.checked) {
        itemRow[i].checked = true
        txt.innerText = 'Selected' + ' ' + `${++count}`
      } else if (selectAllChk.checked === false) {
        itemRow[i].checked = false
        txt.innerText = 'None Selected'
      }
    })
    btn.addEventListener('click', () => {
      if (itemRow[i].checked)
        alert('Device:' + ' ' + device[i].Device + '\n' + 'Path:' + ' ' + device[i].path)
    })
  }
}


//Grabbing our table from index.html file
let table = document.querySelector("table")
let data = Object.keys(device[0])
generateTableHead(table, data)
generateTable(table, device)
selectAll()
