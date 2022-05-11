
const formulario = document.querySelector('#enviar-mail');
const btnEnviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function eventoGeneral() {
  document.addEventListener('DOMContentLoaded', iniciarApp);
  
  formulario.addEventListener('submit', enviarEmail);
  
  email.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  mensaje.addEventListener('blur', validarFormulario);
  
}

const iniciarApp = () => {
  btnEnviar.disable = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
};

const validarFormulario = (e) => {
  if (e.target.value.length > 0) {
    const error = document.querySelector('p.error');
    if (error) {
      error.remove();
    }
    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  } else {
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    mostrarError('Todos los campos son obligatorios');
  }
  if (e.target.type === 'email') {
    if (er.test(e.target.value)) {
      const error = document.querySelector('.error');
      if (error) {
        error.remove();
      }
      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500');
    } else {
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      mostrarError('El emai no es valido');
    }
  }
  if (
    er.test(email.value) !== '' &&
    asunto.value !== '' &&
    mensaje.value.length > 0
  ) {
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    btnEnviar.disable = false;
  }
};
const mostrarError = (msg) => {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = msg;
  mensajeError.classList.add(
    'bg-red-600',
    'text-white',
    'p-2',
    'text-center',
    'error'
  );

  const errores = document.querySelectorAll('.error');
  if (errores.length === 0) {
    mensaje.after(mensajeError);
  }
};

const enviarEmail = (e) => {
  e.preventDefault();
  const spiner = document.querySelector('#spinner');
  spiner.style.display = 'flex';
  setTimeout(() => {
    spiner.style.display = 'none';
    const msgEnviado = document.createElement('p');
    msgEnviado.textContent = 'El correo fue enviado correctamente';
    msgEnviado.classList.add(
      'my-10',
      'font-bold',
      'text-center',
      'p-2',
      'bg-green-500',
      'text-white',
      'm-2'
    );
    spiner.before(msgEnviado);
    setTimeout(() => {
      msgEnviado.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
};

eventoGeneral();
