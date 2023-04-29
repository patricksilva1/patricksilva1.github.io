// Função para carregar a janela modal
function abrirModal(carregarModal) {
  //console.log("Carregar a janela modal: " + carregarModal);

  // Receber o seletor da janela modal que será aberta
  let modal = document.getElementById(carregarModal);

  // Apresentar a janela modal
  modal.style.display = 'block';

  // Ocultar barra de rolagem
  document.body.style.overflow = 'auto';
}

// Função para fechar a janela modal
function fecharModal(fecharModal) {
  //console.log("Fechar a janela modal: " + fecharModal);

  // Receber o seletor da janela modal que será fechada
  let modal = document.getElementById(fecharModal);

  // Ocultar a janela modal
  modal.style.display = 'none';

  // Apresentar barra de rolagem
  document.body.style.overflow = 'auto';
}

// Fechar ao clicar fora do modal
function fecharModalAoClicarFora(modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Seleciona o elemento do modal
var modal = document.querySelector('.modal');

// Chama a função para fechar o modal ao clicar fora dele
fecharModalAoClicarFora(modal);

// Seleciona todos os botões que abrem o modal
var botoesAbrirModal = document.querySelectorAll('.btn-abrir-modal');

// Itera sobre todos os botões e adiciona a função para fechar o modal ao clicar fora dele
botoesAbrirModal.forEach(function(botao) {
  var modal = document.querySelector(botao.getAttribute('data-target'));
  fecharModalAoClicarFora(modal);
});

  //  ----------------------------------------------------------