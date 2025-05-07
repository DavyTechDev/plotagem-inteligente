const form = document.getElementById('plotForm');
const materialInput = document.getElementById('material');
const acabamentoContainer = document.getElementById('acabamentoContainer');
const resultado = document.getElementById('resultado');
const outputVisual = document.getElementById('outputVisual');

materialInput.addEventListener('change', () => {
    acabamentoContainer.classList.toggle('hidden', materialInput.value !== 'lona');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    outputVisual.innerHTML = '';
    resultado.classList.remove('hidden');

    const larguraMidia = parseFloat(document.getElementById('larguraMidia').value);
    const larguraTrabalho = parseFloat(document.getElementById('larguraTrabalho').value);
    let alturaTrabalho = parseFloat(document.getElementById('alturaTrabalho').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    let sobraSuperior = 0, sobraInferior = 0;
    if (materialInput.value === 'lona') {
    sobraSuperior = parseFloat(document.getElementById('sobraSuperior').value) || 0;
    sobraInferior = parseFloat(document.getElementById('sobraInferior').value) || 0;
    alturaTrabalho += sobraSuperior + sobraInferior;
    }

    const colunasPorLinha = Math.floor(larguraMidia / larguraTrabalho);
    const linhas = Math.ceil(quantidade / colunasPorLinha);

    const container = document.createElement('div');
    container.className = 'inline-block p-4 border border-gray-300 bg-gray-50';
    container.style.width = `${larguraMidia * 2}px`;

    for (let i = 0; i < linhas; i++) {
    const linha = document.createElement('div');
    linha.className = 'flex gap-1 mb-1';
    for (let j = 0; j < colunasPorLinha; j++) {
        const idx = i * colunasPorLinha + j;
        if (idx >= quantidade) break;

        const box = document.createElement('div');
        box.className = 'unit-box';
        box.style.width = `${larguraTrabalho * 2}px`;
        box.style.height = `${alturaTrabalho * 2}px`;
        box.innerHTML = `<div class="sobra"></div>
                        <div style="height: ${(alturaTrabalho - sobraSuperior - sobraInferior) * 2}px; line-height: 1.2; display: flex; align-items: center; justify-content: center;">
                        ${larguraTrabalho}x${alturaTrabalho - sobraSuperior - sobraInferior} cm
                        </div>
                        <div class="sobra"></div>`;
        linha.appendChild(box);
    }
    container.appendChild(linha);
    }

    const legenda = document.createElement('p');
    legenda.className = 'mt-4 text-sm text-gray-600';
    legenda.textContent = `Altura total da faixa: ${linhas * alturaTrabalho} cm`;

    outputVisual.appendChild(container);
    outputVisual.appendChild(legenda);

    const relatorioTexto = document.getElementById('relatorioTexto');
    let texto = `📄 <strong>Relatório de Distribuição</strong><br>`;
    texto += `• Tipo de material: <strong>${materialInput.value}</strong><br>`;
    texto += `• Largura da mídia: <strong>${larguraMidia} cm</strong><br>`;
    texto += `• Tamanho do trabalho (sem sobras): <strong>${larguraTrabalho}x${alturaTrabalho - sobraSuperior - sobraInferior} cm</strong><br>`;
    if (materialInput.value === 'lona') {
    texto += `• Sobra superior: <strong>${sobraSuperior} cm</strong><br>`;
    texto += `• Sobra inferior: <strong>${sobraInferior} cm</strong><br>`;
    texto += `• Altura total de cada trabalho com sobra: <strong>${alturaTrabalho} cm</strong><br>`;
    }
    texto += `• Quantidade total de cópias: <strong>${quantidade}</strong><br>`;
    texto += `• Colunas por linha: <strong>${colunasPorLinha}</strong><br>`;
    texto += `• Total de linhas: <strong>${linhas}</strong><br>`;
    texto += `• Altura total no rolo: <strong>${linhas * alturaTrabalho} cm</strong><br>`;

    relatorioTexto.innerHTML = texto;

});

window.addEventListener('DOMContentLoaded', () => {
    acabamentoContainer.classList.toggle('hidden', materialInput.value !== 'lona');
  });