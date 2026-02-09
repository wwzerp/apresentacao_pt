let stats;

function resetStats() {
    stats = {
        ambicao: 0,
        prudencia: 0,
        liberdade: 0,
        hipocrisia: 0,
        reputacao: 100 // 100=Honrada, 75=Comentada, 50=Suspeita, 25=Escandalosa
    };
    updateDisplay();
}

const nodes = {
    prologo: {
        ato: "Prólogo",
        coro: "Bem-vindos à farsa. Aqui, o querer sobe mais que o saber. Não há escolhas certas, apenas fardos a carregar.",
        text: "O palco está vazio. Inês Pereira espera o seu destino. Estás pronto para ser quem desejas ou quem te obrigam?",
        choices: [
            { text: "Entrar na cena", next: 'ato1_janela' }
        ]
    },
    ato1_janela: {
        ato: "Ato I — A Janela",
        coro: "Olha como ela suspira... quer o mundo, mas só tem a costura.",
        text: "À janela, vês casamentos e homens livres. O que mais invejas?",
        choices: [
            { text: "A riqueza e o brilho", next: 'ato1_educacao', stats: { ambicao: 10 } },
            { text: "A liberdade de ir e vir dos homens", next: 'ato1_educacao', stats: { liberdade: 10 } },
            { text: "O respeito que as damas recebem", next: 'ato1_educacao', stats: { prudencia: 10 } },
            { text: "Nada — desprezo este povo", next: 'ato1_educacao', stats: { hipocrisia: 10, reputacao: -5 } }
        ]
    },
    ato1_educacao: {
        ato: "Ato I",
        coro: "Letras na mão de mulher? O mundo está a virar ao contrário!",
        text: "Tentas ler e cantar às escondidas. Como prossegues?",
        choices: [
            { text: "Insistir em aprender sozinha", next: 'ato1_mae', stats: { liberdade: 10, prudencia: 5 } },
            { text: "Desistir e reclamar da sorte", next: 'ato1_mae', stats: { ambicao: 5 } },
            { text: "Usar o talento para seduzir e fugir", next: 'ato1_mae', stats: { hipocrisia: 15, reputacao: -10 } }
        ]
    },
    ato1_mae: {
        ato: "Ato I",
        coro: "A voz do sangue avisa, mas o coração de Inês já está noutra feira.",
        text: "A tua mãe traz Pero Marques. Ele é rico, mas fala como um boi. Como o tratas?",
        choices: [
            { text: "Humilhar o Pêro publicamente", next: 'ato2_escolha', stats: { liberdade: 5, reputacao: -15 } },
            { text: "Ignorá-lo friamente", next: 'ato2_escolha', stats: { prudencia: 5 } },
            { text: "Conversar educadamente", next: 'ato2_escolha', stats: { prudencia: 10, hipocrisia: 5 } }
        ]
    },
    ato2_escolha: {
        ato: "Ato II — A Escolha",
        coro: "O Cavalo ou o Asno? Um derruba, o outro leva. Que destino escolhe Inês?",
        text: "Lianor Vaz apresenta as opções finais. O tempo urge.",
        choices: [
            { text: "Escolher Brás da Mata (O Cavalo)", next: 'rota_bras_inicio', stats: { ambicao: 15, reputacao: 10 } },
            { text: "Escolher Pero Marques (O Asno)", next: 'rota_pero_inicio', stats: { prudencia: 15 } },
            { text: "Rejeitar ambos publicamente", next: 'final_vazio', stats: { liberdade: 20, reputacao: -40 } }
        ]
    },
    // Rota Brás
    rota_bras_inicio: {
        ato: "Ato III — A Aparência",
        coro: "Canta, passarinho... que a gaiola está a ser forjada.",
        text: "Brás fala de poemas e viagens. Aceitas este amor?",
        choices: [
            { text: "Acreditar piamente", next: 'bras_carcere', stats: { ambicao: 10, prudencia: -10 } },
            { text: "Testar a sua paciência", next: 'bras_carcere', stats: { prudencia: 10 } },
            { text: "Fingir acreditar (usá-lo)", next: 'bras_carcere', stats: { hipocrisia: 15 } }
        ]
    },
    bras_carcere: {
        ato: "Ato III",
        coro: "Trancada a sete chaves. Onde está agora a tua liberdade, Inês?",
        text: "Brás proibiu-te de rir e cantar. Estás num cárcere doméstico. Como reages?",
        choices: [
            { text: "Obedecer por medo", next: 'bras_guerra', stats: { liberdade: -10, prudencia: 5 } },
            { text: "Resistir e gritar", next: 'bras_guerra', stats: { liberdade: 10, reputacao: -10 } },
            { text: "Manipular em segredo", next: 'bras_guerra', stats: { hipocrisia: 20 } }
        ]
    },
    bras_guerra: {
        ato: "Ato III",
        coro: "Os fados lançam os dados. Brás foi-se... e o vento o levou.",
        text: "Brás parte para a guerra. O destino decide: ele morreu a fugir. Estás livre.",
        choices: [
            { text: "Aceitar agora o Pero Marques", next: 'final_vicentino' },
            { text: "Fugir das normas e viver só", next: 'final_impossivel' }
        ]
    },
    // Rota Pero
    rota_pero_inicio: {
        ato: "Ato III — A Realidade",
        coro: "Vida mansa, vida chata. O asno é lento, mas o chão é longe.",
        text: "Casaste com o Pêro. Ele faz tudo o que pedes. Como geres isto?",
        choices: [
            { text: "Adaptar-se à vida simples", next: 'pero_ermitao', stats: { prudencia: 10, ambicao: -5 } },
            { text: "Desprezar a sua bondade", next: 'pero_ermitao', stats: { reputacao: -5 } },
            { text: "Mandar nele com mão de ferro", next: 'pero_ermitao', stats: { autonomia: 15 } }
        ]
    },
    pero_ermitao: {
        ato: "Ato III",
        coro: "Um Ermitão com olhos de lobo... cuidado, Inês.",
        text: "Encontras um Ermitão no caminho que te propõe encontros secretos.",
        choices: [
            { text: "Sedução e traição", next: 'final_tirana', stats: { hipocrisia: 20, reputacao: -30 } },
            { text: "Rejeição virtuosa", next: 'final_aprende', stats: { prudencia: 20, reputacao: 15 } }
        ]
    },
    // FINAIS
    final_vicentino: {
        ato: "Final I", coro: "Mais quero asno que me leve... Inês aprendeu a lição da farsa.",
        text: "Casas com o Pêro e dominas a casa. Ele carrega-te às costas até aos teus amantes. Um final de aparências.",
        choices: [{ text: "Recomeçar farsa", next: 'prologo' }]
    },
    final_vazio: {
        ato: "Final VI", coro: "Quem tudo quis escolher, acabou sem nada querer.",
        text: "Rejeitaste o mundo e o mundo esqueceu-te. Terminas sozinha, num vazio sem glória.",
        choices: [{ text: "Recomeçar farsa", next: 'prologo' }]
    },
    final_impossivel: {
        ato: "Final V", coro: "Uma mulher livre? Neste século? O preço será alto.",
        text: "Vives fora das normas. És livre, mas o mundo fecha-te as portas. Uma liberdade amarga.",
        choices: [{ text: "Recomeçar farsa", next: 'prologo' }]
    }
};

