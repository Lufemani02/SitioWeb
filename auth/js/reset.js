function resetPassword() {
  const email = document.getElementById("email").value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      document.getElementById("msg").innerText =
        "📩 Revisa tu correo para restablecer tu contraseña";
    })
    .catch((error) => {

      let msg = "Error al enviar el correo";

      if (error.code === "auth/user-not-found") {
        msg = "Este correo no está registrado";
      }

      document.getElementById("msg").innerText = msg;
    });
}