// ============================================================
//  app.js — renderização dos treinos, modal de execução
//  e sistema de evolução de carga (localStorage + gráfico canvas)
// ============================================================

const STORAGE_KEY = "meu-treino-evolucao-v1";

// ---------- Navegação de abas ----------
const tabs = document.querySelectorAll("#mainTabs .tab");
const views = document.querySelectorAll(".view");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    views.forEach((v) => v.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.view).classList.add("active");
  });
});

// ---------- Render de um plano ----------
function renderPlan(plan, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Cabeçalho / meta
  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <h2>${plan.nome}</h2>
    <div class="plan-meta">
      <p>${plan.descricao}</p>
      <p style="margin-top:8px;">🎬 Vídeo de referência:
        <a href="${plan.videoRef}" target="_blank" rel="noopener">assistir no YouTube</a>
      </p>
    </div>`;
  container.appendChild(head);

  // Navegação de dias
  const dayNav = document.createElement("div");
  dayNav.className = "day-nav";
  container.appendChild(dayNav);

  // Blocos de dias
  plan.dias.forEach((dia, i) => {
    const btn = document.createElement("button");
    btn.textContent = dia.titulo.split("—")[0].trim();
    btn.title = dia.titulo;
    if (i === 0) btn.classList.add("active");
    dayNav.appendChild(btn);

    const block = document.createElement("div");
    block.className = "day-block" + (i === 0 ? " active" : "");
    block.innerHTML = `<h3 class="day-title">${dia.titulo}</h3>`;

    const grid = document.createElement("div");
    grid.className = "ex-grid";
    dia.exercicios.forEach((ex) => grid.appendChild(exerciseCard(ex)));
    block.appendChild(grid);
    container.appendChild(block);

    btn.addEventListener("click", () => {
      dayNav.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      container.querySelectorAll(".day-block").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      block.classList.add("active");
    });
  });
}

// ---------- Card de exercício ----------
function exerciseCard(ex) {
  const card = document.createElement("div");
  card.className = "ex-card";
  card.innerHTML = `
    <div class="ex-thumb" data-ex='${encodeURIComponent(JSON.stringify(ex))}'>
      <img src="${ex.img}" alt="Execução: ${ex.nome}" loading="lazy"
           onerror="this.src='https://placehold.co/400x300/1f2630/9aa7b5?text=${encodeURIComponent(ex.nome)}'" />
      <div class="play">🔍 ver execução</div>
    </div>
    <div class="ex-body">
      <div class="ex-name">${ex.nome}</div>
      <div class="ex-tags">
        <span class="pill series">${ex.series} séries</span>
        <span class="pill reps">${ex.reps} reps</span>
        <span class="pill rir">RIR ${ex.rir ?? "—"}</span>
        <span class="pill rest">⏱ ${ex.descanso}</span>
      </div>
      ${ex.tecnica ? `<div class="ex-tecnica">🔥 ${ex.tecnica}</div>` : ""}
      <div class="ex-obs">💡 ${ex.obs}</div>
      <div class="ex-actions">
        <a class="btn btn-sm btn-primary" href="${ex.video}" target="_blank" rel="noopener">▶️ Vídeo</a>
        <button class="btn btn-sm btn-ghost btn-log" data-exid="${ex.id}" data-exname="${ex.nome}">➕ Registrar carga</button>
      </div>
    </div>`;

  // Abrir modal
  card.querySelector(".ex-thumb").addEventListener("click", (e) => {
    const data = JSON.parse(decodeURIComponent(e.currentTarget.dataset.ex));
    openModal(data);
  });

  // Atalho para registrar carga
  card.querySelector(".btn-log").addEventListener("click", (e) => {
    goToEvolution(e.currentTarget.dataset.exid);
  });

  return card;
}

// ---------- Modal ----------
const modal = document.getElementById("modal");
document.getElementById("modalClose").addEventListener("click", () => (modal.hidden = true));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

function openModal(ex) {
  document.getElementById("modalTitle").textContent = ex.nome;
  const img = document.getElementById("modalImg");
  img.src = ex.img;
  img.onerror = () =>
    (img.src = `https://placehold.co/460x320/1f2630/9aa7b5?text=${encodeURIComponent(ex.nome)}`);
  document.getElementById("modalObs").textContent =
    `${ex.series} séries de ${ex.reps} reps • RIR ${ex.rir ?? "—"} • descanso ${ex.descanso}` +
    `${ex.tecnica ? " • Técnica: " + ex.tecnica : ""} • ${ex.obs}`;
  document.getElementById("modalVideo").href = ex.video;
  modal.hidden = false;
}

// ============================================================
//  EVOLUÇÃO DE CARGA
// ============================================================

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

