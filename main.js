
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
        campo.classList.add("campo");
        linha.appendChild(campo);
    }
}