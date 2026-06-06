let tecnicos = [];

db.collection("usuarios")
  .where("rol", "==", "tecnico")
  .get()
  .then(snapshot => {

    snapshot.forEach(doc => {

      tecnicos.push({
        uid: doc.id,
        email: doc.data().email
      });

    });

  });
/*s*/
db.collection("tickets").onSnapshot((snapshot) => {

  let pendientes = 0;
  let proceso = 0;
  let finalizadas = 0;
  let sinAsignar = 0;

  const contSinAsignar = document.getElementById("listaSinAsignar");
  const contProceso = document.getElementById("listaProceso");

  contSinAsignar.innerHTML = "";
  contProceso.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    // CONTADORES
    if (data.estado === "pendiente") pendientes++;
    if (data.estado === "en proceso") proceso++;
    if (data.estado === "finalizado") finalizadas++;
    if (!data.tecnicoId) sinAsignar++;

    // SIN ASIGNAR
   if (!data.tecnicoId) {

  const opcionesTecnicos = tecnicos.map(tecnico => `
      <option value="${tecnico.uid}">
        ${tecnico.email}
      </option>
  `).join("");

  contSinAsignar.innerHTML += `
    <div class="orden">

      <strong>${data.codigo}</strong>

      <p>${data.asunto}</p>

      <small>${data.email}</small>

      <br><br>

      <select id="tecnico-${doc.id}">
        <option value="">
          Seleccione un técnico
        </option>

        ${opcionesTecnicos}
      </select>

      <button onclick="asignar('${doc.id}')">
        Asignar
      </button>

    </div>
  `;
}

    // EN PROCESO
    if (data.estado === "en proceso") {
      contProceso.innerHTML += `
        <div class="orden">
          <p><strong>${data.codigo || doc.id}</strong> - ${data.asunto}</p>
          <div class="barra">
            <div class="progreso" style="width: 60%"></div>
          </div>
        </div>
      `;
    }

  });

  // ACTUALIZAR UI
  document.getElementById("pendientes").innerText = pendientes;
  document.getElementById("proceso").innerText = proceso;
  document.getElementById("finalizadas").innerText = finalizadas;
  document.getElementById("sinAsignar").innerText = sinAsignar;

});
function asignar(ticketId) {

  const select =
    document.getElementById(`tecnico-${ticketId}`);

  const tecnicoUID = select.value;

  if (!tecnicoUID) {

    alert("Seleccione un técnico");

    return;
  }

  const tecnicoNombre =
    select.options[select.selectedIndex].text;

  db.collection("tickets")
    .doc(ticketId)
    .update({

      tecnicoId: tecnicoUID,

      tecnicoNombre: tecnicoNombre,

      estado: "pendiente"

    })

    .then(() => {

      alert("Técnico asignado correctamente");

    });

}


// FUNCIÓN ASIGNAR (simple por ahora)
/*
function asignar(id) {
  const tecnico = prompt("Ingrese UID del técnico:");

  if (!tecnico) return;

  db.collection("tickets").doc(id).update({
    tecnicoId: tecnico,
    estado: "en proceso"
  });
}
*/
