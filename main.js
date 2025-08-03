
const grade = document.querySelector(".grade");

criarLinhas();

function criarLinhas() {
    for (let i = 0; i < 12; i++) {
        let linha = document.createElement("div");
        linha.classList.add("linha");
        criarCampos(linha);
        grade.appendChild(linha);
    }
}

function criarCampos(linha){
    for (let i = 0; i < 12; i++){
        let campo = document.createElement("div");
        let rand = Math.random();
        if (rand < 0.1)
            campo.dataset.elemento = "pedra";
        else if (rand < 0.2)
            campo.dataset.elemento = "erva";
        campo.classList.add("campo");
        campo.addEventListener("click", limparCampo);
        linha.appendChild(campo);
    }
}

function limparCampo(){
    this.dataset.elemento = "";
}