const listaTickets = document.getElementById("lista-tickets");

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("tickets")
      .where("uid", "==", user.uid)
      .orderBy("fecha", "desc")
      .onSnapshot((querySnapshot) => {
        listaTickets.innerHTML = ""; // Limpia la lista antes de cargar

        querySnapshot.forEach((doc) => {
          const ticket = doc.data();
          const fecha = ticket.fecha?.toDate().toLocaleString() || "Sin fecha";

          const item = document.createElement("tr");
          item.innerHTML =  `
              <td><strong>${ticket.asunto}</strong></td>
              <td><em>${ticket.descripcion}</em></td>
              <td>${ticket.estado}</td>
              <td>${fecha}</td>

            `;

          listaTickets.appendChild(item);
        });
      });
  }
});