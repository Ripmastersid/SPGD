// ===== SPGD · LÓGICA COMPLETA (PT-BR + exemplos da SIDMARKTING) =====
Chart.defaults.color = '#9FB3D1';
Chart.defaults.borderColor = '#24344F';

// ===== ÁREAS ADAPTADAS À SIDMARKTING =====
const AREAS = {
  programas: [
    { id: 'sites', nombre: 'Sites Profissionais', icon: '🌐', color: '#25D366' },
    { id: 'ecommerce', nombre: 'E-commerce', icon: '🛒', color: '#38BDF8' },
    { id: 'landing', nombre: 'Landing Pages', icon: '🚀', color: '#FBBF24' },
    { id: 'automacao', nombre: 'Automação & IA', icon: '🤖', color: '#A78BFA' },
    { id: 'manutencao', nombre: 'Manutenção', icon: '🔧', color: '#F97316' }
  ],
  procesos: [
    { id: 'comercial', nombre: 'Comercial', icon: '💼', color: '#3B82F6' },
    { id: 'planejamento', nombre: 'Planejamento', icon: '📋', color: '#14B8A6' },
    { id: 'comunicacao', nombre: 'Comunicação', icon: '📢', color: '#F97316' },
    { id: 'financeiro', nombre: 'Financeiro', icon: '💰', color: '#22C55E' },
    { id: 'qualidade', nombre: 'Qualidade', icon: '🔍', color: '#EF4444' }
  ],
  iniciativas: [
    { id: 'curso', nombre: 'Curso de Sites', icon: '🎓', color: '#EC4899' },
    { id: 'whatsgroup', nombre: 'Canal Whatsgroup', icon: '📲', color: '#25D366' },
    { id: 'parcerias', nombre: 'Parcerias', icon: '🤝', color: '#F59E0B' },
    { id: 'saas', nombre: 'SaaS SPGD', icon: '🛸', color: '#0EA5E9' }
  ]
};
function getAllAreas(){ return [...AREAS.programas, ...AREAS.procesos, ...AREAS.iniciativas] }

// ===== ESTADO =====
let state = { reuniones: [], compromisos: [], eventos: [], delegaciones: [], currentWeekOffset: 0 };
function loadState(){ const s = localStorage.getItem('spgd-state'); if(s) state = {...state, ...JSON.parse(s)}; if(state.reuniones.length===0) loadSampleData() }
function saveState(){ localStorage.setItem('spgd-state', JSON.stringify(state)) }

// ===== DADOS DE EXEMPLO (adaptados à SIDMARKTING) =====
function loadSampleData(){
  const today = new Date();
  const fmt = (d) => d.toISOString().split('T')[0];
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate()+n); return r; };

  state.reuniones = [
    { id:'r1', titulo:'Briefing com Clínica Sorrir', tipo:'frecuente', fecha:fmt(today), hora:'9:00', duracion:'1h',
      participantes:['Dr. Ana (cliente)','Sidnei','Designer'],
      acuerdos:[
        { id:'a1', texto:'Enviar textos do site até sexta', responsable:'Dr. Ana', fechaLimite:fmt(addDays(today,5)), estado:'pendiente', prioridad:'alta' },
        { id:'a2', texto:'Primeiro layout aprovado', responsable:'Designer', fechaLimite:fmt(addDays(today,3)), estado:'en-progreso', prioridad:'urgente' },
        { id:'a3', texto:'Integrar agendamento online', responsable:'Sidnei', fechaLimite:fmt(addDays(today,10)), estado:'pendiente', prioridad:'media' }
      ], notas:'Cliente quer site pronto para o congresso.' },
    { id:'r2', titulo:'Revisão de Projeto — Dom Faminto', tipo:'frecuente', fecha:fmt(addDays(today,2)), hora:'10:00', duracion:'1.5h',
      participantes:['João (cliente)','Sidnei'],
      acuerdos:[
        { id:'a4', texto:'Cardápio digital no app de delivery', responsable:'Sidnei', fechaLimite:fmt(addDays(today,7)), estado:'pendiente', prioridad:'alta' },
        { id:'a5', texto:'Campanha de inauguração', responsable:'Comunicação', fechaLimite:fmt(addDays(today,14)), estado:'pendiente', prioridad:'urgente' }
      ], notas:'' },
    { id:'r3', titulo:'Equipe Interna — Planejamento Q4', tipo:'frecuente', fecha:fmt(addDays(today,3)), hora:'15:00', duracion:'1h',
      participantes:['Sidnei','Freelancer Design','Copywriter'],
      acuerdos:[
        { id:'a6', texto:'Manual de marca atualizado', responsable:'Designer', fechaLimite:fmt(addDays(today,12)), estado:'en-progreso', prioridad:'alta' }
      ], notas:'' }
  ];

  state.compromisos = [
    { id:'c1', titulo:'Landing page do lançamento Pizzaria Bella', area:'landing', prioridad:'urgente', estado:'en-progreso', fechaLimite:fmt(addDays(today,3)), responsable:'Sidnei', origen:'Briefing cliente', delegada:false, fechaCreacion:fmt(addDays(today,-5)) },
    { id:'c2', titulo:'Configurar checkout e-commerce — Loja ModaFina', area:'ecommerce', prioridad:'alta', estado:'pendiente', fechaLimite:fmt(addDays(today,7)), responsable:'Sidnei', origen:'Reunião cliente', delegada:false, fechaCreacion:fmt(addDays(today,-3)) },
    { id:'c3', titulo:'Gravar aula 3 do Curso de Sites', area:'curso', prioridad:'media', estado:'pendiente', fechaLimite:fmt(addDays(today,15)), responsable:'Sidnei', origen:'Planejamento interno', delegada:false, fechaCreacion:fmt(addDays(today,-2)) },
    { id:'c4', titulo:'Renovar domínio e hospedagem — Clínica Sorrir', area:'manutencao', prioridad:'urgente', estado:'pendiente', fechaLimite:fmt(addDays(today,1)), responsable:'Sidnei', origen:'Financeiro', delegada:false, fechaCreacion:fmt(today) },
    { id:'c5', titulo:'Landing page para evento corporativo', area:'landing', prioridad:'alta', estado:'pendiente', fechaLimite:fmt(addDays(today,10)), responsable:'Freelancer', origen:'Reunião cliente', delegada:true, fechaCreacion:fmt(addDays(today,-1)) },
    { id:'c6', titulo:'Proposta comercial para Oficina Mecânica Veloz', area:'comercial', prioridad:'media', estado:'en-progreso', fechaLimite:fmt(addDays(today,20)), responsable:'Sidnei', origen:'Lead Instagram', delegada:false, fechaCreacion:fmt(addDays(today,-7)) },
    { id:'c7', titulo:'Lançar versão 2.0 do SaaS SPGD', area:'saas', prioridad:'alta', estado:'pendiente', fechaLimite:fmt(addDays(today,30)), responsable:'Sidnei', origen:'Iniciativa', delegada:false, fechaCreacion:fmt(addDays(today,-10)) },
    { id:'c8', titulo:'Auditoria de sites entregues em julho', area:'qualidade', prioridad:'alta', estado:'pendiente', fechaLimite:fmt(addDays(today,5)), responsable:'Sidnei', origen:'Processo interno', delegada:true, fechaCreacion:fmt(addDays(today,-4)) }
  ];

  state.eventos = [
    { id:'e1', titulo:'Briefing Clínica Sorrir', tipo:'reunion', fecha:fmt(today), hora:'9:00', area:'sites', notas:'' },
    { id:'e2', titulo:'Reunião com parceiro de hospedagem', tipo:'externa', fecha:fmt(addDays(today,1)), hora:'11:00', area:'comercial', notas:'Negociar revenda' },
    { id:'e3', titulo:'Revisão Dom Faminto', tipo:'reunion', fecha:fmt(addDays(today,2)), hora:'10:00', area:'ecommerce', notas:'' },
    { id:'e4', titulo:'Planejamento Q4', tipo:'reunion', fecha:fmt(addDays(today,3)), hora:'15:00', area:'planejamento', notas:'' },
    { id:'e5', titulo:'Follow-up Oficina Veloz', tipo:'reunion', fecha:fmt(addDays(today,4)), hora:'8:30', area:'comercial', notas:'' },
    { id:'e6', titulo:'Gravação do Curso de Sites', tipo:'campo', fecha:fmt(addDays(today,5)), hora:'10:00', area:'curso', notas:'Estúdio parceiro' },
    { id:'e7', titulo:'Apresentação SPGD pra investidor', tipo:'externa', fecha:fmt(addDays(today,6)), hora:'14:00', area:'saas', notas:'' }
  ];

  state.delegaciones = [
    { id:'d1', tarea:'Finalizar identidade visual da Pizzaria Bella', delegadoA:'Freelancer Design', fechaDelegacion:fmt(addDays(today,-7)), fechaLimite:fmt(addDays(today,5)), estado:'en-progreso', notas:'Paleta vermelha + preto' },
    { id:'d2', tarea:'Escrever copy da landing Loja ModaFina', delegadoA:'Copywriter', fechaDelegacion:fmt(addDays(today,-10)), fechaLimite:fmt(addDays(today,3)), estado:'en-progreso', notas:'Tom feminino moderno' },
    { id:'d3', tarea:'Editar vídeos do Canal Whatsgroup', delegadoA:'Editor Parceiro', fechaDelegacion:fmt(addDays(today,-14)), fechaLimite:fmt(addDays(today,7)), estado:'pendiente', notas:'3 vídeos curtos' }
  ];

  saveState();
}

