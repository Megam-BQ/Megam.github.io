const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const registroContainer = document.getElementById("registroContainer");
const mostrarRegistro = document.getElementById("mostrarRegistro");
const mostrarLogin = document.getElementById("mostrarLogin");
const mensajeError = document.getElementById("mensaje-error");

mostrarRegistro.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".login-container").style.display = "none";
  registroContainer.style.display = "block";
});

mostrarLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registroContainer.style.display = "none";
  document.querySelector(".login-container").style.display = "block";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  if (correo === "" || password === "") {
    mensajeError.textContent = "Completa todos los campos.";
  } else {
    mensajeError.textContent = "";
    alert("Inicio de sesión exitoso (aquí se conectará con Supabase).");
  }
});

registroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Cuenta creada exitosamente (aquí se conectará con Supabase).");
});
