
let currentUser = 0

function getUser() {
    $.ajax({
        url: "http://132.226.165.142/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            printListUser(response);
        }
    });
}

function printListUser(response) {
    let myTable = "<table class='table' id='userTable'>"
    myTable += "<tr scope='row'>";
    myTable += "<td>Identificación</td>";
    myTable += "<td>Nombre</td>";
    myTable += "<td>Direccion</td>";
    myTable += "<td>Telefono</td>";
    myTable += "<td>Correo</td>";
    myTable += "<td>Contraseña</td>";
    myTable += "<td>Zona</td>";
    myTable += "<td>Tipo</td>";
    "</tr>";
    for (i = 0; i < response.length; i++) {
        myTable += "<tr scope='row'>";
        myTable += "<td>" + response[i].identification + "</td>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].address + "</td>";
        myTable += "<td>" + response[i].cellPhone + "</td>";
        myTable += "<td>" + response[i].email + "</td>";
        myTable += "<td>" + response[i].password + "</td>";
        myTable += "<td>" + response[i].zone + "</td>";
        myTable += "<td>" + response[i].type + "</td>";
        myTable += '<td><button class = "" onclick="borrar(' + response[i].id + ')">Borrar User!</button></td>';
        myTable += '<td><button class = "" onclick="showEdit(' + response[i].id + ')">Editar User!</button></td>';
        myTable += '<td><button class = "" onclick="loadData(' + response[i].id + ')">Actualizar User!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#myListUser").html(myTable);
}

function borrar(idUser) {
    var element = {
        id: idUser
    }
    /* Stringyfy convertir html a un objeto json */
    var dataToSend = JSON.stringify(element);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://132.226.165.142/api/user/" + idUser,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function (response) {
            console.log(response);
            $("#myListUser").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

function loadData(idUser) {
    $.ajax({
        dataType: 'json',
        url: "http://132.226.165.142/api/user/" + idUser,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#identificationUser").val(item.identification);
            $("#nameUser").val(item.name);
            $("#addressUser").val(item.address);
            $("#cellphoneUser").val(item.cellPhone);
            $("#emailUser").val(item.email);
            $("#passwordUser").val(item.password);
            $("#zoneUser").val(item.zone);
            $("#typeUser").val(item.type);
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
}


function showEdit(idData){
    currentUser = idData
  editForm = document.getElementById("editForm")
  editForm.style.visibility="visible"

}

function updateUser() {
   idUser = currentUser
    if ($("#identificationUser").val().length == 0 || $("#nameUser").val().length == 0 || $("#addressUser").val().length == 0 
    || $("#cellphoneUser").val().length == 0 ||  $("#emailUser").val().length== 0  || $("#passwordUser").val().length==0
    || $("#zoneUser").val().length==0 ||   $("#typeUser").val().length==0)  {
        alert("Todos los campos deben estar llenos")
    } else {
        let element = {
            id: idUser,
            identification: $("#identificationUser").val(),
            name: $("#nameUser").val(),
            address: $("#addressUser").val(),
            cellPhone: $("#cellphoneUser").val(),
            email:$("#emailUser").val(),
            password: $("#passwordUser").val(),
            zone:$("#zoneUser").val(),
            type:$("#typeUser").val()            
        }

        console.log(element);
        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",            
            url: "http://132.226.165.142/api/user/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                alert("se ha Actualizado Correctamente!")               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}