// Monta lista completa de exercícios (de todos os planos) para o seletor
function allExercises() {
  const list = [];
  Object.values(WORKOUTS).forEach((plan) => {
    plan.dias.forEach((dia) => {
      dia.exercicios.forEach((ex) => {
        // evita duplicar o mesmo nome visualmente, mas mantém id único
        list.push({ id: ex.id, label: `${ex.nome}` , plano: plan.nome, dia: dia.titulo.split("—")[0].trim() });
      });
    });
  });
  return list;
}

const evoExercise = document.getElementById("evoExercise");
const evoForm = document.getElementById("evoForm");
const evoDate = document.getElementById("evoDate");
const evoNote = document.getElementById("evoNote");
const setsContainer = document.getElementById("setsContainer");
const addSetBtn = document.getElementById("addSetBtn");
const evoTableBody = document.querySelector("#evoTable tbody");
const evoChart = document.getElementById("evoChart");
const evoChartEmpty = document.getElementById("evoChartEmpty");
const evoBestBadge = document.getElementById("evoBestBadge");

function populateExerciseSelect() {
  const exs = allExercises();
  evoExercise.innerHTML = "";
  exs.forEach((ex) => {
    const opt = document.createElement("option");
    opt.value = ex.id;
    opt.textContent = `${ex.label}  ·  ${ex.dia}`;
    evoExercise.appendChild(opt);
  });
}

function currentExId() { return evoExercise.value; }

// Normaliza registros antigos (1 série com weight/reps) para o novo formato
// de sessão com array de séries { weight, reps, rir }.
function normalizeSession(r) {
  if (r.sets) return r; // já no formato novo
  return {
    date: r.date,
    note: r.note || "",
    sets: [{ weight: r.weight, reps: r.reps, rir: r.rir ?? "" }],
  };
}

function sessionStats(session) {
  const sets = session.sets || [];
  const bestWeight = sets.reduce((m, s) => Math.max(m, s.weight || 0), 0);
  const totalVol = sets.reduce((v, s) => v + (s.weight || 0) * (s.reps || 0), 0);
  return { bestWeight, totalVol };
}

// ---------- Linhas de série no formulário ----------
function addSetRow(weight = "", reps = "", rir = "") {
  const n = setsContainer.children.length + 1;
  const row = document.createElement("div");
  row.className = "set-row";
  row.innerHTML = `
    <span class="set-n">${n}ª</span>
    <input type="number" class="set-weight" step="0.5" min="0" placeholder="kg" value="${weight}" />
    <input type="number" class="set-reps" step="1" min="0" placeholder="reps" value="${reps}" />
    <input type="number" class="set-rir" step="1" min="0" max="10" placeholder="RIR" value="${rir}" />
    <button type="button" class="row-del set-del" title="Remover série">🗑</button>`;
  row.querySelector(".set-del").addEventListener("click", () => {
    row.remove();
    renumberSets();
  });
  setsContainer.appendChild(row);
}

function renumberSets() {
  [...setsContainer.children].forEach((row, i) => {
    row.querySelector(".set-n").textContent = `${i + 1}ª`;
  });
}

function resetForm() {
  setsContainer.innerHTML = "";
  addSetRow();
  addSetRow();
  addSetRow();
  evoNote.value = "";
}

addSetBtn.addEventListener("click", () => addSetRow());

