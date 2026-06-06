function login() {

  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  firebase.auth().signInWithEmailAndPassword(email, pass)

    .then(async (userCredential) => {

      const uid = userCredential.user.uid;

      // Buscar usuario en Firestore
      const doc = await db.collection("usuarios").doc(uid).get();

      if (!doc.exists) {
        throw new Error("Usuario no encontrado en Firestore");
      }

      const usuario = doc.data();

      // Obtener rol
      const rol = usuario.rol;

      console.log("Rol:", rol);

      // Redirecciones
      if (rol === "admin") {
        window.location.href = "/modules/admin/admin.html";
      }

      else if (rol === "cliente") {
        window.location.href = "/modules/cliente/crear_ticket.html";
      }

      else if (rol === "tecnico") {
        window.location.href = "/modules/tecnico/dashboard_tecnico.html";
      }

      else if (rol === "coordinador") {
        window.location.href = "/modules/coordinador/coordinador_dashboard.html";
      }

      else {
        alert("Rol no válido");
      }

    })

    .catch(error => {

      let msg = "Correo o contraseña incorrectos";

      if (error.code === "auth/user-not-found") {
        msg = "Usuario no registrado";
      }

      else if (error.code === "auth/wrong-password") {
        msg = "Contraseña incorrecta";
      }

      document.getElementById("login-msg").innerText = msg;

      console.error(error);

    });

}