// ===== DRAWER MOBILE =====
function toggleDrawer(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('drawer-overlay').classList.toggle('hidden');
}

// ===== NAVEGAÇÃO =====
function showSection(section, btn){
  document.querySelectorAll('[id^="sec-"]').forEach(s => s.classList.add('hidden'));
  document.getElementById('sec-'+section).classList.remove('hidden');
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  if(btn) btn.classList.add('active');
  else { const idx = {dashboard:0,agenda:1,reuniones:2,compromisos:3,programas:4,procesos:5,iniciativas:6,delegaciones:7,reportes:8,integracoes:9}; const item = document.querySelectorAll('.sidebar-item')[idx[section]]; if(item) item.classList.add('active'); }

  const titles = {
    dashboard:['Painel Executivo','Visão geral da SIDMARKTING'],
    agenda:['Agenda','Gestão de eventos e reuniões'],
    reuniones:['Reuniões','Atas, acordos e acompanhamento'],
    compromisos:['Compromissos','Tarefas, prazos e entregas'],
    programas:['Linhas de Serviço','O que a SIDMARKTING vende'],
    procesos:['Processos Internos','Áreas da operação da agência'],
    iniciativas:['Iniciativas','Projetos estratégicos e SaaS'],
    delegaciones:['Delegações','Tarefas terceirizadas e acompanhamento'],
    reportes:['Relatórios','Análise e métricas de gestão'],
    integracoes:['Integrações','Supabase · MCP · WhatsApp · E-mail · Cron']
  };
  document.getElementById('section-title').textContent = titles[section][0];
  document.getElementById('section-subtitle').textContent = titles[section][1];

  if(section==='dashboard') renderDashboard();
  if(section==='agenda') renderAgenda();
  if(section==='reuniones') renderReuniones();
  if(section==='compromisos') renderCompromisos();
  if(section==='programas') renderAreaGrid('programas');
  if(section==='procesos') renderAreaGrid('procesos');
  if(section==='iniciativas') renderAreaGrid('iniciativas');
  if(section==='delegaciones') renderDelegaciones();
  if(section==='reportes') renderReportes();
  if(section==='integracoes') renderIntegracoes();

  if(window.innerWidth < 768) toggleDrawer();
}

