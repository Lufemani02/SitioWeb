const ticketForm = document.getElementById("ticket-form");
const mensaje = document.getElementById("mensaje-confirmacion");

ticketForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const asunto = document.getElementById("asunto").value;
  const descripcion = document.getElementById("descripcion").value;

  const user = auth.currentUser;

  if (!user) {
    mensaje.innerText = "❌ Debes iniciar sesión.";
    return;
  }

  try {

    // Obtener cantidad actual de tickets
    const snapshot = await db.collection("tickets").get();

    // Generar consecutivo
    const numeroOrden = `SAM-${String(snapshot.size + 1).padStart(3, "0")}`;
    const telefono = document.getElementById("telefono").value;
    // Obtener dirección y prioridad
    const direccion = document.getElementById("direccion").value;
    const prioridad = document.getElementById("prioridad").value;

    // Guardar ticket
    await db.collection("tickets").add({

      codigo: numeroOrden,

      uid: user.uid,
      email: user.email,
      telefono,
      direccion,
      prioridad,
      asunto,
      descripcion,
      estado: "pendiente",
      fecha: firebase.firestore.FieldValue.serverTimestamp()

    });

    mensaje.innerText = `✅ Solicitud enviada correctamente. Código: ${numeroOrden}`;

    ticketForm.reset();

  } catch (error) {

    mensaje.innerText =
      "❌ Error al enviar la solicitud: " + error.message;

  }

});

// Cierre de sesión
function logout() {

  auth.signOut().then(() => {

    window.location.href = "index.html";

  });

}