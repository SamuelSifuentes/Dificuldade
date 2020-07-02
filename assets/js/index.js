let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

window.addEventListener("load", function (event) {
    listarTodos();
});

function listarTodos() {
    if (localStorage.getItem('tarefas')) {
        var i = new Array();
        document.getElementById("lista-marcacoes").innerHTML = "";
        i = JSON.parse(localStorage['tarefas']);
        i.forEach(element => {
            let obj = JSON.parse(element)
            Save(obj.dia, obj.mes, obj.ano, obj.tarefa);
        });
    }
}
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}
function dateClick(dia, mes, ano) {
    var x = dia
    console.log(dia)
    $("#modal-footer").html("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>")
    let tbl = document.getElementById("modal-footer");
    let btn = document.createElement("buttom");
    btn.classList.add("btn")
    btn.classList.add("btn-primary")
    btn.onclick = function () {
        Save(dia.data, mes, ano)
    }
    btn.appendChild(document.createTextNode("Save"))
    tbl.appendChild(btn)
    $("#data-total-modal").html("Dia: " + dia.data + " Mes: " + mes + " Ano: " + ano + "<br>Digite sua tarefa");
    $("#comentario").html("<textarea id='afazer' rows='4' cols='50' name='comment' form='usrform'></textarea>");

    $('#myModal').modal('show');
}

function Save(dia, mes, ano, value = null) {

    let tarefas = new Array();

    if (localStorage.getItem('tarefas')) {
        tarefas = (JSON.parse(localStorage['tarefas']));
    }

    let tarefa

    let tbl = document.getElementById("lista-marcacoes");
    let div = document.createElement("div")
    let data = document.createElement("div")
    let valor = document.createElement("div")
    let br = document.createElement("br")
    let removeItem = document.createElement("div")
    let xicon = document.createElement("i")
    if (value != null) {
        tarefa = value
    } else {

        tarefa = document.getElementById("afazer").value
        if (tarefa != "") {
            $('#myModal').modal('hide')
            tarefas.push(JSON.stringify({ dia: dia, mes: mes, ano: ano, tarefa: tarefa }));
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }

    }
    if (tarefa != "") {
        data.appendChild(document.createTextNode("Data: " + dia + "/" + mes + "/" + ano))
        valor.appendChild(document.createTextNode("Tarefa: " + tarefa))

        div.appendChild(data)
        div.appendChild(valor)
        div.appendChild(br)
        xicon.className = "fa fa-times"
        xicon.onclick = function () {
            tarefas = (JSON.parse(localStorage['tarefas']));
            var i = tarefas.indexOf(JSON.stringify({ dia: dia, mes: mes, ano: ano, tarefa: tarefa }));
            tarefas.splice(i,1);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            listarTodos();
        }
        removeItem.appendChild(xicon)
        removeItem.className = ("x")
        div.appendChild(removeItem)
        div.className = "item";
        tbl.appendChild(div);

    }else{
        alert('Digite um valor')
    }



}
function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");

                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                cell.onclick = function () {
                    dateClick(cellText, month, year);
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}