// ===== DASHBOARD =====
function renderDashboard(){
  const today = new Date().toISOString().split('T')[0];
  const pendientes = state.compromisos.filter(c => c.estado !== 'completado');
  const vencidos = pendientes.filter(c => c.fechaLimite < today);
  const reunionesHoy = state.eventos.filter(e => e.fecha === today);
  const delegacionesActivas = state.delegaciones.filter(d => d.estado !== 'completado');
  const completados30 = state.compromisos.filter(c => c.estado === 'completado').length;
  const total30 = state.compromisos.length;
  const tasa = total30 > 0 ? Math.round((completados30/total30)*100) : 0;

  document.getElementById('kpi-pendientes').textContent = pendientes.length;
  document.getElementById('kpi-vencidos').textContent = vencidos.length;
  document.getElementById('kpi-reuniones').textContent = state.eventos.filter(e => {
    const d = new Date(e.fecha); const now = new Date();
    const s = new Date(now); s.setDate(now.getDate()-now.getDay());
    const e2 = new Date(s); e2.setDate(s.getDate()+6);
    return d >= s && d <= e2;
  }).length;
  document.getElementById('kpi-reuniones-hoy').textContent = reunionesHoy.length;
  document.getElementById('kpi-delegaciones').textContent = delegacionesActivas.length;
  document.getElementById('kpi-cumplimiento').textContent = tasa + '%';

  const prox = state.eventos.filter(e => e.fecha >= today).sort((a,b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora)).slice(0,6);
  const actC = document.getElementById('dashboard-actividades');
  actC.innerHTML = prox.length ? prox.map(e => {
    const a = getAllAreas().find(x => x.id === e.area) || { icon:'📌', color:'#6B7280', nombre:e.area };
    const isToday = e.fecha === today;
    return `<div class="flex items-center gap-3 p-3 rounded-lg border border-[#24344F] hover:bg-[#1D2E4A] transition ${isToday?'bg-[#FBBF24]/10 border-[#FBBF24]/30':''}">
      <div class="text-center min-w-[48px]">
        <div class="text-xs text-[#64789A]">${formatDateShort(e.fecha)}</div>
        <div class="text-xs font-semibold text-[#EAF2FF]">${e.hora}</div>
      </div>
      <div class="w-1 h-8 rounded-full" style="background:${a.color}"></div>
      <div class="flex-1">
        <p class="text-sm font-medium text-[#EAF2FF]">${e.titulo}</p>
        <p class="text-xs text-[#64789A]">${a.nombre || e.area}</p>
      </div>
      ${isToday?'<span class="badge bg-[#FBBF24]/20 text-[#FBBF24]">Hoje</span>':''}
      <span class="badge" style="background:${a.color}20;color:${a.color}">${e.tipo}</span>
    </div>`;
  }).join('') : '<p class="text-sm text-[#64789A] text-center py-8">Nenhuma atividade programada</p>';

  const urgentes = state.compromisos.filter(c => (c.prioridad==='urgente'||c.prioridad==='alta') && c.estado!=='completado').sort((a,b) => a.fechaLimite.localeCompare(b.fechaLimite)).slice(0,5);
  const urgC = document.getElementById('dashboard-urgentes');
  urgC.innerHTML = urgentes.length ? urgentes.map(c => {
    const isVencido = c.fechaLimite < today;
    return `<div class="p-3 rounded-lg border border-[#24344F] hover:bg-[#1D2E4A] transition priority-${c.prioridad}">
      <p class="text-sm font-medium text-[#EAF2FF]">${c.titulo}</p>
      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-[#64789A]">${c.responsable}</span>
        <span class="text-xs ${isVencido?'text-[#F87171] font-semibold':'text-[#64789A]'}">${isVencido?'⚠️ ':''}${formatDateShort(c.fechaLimite)}</span>
      </div>
    </div>`;
  }).join('') : '<p class="text-sm text-[#64789A] text-center py-8">Nenhum compromisso urgente ✨</p>';

  renderCharts();
}

function renderCharts(){
  const ac = {};
  state.compromisos.filter(c => c.estado !== 'completado').forEach(c => {
    const a = getAllAreas().find(x => x.id === c.area);
    const n = a ? a.nombre : c.area;
    ac[n] = (ac[n] || 0) + 1;
  });
  const c1 = document.getElementById('chart-areas'); if(c1._chart) c1._chart.destroy();
  c1._chart = new Chart(c1, { type:'bar', data:{ labels:Object.keys(ac), datasets:[{ data:Object.values(ac), backgroundColor:Object.keys(ac).map((_,i)=>['#25D366','#38BDF8','#FBBF24','#A78BFA','#F97316','#3B82F6','#14B8A6','#EC4899','#22C55E','#EF4444','#7C3AED','#0EA5E9','#D946EF','#84CC16','#F43F5E','#0891B2'][i%16]), borderRadius:6 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, ticks:{ stepSize:1 } } } } });

  const es = { 'Pendente':0, 'Em andamento':0, 'Concluído':0, 'Vencido':0 };
  const today = new Date().toISOString().split('T')[0];
  state.compromisos.forEach(c => {
    if(c.estado==='completado') es['Concluído']++;
    else if(c.fechaLimite<today) es['Vencido']++;
    else if(c.estado==='en-progreso') es['Em andamento']++;
    else es['Pendente']++;
  });
  const c2 = document.getElementById('chart-estado'); if(c2._chart) c2._chart.destroy();
  c2._chart = new Chart(c2, { type:'doughnut', data:{ labels:Object.keys(es), datasets:[{ data:Object.values(es), backgroundColor:['#64789A','#FBBF24','#25D366','#F87171'], borderWidth:0 }] }, options:{ responsive:true, cutout:'65%', plugins:{ legend:{ position:'bottom', labels:{ boxWidth:12, padding:15 } } } } });
}

