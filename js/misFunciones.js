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
        myTable+="<td> <button onclick='editarProducto("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
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

function editarProducto(id) {
    Swal.fire({
        title: 'Custom width, padding, background.',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://res.cloudinary.com/dc04oiqvh/image/upload/v1625528813/Logo_500x500_px_1_piyfzd.gif")
          left top
          no-repeat
        `
      })
   
    $.ajax({
        dataType: 'json',
        url:"http://132.226.165.142/api/fragance/"+id,
    
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}