const NUMERO_DE_LINHAS = 15;
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
        campo.classList.add("campo");
        campo.dataset.status = "grama";
        campo.dataset.elemento = elementoAleatorio();
        campo.addEventListener("click", clicarCampo);
        linha.appendChild(campo);
        campos.push(campo);
    }
}

function elementoAleatorio(){
    const rand = Math.random();
    if (rand < 0.2)
        return "pedra";
    if (rand < 0.4)
        return "erva";
    return "vazio";
}

function clicarCampo(){
    const elemento = this.dataset.elemento;
    
    if (elemento == "pedra" || elemento == "erva"){
        this.dataset.elemento = "vazio";
        return;
    }

    const status = this.dataset.status;

    switch (status){
        case "grama":
            this.dataset.status = "seco";
        break;
        case "seco":
            this.dataset.status = "molhado";
        break;
    }


}

const eDia = document.querySelector(".dia>p");
const bPassarDia = document.querySelector(".dia>button");

bPassarDia.addEventListener("click", passarDia);

let dia = 1;

function passarDia(){
    dia++;
    eDia.textContent = `Dia ${dia}`;
    campos.forEach((campo) => {
        if (campo.dataset.status == "molhado")
            campo.dataset.status = "seco";
    })
}