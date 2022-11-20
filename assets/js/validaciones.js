export function valida(input) {
    
    const tipoInput = input.dataset.tipo;

    if (validadores[tipoInput]) {
        validadores[tipoInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);
    }
};

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio."
    },
    email: {
        valueMissing: "Este campo no puede estar vacio.",
        typeMismatch: "El correo no es valido."
    },
    password: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio.",
        customError: "Debes ser mayor de 18 años."
    },
    telefono: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "El numero no es valido.",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La direccion debe tener un minimo de 10 caracteres y un maximo de 40.",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "Ese sitio no existe.",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "Ese sitio no existe.",
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeError(tipoInput, input){

    let mensaje = ""
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoInput, error);
            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje;
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ''
     if(!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad.'
     };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate());
    return fechaActual >= diferenciaFechas;
}