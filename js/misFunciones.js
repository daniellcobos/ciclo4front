let currentRef = 0
function traerInformacionProductos(){
    console.log("test");
        $.ajax({
        url:"http://132.226.165.142/api/fragance/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button onclick='showForm("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarProducto("+JSON.stringify(respuesta[i].reference)+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function agregarProducto(){

    Swal
    .fire({
        title: "Tu nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
        }
    });
}
function borrarProducto(reference) {
    var element = {
        id: reference
    }
    /* Stringyfy convertir html a un objeto json */
    var dataToSend = JSON.stringify(element);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://132.226.165.142/api/fragance/" + reference,
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





function showForm(ref) {
    currentRef = ref
    editForm = document.getElementById("editForm")
    editForm.style.visibility="visible"
}

function editFragance(){
     
    let data = {
        reference: currentRef,
        brand: $("#brandProd" ).val(),
        category: $("#categoriaProd").val(),
        presentation: $("#presentacionProd").val(),
        description: $("#descProd").val(),
        availability: true,
        price: $("#priceProd").val(),
        quantity: $("#quantityProd").val(),
        photography: $("#fotoProd").val(),
        }
    
        let datosPeticion = JSON.stringify(data)
        console.log(datosPeticion)
        //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
        //a un ws
        $.ajax({
            url: "http://132.226.165.142/api/fragance/update",
            data: datosPeticion,
            type: 'PUT',   
            contentType: "application/JSON",
            dataType: 'json',
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.log(respuesta);
                alert("Editado, recargue la pagina")
                return false
            },
            error: function (xhr, status) {
                //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
                console.log("algo fallo");	
            },
            complete: function (xhr, status) {
                console.log("Todo super bien "  + status);
            }
        });
}