// genera las piezas de manera aleatoria
let piezasContainer = document.getElementById('piezasContainer');

let randomGenerados = [];
do {
    let random = Math.floor(Math.random() * (16 - 1 + 1) + 1);
    if (!randomGenerados.includes(random)) {
        randomGenerados.push(random);
    }
}while(randomGenerados.length != 16);

for (let i = 0; i < 16; i++) {
    let divPieza = document.createElement('div');
    divPieza.className = 'pieza';
    piezasContainer.appendChild(divPieza);

    let imgPieza = document.createElement('img');
    imgPieza.id = randomGenerados[i];
    imgPieza.draggable = true;
    imgPieza.src = 'imagenes/image_part_' + randomGenerados[i] + '.png';
    imgPieza.style.height='100%';
    imgPieza.style.width='100%';
    imgPieza.style.objectFit;
    divPieza.appendChild(imgPieza);
}

// genera los huecos para ensamblar el puzle
let puzzleContainer = document.getElementById('puzzleContainer');
for (let i = 1; i < 17; i++) {
    let divPieza = document.createElement('div');
    divPieza.className = 'pieza';
    divPieza.id = i;
    puzzleContainer.appendChild(divPieza);
}

// gestiona el boton de la pista
let botonPista = document.getElementById('botonPista');
let overlayPista = document.getElementById('overlayPista');
let pistaVisible = false;
botonPista.addEventListener('click', function() {
    if (!pistaVisible) {
        overlayPista.style.display = 'block';
        pistaVisible = true;
    } else {
        overlayPista.style.display = 'none';
        pistaVisible = false;
    }
});

// gestion de arrastrar las piezas

// aqui almaceno la infomación del objeto que está siendo arrastrado para poder quitarlo del contenedor de piezas cuando ya haya sido colocado correctamente
let elementoArrastrado;

// selecciono todas las piezas para que puedan ser arrastradas
let piezas = document.querySelectorAll('.pieza img');
piezas.forEach(function (imgPieza) {
    imgPieza.addEventListener('dragstart', (evento) => iniciadoArrastre(evento, imgPieza));
});

// eventos para que la pieza pueda ser soltada sobre su slot correcto
puzzleContainer.addEventListener('dragover', (evento) => permitirSoltar(evento));
puzzleContainer.addEventListener('drop', (evento) => soltar(evento));


// funcion que almacena las propiedades del elemento arrastrado en la variable del principio
function iniciadoArrastre(evento, elemento) {
    evento.dataTransfer.setData('text/plain', elemento.id);
    evento.dataTransfer.setData('url', elemento.src);
    evento.dataTransfer.setData('height', elemento.style.height);
    evento.dataTransfer.setData('width', elemento.style.width);
    evento.dataTransfer.setData('objectFit', elemento.style.objectFit);
    elementoArrastrado = elemento;
}

function permitirSoltar(evento) {
    evento.preventDefault();
}

// funcion que verifica si el slot es el correcto y coloca la imagen en diho hueco
function soltar(evento) {
    evento.preventDefault();
    let idElementoArrastrandose = evento.dataTransfer.getData('text/plain');

    if (evento.target.id === idElementoArrastrandose) {
        let imgClon = new Image();
        imgClon.src = evento.dataTransfer.getData('url');
        imgClon.style.height = evento.dataTransfer.getData('height');
        imgClon.style.width = evento.dataTransfer.getData('width');
        imgClon.style.objectFit = evento.dataTransfer.getData('objectFit');

        // coloco la imagen en el slot correcto del puzle
        evento.target.appendChild(imgClon);

        // y la elimino del original
        if (elementoArrastrado) {
            elementoArrastrado.parentNode.removeChild(elementoArrastrado);
        }

        // jumpscare
        if (puzleCompleto()) {
            let container = document.getElementById('container');
            if (container.hasChildNodes) {
                while(container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
            let h1 = document.getElementById('h1');
            container.parentElement.removeChild(h1);
            container.parentElement.removeChild(botonPista);
            container.parentElement.style.overflow = 'hidden';

            let vid = document.createElement('video');
            vid.src = 'js.mp4';
            vid.loop = 'true';
            vid.style.zIndex = 1000;
            vid.style.height = '100%';
            vid.style.textAlign = 'center';
            container.parentElement.style.backgroundColor = 'black';
            container.parentElement.appendChild(vid);
            vid.play();
            window.onbeforeunload = function (e) {
                e = e || window.event;
            
                if (e) {
                    e.returnValue = 'xd';
                }
                return 'xd';
            };
            document.documentElement.requestFullscreen();
            document.title = 'لقد أخفقتلقد أخفقتلقد أخفقتلقد أخفقتلقد أخفقت';

            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = 'https://media.tenor.com/lnd2-pSdVuoAAAAC/fnaf-sus.gif';
        }
    }
}

// funcion que comprueba que el puzle este completo
function puzleCompleto() {
    let piezasPuzle = puzzleContainer.querySelectorAll('.pieza img');
    return piezasPuzle.length === 16;
}