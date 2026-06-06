// Verifica si hay usuario logueado
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("user-email").innerText = `Estás logueado como: ${user.email}`;
  } else {
    // Si no hay sesión, lo manda al login
    window.location.href = "/auth/login.html";
  }
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("Usuario activo:", user.email);
    // mostrar contenido, redirigir, etc.
  } else {
    console.log("No hay sesión activa");
    // opcionalmente redirigir a login
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

