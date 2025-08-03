const NUMERO_DE_LINHAS = 12;
const NUMERO_DE_COLUNAS = 12;

const grade = document.querySelector(".grade");
const campos = [];

criarLinhas();

function criarLinhas() {
    for (let i = 0; i < NUMERO_DE_LINHAS; i++) {
        let linha = document.createElement("div");
        linha.classList.add("linha");
        criarCampos(linha);
        grade.appendChild(linha);
    }
}

function criarCampos(linha){
    for (let i = 0; i < NUMERO_DE_COLUNAS; i++){
        const campo = document.createElement("div");
        campo.dataset.elemento = "vazio";
        campo.dataset.aguado = "nao";
        campo.dataset.status = "grama";
        const rand = Math.random();
        if (rand < 0.2)
            campo.dataset.elemento = "pedra";
        else if (rand < 0.4)
            campo.dataset.elemento = "erva";
        campo.classList.add("campo");
        campo.addEventListener("click", clicarCampo);
        linha.appendChild(campo);
        campos.push(campo);
    }
}

function clicarCampo(){
    const elemento = this.dataset.elemento;
    
    if (elemento == "pedra" || elemento == "erva"){
        this.dataset.elemento = "vazio";
        return;
    }

    if (this.dataset.status == "grama"){
        this.dataset.status = "limpo";
        return;
    }

    const aguado = this.dataset.aguado;
    if (aguado == "nao")
        this.dataset.aguado = "sim";

}

const eDia = document.querySelector(".dia>p");
const bPassarDia = document.querySelector(".dia>button");

bPassarDia.addEventListener("click", passarDia);

let dia = 1;

function passarDia(){
    dia += 1;
    eDia.textContent = `Dia ${dia}`;
    campos.forEach((campo) => {
        campo.dataset.aguado = "nao";
    })
}