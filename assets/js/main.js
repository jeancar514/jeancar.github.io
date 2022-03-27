(function(){
	const sliders =[...document.querySelectorAll(".slider_body")];
	const arrowNext = document.querySelector('#next');
	const arrowBefore = document.querySelector('#before');
	let value;

	arrowNext.addEventListener('click', ()=>changePosition(1));
	arrowBefore.addEventListener('click', ()=>changePosition(-1));

	function changePosition(change){
		const currentElement = Number(document.querySelector('.slider_body--show').dataset.id);
		value = currentElement;
		value +=change;

		if(value === 0 || value == sliders.length+1){
			value = value === 0 ? sliders.length :1;
		}
		sliders[currentElement-1].classList.toggle('slider_body--show');
		sliders[value-1].classList.toggle('slider_body--show');

	}
	
})()

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

// formulario
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('.contact__input');
console.log(formulario)

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros, espacios y pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^[a-zA-ZÀ-ÿ-Z0-9\s\_\-]{4,100}$/, // Letras, numeros, espacios, pueden llevar acentos guion y guion_bajo
}

const campos = {
	nombre: false,
	correo: false,
    mensaje: false
}

const validarFormulario = (e) => {
    tipo = e.target.name
    console.log(tipo)
    if(tipo === "nombre") validarCampo(expresiones.nombre, e.target, 'nombre');
    if(tipo === "correo") validarCampo(expresiones.correo, e.target, 'correo');
    if(tipo === "mensaje") validarCampo(expresiones.mensaje, e.target, 'mensaje');
}

const validarCampo = (expresion, input, campo) => {
    console.log(expresion.test(input.value));
	if(expresion.test(input.value)){
		document.getElementById(`${campo}`).classList.remove('formulario-incorrecto');
		document.getElementById(`${campo}`).classList.add('formulario-correcto');
		document.querySelector(`#mensajeError__${campo}`).classList.remove('mensaje-error-activo');
		campos[campo] = true;
        console.log(campos)
	} else {
		document.getElementById(`${campo}`).classList.add('formulario-incorrecto');
		document.getElementById(`${campo}`).classList.remove('formulario-correcto');
		document.querySelector(`#mensajeError__${campo} `).classList.add('mensaje-error-activo');
		campos[campo] = false;
        console.log(campos)

	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
    console.log(campos.nombre  && campos.correo && campos.mensaje)
	if( campos.nombre  && campos.correo && campos.mensaje ){
		inputCorreo = inputs[0].value;
		inputNombre = inputs[1].value;
		inputMensaje = inputs[2].value;
        formulario.reset();

		document.querySelector('.mensaje-exito').classList.add('mensaje-exito-activo');
		setTimeout(() => {
			document.querySelector('.mensaje-exito').classList.remove('mensaje-exito-activo');
		}, 5000);
        document.getElementById("nombre").classList.remove('formulario-correcto');
        document.getElementById("correo").classList.remove('formulario-correcto');
        document.getElementById("mensaje").classList.remove('formulario-correcto');
        campos.nombre = false;
        campos.correo = false;
        campos.mensaje = false;

        //backend
        console.log(inputNombre,inputCorreo,inputMensaje)
        axios.post("http://127.0.0.1:5000/",{
        "envio" : "correo",
        "nombre" : inputNombre,
        "correoelectronico" : inputCorreo,
        "mensaje" : inputMensaje,
    })
        .then(resp => console.log(resp.data));

	} else {
		document.querySelector('.formulario__mensaje').classList.add('formulario__mensaje-activo');
	}

});

// comunicacion con el backend
const envioWhatsapp = document.querySelector('#whatsapp');
envioWhatsapp.addEventListener('click', ()=>{
    axios.post("http://127.0.0.1:5000/",{
    "envio" : "whatsapp"
})
    .then(resp => console.log(resp.data));
});


