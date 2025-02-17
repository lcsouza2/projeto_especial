
const botaoNao =  document.getElementById("no_button")
const popup = document.getElementsByClassName("popup-content")

function showPopUp() {
    popup[0].style.visibility = "visible"
    popup[0].closest("#popup").style.visibility  = "visible"
}

function hidePopUp() {
    popup[0].style.visibility = "hidden"
    popup[0].closest("#popup").style.visibility  = "hidden"
}


function moveButtonAway(mouseX, mouseY) {
    const botaoRect = botaoNao.getBoundingClientRect();


    // Calcula o centro do botão
    const botaoCentroX = botaoRect.left + botaoRect.width / 2;
    const botaoCentroY = botaoRect.top + botaoRect.height / 2;

    // Calcula a distância entre o mouse e o centro do botão
    const distancia = Math.sqrt(
        Math.pow(mouseX - botaoCentroX, 2) + Math.pow(mouseY - botaoCentroY, 2)
    );
    
    // Se o mouse estiver a menos de 100px do botão, ele se move
    if (distancia < 100) {
        // Calcula a direção oposta ao mouse
        const deltaX = botaoCentroX - mouseX;
        const deltaY = botaoCentroY - mouseY;

        let newX = botaoNao.offsetLeft + deltaX * 0.1;
        let newY = botaoNao.offsetTop + deltaY * 0.1;

        // Mantém o botão dentro da tela
        newX = Math.max(0, Math.min(window.innerWidth - botaoRect.width, newX));
        newY = Math.max(0, Math.min(window.innerHeight - botaoRect.height, newY));

        botaoNao.style.left = `${newX}px`;
        botaoNao.style.top = `${newY}px`;
    }
}


document.addEventListener("mousemove", (event) => {
    moveButtonAway(event.clientX, event.clientY)
})


 
document.addEventListener("touchstart", () => {
    timeout = setTimeout(() => {
        document.addEventListener("touchmove", (event) => {
            event.preventDefault(); // Evita o comportamento padrão do navegador (scroll)
            const touch = event.touches[0]; // Pega o primeiro toque na tela
            moveButtonAway(touch.clientX, touch.clientY);
        });
    }, 500);
});

document.addEventListener("touchend", () => {
    clearTimeout(timeout);
});


botaoNao.addEventListener("click", () => {
    showPopUp()
})


document.getElementById("confirm_no").addEventListener("click", () => alert("Ocorreu um erro, tente novamente... 👀"))
document.getElementById("return_no").addEventListener("click", () => hidePopUp())

