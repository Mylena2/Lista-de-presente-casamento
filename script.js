const categorias = {

"🍳 Cozinha":[
"Jogo de panelas",
"Frigideira antiaderente",
"Air Fryer",
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

    categorias[categoria].forEach(item => {

        const card =
        document.createElement("div");

        card.className = "card";

       const reservaSalva =
JSON.parse(localStorage.getItem(item));

const reservado =
reservaSalva?.reservado || false;

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
            ${reservaSalva.data}
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

    btn.onclick = () => {

        const confirmar = confirm(
            `Deseja realmente reservar "${item}"?`
        );

        if(!confirmar){
            return;
        }

        localStorage.setItem(
            item,
            JSON.stringify({
                reservado:true,
                data:new Date()
                    .toLocaleDateString("pt-BR")
            })
        );

        location.reload();

    };

}

        grid.appendChild(card);

    });

    listas.appendChild(bloco);

}