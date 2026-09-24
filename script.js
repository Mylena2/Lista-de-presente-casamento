import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  addDoc
}
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

async function testarFirebase() {

    const snapshot =
    await getDocs(
        collection(db, "presentes")
    );

    snapshot.forEach((doc) => {

        console.log(
            doc.id,
            doc.data()
        );

    });

}

testarFirebase();

async function atualizarProgresso(){

    const snapshot =
    await getDocs(
        collection(db, "presentes")
    );

    let total = 0;
    let reservados = 0;

    snapshot.forEach((doc) => {

        total++;

        if(doc.data().reservado){
            reservados++;
        }

    });

    const percentual =
    Math.round(
        (reservados / total) * 100
    );

    document.getElementById("total")
        .textContent = total;

    document.getElementById("reservados")
        .textContent = reservados;

    document.getElementById("percentual")
        .textContent = percentual + "%";

    document.getElementById("barra-progresso")
        .style.width = percentual + "%";
}

const categorias = {

"🍳 Cozinha":[
"Jogo de panelas",
"Frigideira antiaderente",
"Panela de arroz elétrica",
"Liquidificador",
"Sanduicheira",
"Cafeteira",
"Jogo de pratos",
"Jogo de copos",
"Jogo de taças",
"Talheres",
"Potes herméticos",
"Potes para mantimentos",
"Travessas de vidro",
"Assadeiras",
"Escorredor de louça",
"Tábua de corte",
"Kit de utensílios",
"Jogo de facas",
"Garrafa térmica",
"Panos de prato"
],

"🏠 Casa":[
"Jogo de cama",
"Jogo de toalhas",
"Edredom",
"Cobertor",
"Manta para sofá",
"Almofadas",
"Tapete",
"Cortina",
"Organizadores",
"Cesto para roupas",
"Kit para banheiro",
"Espelho decorativo",
"Abajur",
"Luminária"
],

"⚡Eletrodomésticos":[
"Aspirador de pó",
"Ventilador",
"Ferro de passar",
"Multiprocessador",
"Batedeira",
"Grill elétrico",
"Chaleira elétrica"
],

"❤️ Presentes para o casal":[
"Jogo de jantar",
"Kit de fondue",
"Kit para churrasco",
"Kit de taças para vinho",
"Kit de taças para sobremesa",
"Bandeja decorativa",
"Kit de café da manhã",
"Caixa para noite romântica",
"Porta-retratos",
"Quadro decorativo"
]

};

const listas =
document.getElementById("listas");

async function carregarPresentes(){

for(let categoria in categorias){


    const bloco =
    document.createElement("div");

    bloco.className =
    "categoria";

    bloco.innerHTML = `
        <h2>${categoria}</h2>
        <div class="grid"></div>
    `;

    const grid =
    bloco.querySelector(".grid");

  for (const item of categorias[categoria]) {

        const card =
        document.createElement("div");

        card.className = "card";

const id = item
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const documento =
await getDoc(
    doc(db, "presentes", id)
);

const dados = documento.data();

const reservado =
dados?.reservado || false;

card.innerHTML = `
    <h3>${item}</h3>

    <span class="status ${
        reservado
        ? "reservado"
        : "disponivel"
    }">

        ${
            reservado
            ? "🔒 Reservado"
            : "🟢 Disponível"
        }

    </span>

    ${
        reservado
        ?
        `<p class="data-reserva">
            📅 Reservado em:
            ${dados?.dataReserva || ""}
        </p>`
        :
        ""
    }

    <button
        class="${
            reservado
            ? "btn-reservado"
            : "btn-reservar"
        }"
        ${
            reservado
            ? "disabled"
            : ""
        }
    >
        ${
            reservado
            ? "Reservado"
            : "Reservar"
        }
    </button>
`;

    const btn =
    card.querySelector("button");

    if(!reservado){

    btn.onclick = async () => {

      const modal =
document.getElementById("modal");

const textoModal =
document.getElementById("texto-modal");

const btnConfirmar =
document.getElementById("confirmar");

const btnCancelar =
document.getElementById("cancelar");

textoModal.textContent =
`Deseja realmente reservar "${item}"?`;
      campoNome.value = "";

modal.style.display = "flex";

btnCancelar.onclick = () => {

    modal.style.display = "none";

const campoNome =
document.getElementById("nome-reserva");

};

btnConfirmar.onclick = async () => {

    await updateDoc(
        doc(db, "presentes", id),
        {
            reservado: true,
            dataReserva: new Date()
                .toLocaleDateString("pt-BR")
        }
    );

    modal.style.display = "none";

    location.reload();

};

} 
}

    grid.appendChild(card);

}

    listas.appendChild(bloco);

}
}

carregarPresentes();
atualizarProgresso();

const btnPix =
document.getElementById("btn-pix");

console.log("Botão PIX:", btnPix);
btnPix.onclick = async () => {

    const nome =
    document
    .getElementById("nome-pix")
    .value
    .trim();

    const valor =
    document
    .getElementById("valor-pix")
    .value;

    if(nome === ""){

        alert(
            "Informe seu nome."
        );

        return;
    }

    try{

        await addDoc(
            collection(
                db,
                "contribuicoes"
            ),
            {
                nome: nome,

                valor:
                valor || "Não informado",

                data:
                new Date()
                .toLocaleDateString(
                    "pt-BR"
                ),

                hora:
                new Date()
                .toLocaleTimeString(
                    "pt-BR"
                )
            }
        );

        alert(
            "Contribuição registrada com sucesso!"
        );

        document
        .getElementById("nome-pix")
        .value = "";

        document
        .getElementById("valor-pix")
        .value = "";

    }

    catch(erro){

        console.error(erro);

        alert(
            "Erro ao registrar contribuição."
        );

    }

};

  console.log("Categorias carregadas:", Object.keys(categorias).length);
  //cadastrarTodosPresentes()
