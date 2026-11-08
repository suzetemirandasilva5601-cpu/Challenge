// ============================================================
//  Base de dados dos treinos — OBJETIVO: HIPERTROFIA (AVANÇADO)
//  Metodologia "Science Based" inspirada nos vídeos:
//   - Upper/Lower Perfeito (Samuel Meller)  -> plano de 5 dias
//   - Push/Pull/Legs + Upper/Lower (Samuel Meller) -> plano de 6 dias
//
//  Protocolo avançado:
//   - Volume alto: 16–22 séries semanais por grupo muscular
//   - Proximidade da falha: RIR 0–2 (última série muitas vezes até a falha)
//   - Faixas de reps: compostos 5–10, isoladores 10–20
//   - Técnicas avançadas: drop set, rest-pause, myo-reps, séries parciais,
//     isometria/ênfase na excêntrica — indicadas no campo "tecnica"
//
//  Cada exercício traz:
//   id        -> identificador único (usado na evolução de carga)
//   nome      -> nome do exercício
//   series    -> número de séries de trabalho
//   reps      -> faixa de repetições alvo
//   rir       -> repetições em reserva alvo (proximidade da falha)
//   descanso  -> tempo de descanso recomendado
//   tecnica   -> técnica avançada aplicada (ou null)
//   obs       -> dica de execução
//   img       -> foto de execução
//   video     -> link de vídeo demonstrativo (YouTube)
// ============================================================

const IMG = (slug) =>
  `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${slug}/0.jpg`;

