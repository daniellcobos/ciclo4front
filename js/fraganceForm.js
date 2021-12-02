function saveFragance() {
    let data = {
    reference: $("#modelProd").val(),
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
        //url del servicio
        url: "http://132.226.165.142/api/fragance/new",
        
        //envio datos capturados por el usuario a la peticion
        data: datosPeticion,

        //tipo de peticion
        type: 'POST',

        contentType: "application/JSON",

        //tipo de contenido
        dataType: 'json',

        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            alert("Adicionado")
            return false
        },

        //error: funcion con acciones si hay error
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("algo fallo");	
        },
        //complete: funcion con al final de la petición
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            console.log("Todo super bien "  + status);
        }
    });
}

/**
 * valida si en el id viene un dato nulo, o viene el codigo del usuario
 * 
 * Configura mensaje de bienvenida o de error según el caso
 */

