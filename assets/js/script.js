
//#region variables
    var maxTareas = 3
    const tareas = [{
        id:1, 
        descrip:'tarea 1',
        realizada:false
    },{
        id:2, 
        descrip:'tarea 2',
        realizada:true
    },{
        id:3, 
        descrip:'tarea 3',
        realizada:true
    }];

    const descripcion = document.getElementById('input-tarea');
    const botonAgregar = document.getElementById('button-agregar');
    const labelTotal = document.getElementById('strong-total');
    const labelrealizadas = document.getElementById('strong-realizadas');
    const tabla = document.getElementById('tabla-tareas').tBodies[0];
    const encabezado = `<tr>
            <th>Completar</th>
            <th>Id</th>
            <th>Tarea</th>
            <th>Borrar</th>
            </tr>`
//#endregion
//#region funciones

    function sumarTarea(){
        maxTareas++;
        nuevaTarea = {id:maxTareas, 
            descrip:descripcion.value,
            realizada:false}
        tareas.push(nuevaTarea)
        descripcion.value = ''
    }

    function repintarTabla(){
        // console.log('entra al repintar tabla')
        html = encabezado;

        for(let t of tareas){
            // console.log(t)
            html += `<tr id='rowid${t.id}'>
                        <td><input type="checkbox" id='chb${t.id}' onclick='cambiarEstado(${t.id})' ${t.realizada ? 'checked':''} /></td>
                        <td>${t.id}</td>
                        <td>${t.descrip}</td><td>
                        <span onclick='borrarTarea(${t.id})'> <i class="fa-solid fa-trash"></i></span></td>
                    </tr>`;
        }
        tabla.innerHTML = html;
    }

    function cambiarEstado(id){
        // console.log('entra a cambioestado')
        // console.log(id)
        let indexCambio = tareas.findIndex( (elem) => elem.id == id)
        // console.log('indexCambio', indexCambio)
        tareas[indexCambio].realizada = !tareas[indexCambio].realizada
        // console.log('tarea:',tareas[indexCambio])
        actualizarTotales()

    }

    function borrarTarea(id){
        //borrar tarea en el arreglo y repintar la tabla
        let indexDelete = tareas.findIndex((elem) => elem.id == id )
        console.log(indexDelete)
        tareas.splice(indexDelete,1)
        repintarTabla()
        actualizarTotales()
    }

    function contarTareasTerminadas(){
        //Pendiente: aprender a filtrar bien para contar*********************
        let completadas = 0
        for(let c of tareas){
            if(c.realizada)
            {completadas++}
        }
        // console.log(completadas)
        return completadas
    }

    function actualizarTotales(){
        //
        labelTotal.innerHTML = tareas.length;
        labelrealizadas.innerHTML = contarTareasTerminadas()
}

//#endregion
//#region asignar eventos
    //boton Agregar
    botonAgregar.addEventListener('click',function () {
        sumarTarea();
        actualizarTotales();
        repintarTabla();

    });
    //Enter en el input
    descripcion.addEventListener("keypress", function () {
        if (event.key === "Enter") {
            sumarTarea();
            actualizarTotales();
            repintarTabla();
        }
      });


repintarTabla()
actualizarTotales()

//#endregion