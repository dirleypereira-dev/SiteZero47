const precoBase = 60;
const numeroWhatsApp = "5547999999999";

const cards = document.querySelectorAll(".option-card");
const summaryList = document.querySelector("#summaryList");
const totalPrice = document.querySelector("#totalPrice");
const whatsappLink = document.querySelector("#whatsappLink");
const carPreview = document.querySelector("#carPreview");
const carStatus = document.querySelector("#carStatus");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function selecionarCard(cardClicado) {
  const grupo = cardClicado.dataset.group;
  const permiteMultiplos = cardClicado.classList.contains("option-card--multi");

  if (permiteMultiplos) {
    cardClicado.classList.toggle("active");
    return;
  }

  const cardsDoMesmoGrupo = document.querySelectorAll(
    `.option-card[data-group="${grupo}"]:not(.option-card--multi)`
  );

  cardsDoMesmoGrupo.forEach((card) => {
    card.classList.remove("active");
  });

  cardClicado.classList.add("active");
}

function atualizarImagemDoCarro() {
  const estadoSelecionado = document.querySelector('.option-card[data-group="estado"].active');

  if (!estadoSelecionado) return;

  const novaImagem = estadoSelecionado.dataset.car;
  const novoAlt = estadoSelecionado.dataset.alt;
  const novoStatus = estadoSelecionado.dataset.label;

  if (carPreview.getAttribute("src") === novaImagem) return;

  carPreview.classList.add("is-changing");

  setTimeout(() => {
    carPreview.src = novaImagem;
    carPreview.alt = novoAlt;
    carStatus.textContent = novoStatus;
    carPreview.classList.remove("is-changing");
  }, 180);
}

function pegarCardsAtivos() {
  return document.querySelectorAll(".option-card.active");
}

function atualizarResumo() {
  const cardsAtivos = pegarCardsAtivos();

  let total = precoBase;
  const itens = [];
  const nomesEscolhidos = [];

  cardsAtivos.forEach((card) => {
    const nome = card.dataset.label;
    const preco = Number(card.dataset.price);

    total += preco;
    nomesEscolhidos.push(nome);

    if (preco > 0) {
      itens.push(`${nome} — ${formatarMoeda(preco)}`);
    } else {
      itens.push(`${nome} — incluso`);
    }
  });

  summaryList.innerHTML = "";

  itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    summaryList.appendChild(li);
  });

  totalPrice.textContent = formatarMoeda(total);

  const mensagem = `Olá! Quero solicitar um orçamento na ZERO47.

Serviços escolhidos:
${nomesEscolhidos.join(", ")}

Valor estimado:
${formatarMoeda(total)}

Pode confirmar disponibilidade?`;

  whatsappLink.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  atualizarImagemDoCarro();
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    selecionarCard(card);
    atualizarResumo();
  });
});

atualizarResumo();
