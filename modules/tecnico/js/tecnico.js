const tablaAdmin = document.getElementById("tabla-tickets-admin");

function logout() {
  auth.signOut().then(() => {
    window.location.href = "/auth/login.html";
  });
}
auth.onAuthStateChanged(async (user) => {

  if (!user) {
    window.location.href = "/auth/login.html";
    return;
  }

  const doc = await db.collection("usuarios")
    .doc(user.uid)
    .get();

  if (!doc.exists) {
    alert("Usuario no encontrado");
    return;
  }

  const datosUsuario = doc.data();

  if (datosUsuario.rol !== "tecnico") {
    alert("No tienes permisos para ingresar aquí");
    window.location.href = "/auth/login.html";
    return;
  }

 db.collection("tickets")
      .orderBy("fecha", "desc")
      .onSnapshot((querySnapshot) => {
        tablaAdmin.innerHTML = "";

        querySnapshot.forEach((doc) => {
          const ticket = doc.data();
          const fecha = ticket.fecha?.toDate().toLocaleString() || "Sin fecha";

          const fila = document.createElement("tr");
            fila.innerHTML = `
              <td><strong>${ticket.asunto}</strong></td>
              <td><em>${ticket.descripcion}</em></td>
              <td>
                <select data-id="${doc.id}" class="estado-selector">
                  <option value="pendiente" ${ticket.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                  <option value="en proceso" ${ticket.estado === "en proceso" ? "selected" : ""}>En proceso</option>
                  <option value="finalizado" ${ticket.estado === "finalizado" ? "selected" : ""}>Finalizado</option>
                </select>
              </td>
              <td>${ticket.direccion || "Sin dirección"}</td>
              <td>${ticket.telefono || "Sin teléfono"}</td>
            `;

          tablaAdmin.appendChild(fila);
        });

        document.querySelectorAll(".estado-selector").forEach((selector) => {
          selector.addEventListener("change", (e) => {
            const ticketId = e.target.getAttribute("data-id");
            const nuevoEstado = e.target.value;

            db.collection("tickets").doc(ticketId).update({
              estado: nuevoEstado,
            });
          });
        });
      });
});


