let proyectos = [];
let i = 1;
let j = 1;

function crearProyecto(){
    const nombreInput = document.getElementById("input-nombre-proyecto");
    const descInput = document.getElementById("input-desc-proyecto");
    const proyecto = {
        id: i,
        nombre: nombreInput.value,
        desc: descInput.value != null ? descInput.value : null,
        tareas: []
    };
    if(proyecto.nombre == ""){
        alert("Escriba un nombre para el proyecto!");
    }
    else{
        proyectos.push(proyecto);
        renderListaProyectos();
        nombreInput.value = "";
        descInput.value = "";
        i++;
    }
}

function crearTarea(){
    const tareaInput = document.getElementById("input-desc-tarea");
    const proyectoInput = document.getElementById("input-proyecto-tarea");
    const vencimientoInput = document.getElementById("input-vencimiento-tarea");
    let proyIndex = -1;
    proyectos.forEach((proy, i) => {
        if (proy.nombre == proyectoInput.value){
            proyIndex = i;
        }
    });
    if (proyIndex != -1){
        let tarea = {
            id: j,
            proyectoId: proyIndex,
            desc: tareaInput.value,
            estado: "pendiente",
            fechaLimite: null
        };
        if (vencimientoInput.value != null){
            tarea.fechaLimite = vencimientoInput.value;
        }
        proyectos[proyIndex].tareas.push(tarea);
        tareaInput.value = "";
        proyectoInput.value = "";
        vencimientoInput.value = "";
        j++;
    }
    else{
        alert("Ese proyecto no existe o todavia no a sido creado!");
    }
}

function renderListaProyectos(){
    const listaProyectos = document.getElementById("div-proyectos");
    listaProyectos.innerHTML = '';
    proyectos.forEach((proyecto, i) => {
        const div = document.createElement("div");
        div.classList.add("proyecto");
        div.innerHTML = 
        `
            <p class="nombre-proyecto">${proyecto.nombre}<p>
        `;
        if (proyecto.desc != null){
            let desc = document.createElement("p");
            desc.innerHTML = proyecto.desc;
            div.appendChild(desc);
        }
        div.innerHTML += 
        `
            <button id="btn-tareas" class="btn" onclick="renderListaTareas(${i})">Mostrar tareas</button>
            <div id="tareas-proyecto-${i}" class="tareas"></div>
        `;
        listaProyectos.appendChild(div);
        });
    }

function renderListaTareas(proyectoId){
    const listaTareas = document.getElementById(`tareas-proyecto-${proyectoId}`);
    const arrTareas = proyectos[proyectoId].tareas;
    if (arrTareas.length > 0){
        listaTareas.innerHTML = "";
        arrTareas.forEach((tarea, j) => {
            if (tarea.proyectoId == proyectoId){
                const div = document.createElement("div");
                div.classList.add("tarea");
                div.innerHTML = `
                    <input type="checkbox" id="checkbox${i}" onchange="tacharTarea(${tarea.proyectoId}, ${j}, this)" ${(tarea.estado == 'completado') ? 'checked' : ''}>
                    <label for="checkbox${i}">${tarea.desc} - ${tarea.estado} ${tarea.fechaLimite}</label>
                `;
                listaTareas.appendChild(div);
            }
        });
    }
    else{
        alert("Este proyecto no tiene tareas.");
    }
}

function tacharTarea(i, j, checkbox){
    if (checkbox.checked) {
        proyectos[i].tareas[j].estado = 'completado';
        console.log(proyectos[i].tareas[j].estado);
    } 
    else{
        proyectos[i].tareas[j].estado = 'pendiente';
        console.log(proyectos[i].tareas[j].estado);
    }
    renderListaProyectos();
    for(let i = 0; i < proyectos.length; i++){
        renderListaTareas(i);
    }
}

function buscarPorVencimiento(){
    const input = document.getElementById("input-busqueda-vencimiento");
    let html = "";
    for (let i = 0; i < proyectos.length; i++){
        for (let j = 0; j < proyectos[i].tareas.length; j++){
            if (proyectos[i].tareas[j].fechaLimite == input.value){
                html += 
                `
                    <p>${proyectos[i].tareas[j].desc}</p>
                `
            }
        }
    }
    let div = document.getElementById("resultado");
    div.innerHTML = html;
}