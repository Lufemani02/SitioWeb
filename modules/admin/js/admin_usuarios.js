const tablaUsuarios = document.getElementById("tabla-usuarios");

db.collection("usuarios").onSnapshot(snapshot => {

  tablaUsuarios.innerHTML = "";

  snapshot.forEach(doc => {
    const user = doc.data();

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${user.email}</td>
      <td>
        <select data-id="${doc.id}">
          <option value="cliente" ${user.rol === "cliente" ? "selected" : ""}>Cliente</option>
          <option value="tecnico" ${user.rol === "tecnico" ? "selected" : ""}>Técnico</option>
          <option value="coordinador" ${user.rol === "coordinador" ? "selected" : ""}>Coordinador</option>
          <option value="admin" ${user.rol === "admin" ? "selected" : ""}>Admin</option>
        </select>
      </td>
      <td>
        <button onclick="actualizarRol('${doc.id}')">Guardar</button>
      </td>
    `;

    tablaUsuarios.appendChild(fila);
  });

});

function actualizarRol(uid) {
  const select = document.querySelector(`select[data-id="${uid}"]`);
  const nuevoRol = select.value;

  db.collection("usuarios").doc(uid).update({
    rol: nuevoRol
  });

  alert("Rol actualizado ✅");
}

