const welcomeCard   = document.getElementById('welcome-card');
const startButton   = document.getElementById('start-button');
const usernameInput = document.getElementById('username-input');

startButton.addEventListener('click', () => {
    const words = name.split(' ').filter(w => w.length > 0);
  if (words.length < 2) {
    alert('Por favor, ingresa nombre y apellido completos');
    usernameInput.focus();
    return;
  }

  // Validar que solo tenga letras y espacios (sin números ni emojis)
  // Regex: solo letras (mayúsculas o minúsculas) y espacios
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  if (!regex.test(name)) {
    alert('El nombre y apellido solo deben contener letras y espacios');
    usernameInput.focus();
    return;
  }

  // Fecha y hora SOLO cuando se hace click
  const now  = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];

  // POST al backend
  fetch('https://json-server-domino-ibk.onrender.com/ingresos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, date, time })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar ingreso');
    return res.json();
  })
  .then(entry => {
    console.log('Ingreso guardado:', entry);
    // Ocultar la card solo si guardó OK
    welcomeCard.style.display = 'none';
  })
  .catch(err => {
    console.error(err);
    alert('No se pudo registrar tu nombre. Intenta de nuevo.');
  });
});

  const posicionesCorrectas = {
    I1: [30, 30], I2: [30, 210], I3: [30, 390],
    B1: [180, 30], B4: [320, -10], B7: [450, 70], B2: [180, 210],
    B5: [320, 185], B8: [450, 295], B3: [180, 390], B6: [320, 410],
    K1: [580, 30], K2: [580, 210], K3: [580, 390], K4: [830, 10],
    K5: [720, 123], K6: [790, 243], K7: [900, 363]
  };

  const tablero = document.getElementById('tablero');
  const cartillas = Array.from(document.querySelectorAll('.cartilla'));

  // Mezclar aleatoriamente
  cartillas.sort(() => Math.random() - 0.5);

  // Reinsertar en el DOM en orden aleatorio
  cartillas.forEach(cartilla => {
    tablero.appendChild(cartilla);
  });

  const piezasCorrectas = new Set();
  const piezas = Object.keys(posicionesCorrectas);
  const mensajeCorrecto = document.getElementById('mensaje-correcto');
  const mensajeError = document.getElementById('mensaje-error');

  const sonidoCorrecto = new Audio('assets/sounds/correcto.mp3'); // Ruta al archivo de sonido
  const sonidoInCorrecto = new Audio('assets/sounds/error.mp3'); // Ruta al archivo de alerta

  function mostrarMensajeCorrecto() {
    sonidoCorrecto.play();  // Reproduce el sonido
    mensajeCorrecto.style.display = 'block';
    setTimeout(() => mensajeCorrecto.style.display = 'none', 1000);
  }

  function mostrarMensajeInCorrecto() {
    sonidoInCorrecto.play();
    mensajeError.style.display = 'block';
    setTimeout(() => mensajeError.style.display = 'none', 1500);
  }

  const sonidoVictoria = new Audio('assets/sounds/ganaste.mp3');  // Ruta al archivo de sonido

  function mostrarMensajeFinal() {
    const mensajeFinal = document.getElementById('mensaje-final');
    mensajeFinal.style.display = 'block';
    mensajeFinal.style.animation = 'fadeIn 1s ease-in-out forwards';  // Agregar animación si es necesario

    // Reproducir el sonido de victoria
    sonidoVictoria.play();

    // Generar chispas
    generarChispas();  // Llama a la función de las chispas
  }

  function generarChispas() {
    const chispasContainer = document.getElementById('chispas');
    const cantidadChispas = 30; // Número de chispas a generar

    // Generar chispas aleatorias
    for (let i = 0; i < cantidadChispas; i++) {
      const chispa = document.createElement('div');
      chispa.classList.add('chispa');
      chispa.style.left = `${Math.random() * 100}%`;  // Posición horizontal aleatoria
      chispa.style.top = `${Math.random() * 100}%`;   // Posición vertical aleatoria
      chispasContainer.appendChild(chispa);
    }

    // Mostrar chispas y ocultarlas después de 2 segundos
    chispasContainer.style.display = 'block';
    setTimeout(() => chispasContainer.style.display = 'none', 20000);
  }

  function getRandomPosition(minX, maxX, minY, maxY) {
    return [
      Math.floor(Math.random() * (maxX - minX) + minX),
      Math.floor(Math.random() * (maxY - minY) + minY)
    ];
  }

  document.querySelectorAll('.cartilla').forEach(cartilla => {
  const id = cartilla.id;

  if (['I1', 'B1', 'K1'].includes(id)) {
    // Coloca estas en su posición correcta desde el inicio
    const [correctX, correctY] = posicionesCorrectas[id];
    cartilla.style.left = correctX + 'px';
    cartilla.style.top = correctY + 'px';
    cartilla.style.pointerEvents = "none";
    piezasCorrectas.add(id);

    const casillaElement = document.querySelector(`#casilla-${id}`);
      if (casillaElement) {
        if (id.startsWith('I')) {
          casillaElement.classList.add('casilla-correcta-I');
        } else if (id.startsWith('K')) {
          casillaElement.classList.add('casilla-correcta-K');
        } else {
          casillaElement.classList.add('casilla-correcta'); // B mantiene el verde fosforescente
        }
      }

  } else {
    // Posición aleatoria en todo el tablero
    const [randX, randY] = getRandomPosition(-190, -80, window.innerHeight - 220, window.innerHeight - 180);
    cartilla.style.left = randX + 'px';
    cartilla.style.top = randY + 'px';
  }

    let offsetX, offsetY, startX, startY;

    cartilla.addEventListener('mousedown', e => {
      startX = cartilla.offsetLeft;
      startY = cartilla.offsetTop;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;

      const onMouseMove = e => {
        cartilla.style.left = (e.clientX - offsetX) + 'px';
        cartilla.style.top = (e.clientY - offsetY) + 'px';
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const [correctX, correctY] = posicionesCorrectas[cartilla.id];
        const dx = Math.abs(cartilla.offsetLeft - correctX);
        const dy = Math.abs(cartilla.offsetTop - correctY);

        const casillaElement = document.querySelector(`#casilla-${cartilla.id}`);

        if (dx < 40 && dy < 40) {
          cartilla.style.left = correctX + 'px';
          cartilla.style.top = correctY + 'px';
          cartilla.style.pointerEvents = "none";
          piezasCorrectas.add(cartilla.id);

          if (casillaElement) {
            if (id.startsWith("I")) {
              casillaElement.classList.add('casilla-correcta-I');
            } else if (id.startsWith("K")) {
              casillaElement.classList.add('casilla-correcta-K');
            } else {
              casillaElement.classList.add('casilla-correcta');
            }
            mostrarMensajeCorrecto();
          }

          mostrarMensajeCorrecto();

         // Verificamos si todas las piezas están correctas
        if (piezasCorrectas.size === piezas.length) {
          const mensajeFinal = document.getElementById('mensaje-final');
          mensajeFinal.style.display = 'block';
          mensajeFinal.style.animation = 'fadeIn 1s ease-in-out forwards';   
          mostrarMensajeFinal(); // Muestra el mensaje, sonido y chispas
        }
        } else {
          cartilla.style.left = startX + 'px';
          cartilla.style.top = startY + 'px';
          mostrarMensajeInCorrecto();
        }
        };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