const VID = (termo) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(termo + " execução técnica")}`;

const WORKOUTS = {
  // ----------------------------------------------------------
  //  PLANO DE 5 DIAS  —  UPPER / LOWER  (Hipertrofia avançado)
  //  Estrutura: Upper A / Lower A / Upper B / Lower B / Braços+Pontos fracos
  // ----------------------------------------------------------
  cinco: {
    nome: "Plano 5 dias — Upper / Lower (Hipertrofia AVANÇADO)",
    descricao:
      "Divisão Upper/Lower com frequência 2x por grupo e volume alto (16–22 séries semanais por músculo). Leve a maioria das séries a RIR 0–2 e aplique as técnicas avançadas indicadas (drop set, rest-pause, myo-reps). Priorize sempre a progressão de carga nos compostos.",
    videoRef: "https://www.youtube.com/watch?v=FqHquVrDhM8",
    dias: [
      {
        id: "upperA",
        titulo: "Dia 1 — Upper A (Foco Peito/Ombro)",
        exercicios: [
          { id: "d5_upA_1", nome: "Supino reto com barra", series: 4, reps: "5–8", rir: "1–2", descanso: "2–3 min", tecnica: null, obs: "Composto principal. Mantenha 1–2 reps de reserva nas 3 primeiras séries, última a RIR 1.", img: IMG("Barbell_Bench_Press_-_Medium_Grip"), video: VID("supino reto barra") },
          { id: "d5_upA_2", nome: "Remada curvada com barra", series: 4, reps: "6–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Puxe ao umbigo, escápulas retraídas, sem usar impulso lombar.", img: IMG("Bent_Over_Barbell_Row"), video: VID("remada curvada barra") },
          { id: "d5_upA_3", nome: "Desenvolvimento com halteres", series: 4, reps: "8–12", rir: "1–2", descanso: "90 s", tecnica: null, obs: "Amplitude total, sem travar o cotovelo.", img: IMG("Dumbbell_Shoulder_Press"), video: VID("desenvolvimento halteres ombro") },
          { id: "d5_upA_4", nome: "Puxada frontal (pulldown)", series: 3, reps: "10–12", rir: "0–1", descanso: "90 s", tecnica: "Myo-reps na última série", obs: "Última série: até a falha, descanse 15 s e faça mais 3–5 reps (repita 2–3x).", img: IMG("Wide-Grip_Lat_Pulldown"), video: VID("puxada frontal pegada aberta") },
          { id: "d5_upA_5", nome: "Elevação lateral", series: 4, reps: "12–20", rir: "0–1", descanso: "60 s", tecnica: "Drop set na última série", obs: "Cotovelo guia; última série em drop set (reduza ~30% e continue).", img: IMG("Side_Lateral_Raise"), video: VID("elevação lateral halteres") },
          { id: "d5_upA_6", nome: "Tríceps na polia (corda)", series: 3, reps: "12–15", rir: "0–1", descanso: "60 s", tecnica: "Rest-pause", obs: "Abra a corda no fim; aplique rest-pause na última série.", img: IMG("Triceps_Pushdown"), video: VID("triceps corda polia") },
        ],
      },
      {
        id: "lowerA",
        titulo: "Dia 2 — Lower A (Foco Quadríceps)",
        exercicios: [
          { id: "d5_loA_1", nome: "Agachamento livre", series: 4, reps: "5–8", rir: "1–2", descanso: "3 min", tecnica: null, obs: "Profundidade confortável, core firme. Progressão de carga prioritária.", img: IMG("Barbell_Full_Squat"), video: VID("agachamento livre barra") },
          { id: "d5_loA_2", nome: "Leg press 45°", series: 4, reps: "10–15", rir: "0–1", descanso: "2 min", tecnica: "Drop set na última série", obs: "Lombar colado; última série em drop set duplo.", img: IMG("Leg_Press"), video: VID("leg press 45") },
          { id: "d5_loA_3", nome: "Cadeira extensora", series: 4, reps: "12–15", rir: "0", descanso: "75 s", tecnica: "Parciais no fim", obs: "Segure 1 s no topo; ao falhar, faça parciais na metade superior.", img: IMG("Leg_Extensions"), video: VID("cadeira extensora") },
          { id: "d5_loA_4", nome: "Stiff com barra", series: 3, reps: "8–12", rir: "1–2", descanso: "2 min", tecnica: "Ênfase na excêntrica", obs: "Desça em 3 s, posterior alongando, quadril para trás.", img: IMG("Stiff-Legged_Barbell_Deadlift"), video: VID("stiff barra posterior") },
          { id: "d5_loA_5", nome: "Panturrilha em pé", series: 5, reps: "10–15", rir: "0–1", descanso: "60 s", tecnica: "Pausa + alongamento", obs: "Pausa de 2 s no alongamento máximo a cada rep.", img: IMG("Standing_Calf_Raises"), video: VID("panturrilha em pe") },
          { id: "d5_loA_6", nome: "Abdominal na polia", series: 4, reps: "12–15", rir: "0–1", descanso: "60 s", tecnica: null, obs: "Enrole a coluna, não puxe só com o braço.", img: IMG("Cable_Crunch"), video: VID("abdominal na polia") },
        ],
      },
      {
        id: "upperB",
        titulo: "Dia 3 — Upper B (Foco Costas/Braço)",
        exercicios: [
          { id: "d5_upB_1", nome: "Barra fixa (com carga)", series: 4, reps: "6–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Amplitude completa; adicione carga quando passar de 10 reps.", img: IMG("Pullups"), video: VID("barra fixa pull up") },
          { id: "d5_upB_2", nome: "Supino inclinado com halteres", series: 4, reps: "8–12", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Banco 30°, foco peito superior, alongue embaixo.", img: IMG("Incline_Dumbbell_Press"), video: VID("supino inclinado halteres") },
          { id: "d5_upB_3", nome: "Remada sentada na polia", series: 3, reps: "10–12", rir: "0–1", descanso: "90 s", tecnica: "Myo-reps", obs: "Peito aberto, puxe com as costas; myo-reps na última.", img: IMG("Seated_Cable_Rows"), video: VID("remada sentada polia") },
          { id: "d5_upB_4", nome: "Crucifixo na polia (crossover)", series: 3, reps: "12–15", rir: "0–1", descanso: "75 s", tecnica: "Drop set na última série", obs: "Contração no centro, alongue bem na abertura.", img: IMG("Cable_Crossover"), video: VID("crossover crucifixo polia") },
          { id: "d5_upB_5", nome: "Rosca direta com barra", series: 4, reps: "8–12", rir: "0–1", descanso: "75 s", tecnica: "Parciais no fim", obs: "Sem balanço; ao falhar, parciais na metade inferior.", img: IMG("Barbell_Curl"), video: VID("rosca direta barra") },
          { id: "d5_upB_6", nome: "Tríceps testa com barra EZ", series: 4, reps: "10–12", rir: "0–1", descanso: "75 s", tecnica: "Rest-pause", obs: "Cotovelos fixos; rest-pause na última série.", img: IMG("Lying_Triceps_Press"), video: VID("triceps testa barra ez") },
        ],
      },
      {
        id: "lowerB",
        titulo: "Dia 4 — Lower B (Foco Posterior/Glúteo)",
        exercicios: [
          { id: "d5_loB_1", nome: "Levantamento terra romeno", series: 4, reps: "6–10", rir: "1–2", descanso: "3 min", tecnica: "Ênfase na excêntrica", obs: "Barra colada ao corpo, desça em 3 s sentindo o posterior.", img: IMG("Romanian_Deadlift"), video: VID("terra romeno") },
          { id: "d5_loB_2", nome: "Agachamento búlgaro (halteres)", series: 3, reps: "8–12 / perna", rir: "0–1", descanso: "90 s", tecnica: null, obs: "Tronco levemente inclinado para enfatizar o glúteo.", img: IMG("Dumbbell_Lunges"), video: VID("agachamento bulgaro") },
          { id: "d5_loB_3", nome: "Mesa flexora", series: 4, reps: "10–15", rir: "0–1", descanso: "90 s", tecnica: "Drop set na última série", obs: "Controle a negativa; drop set na última.", img: IMG("Lying_Leg_Curls"), video: VID("mesa flexora") },
          { id: "d5_loB_4", nome: "Cadeira abdutora (glúteo)", series: 4, reps: "15–20", rir: "0", descanso: "60 s", tecnica: "Pausa no pico", obs: "Incline o tronco à frente; pausa de 1 s na contração.", img: IMG("Thigh_Abductor"), video: VID("cadeira abdutora glúteo") },
          { id: "d5_loB_5", nome: "Panturrilha sentado", series: 5, reps: "12–20", rir: "0–1", descanso: "45 s", tecnica: "Pausa + alongamento", obs: "Foco no sóleo, pausa no alongamento.", img: IMG("Seated_Calf_Raise"), video: VID("panturrilha sentado") },
          { id: "d5_loB_6", nome: "Prancha abdominal", series: 3, reps: "45–75 s", rir: "—", descanso: "45 s", tecnica: null, obs: "Glúteo e abdômen contraídos, quadril neutro.", img: IMG("Plank"), video: VID("prancha abdominal") },
        ],
      },
      {
        id: "bracos5",
        titulo: "Dia 5 — Braços & Pontos Fracos",
        exercicios: [
          { id: "d5_br_1", nome: "Rosca scott (banco)", series: 4, reps: "10–12", rir: "0–1", descanso: "75 s", tecnica: "Ênfase no alongamento", obs: "Pico de contração e alongamento máximo embaixo.", img: IMG("Preacher_Curl"), video: VID("rosca scott") },
          { id: "d5_br_2", nome: "Tríceps francês (halter)", series: 4, reps: "10–12", rir: "0–1", descanso: "75 s", tecnica: null, obs: "Alongue bem atrás da cabeça (cabeça longa).", img: IMG("Seated_Triceps_Press"), video: VID("triceps frances halter") },
          { id: "d5_br_3", nome: "Rosca martelo", series: 3, reps: "10–15", rir: "0–1", descanso: "60 s", tecnica: "Bi-set com rosca direta", obs: "Pega neutra (braquial); emende com rosca direta.", img: IMG("Hammer_Curls"), video: VID("rosca martelo") },
          { id: "d5_br_4", nome: "Tríceps corda (polia)", series: 3, reps: "12–15", rir: "0", descanso: "60 s", tecnica: "Drop set na última série", obs: "Extensão completa, abra a corda no fim.", img: IMG("Triceps_Pushdown_-_Rope_Attachment"), video: VID("triceps corda") },
          { id: "d5_br_5", nome: "Elevação lateral", series: 5, reps: "15–20", rir: "0", descanso: "45 s", tecnica: "Drop set duplo na última", obs: "Alto volume de deltoide lateral; drop set duplo no fim.", img: IMG("Side_Lateral_Raise"), video: VID("elevação lateral ombro") },
          { id: "d5_br_6", nome: "Crucifixo invertido (posterior ombro)", series: 4, reps: "15–20", rir: "0–1", descanso: "45 s", tecnica: null, obs: "Corrige postura e dá volume ao deltoide posterior.", img: IMG("Reverse_Flyes"), video: VID("crucifixo invertido posterior ombro") },
        ],
      },
    ],
  },

  // ----------------------------------------------------------
  //  PLANO DE 6 DIAS  —  PUSH / PULL / LEGS  (Hipertrofia avançado)
  //  Estrutura: Push A / Pull A / Legs A / Push B / Pull B / Legs B
  // ----------------------------------------------------------
  seis: {
    nome: "Plano 6 dias — Push / Pull / Legs (Hipertrofia AVANÇADO)",
    descricao:
      "Push/Pull/Legs repetido 2x na semana com volume alto por sessão. As variações A/B mudam ênfase e exercícios. Leve isoladores a RIR 0–1 e compostos a RIR 1–2, aplicando as técnicas avançadas indicadas. Foque na sobrecarga progressiva.",
    videoRef: "https://www.youtube.com/watch?v=9_cESaI7dsY",
    dias: [
      {
        id: "pushA",
        titulo: "Dia 1 — Push A (Peito / Ombro / Tríceps)",
        exercicios: [
          { id: "d6_puA_1", nome: "Supino reto com barra", series: 4, reps: "5–8", rir: "1–2", descanso: "2–3 min", tecnica: null, obs: "Composto principal de empurrar; progressão de carga.", img: IMG("Barbell_Bench_Press_-_Medium_Grip"), video: VID("supino reto barra") },
          { id: "d6_puA_2", nome: "Desenvolvimento militar com barra", series: 4, reps: "6–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Core firme, não hiperestenda a lombar.", img: IMG("Standing_Military_Press"), video: VID("desenvolvimento militar barra") },
          { id: "d6_puA_3", nome: "Supino inclinado com halteres", series: 3, reps: "8–12", rir: "0–1", descanso: "90 s", tecnica: "Myo-reps", obs: "Peito superior; myo-reps na última série.", img: IMG("Incline_Dumbbell_Press"), video: VID("supino inclinado halteres") },
          { id: "d6_puA_4", nome: "Elevação lateral", series: 4, reps: "12–20", rir: "0", descanso: "60 s", tecnica: "Drop set na última série", obs: "Volume de ombro lateral; drop set no fim.", img: IMG("Side_Lateral_Raise"), video: VID("elevação lateral") },
          { id: "d6_puA_5", nome: "Tríceps na polia (barra)", series: 4, reps: "10–12", rir: "0–1", descanso: "60 s", tecnica: "Rest-pause", obs: "Cotovelos colados; rest-pause na última.", img: IMG("Triceps_Pushdown"), video: VID("triceps polia barra") },
          { id: "d6_puA_6", nome: "Tríceps francês", series: 3, reps: "12–15", rir: "0", descanso: "60 s", tecnica: null, obs: "Alongamento da cabeça longa.", img: IMG("Seated_Triceps_Press"), video: VID("triceps frances") },
        ],
      },
      {
        id: "pullA",
        titulo: "Dia 2 — Pull A (Costas / Bíceps)",
        exercicios: [
          { id: "d6_plA_1", nome: "Levantamento terra convencional", series: 3, reps: "4–6", rir: "2–3", descanso: "3 min", tecnica: null, obs: "Técnica impecável; carga alta, RIR maior pela fadiga sistêmica.", img: IMG("Barbell_Deadlift"), video: VID("levantamento terra") },
          { id: "d6_plA_2", nome: "Barra fixa (com carga)", series: 4, reps: "6–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Amplitude total; adicione carga quando necessário.", img: IMG("Pullups"), video: VID("barra fixa") },
          { id: "d6_plA_3", nome: "Remada curvada com barra", series: 4, reps: "8–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Espessura de costas, sem impulso.", img: IMG("Bent_Over_Barbell_Row"), video: VID("remada curvada") },
          { id: "d6_plA_4", nome: "Remada na polia (pega neutra)", series: 3, reps: "10–12", rir: "0–1", descanso: "90 s", tecnica: "Myo-reps", obs: "Alongue à frente; myo-reps na última série.", img: IMG("Seated_Cable_Rows"), video: VID("remada sentada polia") },
          { id: "d6_plA_5", nome: "Rosca direta com barra", series: 4, reps: "8–12", rir: "0–1", descanso: "75 s", tecnica: "Parciais no fim", obs: "Sem balanço; ao falhar, parciais inferiores.", img: IMG("Barbell_Curl"), video: VID("rosca direta") },
          { id: "d6_plA_6", nome: "Rosca martelo", series: 3, reps: "12–15", rir: "0", descanso: "60 s", tecnica: "Drop set na última série", obs: "Braquial e antebraço; drop set no fim.", img: IMG("Hammer_Curls"), video: VID("rosca martelo") },
        ],
      },
      {
        id: "legsA",
        titulo: "Dia 3 — Legs A (Foco Quadríceps)",
        exercicios: [
          { id: "d6_leA_1", nome: "Agachamento livre", series: 4, reps: "5–8", rir: "1–2", descanso: "3 min", tecnica: null, obs: "Principal de perna; progressão de carga prioritária.", img: IMG("Barbell_Full_Squat"), video: VID("agachamento livre") },
          { id: "d6_leA_2", nome: "Leg press 45°", series: 4, reps: "10–15", rir: "0–1", descanso: "2 min", tecnica: "Drop set na última série", obs: "Pés baixos = quadríceps; drop set no fim.", img: IMG("Leg_Press"), video: VID("leg press 45") },
          { id: "d6_leA_3", nome: "Cadeira extensora", series: 4, reps: "12–15", rir: "0", descanso: "75 s", tecnica: "Parciais no fim", obs: "Pausa no topo; parciais superiores ao falhar.", img: IMG("Leg_Extensions"), video: VID("cadeira extensora") },
          { id: "d6_leA_4", nome: "Mesa flexora", series: 3, reps: "10–12", rir: "0–1", descanso: "90 s", tecnica: null, obs: "Mantém volume de posterior no dia de quadríceps.", img: IMG("Lying_Leg_Curls"), video: VID("mesa flexora") },
          { id: "d6_leA_5", nome: "Panturrilha em pé", series: 5, reps: "10–15", rir: "0–1", descanso: "60 s", tecnica: "Pausa + alongamento", obs: "Pausa de 2 s no alongamento a cada rep.", img: IMG("Standing_Calf_Raises"), video: VID("panturrilha em pe") },
          { id: "d6_leA_6", nome: "Abdominal infra (elevação de pernas)", series: 4, reps: "12–15", rir: "0–1", descanso: "45 s", tecnica: null, obs: "Controle a descida, evite balanço.", img: IMG("Hanging_Leg_Raise"), video: VID("elevação de pernas abdominal") },
        ],
      },
      {
        id: "pushB",
        titulo: "Dia 4 — Push B (Ombro / Peito / Tríceps)",
        exercicios: [
          { id: "d6_puB_1", nome: "Desenvolvimento com halteres", series: 4, reps: "8–12", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Prioriza ombro neste dia; amplitude total.", img: IMG("Dumbbell_Shoulder_Press"), video: VID("desenvolvimento halteres") },
          { id: "d6_puB_2", nome: "Supino inclinado com barra", series: 4, reps: "6–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Peito superior com carga.", img: IMG("Barbell_Incline_Bench_Press_-_Medium_Grip"), video: VID("supino inclinado barra") },
          { id: "d6_puB_3", nome: "Crucifixo na polia (crossover)", series: 3, reps: "12–15", rir: "0–1", descanso: "75 s", tecnica: "Drop set na última série", obs: "Contração no centro; drop set no fim.", img: IMG("Cable_Crossover"), video: VID("crossover") },
          { id: "d6_puB_4", nome: "Elevação lateral (polia)", series: 4, reps: "15–20", rir: "0", descanso: "45 s", tecnica: "Rest-pause", obs: "Tensão constante; rest-pause na última.", img: IMG("Cable_Seated_Lateral_Raise"), video: VID("elevação lateral polia") },
          { id: "d6_puB_5", nome: "Tríceps testa barra EZ", series: 4, reps: "10–12", rir: "0–1", descanso: "75 s", tecnica: null, obs: "Cotovelos fixos, alongue atrás da cabeça.", img: IMG("Lying_Triceps_Press"), video: VID("triceps testa") },
          { id: "d6_puB_6", nome: "Tríceps corda (overhead)", series: 3, reps: "12–15", rir: "0", descanso: "60 s", tecnica: "Drop set na última série", obs: "Cabeça longa alongada; drop set no fim.", img: IMG("Triceps_Pushdown_-_Rope_Attachment"), video: VID("triceps overhead corda") },
        ],
      },
      {
        id: "pullB",
        titulo: "Dia 5 — Pull B (Costas / Bíceps)",
        exercicios: [
          { id: "d6_plB_1", nome: "Puxada frontal (pulldown)", series: 4, reps: "8–12", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Largura de costas; alongue no topo.", img: IMG("Wide-Grip_Lat_Pulldown"), video: VID("puxada frontal") },
          { id: "d6_plB_2", nome: "Remada cavalinho (T-bar)", series: 4, reps: "8–10", rir: "1–2", descanso: "2 min", tecnica: null, obs: "Espessura; puxe com as costas.", img: IMG("T-Bar_Row_with_Handle"), video: VID("remada cavalinho t-bar") },
          { id: "d6_plB_3", nome: "Pullover na polia", series: 3, reps: "12–15", rir: "0–1", descanso: "75 s", tecnica: "Myo-reps", obs: "Isola o latíssimo; myo-reps na última.", img: IMG("Straight-Arm_Pulldown"), video: VID("pullover polia") },
          { id: "d6_plB_4", nome: "Crucifixo invertido (posterior)", series: 4, reps: "15–20", rir: "0", descanso: "45 s", tecnica: "Drop set na última série", obs: "Deltoide posterior; drop set no fim.", img: IMG("Reverse_Flyes"), video: VID("crucifixo invertido") },
          { id: "d6_plB_5", nome: "Rosca scott", series: 4, reps: "10–12", rir: "0–1", descanso: "75 s", tecnica: "Ênfase na excêntrica", obs: "Desça em 3 s; alongamento do bíceps.", img: IMG("Preacher_Curl"), video: VID("rosca scott") },
          { id: "d6_plB_6", nome: "Rosca inversa (antebraço)", series: 3, reps: "12–15", rir: "0", descanso: "45 s", tecnica: null, obs: "Trabalha extensores e braquiorradial.", img: IMG("Reverse_Barbell_Curl"), video: VID("rosca inversa antebraço") },
        ],
      },
      {
        id: "legsB",
        titulo: "Dia 6 — Legs B (Foco Posterior / Glúteo)",
        exercicios: [
          { id: "d6_leB_1", nome: "Levantamento terra romeno", series: 4, reps: "6–10", rir: "1–2", descanso: "3 min", tecnica: "Ênfase na excêntrica", obs: "Posterior e glúteo; desça em 3 s.", img: IMG("Romanian_Deadlift"), video: VID("terra romeno") },
          { id: "d6_leB_2", nome: "Agachamento hack", series: 4, reps: "10–12", rir: "0–1", descanso: "2 min", tecnica: "Drop set na última série", obs: "Alternativa ao agacho livre; drop set no fim.", img: IMG("Hack_Squat"), video: VID("agachamento hack") },
          { id: "d6_leB_3", nome: "Mesa flexora", series: 4, reps: "10–15", rir: "0–1", descanso: "90 s", tecnica: "Parciais no fim", obs: "Negativa controlada; parciais ao falhar.", img: IMG("Lying_Leg_Curls"), video: VID("mesa flexora") },
          { id: "d6_leB_4", nome: "Elevação pélvica (hip thrust)", series: 4, reps: "8–12", rir: "0–1", descanso: "2 min", tecnica: "Pausa no pico", obs: "Aperte o glúteo 2 s no topo.", img: IMG("Barbell_Hip_Thrust"), video: VID("hip thrust elevação pélvica") },
          { id: "d6_leB_5", nome: "Panturrilha sentado", series: 5, reps: "12–20", rir: "0–1", descanso: "45 s", tecnica: "Pausa + alongamento", obs: "Foco no sóleo; pausa no alongamento.", img: IMG("Seated_Calf_Raise"), video: VID("panturrilha sentado") },
          { id: "d6_leB_6", nome: "Abdominal na polia", series: 4, reps: "12–15", rir: "0–1", descanso: "45 s", tecnica: null, obs: "Enrole a coluna; contração do reto abdominal.", img: IMG("Cable_Crunch"), video: VID("abdominal polia") },
        ],
      },
    ],
  },
};