// ===== AGENDA =====
function renderAgenda(){
  const today = new Date();
  const s = new Date(today); s.setDate(today.getDate()-today.getDay()+1+(state.currentWeekOffset*7));
  const days = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const grid = document.getElementById('agenda-grid'); grid.innerHTML = '';
  for(let i=0;i<7;i++){
    const day = new Date(s); day.setDate(s.getDate()+i);
    const ds = day.toISOString().split('T')[0];
    const isToday = ds === today.toISOString().split('T')[0];
    const evs = state.eventos.filter(e => e.fecha === ds);
    grid.innerHTML += `<div class="card ${isToday?'border-[#25D366] ring-1 ring-[#25D366]':''}" style="min-height:140px;padding:12px">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold ${isToday?'text-[#25D366]':'text-[#64789A]'}">${days[i]}</span>
        <span class="text-sm font-bold ${isToday?'bg-[#25D366] text-[#04240f] w-6 h-6 rounded-full flex items-center justify-center text-xs':'text-[#EAF2FF]'}">${day.getDate()}</span>
      </div>
      <div class="space-y-1">
        ${evs.map(e => {
          const a = getAllAreas().find(x => x.id === e.area) || { color:'#6B7280' };
          return `<div class="text-xs p-1.5 rounded border-l-2 cursor-pointer hover:bg-[#1D2E4A]" style="border-color:${a.color}" onclick="editEvento('${e.id}')">
            <p class="font-medium text-[#C7D6EE] truncate">${e.titulo}</p>
            <p class="text-[#64789A]">${e.hora}</p>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }
  const e2 = new Date(s); e2.setDate(s.getDate()+6);
  document.getElementById('week-label').textContent = `${formatDateShort(s.toISOString().split('T')[0])} – ${formatDateShort(e2.toISOString().split('T')[0])}`;

  const lista = document.getElementById('agenda-lista');
  const allE = [...state.eventos].sort((a,b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
  lista.innerHTML = allE.map(e => {
    const a = getAllAreas().find(x => x.id === e.area) || { icon:'📌', color:'#6B7280', nombre:e.area };
    const past = e.fecha < today.toISOString().split('T')[0];
    return `<div class="flex items-center gap-4 p-3 rounded-lg border border-[#24344F] hover:bg-[#1D2E4A] ${past?'opacity-50':''}">
      <div class="text-center min-w-[50px]">
        <div class="text-lg font-bold text-[#EAF2FF]">${new Date(e.fecha+'T12:00:00').getDate()}</div>
        <div class="text-xs text-[#64789A]">${formatDateShort(e.fecha)}</div>
      </div>
      <div class="w-1 h-10 rounded-full" style="background:${a.color}"></div>
      <div class="flex-1">
        <p class="text-sm font-medium text-[#EAF2FF]">${e.titulo}</p>
        <p class="text-xs text-[#64789A]">${e.hora} · ${a.nombre||e.area} · ${e.tipo}</p>
      </div>
      <div class="flex gap-1">
        <button onclick="editEvento('${e.id}')" class="p-1 btn-ghost rounded"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
        <button onclick="deleteEvento('${e.id}')" class="p-1 hover:bg-red-900/30 rounded text-[#64789A] hover:text-[#F87171]"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
      </div>
    </div>`;
  }).join('');
}
function changeWeek(d){ state.currentWeekOffset += d; renderAgenda() }

// ===== REUNIÕES =====
function renderReuniones(filter){
  const c = document.getElementById('reuniones-lista');
  let rs = [...state.reuniones].sort((a,b) => b.fecha.localeCompare(a.fecha));
  if(filter==='frecuentes') rs = rs.filter(r => r.tipo==='frecuente');
  if(filter==='ocasionales') rs = rs.filter(r => r.tipo==='ocasional');
  c.innerHTML = rs.map(r => {
    const tA = r.acuerdos.length, cA = r.acuerdos.filter(a => a.estado==='completado').length;
    const prog = tA>0 ? Math.round(cA/tA*100) : 0;
    return `<div class="card">
      <div class="flex items-start justify-between mb-3">
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-[#EAF2FF]">${r.titulo}</h4>
            <span class="badge ${r.tipo==='frecuente'?'bg-[#38BDF8]/20 text-[#38BDF8]':'bg-[#64789A]/20 text-[#9FB3D1]'}">${r.tipo}</span>
          </div>
          <p class="text-xs text-[#64789A] mt-1">${formatDateLong(r.fecha)} · ${r.hora} · ${r.duracion}</p>
        </div>
        <div class="flex gap-1">
          <button onclick="editReunion('${r.id}')" class="p-1.5 btn-ghost rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
          <button onclick="deleteReunion('${r.id}')" class="p-1.5 hover:bg-red-900/30 rounded-lg text-[#64789A] hover:text-[#F87171]"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
        </div>
      </div>
      <div class="flex flex-wrap gap-1 mb-3">
        ${r.participantes.map(p => `<span class="text-xs bg-[#1D2E4A] text-[#9FB3D1] px-2 py-0.5 rounded-full">${p}</span>`).join('')}
      </div>
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-[#9FB3D1]">Acordos: ${cA}/${tA}</span>
          <span class="text-xs font-semibold ${prog===100?'text-[#25D366]':'text-[#FBBF24]'}">${prog}%</span>
        </div>
        <div class="w-full bg-[#1D2E4A] rounded-full h-1.5"><div class="h-1.5 rounded-full transition-all ${prog===100?'bg-[#25D366]':'bg-[#FBBF24]'}" style="width:${prog}%"></div></div>
      </div>
      <div class="space-y-2">
        ${r.acuerdos.map(a => {
          const v = a.fechaLimite < new Date().toISOString().split('T')[0] && a.estado !== 'completado';
          return `<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1D2E4A] transition ${v?'bg-[#F87171]/10':''}">
            <button onclick="toggleAcuerdo('${r.id}','${a.id}')" class="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${a.estado==='completado'?'bg-[#25D366] border-[#25D366]':'border-[#64789A] hover:border-[#25D366]'}">
              ${a.estado==='completado'?'<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}
            </button>
            <div class="flex-1 min-w-0">
              <p class="text-sm ${a.estado==='completado'?'line-through text-[#64789A]':'text-[#C7D6EE]'}">${a.texto}</p>
              <p class="text-xs text-[#64789A]">${a.responsable} · ${v?'⚠️ Vencido':formatDateShort(a.fechaLimite)}</p>
            </div>
            <span class="badge ${a.prioridad==='urgente'?'bg-[#F87171]/20 text-[#F87171]':a.prioridad==='alta'?'bg-[#FBBF24]/20 text-[#FBBF24]':a.prioridad==='media'?'bg-[#38BDF8]/20 text-[#38BDF8]':'bg-[#25D366]/20 text-[#25D366]'}">${a.prioridad}</span>
          </div>`;
        }).join('')}
      </div>
      ${r.notas?`<div class="mt-3 p-2 bg-[#1D2E4A] rounded-lg"><p class="text-xs text-[#9FB3D1]"><strong>Notas:</strong> ${r.notas}</p></div>`:''}
      <button onclick="addAcuerdoToReunion('${r.id}')" class="mt-3 text-xs text-[#25D366] font-semibold hover:underline">+ Adicionar acordo</button>
    </div>`;
  }).join('');
}
function filterReuniones(f, btn){ document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active')); btn.classList.add('tab-active'); renderReuniones(f==='todas'?null:f) }
function toggleAcuerdo(rid, aid){ const r = state.reuniones.find(x => x.id===rid); const a = r.acuerdos.find(x => x.id===aid); a.estado = a.estado==='completado'?'pendiente':'completado'; saveState(); renderReuniones() }
function addAcuerdoToReunion(rid){
  const r = state.reuniones.find(x => x.id===rid);
  const texto = prompt('Descrição do acordo:'); if(!texto) return;
  const responsable = prompt('Responsável:') || 'Não atribuído';
  const fechaLimite = prompt('Prazo (AAAA-MM-DD):', new Date(Date.now()+7*86400000).toISOString().split('T')[0]); if(!fechaLimite) return;
  r.acuerdos.push({ id:'a'+Date.now(), texto, responsable, fechaLimite, estado:'pendiente', prioridad:'media' });
  saveState(); renderReuniones();
}

// ===== COMPROMISSOS =====
function renderCompromisos(){
  const eF = document.getElementById('filtro-compromiso-estado').value;
  const pF = document.getElementById('filtro-compromiso-prioridad').value;
  const aF = document.getElementById('filtro-compromiso-area').value;
  const sel = document.getElementById('filtro-compromiso-area');
  if(sel.options.length <= 1) getAllAreas().forEach(a => { const o = document.createElement('option'); o.value = a.id; o.textContent = a.nombre; sel.appendChild(o) });

  let items = [...state.compromisos];
  const today = new Date().toISOString().split('T')[0];
  items.forEach(c => { if(c.estado!=='completado' && c.fechaLimite<today) c._vencido = true });
  if(eF!=='todos'){ if(eF==='vencido') items = items.filter(c => c._vencido); else items = items.filter(c => c.estado===eF) }
  if(pF!=='todas') items = items.filter(c => c.prioridad===pF);
  if(aF!=='todas') items = items.filter(c => c.area===aF);
  items.sort((a,b) => { const p = {urgente:0,alta:1,media:2,baja:3}; if(p[a.prioridad]!==p[b.prioridad]) return p[a.prioridad]-p[b.prioridad]; return a.fechaLimite.localeCompare(b.fechaLimite) });

  const c = document.getElementById('compromisos-lista');
  if(items.length === 0){ c.innerHTML = '<p class="text-sm text-[#64789A] text-center py-8">Nenhum compromisso com esses filtros</p>'; return }

  const eL = { 'pendiente':'Pendente', 'en-progreso':'Em andamento', 'completado':'Concluído' };
  const eC = { 'pendiente':'bg-[#64789A]/20 text-[#9FB3D1]', 'en-progreso':'bg-[#38BDF8]/20 text-[#38BDF8]', 'completado':'bg-[#25D366]/20 text-[#25D366]' };
  c.innerHTML = items.map(it => {
    const a = getAllAreas().find(x => x.id===it.area) || { icon:'📌', color:'#6B7280', nombre:it.area };
    return `<div class="card priority-${it.prioridad}" style="padding:16px">
      <div class="flex items-start gap-3">
        <button onclick="toggleCompromisoEstado('${it.id}')" class="mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${it.estado==='completado'?'bg-[#25D366] border-[#25D366]':'border-[#64789A] hover:border-[#25D366]'}">
          ${it.estado==='completado'?'<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}
        </button>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h4 class="text-sm font-semibold text-[#EAF2FF] ${it.estado==='completado'?'line-through opacity-50':''}">${it.titulo}</h4>
            ${it.delegada?'<span class="badge bg-[#A78BFA]/20 text-[#A78BFA]">Delegado</span>':''}
            ${it._vencido?'<span class="badge bg-[#F87171]/20 text-[#F87171]">Vencido</span>':''}
          </div>
          <div class="flex items-center gap-3 mt-1.5 flex-wrap">
            <span class="text-xs text-[#64789A] flex items-center gap-1"><span style="color:${a.color}">${a.icon}</span> ${a.nombre}</span>
            <span class="text-xs text-[#64789A]">👤 ${it.responsable}</span>
            <span class="text-xs text-[#64789A]">📅 ${formatDateShort(it.fechaLimite)}</span>
            <span class="text-xs text-[#64789A]">📎 ${it.origen}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="badge ${eC[it.estado]}">${eL[it.estado]}</span>
          <div class="flex gap-0.5">
            <button onclick="editCompromiso('${it.id}')" class="p-1 btn-ghost rounded"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
            <button onclick="deleteCompromiso('${it.id}')" class="p-1 hover:bg-red-900/30 rounded text-[#64789A] hover:text-[#F87171]"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}
function toggleCompromisoEstado(id){
  const c = state.compromisos.find(x => x.id===id);
  if(c.estado==='completado') c.estado='pendiente';
  else if(c.estado==='pendiente') c.estado='en-progreso';
  else c.estado='completado';
  saveState(); renderCompromisos();
}

// ===== ÁREA GRIDS =====
function renderAreaGrid(type){
  const c = document.getElementById(type+'-grid');
  const today = new Date().toISOString().split('T')[0];
  c.innerHTML = AREAS[type].map(area => {
    const comps = state.compromisos.filter(x => x.area===area.id);
    const pends = comps.filter(x => x.estado!=='completado').length;
    const vencs = comps.filter(x => x.estado!=='completado' && x.fechaLimite<today).length;
    const delgs = comps.filter(x => x.delegada && x.estado!=='completado').length;
    const evs = state.eventos.filter(x => x.area===area.id).length;
    return `<div class="card">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style="background:${area.color}15">${area.icon}</div>
        <div>
          <h4 class="font-bold text-[#EAF2FF] text-sm">${area.nombre}</h4>
          <p class="text-xs text-[#64789A]">${comps.length} compromissos totais</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div class="bg-[#1D2E4A] rounded-lg p-2 text-center"><p class="text-lg font-bold text-[#EAF2FF]">${pends}</p><p class="text-xs text-[#64789A]">Pendentes</p></div>
        <div class="bg-[#1D2E4A] rounded-lg p-2 text-center"><p class="text-lg font-bold ${vencs>0?'text-[#F87171]':'text-[#25D366]'}">${vencs}</p><p class="text-xs text-[#64789A]">Vencidos</p></div>
        <div class="bg-[#1D2E4A] rounded-lg p-2 text-center"><p class="text-lg font-bold text-[#A78BFA]">${delgs}</p><p class="text-xs text-[#64789A]">Delegados</p></div>
        <div class="bg-[#1D2E4A] rounded-lg p-2 text-center"><p class="text-lg font-bold text-[#38BDF8]">${evs}</p><p class="text-xs text-[#64789A]">Eventos</p></div>
      </div>
      <div class="space-y-1.5">
        ${comps.filter(x => x.estado!=='completado').slice(0,3).map(x => `
          <div class="flex items-center gap-2 text-xs p-1.5 rounded hover:bg-[#1D2E4A]">
            <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:${x.prioridad==='urgente'?'#F87171':x.prioridad==='alta'?'#FBBF24':'#38BDF8'}"></div>
            <span class="text-[#C7D6EE] truncate">${x.titulo}</span>
          </div>
        `).join('')}
        ${pends>3?`<p class="text-xs text-[#25D366] font-semibold cursor-pointer hover:underline" onclick="document.getElementById('filtro-compromiso-area').value='${area.id}';showSection('compromisos',null);renderCompromisos()">Ver todos →</p>`:''}
      </div>
    </div>`;
  }).join('');
}

// ===== DELEGAÇÕES =====
function renderDelegaciones(){
  const c = document.getElementById('delegaciones-lista');
  const today = new Date().toISOString().split('T')[0];
  if(state.delegaciones.length===0){ c.innerHTML='<p class="text-sm text-[#64789A] text-center py-8">Nenhuma delegação registrada</p>'; return }
  c.innerHTML = state.delegaciones.map(d => {
    const v = d.fechaLimite<today && d.estado!=='completado';
    const dr = Math.ceil((new Date(d.fechaLimite)-new Date(today))/86400000);
    return `<div class="card ${v?'border-[#F87171] bg-[#F87171]/5':''}" style="padding:16px">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 bg-[#A78BFA]/15 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-[#A78BFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div class="flex-1">
          <h4 class="text-sm font-semibold text-[#EAF2FF]">${d.tarea}</h4>
          <div class="flex items-center gap-3 mt-1 flex-wrap">
            <span class="text-xs text-[#64789A]">👤 Delegado a: <strong class="text-[#C7D6EE]">${d.delegadoA}</strong></span>
            <span class="text-xs text-[#64789A]">📅 Delegado: ${formatDateShort(d.fechaDelegacion)}</span>
            <span class="text-xs ${v?'text-[#F87171] font-semibold':'text-[#64789A]'}">⏰ Prazo: ${formatDateShort(d.fechaLimite)} ${v?'(VENCIDO)':dr<=3?`(${dr}d)`:''}</span>
          </div>
          ${d.notas?`<p class="text-xs text-[#64789A] mt-1">📝 ${d.notas}</p>`:''}
        </div>
        <div class="flex items-center gap-2">
          <select onchange="updateDelegacionEstado('${d.id}', this.value)" class="text-xs dark-input rounded-lg px-2 py-1">
            <option value="pendiente" ${d.estado==='pendiente'?'selected':''}>Pendente</option>
            <option value="en-progreso" ${d.estado==='en-progreso'?'selected':''}>Em andamento</option>
            <option value="completado" ${d.estado==='completado'?'selected':''}>Concluído</option>
          </select>
          <button onclick="deleteDelegacion('${d.id}')" class="p-1 hover:bg-red-900/30 rounded text-[#64789A] hover:text-[#F87171]"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
        </div>
      </div>
    </div>`;
  }).join('');
}
function updateDelegacionEstado(id, e){ state.delegaciones.find(x => x.id===id).estado = e; saveState(); renderDelegaciones() }
function deleteDelegacion(id){ if(!confirm('Excluir esta delegação?')) return; state.delegaciones = state.delegaciones.filter(x => x.id!==id); saveState(); renderDelegaciones() }

// ===== RELATÓRIOS =====
function renderReportes(){
  const today = new Date();
  const s = new Date(today); s.setDate(today.getDate()-today.getDay()+1);
  const e = new Date(s); e.setDate(s.getDate()+6);
  const ws = s.toISOString().split('T')[0], we = e.toISOString().split('T')[0];
  const cs = state.compromisos.filter(c => c.estado==='completado').length;
  const ds = state.delegaciones.filter(d => d.estado!=='completado').length;
  document.getElementById('reporte-semanal').innerHTML = `
    <div class="flex items-center justify-between p-3 bg-[#1D2E4A] rounded-lg"><span class="text-sm text-[#C7D6EE]">Reuniões programadas</span><span class="text-lg font-bold text-[#EAF2FF]">${state.reuniones.length}</span></div>
    <div class="flex items-center justify-between p-3 bg-[#1D2E4A] rounded-lg"><span class="text-sm text-[#C7D6EE]">Compromissos ativos</span><span class="text-lg font-bold text-[#EAF2FF]">${state.compromisos.filter(c=>c.estado!=='completado').length}</span></div>
    <div class="flex items-center justify-between p-3 bg-[#1D2E4A] rounded-lg"><span class="text-sm text-[#C7D6EE]">Concluídos</span><span class="text-lg font-bold text-[#25D366]">${cs}</span></div>
    <div class="flex items-center justify-between p-3 bg-[#1D2E4A] rounded-lg"><span class="text-sm text-[#C7D6EE]">Delegações ativas</span><span class="text-lg font-bold text-[#A78BFA]">${ds}</span></div>
    <div class="flex items-center justify-between p-3 bg-[#1D2E4A] rounded-lg"><span class="text-sm text-[#C7D6EE]">Eventos esta semana</span><span class="text-lg font-bold text-[#38BDF8]">${state.eventos.filter(x=>x.fecha>=ws&&x.fecha<=we).length}</span></div>
  `;

  const c3 = document.getElementById('chart-tiempo'); if(c3._chart) c3._chart.destroy();
  c3._chart = new Chart(c3, { type:'pie', data:{ labels:['Reuniões','Acompanhamento de delegações','Gestão própria'], datasets:[{ data:[state.reuniones.length, state.compromisos.filter(c=>c.delegada).length, state.compromisos.filter(c=>!c.delegada).length], backgroundColor:['#38BDF8','#A78BFA','#25D366'], borderWidth:0 }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } } });

  const c4 = document.getElementById('chart-detalle'); if(c4._chart) c4._chart.destroy();
  const allA = getAllAreas();
  const labs = allA.map(a => a.nombre);
  const dP = allA.map(a => state.compromisos.filter(c => c.area===a.id && c.estado!=='completado').length);
  const dC = allA.map(a => state.compromisos.filter(c => c.area===a.id && c.estado==='completado').length);
  c4._chart = new Chart(c4, { type:'bar', data:{ labels:labs, datasets:[{ label:'Pendentes', data:dP, backgroundColor:'#FBBF24', borderRadius:4 },{ label:'Concluídos', data:dC, backgroundColor:'#25D366', borderRadius:4 }] }, options:{ responsive:true, scales:{ x:{ stacked:true }, y:{ stacked:true, beginAtZero:true, ticks:{ stepSize:1 } } }, plugins:{ legend:{ position:'bottom' } } } });
}

// ===== INTEGRAÇÕES =====
function renderIntegracoes(){
  if(typeof INTEGRATIONS==='undefined') return;
  const its = [
    { n:'SUPABASE · Banco de dados', d:'Clientes, projetos e compromissos reais.', f:'dbSalvar', l:10 },
    { n:'SUPABASE AUTH · Login', d:'Só você entra no painel.', f:'authLogin', l:16 },
    { n:'MCP · Agente de IA', d:'Hermes consulta seu banco pelo Telegram.', f:'iaConsultar', l:22 },
    { n:'WHATSAPP · Follow-up', d:'Mensagens automáticas de prazo.', f:'whatsNotificar', l:28 },
    { n:'EMAIL · Propostas', d:'Propostas e relatórios por e-mail.', f:'emailEnviar', l:34 },
    { n:'CRON · Rotinas', d:'Verifica vencimentos todo dia às 8h.', f:'cronVencimentos', l:40 }
  ];
  document.getElementById('grid-int').innerHTML = its.map(i => `<div class="card">
    <h4 class="text-sm font-semibold text-[#EAF2FF] mb-1 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#F87171] shadow-[0_0_10px_rgba(248,113,113,.6)]"></span>${i.n}</h4>
    <p class="text-xs text-[#64789A] mb-3">${i.d}</p>
    <button class="w-full btn-ghost py-2 rounded-lg text-xs font-semibold hover:border-[#25D366] hover:text-[#25D366]" onclick="${i.f}('teste','teste');alert('Offline agora → ative na linha ${i.l} do integrations.js')">Testar · linha ${i.l}</button>
  </div>`).join('');
}

// ===== MODAIS =====
function openModal(type, editId){
  const modal = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  modal.classList.remove('hidden');

  if(type==='reunion'){
    const r = editId ? state.reuniones.find(x => x.id===editId) : null;
    title.textContent = r?'Editar Reunião':'Nova Reunião';
    body.innerHTML = `<form onsubmit="saveReunion(event,'${editId||''}')" class="space-y-4">
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Título</label><input type="text" id="m-titulo" value="${r?r.titulo:''}" required class="w-full dark-input rounded-lg px-3 py-2"></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Tipo</label><select id="m-tipo" class="w-full dark-input rounded-lg px-3 py-2"><option value="frecuente" ${r&&r.tipo==='frecuente'?'selected':''}>Frequente</option><option value="ocasional" ${r&&r.tipo==='ocasional'?'selected':''}>Ocasional</option></select></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Data</label><input type="date" id="m-fecha" value="${r?r.fecha:new Date().toISOString().split('T')[0]}" required class="w-full dark-input rounded-lg px-3 py-2"></div></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Hora</label><input type="text" id="m-hora" value="${r?r.hora:'9:00'}" placeholder="9:00" class="w-full dark-input rounded-lg px-3 py-2"></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Duração</label><input type="text" id="m-duracion" value="${r?r.duracion:'1h'}" placeholder="1h" class="w-full dark-input rounded-lg px-3 py-2"></div></div>
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Participantes (separados por vírgula)</label><input type="text" id="m-participantes" value="${r?r.participantes.join(', '):''}" class="w-full dark-input rounded-lg px-3 py-2"></div>
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Notas</label><textarea id="m-notas" rows="2" class="w-full dark-input rounded-lg px-3 py-2">${r?r.notas:''}</textarea></div>
      <button type="submit" class="w-full btn-verde py-2.5 rounded-lg font-semibold">Salvar Reunião</button>
    </form>`;
  } else if(type==='compromiso'){
    const c = editId ? state.compromisos.find(x => x.id===editId) : null;
    title.textContent = c?'Editar Compromisso':'Novo Compromisso';
    body.innerHTML = `<form onsubmit="saveCompromiso(event,'${editId||''}')" class="space-y-4">
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Título do compromisso</label><input type="text" id="mc-titulo" value="${c?c.titulo:''}" required class="w-full dark-input rounded-lg px-3 py-2"></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Área</label><select id="mc-area" class="w-full dark-input rounded-lg px-3 py-2"><optgroup label="Linhas de Serviço">${AREAS.programas.map(a=>`<option value="${a.id}" ${c&&c.area===a.id?'selected':''}>${a.nombre}</option>`).join('')}</optgroup><optgroup label="Processos Internos">${AREAS.procesos.map(a=>`<option value="${a.id}" ${c&&c.area===a.id?'selected':''}>${a.nombre}</option>`).join('')}</optgroup><optgroup label="Iniciativas">${AREAS.iniciativas.map(a=>`<option value="${a.id}" ${c&&c.area===a.id?'selected':''}>${a.nombre}</option>`).join('')}</optgroup></select></div>
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Prioridade</label><select id="mc-prioridad" class="w-full dark-input rounded-lg px-3 py-2"><option value="urgente" ${c&&c.prioridad==='urgente'?'selected':''}>🔴 Urgente</option><option value="alta" ${c&&c.prioridad==='alta'?'selected':''}>🟠 Alta</option><option value="media" ${!c||c.prioridad==='media'?'selected':''}>🔵 Média</option><option value="baja" ${c&&c.prioridad==='baja'?'selected':''}>🟢 Baixa</option></select></div></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Responsável</label><input type="text" id="mc-responsable" value="${c?c.responsable:''}" required class="w-full dark-input rounded-lg px-3 py-2"></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Prazo</label><input type="date" id="mc-fechalimite" value="${c?c.fechaLimite:new Date(Date.now()+7*86400000).toISOString().split('T')[0]}" required class="w-full dark-input rounded-lg px-3 py-2"></div></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Origem</label><input type="text" id="mc-origen" value="${c?c.origen:''}" placeholder="Ex: Reunião com cliente" class="w-full dark-input rounded-lg px-3 py-2"></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Estado</label><select id="mc-estado" class="w-full dark-input rounded-lg px-3 py-2"><option value="pendiente" ${!c||c.estado==='pendiente'?'selected':''}>Pendente</option><option value="en-progreso" ${c&&c.estado==='en-progreso'?'selected':''}>Em andamento</option><option value="completado" ${c&&c.estado==='completado'?'selected':''}>Concluído</option></select></div></div>
      <div class="flex items-center gap-2"><input type="checkbox" id="mc-delegada" ${c&&c.delegada?'checked':''} class="rounded"><label for="mc-delegada" class="text-xs text-[#9FB3D1]">Este compromisso foi delegado</label></div>
      <button type="submit" class="w-full btn-verde py-2.5 rounded-lg font-semibold">Salvar Compromisso</button>
    </form>`;
  } else if(type==='evento'){
    const e = editId ? state.eventos.find(x => x.id===editId) : null;
    title.textContent = e?'Editar Evento':'Novo Evento';
    body.innerHTML = `<form onsubmit="saveEvento(event,'${editId||''}')" class="space-y-4">
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Título</label><input type="text" id="me-titulo" value="${e?e.titulo:''}" required class="w-full dark-input rounded-lg px-3 py-2"></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Tipo</label><select id="me-tipo" class="w-full dark-input rounded-lg px-3 py-2"><option value="reunion" ${e&&e.tipo==='reunion'?'selected':''}>Reunião</option><option value="externa" ${e&&e.tipo==='externa'?'selected':''}>Reunião externa</option><option value="campo" ${e&&e.tipo==='campo'?'selected':''}>Visita de campo</option><option value="personal" ${e&&e.tipo==='personal'?'selected':''}>Gestão pessoal</option></select></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Área</label><select id="me-area" class="w-full dark-input rounded-lg px-3 py-2"><option value="direccion" ${e&&e.area==='direccion'?'selected':''}>Direção</option>${getAllAreas().map(a=>`<option value="${a.id}" ${e&&e.area===a.id?'selected':''}>${a.nombre}</option>`).join('')}</select></div></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Data</label><input type="date" id="me-fecha" value="${e?e.fecha:new Date().toISOString().split('T')[0]}" required class="w-full dark-input rounded-lg px-3 py-2"></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Hora</label><input type="text" id="me-hora" value="${e?e.hora:'9:00'}" class="w-full dark-input rounded-lg px-3 py-2"></div></div>
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Notas</label><textarea id="me-notas" rows="2" class="w-full dark-input rounded-lg px-3 py-2">${e?e.notas:''}</textarea></div>
      <button type="submit" class="w-full btn-verde py-2.5 rounded-lg font-semibold">Salvar Evento</button>
    </form>`;
  } else {
    title.textContent = 'Nova Delegação';
    body.innerHTML = `<form onsubmit="saveDelegacion(event)" class="space-y-4">
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Tarefa a delegar</label><input type="text" id="md-tarea" required class="w-full dark-input rounded-lg px-3 py-2"></div>
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Delegar para</label><input type="text" id="md-delegado" required placeholder="Nome do responsável" class="w-full dark-input rounded-lg px-3 py-2"></div>
      <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Prazo</label><input type="date" id="md-fechalimite" value="${new Date(Date.now()+7*86400000).toISOString().split('T')[0]}" required class="w-full dark-input rounded-lg px-3 py-2"></div><div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Estado inicial</label><select id="md-estado" class="w-full dark-input rounded-lg px-3 py-2"><option value="pendiente">Pendente</option><option value="en-progreso">Em andamento</option></select></div></div>
      <div><label class="text-xs font-semibold text-[#9FB3D1] mb-1 block">Notas / Instruções</label><textarea id="md-notas" rows="2" class="w-full dark-input rounded-lg px-3 py-2"></textarea></div>
      <button type="submit" class="w-full btn-verde py-2.5 rounded-lg font-semibold">Criar Delegação</button>
    </form>`;
  }
}
function closeModal(){ document.getElementById('modal-overlay').classList.add('hidden') }

// ===== SAVE =====
function saveReunion(e, editId){ e.preventDefault(); const d = { titulo:document.getElementById('m-titulo').value, tipo:document.getElementById('m-tipo').value, fecha:document.getElementById('m-fecha').value, hora:document.getElementById('m-hora').value, duracion:document.getElementById('m-duracion').value, participantes:document.getElementById('m-participantes').value.split(',').map(s=>s.trim()).filter(Boolean), notas:document.getElementById('m-notas').value }; if(editId){ Object.assign(state.reuniones.find(x=>x.id===editId), d) } else { d.id='r'+Date.now(); d.acuerdos=[]; state.reuniones.push(d) } saveState(); closeModal(); renderReuniones() }
function saveCompromiso(e, editId){ e.preventDefault(); const d = { titulo:document.getElementById('mc-titulo').value, area:document.getElementById('mc-area').value, prioridad:document.getElementById('mc-prioridad').value, responsable:document.getElementById('mc-responsable').value, fechaLimite:document.getElementById('mc-fechalimite').value, origen:document.getElementById('mc-origen').value, estado:document.getElementById('mc-estado').value, delegada:document.getElementById('mc-delegada').checked }; if(editId){ Object.assign(state.compromisos.find(x=>x.id===editId), d) } else { d.id='c'+Date.now(); d.fechaCreacion=new Date().toISOString().split('T')[0]; state.compromisos.push(d) } saveState(); closeModal(); renderCompromisos() }
function saveEvento(e, editId){ e.preventDefault(); const d = { titulo:document.getElementById('me-titulo').value, tipo:document.getElementById('me-tipo').value, area:document.getElementById('me-area').value, fecha:document.getElementById('me-fecha').value, hora:document.getElementById('me-hora').value, notas:document.getElementById('me-notas').value }; if(editId){ Object.assign(state.eventos.find(x=>x.id===editId), d) } else { d.id='e'+Date.now(); state.eventos.push(d) } saveState(); closeModal(); renderAgenda() }
function saveDelegacion(e){ e.preventDefault(); state.delegaciones.push({ id:'d'+Date.now(), tarea:document.getElementById('md-tarea').value, delegadoA:document.getElementById('md-delegado').value, fechaDelegacion:new Date().toISOString().split('T')[0], fechaLimite:document.getElementById('md-fechalimite').value, estado:document.getElementById('md-estado').value, notas:document.getElementById('md-notas').value }); saveState(); closeModal(); renderDelegaciones() }

// ===== EDIT / DELETE =====
function editReunion(id){ openModal('reunion', id) }
function editCompromiso(id){ openModal('compromiso', id) }
function editEvento(id){ openModal('evento', id) }
function deleteReunion(id){ if(!confirm('Excluir esta reunião e seus acordos?')) return; state.reuniones = state.reuniones.filter(x => x.id!==id); saveState(); renderReuniones() }
function deleteCompromiso(id){ if(!confirm('Excluir este compromisso?')) return; state.compromisos = state.compromisos.filter(x => x.id!==id); saveState(); renderCompromisos() }
function deleteEvento(id){ if(!confirm('Excluir este evento?')) return; state.eventos = state.eventos.filter(x => x.id!==id); saveState(); renderAgenda() }

// ===== ATALHO ＋ NOVO =====
function openQuickAdd(){ const c = prompt('O que deseja criar?\n1 - Reunião\n2 - Compromisso\n3 - Evento\n4 - Delegação'); if(c==='1') openModal('reunion'); else if(c==='2') openModal('compromiso'); else if(c==='3') openModal('evento'); else if(c==='4') openModal('delegacion') }

// ===== NOTIFICAÇÕES =====
function toggleNotifications(){ const p = document.getElementById('notif-panel'); p.classList.toggle('hidden'); if(!p.classList.contains('hidden')) renderNotifications() }
function renderNotifications(){
  const today = new Date().toISOString().split('T')[0];
  const n = [];
  state.compromisos.filter(c => c.estado!=='completado' && c.fechaLimite<today).forEach(c => n.push({ t:'danger', text:`⚠️ Vencido: ${c.titulo}`, sub:`Responsável: ${c.responsable}` }));
  const in3 = new Date(); in3.setDate(in3.getDate()+3);
  state.compromisos.filter(c => c.estado!=='completado' && c.fechaLimite>=today && c.fechaLimite<=in3.toISOString().split('T')[0]).forEach(c => n.push({ t:'warning', text:`⏰ Próximo a vencer: ${c.titulo}`, sub:`Prazo: ${formatDateShort(c.fechaLimite)}` }));
  state.eventos.filter(e => e.fecha===today).forEach(e => n.push({ t:'info', text:`📅 Hoje: ${e.titulo}`, sub:e.hora }));

  const c = document.getElementById('notif-list');
  if(n.length === 0) c.innerHTML = '<p class="text-sm text-[#64789A] text-center py-4">Tudo em dia ✨</p>';
  else c.innerHTML = n.map(x => {
    const bg = x.t==='danger'?'bg-[#F87171]/15':x.t==='warning'?'bg-[#FBBF24]/15':'bg-[#38BDF8]/15';
    return `<div class="p-2.5 rounded-lg ${bg} mb-1.5"><p class="text-xs font-medium text-[#EAF2FF]">${x.text}</p><p class="text-xs text-[#64789A]">${x.sub}</p></div>`;
  }).join('');

  document.getElementById('notif-badge').textContent = n.length;
  document.getElementById('notif-badge').classList.toggle('hidden', n.length===0);
}

// ===== UTILIDADES =====
function formatDateShort(ds){ const d = new Date(ds+'T12:00:00'); const m = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']; return `${d.getDate()} ${m[d.getMonth()]}` }
function formatDateLong(ds){ const d = new Date(ds+'T12:00:00'); const dd = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado']; const mm = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; return `${dd[d.getDay()]}, ${d.getDate()} de ${mm[d.getMonth()]}` }

// ===== INIT =====
function init(){
  loadState();
  const now = new Date();
  const dd = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  const mm = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  document.getElementById('current-date').textContent = `${dd[now.getDay()]}, ${now.getDate()} de ${mm[now.getMonth()]}`;
  renderDashboard(); renderNotifications();

  document.addEventListener('click', (e) => {
    const p = document.getElementById('notif-panel');
    if(!p.classList.contains('hidden') && !e.target.closest('#notif-panel') && !e.target.closest('[onclick*="toggleNotifications"]')) p.classList.add('hidden');
  });
  document.getElementById('modal-overlay').addEventListener('click', (e) => { if(e.target===document.getElementById('modal-overlay')) closeModal() });
}
init();
