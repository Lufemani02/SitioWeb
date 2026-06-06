function registrar() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {

      const uid = userCredential.user.uid;

      return db.collection("usuarios").doc(uid).set({
        uid: uid,
        email: email,
        rol: "cliente", // SIEMPRE cliente
        fechaRegistro: new Date()
      });

    })
    .then(() => {

  document.getElementById("msg").innerText =
    "Usuario registrado correctamente";

  window.location.href =
    "/modules/cliente/crear_ticket.html";

})
    .catch(error => {
      document.getElementById("msg").innerText = error.message;
    });
}