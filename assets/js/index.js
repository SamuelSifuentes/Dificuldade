let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

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
            gerarElemento(obj.dia, obj.mes, obj.ano, obj.dataFim, obj.hora, obj.urgencia, obj.tarefa);
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
    let btn = document.createElement("button");
    btn.classList.add("btn")
    btn.classList.add("btn-primary")
    $("#data-total-modal").html("Dia: " + dia.data + " Mes: " + mes + " Ano: " + ano);
    $("#data-final").html(`<br><label for="dataFinal">Para quando:</label>
                                <input type="date" id="dataFinal" name="dataFinal">
                                <input type="time" id="tempoFinal" name="tempoFinal">
                            `);
    $("#urgencia").html(`<br><label for="urgencia">Nivel de urgência:</label>

                            <select name="urgencia" id="urgenciaValue">
                                <option value="">Selecione uma opção</option>
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                                <option value="Muito Alto">Muito Alto</option>
                            </select>
                            
                            `);
    $("#comentario").html("<br>Digite sua tarefa:<textarea id='afazer' rows='4' cols='50' name='comment' form='usrform'></textarea>");
    btn.onclick = function () {
        Save(dia.data, mes, ano)
    }
    btn.appendChild(document.createTextNode("Save"))
    tbl.appendChild(btn)


    $('#myModal').modal('show');
}
function edit(dia, mes, ano, dataFim = null, hora = null, urgencia = null, tarefa = null,i) {
    var x = dia
    console.log(dia)
    $("#modal-footer").html("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>")
    let tbl = document.getElementById("modal-footer");
    let btn = document.createElement("button");
    btn.classList.add("btn")
    btn.classList.add("btn-primary")
    $("#data-total-modal").html("Dia: " + dia.data + " Mes: " + mes + " Ano: " + ano);
    $("#data-final").html(`<br><label for="dataFinal">Para quando:</label>
                                <input type="date" id="dataFinal" name="dataFinal">
                                <input type="time" id="tempoFinal" name="tempoFinal">
                            `);
    $("#urgencia").html(`<br><label for="urgencia">Nivel de urgência:</label>

                            <select name="urgencia" id="urgenciaValue">
                                <option value="">Selecione uma opção</option>
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                                <option value="Muito Alto">Muito Alto</option>
                            </select>
                            
                            `);
    $("#comentario").html("<br>Digite sua tarefa:<textarea id='afazer' rows='4' cols='50' name='comment' form='usrform'></textarea>");
    document.getElementById("dataFinal").value = dataFim;
    document.getElementById("tempoFinal").value = hora;
    document.getElementById("urgenciaValue").value = urgencia;
    document.getElementById("afazer").value = tarefa;
    btn.onclick = function () {
        Update(dia, mes, ano,i);
    }
    btn.appendChild(document.createTextNode("Save"))
    tbl.appendChild(btn)


    $('#myModal').modal('show');
}
function Save(dia, mes, ano) {

    let tarefas = new Array();
    if (localStorage.getItem('tarefas')) {
        tarefas = (JSON.parse(localStorage['tarefas']));
    }
    let tarefa;
    let dataFimV;
    let horaV;
    let urgenciaV;
    dataFimV = document.getElementById("dataFinal").value;
    horaV = document.getElementById("tempoFinal").value;
    urgenciaV = document.getElementById("urgenciaValue").value;
    tarefa = document.getElementById("afazer").value;

    if (tarefa != "" && dataFimV != "" && horaV != "" && urgenciaV != "") {
        $('#myModal').modal('hide')
        tarefas.push(JSON.stringify({ dia: dia, mes: mes, ano: ano, dataFim: dataFimV, hora: horaV, urgencia: urgenciaV, tarefa: tarefa }));
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        gerarElemento(dia, mes, ano, dataFimV, horaV, urgenciaV, tarefa);

    } else {
        alert('Digite um valor');
    }


}
function Update(dia, mes, ano,i) {

    let tarefas = new Array();
    if (localStorage.getItem('tarefas')) {
        tarefas = (JSON.parse(localStorage['tarefas']));
    }
    let tarefa;
    let dataFimV;
    let horaV;
    let urgenciaV;
    dataFimV = document.getElementById("dataFinal").value;
    horaV = document.getElementById("tempoFinal").value;
    urgenciaV = document.getElementById("urgenciaValue").value;
    tarefa = document.getElementById("afazer").value;

    if (tarefa != "" && dataFimV != "" && horaV != "" && urgenciaV != "") {
        $('#myModal').modal('hide')
        tarefas[i]=(JSON.stringify({ dia: dia, mes: mes, ano: ano, dataFim: dataFimV, hora: horaV, urgencia: urgenciaV, tarefa: tarefa }));
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        listarTodos()

    } else {
        alert('Digite um valor');
    }


}
function gerarElemento(dia, mes, ano, dataFim = null, hora = null, urgencia = null, value = null) {
    let tbl = document.getElementById("lista-marcacoes");
    let div = document.createElement("div");
    let divBtn = document.createElement("div");
    let data = document.createElement("div");
    let valor = document.createElement("div");
    let br = document.createElement("br");
    let removeItem = document.createElement("div");
    let xicon = document.createElement("i");
    let dtFim = document.createElement("div");
    let buttonConcluir = document.createElement("button");
    let buttonEdit = document.createElement("button");
    let urgFim = document.createElement("div");
    let tarefa = value;
    let dataTransform = String(dataFim).split("-")
    data.appendChild(document.createTextNode("Data: " + dia + "/" + mes + "/" + ano));
    valor.appendChild(document.createTextNode("Tarefa: " + tarefa));
    dtFim.appendChild(document.createTextNode("Entrega " + dataTransform[2] + "/" + dataTransform[1] + "/" + dataTransform[0] + " as "+ hora));
    urgFim.appendChild(document.createTextNode("Urgencia: " + urgencia));
    buttonConcluir.appendChild(document.createTextNode("Concluir"))
    buttonConcluir.className = "btn btn-primary "
    buttonEdit.appendChild(document.createTextNode("Editar"));
    buttonEdit.className = "btn btn-warning ml-auto mr-1"; 
    div.appendChild(data);
    div.appendChild(valor);
    div.appendChild(dtFim);

    div.appendChild(urgFim);
    divBtn.appendChild(buttonEdit);
    divBtn.appendChild(buttonConcluir);
    divBtn.className = "d-flex"
    div.appendChild(divBtn);
    xicon.className = "fa fa-times";
    xicon.onclick = function () {
        tarefas = null;
        tarefas = (JSON.parse(localStorage['tarefas']));
        var i = tarefas.indexOf(JSON.stringify({ dia: dia, mes: mes, ano: ano, dataFim: dataFim, hora: hora, urgencia: urgencia, tarefa: tarefa }));
        tarefas.splice(i, 1);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        listarTodos();
    }
    buttonConcluir.onclick = function(){
        tarefas = null;
        tarefas = (JSON.parse(localStorage['tarefas']));
        var i = tarefas.indexOf(JSON.stringify({ dia: dia, mes: mes, ano: ano, dataFim: dataFim, hora: hora, urgencia: urgencia, tarefa: tarefa }));
        tarefas.splice(i, 1);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        
        listarTodos();
    }
    buttonEdit.onclick = function(){
        tarefas = null;
        tarefas = (JSON.parse(localStorage['tarefas']));
        var i = tarefas.indexOf(JSON.stringify({ dia: dia, mes: mes, ano: ano, dataFim: dataFim, hora: hora, urgencia: urgencia, tarefa: tarefa }));
        edit(dia, mes, ano, dataFim, hora, urgencia, tarefa,i);
    }
    removeItem.appendChild(xicon);
    removeItem.className = ("x");
    div.appendChild(removeItem);
    div.className = "item";
    tbl.appendChild(div);
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