function refreshEvolution() {
  const data = loadData();
  const exId = currentExId();
  const records = (data[exId] || [])
    .map(normalizeSession)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  // Tabela
  evoTableBody.innerHTML = "";
  records.forEach((r, idx) => {
    const { bestWeight, totalVol } = sessionStats(r);
    const setsDesc = (r.sets || [])
      .map((s) => `${s.weight}×${s.reps}${s.rir !== "" && s.rir != null ? " @RIR" + s.rir : ""}`)
      .join(" · ");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatDate(r.date)}</td>
      <td>${setsDesc || "—"}</td>
      <td>${bestWeight} kg</td>
      <td>${totalVol.toFixed(0)}</td>
      <td>${r.note || "—"}</td>
      <td><button class="row-del" title="Excluir treino" data-idx="${idx}">🗑</button></td>`;
    evoTableBody.appendChild(tr);
  });
  evoTableBody.querySelectorAll(".row-del").forEach((b) => {
    b.addEventListener("click", () => deleteRecord(exId, +b.dataset.idx));
  });

  // Melhor carga (PR) considerando todas as séries
  if (records.length) {
    const best = records.reduce((m, r) => Math.max(m, sessionStats(r).bestWeight), 0);
    evoBestBadge.textContent = `PR: ${best} kg`;
  } else {
    evoBestBadge.textContent = "";
  }

  drawChart(records);
}

function deleteRecord(exId, idx) {
  if (!confirm("Excluir este treino do histórico?")) return;
  const data = loadData();
  const records = (data[exId] || [])
    .map(normalizeSession)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  records.splice(idx, 1);
  data[exId] = records;
  saveData(data);
  refreshEvolution();
}

evoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const sets = [...setsContainer.children]
    .map((row) => ({
      weight: parseFloat(row.querySelector(".set-weight").value),
      reps: parseInt(row.querySelector(".set-reps").value, 10),
      rir: row.querySelector(".set-rir").value === "" ? "" : parseInt(row.querySelector(".set-rir").value, 10),
    }))
    .filter((s) => !isNaN(s.weight) && !isNaN(s.reps));

  if (!sets.length) {
    alert("Preencha pelo menos uma série com carga e repetições.");
    return;
  }

  const data = loadData();
  const exId = currentExId();
  if (!data[exId]) data[exId] = [];
  data[exId].push({ date: evoDate.value, sets, note: evoNote.value.trim() });
  saveData(data);
  resetForm();
  refreshEvolution();
});

document.getElementById("evoClearExercise").addEventListener("click", () => {
  if (!confirm("Apagar todo o histórico deste exercício?")) return;
  const data = loadData();
  delete data[currentExId()];
  saveData(data);
  refreshEvolution();
});

evoExercise.addEventListener("change", refreshEvolution);

// Pular para a evolução com exercício pré-selecionado
function goToEvolution(exId) {
  tabs.forEach((t) => t.classList.remove("active"));
  views.forEach((v) => v.classList.remove("active"));
  document.querySelector('[data-view="evolucao"]').classList.add("active");
  document.getElementById("evolucao").classList.add("active");
  evoExercise.value = exId;
  refreshEvolution();
  const firstWeight = setsContainer.querySelector(".set-weight");
  if (firstWeight) firstWeight.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Gráfico simples em canvas (sem libs) ----------
function drawChart(records) {
  const ctx = evoChart.getContext("2d");
  const W = (evoChart.width = evoChart.clientWidth || 500);
  const H = evoChart.height;
  ctx.clearRect(0, 0, W, H);

  if (!records.length) {
    evoChart.style.display = "none";
    evoChartEmpty.style.display = "block";
    return;
  }
  evoChart.style.display = "block";
  evoChartEmpty.style.display = "none";

  const pad = 36;
  // Plota a melhor carga de cada sessão ao longo do tempo
  const weights = records.map((r) => sessionStats(r).bestWeight);
  const maxW = Math.max(...weights);
  const minW = Math.min(...weights);
  const range = maxW - minW || 1;

  const x = (i) => pad + (i * (W - pad * 2)) / Math.max(records.length - 1, 1);
  const y = (w) => H - pad - ((w - minW) / range) * (H - pad * 2);

  // Grade / eixos
  ctx.strokeStyle = "#2a323d";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, pad); ctx.lineTo(pad, H - pad); ctx.lineTo(W - pad, H - pad);
  ctx.stroke();

  // Rótulos min/max
  ctx.fillStyle = "#9aa7b5";
  ctx.font = "11px system-ui";
  ctx.fillText(`${maxW} kg`, 4, pad + 4);
  ctx.fillText(`${minW} kg`, 4, H - pad + 4);

  // Linha de progresso
  ctx.strokeStyle = "#ff5722";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  records.forEach((r, i) => {
    const px = x(i), py = y(weights[i]);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.stroke();

  // Pontos + valores
  records.forEach((r, i) => {
    const px = x(i), py = y(weights[i]);
    ctx.fillStyle = "#4caf50";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e8edf3";
    ctx.font = "10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${weights[i]}`, px, py - 8);
  });
  ctx.textAlign = "start";
}

function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

// ---------- Export / Import ----------
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(loadData(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meu-treino-evolucao.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      const current = loadData();
      // Mescla históricos
      Object.keys(imported).forEach((k) => {
        current[k] = (current[k] || []).concat(imported[k]);
      });
      saveData(current);
      refreshEvolution();
      alert("Dados importados com sucesso!");
    } catch {
      alert("Arquivo inválido.");
    }
  };
  reader.readAsText(file);
});

// ============================================================
//  Init
// ============================================================
(function init() {
  renderPlan(WORKOUTS.cinco, "plano-cinco");
  renderPlan(WORKOUTS.seis, "plano-seis");
  populateExerciseSelect();
  evoDate.value = new Date().toISOString().slice(0, 10);
  resetForm();
  refreshEvolution();
  window.addEventListener("resize", () => refreshEvolution());
})();
