const menuToggle = document.getElementById('menu-toggle');
const mainContent = document.getElementById('main-content');
const sideMenu = document.getElementById('side-menu');
const navLinks = sideMenu.querySelectorAll('a');
const sections = document.querySelectorAll('section');

// Alternar apertura del menú

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  if(mainContent){
    mainContent.classList.toggle('shift');
  }

});

// Cerrar menú al hacer clic en cualquier enlace
navLinks.forEach(link => {

  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    if(mainContent){
      mainContent.classList.remove('shift');
    }
  });
});
// Activar enlace del menú según el scroll
window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Logica para envio de informacion de contacto 

const form = document.getElementById('form-contacto');

if(form){

  form.addEventListener('submit', function(e){

    const nombre = form.nombre.value;
  const telefono = form.telefono.value;
  const correo = form.correo.value;
  const direccion = form.direccion.value;

  const mensaje = `¡Hola! Me llamo ${nombre}.%0AMi número es: ${telefono}.%0AMi correo: ${correo}.%0AMi dirección: ${direccion}.`;

  // A donde se dirige la informacion
  const numeroWhatsApp = '3026099814';
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  window.open(url, '_blank');

  }); 
};
