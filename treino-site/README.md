# 🏋️ Meu Treino — Upper/Lower & Push/Pull/Legs

Site local (HTML/CSS/JS puro, sem dependências) com dois planos de treino de
**HIPERTROFIA — nível AVANÇADO**, baseados nos vídeos "science based" do canal **Samuel Meller**:

- **5 dias — Upper/Lower** → [vídeo](https://www.youtube.com/watch?v=FqHquVrDhM8)
- **6 dias — Push/Pull/Legs** → [vídeo](https://www.youtube.com/watch?v=9_cESaI7dsY)

## Protocolo (hipertrofia avançado)

- **Volume alto:** 16–22 séries semanais por grupo muscular
- **Proximidade da falha:** RIR 0–2 (isoladores frequentemente até a falha)
- **Faixas de reps:** compostos 5–10, isoladores 10–20
- **Técnicas avançadas:** drop set, rest-pause, myo-reps, séries parciais e ênfase na excêntrica — indicadas em cada exercício

## O que tem

- 📋 Planos de **5 e 6 dias** com os dias de treino divididos em abas
- 🏋️ Cada exercício com **séries, faixa de reps, RIR alvo, descanso, técnica avançada e dica de execução**
- 🖼️ **Foto da execução** (clique na imagem para abrir em tamanho maior) + **link de vídeo demonstrativo**
- 📈 Seção de **Evolução de carga** repaginada:
  - Registre o **treino completo** com **várias séries**, cada uma com **carga, reps e RIR individual**
  - **Gráfico de progresso** (melhor carga por sessão), **PR (recorde)** e **histórico detalhado** série a série
  - **Volume total** calculado por sessão
- 💾 Dados salvos no navegador (localStorage) + **exportar/importar** em JSON para backup ou trocar de dispositivo (compatível com registros do formato antigo)

## Como rodar

Por ser 100% estático, basta abrir o `index.html`. Para funcionar bem (carregamento de imagens),
rode um servidor local:

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse **http://localhost:8000**.

## Estrutura

```
.
├── index.html          # página principal
├── css/style.css       # estilos
├── js/app.js           # lógica (render, modal, evolução de carga, gráfico)
└── data/workouts.js    # base de dados dos treinos (edite aqui p/ personalizar)
```

## Personalizar

Abra `data/workouts.js` e edite os exercícios, séries e repetições à vontade.
Cada exercício tem um `id` único — é por ele que a evolução de carga é guardada,
então evite mudar os `id` se já tiver histórico salvo.

> ⚠️ Conteúdo educativo. Ajuste cargas e exercícios à sua realidade e, idealmente,
> consulte um profissional de educação física.