function updateDisplay() {
    document.getElementById('val-ambicao').innerText = stats.ambicao;
    document.getElementById('val-prudencia').innerText = stats.prudencia;
    document.getElementById('val-liberdade').innerText = stats.liberdade;
    document.getElementById('val-hipocrisia').innerText = stats.hipocrisia;

    let rep = "Honrada";
    if (stats.reputacao <= 75) rep = "Comentada";
    if (stats.reputacao <= 50) rep = "Suspeita";
    if (stats.reputacao <= 25) rep = "Escandalosa";
    document.getElementById('val-reputacao').innerText = rep;
}

function updateGame(nodeKey) {
    if (nodeKey === 'prologo') resetStats();

    const node = nodes[nodeKey] || nodes['prologo'];
    
    // Atualiza textos
    document.getElementById('ato-title').innerText = node.ato;
    document.getElementById('game-text').innerText = node.text;
    document.getElementById('coro-box').innerText = `"${node.coro}"`;
    
    // Gera botões
    const btnGroup = document.getElementById('btn-group');
    btnGroup.innerHTML = '';

    node.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice.text;
        btn.onclick = () => {
            if (choice.stats) {
                for (let s in choice.stats) stats[s] += choice.stats[s];
            }
            updateDisplay();
            updateGame(choice.next);
        };
        btnGroup.appendChild(btn);
    });
}

function switchTab(event, tabName) {
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

updateGame('prologo');