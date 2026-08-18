// ===== SPGD · LÓGICA DO PAINEL (PT-BR · dados começam LIMPOS) =====
Chart.defaults.color = '#9FB3D1';
Chart.defaults.borderColor = '#24344F';

// ===== ÁREAS DA SIDMARKTING =====
const AREAS = {
  programas: [
    {id:'sites', nome:'Sites Profissionais', icon:'🌐', color:'#25D366'},
    {id:'ecommerce', nome:'E-commerce', icon:'🛒', color:'#38BDF8'},
    {id:'landing', nome:'Landing Pages', icon:'🚀', color:'#FBBF24'},
    {id:'automacao', nome:'Automação & IA', icon:'🤖', color:'#A78BFA'},
    {id:'manutencao', nome:'Manutenção', icon:'🔧', color:'#F97316'}
  ],
  processos: [
    {id:'comercial', nome:'Comercial', icon:'💼', color:'#3B82F6'},
    {id:'financeiro', nome:'Financeiro', icon:'💰', color:'#22C55E'},
    {id:'planejamento', nome:'Planejamento', icon:'📋', color:'#14B8A6'},
    {id:'comunicacao', nome:'Comunicação', icon:'📢', color:'#F97316'},
    {id:'qualidade', nome:'Qualidade', icon:'🔍', color:'#EF4444'}
  ],
  iniciativas: [
    {id:'curso', nome:'Curso de Sites', icon:'🎓', color:'#EC4899'},
    {id:'whatsgroup', nome:'Canal Whatsgroup', icon:'📲', color:'#25D366'},
    {id:'parcerias', nome:'Parcerias', icon:'🤝', color:'#F59E0B'},
    {id:'saas', nome:'SaaS SPGD', icon:'🛸', color:'#0EA5E9'}
  ]
};
function getAllAreas(){return [...AREAS.programas, ...AREAS.processos, ...AREAS.iniciativas]}

// ===== ESTADO (localStorage · sem exemplos) =====
let state = {reunioes:[], compromissos:[], eventos:[], delegacoes:[], weekOffset:0};
function loadState(){const s = localStorage.getItem('spgd-state'); if(s) state = {...state, ...JSON.parse(s)}}
function saveState(){localStorage.setItem('spgd-state', JSON.stringify(state))}

// ===== NAVEGAÇÃO =====
function showSection(sec, btn){
  document.querySelectorAll('.sec').forEach(s=>s.classList.add('hidden'));
  document.getElementById('sec-'+sec).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('ativo'));
  if(btn) btn.classList.add('ativo');
  const T = {painel:['Painel Executivo','Visão geral da SIDMARKTING'], agenda:['Agenda','Eventos e reuniões da semana'], reunioes:['Reuniões','Atas, acordos e acompanhamento'], compromissos:['Compromissos','Tarefas, prazos e entregas'], programas:['Linhas de Serviço','O que a SIDMARKTING vende'], processos:['Processos Internos','Áreas da operação'], iniciativas:['Iniciativas','Projetos estratégicos'], delegacoes:['Delegações','Tarefas terceirizadas e acompanhamento'], relatorios:['Relatórios','Métricas de gestão'], integracoes:['Integrações','Supabase · MCP · WhatsApp · E-mail · Cron']};
  document.getElementById('sec-title').textContent = T[sec][0];
  document.getElementById('sec-subtitle').textContent = T[sec][1];
  if(sec==='painel') renderDashboard();
  if(sec==='agenda') renderAgenda();
  if(sec==='reunioes') renderReuniones();
  if(sec==='compromissos') renderCompromisos();
  if(sec==='programas') renderAreaGrid('programas');
  if(sec==='processos') renderAreaGrid('processos');
  if(sec==='iniciativas') renderAreaGrid('iniciativas');
  if(sec==='delegacoes') renderDelegacoes();
  if(sec==='relatorios') renderRelatorios();
  if(sec==='integracoes') renderIntegracoes();
}

// ===== PAINEL =====
function renderDashboard(){
  const hoje = hojeStr();
  const pend = state.compromissos.filter(c=>c.estado!=='concluido');
  const venc = pend.filter(c=>c.prazo<hoje);
  const conc = state.compromissos.filter(c=>c.estado==='concluido').length;
  const taxa = state.compromissos.length ? Math.round(conc/state.compromissos.length*100) : 0;
  document.getElementById('kpi-pendentes').textContent = pend.length;
  document.getElementById('kpi-vencidos').textContent = venc.length + ' vencidos';
  document.getElementById('kpi-reunioes').textContent = state.eventos.filter(e=>naSemana(e.data)).length;
  document.getElementById('kpi-reunioes-hoje').textContent = state.eventos.filter(e=>e.data===hoje).length + ' hoje';
  document.getElementById('kpi-delegacoes').textContent = state.delegacoes.filter(d=>d.estado!=='concluido').length;
  document.getElementById('kpi-taxa').textContent = taxa + '%';

  const prox = state.eventos.filter(e=>e.data>=hoje).sort((a,b)=>a.data.localeCompare(b.data)).slice(0,6);
  document.getElementById('dash-atividades').innerHTML = prox.length ? prox.map(e=>{
    const a = getAllAreas().find(x=>x.id===e.area) || {icon:'📌', color:'#64789A', nome:e.area};
    return `<div class="linha"><span>${a.icon} <b class="forte">${e.titulo}</b><br><small>${dataCurta(e.data)} · ${e.hora} · ${a.nome}</small></span><span class="badge b-azul">${e.tipo}</span></div>`;
  }).join('') : '<p class="vazio">Nenhuma atividade próxima — crie em ＋ Novo 🚀</p>';

  const urg = state.compromissos.filter(c=>(c.prioridade==='urgente'||c.prioridade==='alta')&&c.estado!=='concluido').sort((a,b)=>a.prazo.localeCompare(b.prazo)).slice(0,5);
  document.getElementById('dash-urgentes').innerHTML = urg.length ? urg.map(c=>{
    const v = c.prazo<hoje;
    return `<div class="linha p-${c.prioridade}"><span class="forte">${c.titulo}<br><small>${c.responsavel}</small></span><small class="${v?'t-vermelho':''}">${v?'⚠️ ':''}${dataCurta(c.prazo)}</small></div>`;
  }).join('') : '<p class="vazio">Nenhum compromisso urgente ✨</p>';

  renderCharts();
}
function renderCharts(){
  const ac = {};
  state.compromissos.filter(c=>c.estado!=='concluido').forEach(c=>{
    const a = getAllAreas().find(x=>x.id===c.area); const n = a?a.nome:c.area; ac[n]=(ac[n]||0)+1;
  });
  const c1 = document.getElementById('chart-areas'); if(c1._chart) c1._chart.destroy();
  c1._chart = new Chart(c1,{type:'bar',data:{labels:Object.keys(ac),datasets:[{data:Object.values(ac),backgroundColor:Object.keys(ac).map((_,i)=>['#25D366','#38BDF8','#FBBF24','#A78BFA','#F97316','#3B82F6','#22C55E','#14B8A6','#EF4444','#EC4899'][i%10]),borderRadius:6}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});

  const hoje = hojeStr();
  const es = {'Pendente':0,'Em andamento':0,'Concluído':0,'Vencido':0};
  state.compromissos.forEach(c=>{
    if(c.estado==='concluido') es['Concluído']++;
    else if(c.prazo<hoje) es['Vencido']++;
    else if(c.estado==='andamento') es['Em andamento']++;
    else es['Pendente']++;
  });
  const c2 = document.getElementById('chart-estado'); if(c2._chart) c2._chart.destroy();
  c2._chart = new Chart(c2,{type:'doughnut',data:{labels:Object.keys(es),datasets:[{data:Object.values(es),backgroundColor:['#64789A','#FBBF24','#25D366','#F87171'],borderWidth:0}]},options:{responsive:true,cutout:'65%',plugins:{legend:{position:'bottom',labels:{boxWidth:12}}}}});
}

// ===== AGENDA =====
function renderAgenda(){
  const hoje = hojeStr();
  const start = inicioSemana(state.weekOffset);
  const dias = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const grid = document.getElementById('agenda-grid'); grid.innerHTML = '';
  for(let i=0;i<7;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const ds = d.toISOString().split('T')[0];
    const evs = state.eventos.filter(e=>e.data===ds);
    grid.innerHTML += `<div class="dia ${ds===hoje?'hoje':''}"><div class="card-topo"><span class="dia-titulo">${dias[i]}</span><span class="dia-num">${d.getDate()}</span></div>${evs.map(e=>`<div class="ev" onclick="editEvento('${e.id}')">${e.hora} · ${e.titulo}</div>`).join('')}</div>`;
  }
  const end = new Date(start); end.setDate(start.getDate()+6);
  document.getElementById('week-label').textContent = `${dataCurta(start.toISOString().split('T')[0])} – ${dataCurta(end.toISOString().split('T')[0])}`;
  document.getElementById('agenda-lista').innerHTML = state.eventos.length ? [...state.eventos].sort((a,b)=>a.data.localeCompare(b.data)).map(e=>`<div class="linha"><span class="forte">${e.titulo}<br><small>${dataCurta(e.data)} · ${e.hora} · ${e.tipo}</small></span><span><button class="btn-ghost" onclick="editEvento('${e.id}')">✏️</button> <button class="btn-ghost" onclick="deleteEvento('${e.id}')">🗑️</button></span></div>`).join('') : '<p class="vazio">Nenhum evento ainda — crie em + Novo Evento.</p>';
}
function changeWeek(n){state.weekOffset += n; renderAgenda()}

// ===== REUNIÕES =====
function renderReuniones(filtro){
  let rs = [...state.reuniones].sort((a,b)=>b.data.localeCompare(a.data));
  if(filtro) rs = rs.filter(r=>r.tipo===filtro);
  document.getElementById('reunioes-lista').innerHTML = rs.length ? rs.map(r=>{
    const tot = r.acordos.length, conc = r.acordos.filter(a=>a.estado==='concluido').length;
    const prog = tot ? Math.round(conc/tot*100) : 0;
    return `<div class="card"><div class="card-topo"><div><h3 style="margin:0">🤝 ${r.titulo} <span class="badge ${r.tipo==='frequente'?'b-azul':'b-cinza'}">${r.tipo}</span></h3><small class="texto-suave">${dataLonga(r.data)} · ${r.hora} · ${r.duracao}</small></div><span><button class="btn-ghost" onclick="editReuniao('${r.id}')">✏️</button> <button class="btn-ghost" onclick="deleteReuniao('${r.id}')">🗑️</button></span></div>
    <p class="texto-suave" style="margin:10px 0">👥 ${r.participantes.join(', ')||'Sem participantes'}</p>
    <div style="background:var(--bg3);border-radius:99px;height:6px;margin:8px 0"><div style="width:${prog}%;height:6px;border-radius:99px;background:${prog===100?'var(--verde)':'var(--ambar)'}"></div></div><small class="texto-suave">Acordos: ${conc}/${tot} · ${prog}%</small>
    <div class="coluna" style="margin-top:10px">${r.acordos.map(a=>{const v=a.prazo<hojeStr()&&a.estado!=='concluido';return `<div class="linha p-${a.prioridade} ${v?'n-perigo':''}"><span style="flex:1"><input type="checkbox" ${a.estado==='concluido'?'checked':''} onchange="toggleAcordo('${r.id}','${a.id}')" style="width:auto;margin-right:8px">${a.estado==='concluido'?'<s>':''}${a.texto}${a.estado==='concluido'?'</s>':''}<br><small>${a.responsavel} · ${v?'⚠️ vencido':dataCurta(a.prazo)}</small></span><span class="badge ${a.prioridade==='urgente'?'b-vermelho':a.prioridade==='alta'?'b-ambar':a.prioridade==='media'?'b-azul':'b-verde'}">${a.prioridade}</span></div>`}).join('')}</div>
    <button class="link-verde" style="margin-top:10px" onclick="addAcordo('${r.id}')">+ Adicionar acordo</button></div>`;
  }).join('') : '<p class="vazio">Nenhuma reunião registrada — crie a primeira em + Nova Reunião.</p>';
}
function filterReuniones(f, btn){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('ativo')); btn.classList.add('ativo'); renderReuniones(f==='todas'?null:f)}
function toggleAcordo(rid, aid){const a = state.reuniones.find(r=>r.id===rid).acordos.find(x=>x.id===aid); a.estado = a.estado==='concluido'?'pendente':'concluido'; saveState(); renderReuniones()}
function addAcordo(rid){const t = prompt('Descrição do acordo:'); if(!t) return; const resp = prompt('Responsável:')||'Não atribuído'; const pr = prompt('Prazo (AAAA-MM-DD):', daquiDias(7)); if(!pr) return; state.reuniones.find(r=>r.id===rid).acordos.push({id:'a'+Date.now(), texto:t, responsavel:resp, prazo:pr, estado:'pendente', prioridade:'media'}); saveState(); renderReuniones()}

// ===== COMPROMISSOS =====
function renderCompromisos(){
  const fe = document.getElementById('filtro-estado').value, fp = document.getElementById('filtro-prioridade').value, fa = document.getElementById('filtro-area').value;
  const sel = document.getElementById('filtro-area');
  if(sel.options.length<=1) getAllAreas().forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.nome;sel.appendChild(o)});
  let itens = [...state.compromissos]; const hoje = hojeStr();
  itens.forEach(c=>{c._vencido = c.estado!=='concluido' && c.prazo<hoje});
  if(fe!=='todos'){ itens = fe==='vencido' ? itens.filter(c=>c._vencido) : itens.filter(c=>c.estado===fe) }
  if(fp!=='todas') itens = itens.filter(c=>c.prioridade===fp);
  if(fa!=='todas') itens = itens.filter(c=>c.area===fa);
  itens.sort((a,b)=>({urgente:0,alta:1,media:2,baixa:3}[a.prioridade]-{urgente:0,alta:1,media:2,baixa:3}[b.prioridade])||a.prazo.localeCompare(b.prazo));
  const L={pendente:'Pendente',andamento:'Em andamento',concluido:'Concluído'}, C={pendente:'b-cinza',andamento:'b-azul',concluido:'b-verde'};
  document.getElementById('compromissos-lista').innerHTML = itens.length ? itens.map(c=>{
    const a = getAllAreas().find(x=>x.id===c.area)||{icon:'📌',nome:c.area};
    return `<div class="card p-${c.prioridade}" style="margin:0"><div class="card-topo"><div><h3 style="margin:0">${c.estado==='concluido'?'<s>':''}${c.titulo}${c.estado==='concluido'?'</s>':''}</h3><small class="texto-suave">${a.icon} ${a.nome} · 👤 ${c.responsavel} · 📅 ${dataCurta(c.prazo)} · 📎 ${c.origem||'—'}</small></div><span><span class="badge ${C[c.estado]}">${L[c.estado]}</span> ${c.delegada?'<span class="badge b-violeta">Delegado</span>':''} ${c._vencido?'<span class="badge b-vermelho">Vencido</span>':''} <button class="btn-ghost" onclick="editCompromisso('${c.id}')">✏️</button> <button class="btn-ghost" onclick="deleteCompromisso('${c.id}')">🗑️</button></span></div></div>`;
  }).join('') : '<p class="vazio">Nenhum compromisso — crie o primeiro em + Novo Compromisso.</p>';
}

// ===== ÁREAS (organização) =====
function renderAreaGrid(tipo){
  const hoje = hojeStr();
  document.getElementById(tipo+'-grid').innerHTML = AREAS[tipo].map(area=>{
    const cs = state.compromissos.filter(c=>c.area===area.id);
    const pend = cs.filter(c=>c.estado!=='concluido').length;
    const venc = cs.filter(c=>c.estado!=='concluido'&&c.prazo<hoje).length;
    const del = cs.filter(c=>c.delegada&&c.estado!=='concluido').length;
    const evs = state.eventos.filter(e=>e.area===area.id).length;
    return `<div class="area-card"><div class="area-topo"><div class="area-icone" style="background:${area.color}15">${area.icon}</div><div><p class="forte" style="font-size:.85rem">${area.nome}</p><small class="texto-suave">${cs.length} compromissos</small></div></div><div class="area-stats"><div class="stat"><b>${pend}</b><span>Pendentes</span></div><div class="stat"><b class="${venc?'t-vermelho':'t-verde'}">${venc}</b><span>Vencidos</span></div><div class="stat"><b class="t-violeta">${del}</b><span>Delegados</span></div><div class="stat"><b class="t-azul">${evs}</b><span>Eventos</span></div></div></div>`;
  }).join('');
}

// ===== DELEGAÇÕES =====
function renderDelegacoes(){
  const hoje = hojeStr();
  const L={pendente:'Pendente',andamento:'Em andamento',concluido:'Concluído'};
  document.getElementById('delegacoes-lista').innerHTML = state.delegacoes.length ? state.delegacoes.map(d=>{
    const v = d.prazo<hoje && d.estado!=='concluido';
    return `<div class="card" style="margin:0"><div class="card-topo"><div><h3 style="margin:0">⚡ ${d.tarefa}</h3><small class="texto-suave">👤 ${d.para} · 📅 delegada em ${dataCurta(d.feita)} · ⏰ prazo ${dataCurta(d.prazo)} ${v?'<b class="t-vermelho">(VENCIDA)</b>':''}</small>${d.notas?`<p class="texto-suave" style="margin-top:6px">📝 ${d.notas}</p>`:''}</div><span><select onchange="updateDelegacao('${d.id}',this.value)" style="font-size:.7rem"><option value="pendente" ${d.estado==='pendente'?'selected':''}>Pendente</option><option value="andamento" ${d.estado==='andamento'?'selected':''}>Em andamento</option><option value="concluido" ${d.estado==='concluido'?'selected':''}>Concluído</option></select> <button class="btn-ghost" onclick="deleteDelegacao('${d.id}')">🗑️</button></span></div></div>`;
  }).join('') : '<p class="vazio">Nenhuma delegação registrada.</p>';
}
function updateDelegacao(id,e){state.delegacoes.find(x=>x.id===id).estado=e; saveState(); renderDelegacoes()}
function deleteDelegacao(id){if(!confirm('Excluir esta delegação?'))return; state.delegacoes=state.delegacoes.filter(d=>d.id!==id); saveState(); renderDelegacoes()}

// ===== RELATÓRIOS =====
function renderRelatorios(){
  const ws = inicioSemana(0).toISOString().split('T')[0];
  const we = (()=>{const e=inicioSemana(0);e.setDate(e.getDate()+6);return e.toISOString().split('T')[0]})();
  document.getElementById('rel-semanal').innerHTML = `
    <div class="linha"><span>Reuniões registradas</span><b class="t-branco">${state.reuniones.length}</b></div>
    <div class="linha"><span>Compromissos ativos</span><b class="t-branco">${state.compromissos.filter(c=>c.estado!=='concluido').length}</b></div>
    <div class="linha"><span>Concluídos</span><b class="t-verde">${state.compromissos.filter(c=>c.estado==='concluido').length}</b></div>
    <div class="linha"><span>Delegações ativas</span><b class="t-violeta">${state.delegacoes.filter(d=>d.estado!=='concluido').length}</b></div>
    <div class="linha"><span>Eventos esta semana</span><b class="t-azul">${state.eventos.filter(e=>e.data>=ws&&e.data<=we).length}</b></div>`;
  const c3 = document.getElementById('chart-tempo'); if(c3._chart) c3._chart.destroy();
  c3._chart = new Chart(c3,{type:'pie',data:{labels:['Reuniões','Acompanhamento de delegações','Gestão própria'],datasets:[{data:[state.reuniones.length, state.compromissos.filter(c=>c.delegada).length, state.compromissos.filter(c=>!c.delegada).length],backgroundColor:['#38BDF8','#A78BFA','#25D366'],borderWidth:0}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}});
  const c4 = document.getElementById('chart-detalhe'); if(c4._chart) c4._chart.destroy();
  const all = getAllAreas();
  c4._chart = new Chart(c4,{type:'bar',data:{labels:all.map(a=>a.nome),datasets:[{label:'Pendentes',data:all.map(a=>state.compromissos.filter(c=>c.area===a.id&&c.estado!=='concluido').length),backgroundColor:'#FBBF24',borderRadius:4},{label:'Concluídos',data:all.map(a=>state.compromissos.filter(c=>c.area===a.id&&c.estado==='concluido').length),backgroundColor:'#25D366',borderRadius:4}]},options:{responsive:true,scales:{x:{stacked:true},y:{stacked:true,beginAtZero:true,ticks:{stepSize:1}}},plugins:{legend:{position:'bottom'}}}});
}

// ===== INTEGRAÇÕES (linhas do integrations.js) =====
function renderIntegracoes(){
  if(typeof INTEGRATIONS==='undefined') return;
  const its = [
    {n:'SUPABASE · Banco de dados', d:'Clientes, projetos e compromissos reais.', f:'dbSalvar', l:10},
    {n:'SUPABASE AUTH · Login', d:'Só você entra no painel.', f:'authLogin', l:16},
    {n:'MCP · Agente de IA', d:'Hermes consulta seu banco pelo Telegram.', f:'iaConsultar', l:22},
    {n:'WHATSAPP · Follow-up', d:'Mensagens automáticas de prazo.', f:'whatsNotificar', l:28},
    {n:'EMAIL · Propostas', d:'Propostas e relatórios por e-mail.', f:'emailEnviar', l:34},
    {n:'CRON · Rotinas', d:'Verifica vencimentos todo dia às 8h.', f:'cronVencimentos', l:40}
  ];
  document.getElementById('grid-int').innerHTML = its.map(i=>`<div class="int-card"><h4><span class="ponto"></span>${i.n}</h4><p>${i.d}</p><button class="btn-int" onclick="${i.f}('teste','teste');alert('Offline agora → ative na linha ${i.l} do integrations.js')">Testar · linha ${i.l}</button></div>`).join('');
}

// ===== MODAIS =====
function openModal(tipo, editId){
  document.getElementById('modal-overlay').classList.remove('hidden');
  const title = document.getElementById('modal-title'), body = document.getElementById('modal-body');
  if(tipo==='reuniao'){
    const r = editId ? state.reuniones.find(x=>x.id===editId) : null;
    title.textContent = r?'Editar Reunião':'Nova Reunião';
    body.innerHTML = `<form onsubmit="saveReuniao(event,'${editId||''}')"><div class="form-linha"><label>Título</label><input id="m-titulo" value="${r?r.titulo:''}" required></div><div class="form-2col"><div class="form-linha"><label>Tipo</label><select id="m-tipo"><option value="frequente" ${r&&r.tipo==='frequente'?'selected':''}>Frequente</option><option value="ocasional" ${r&&r.tipo==='ocasional'?'selected':''}>Ocasional</option></select></div><div class="form-linha"><label>Data</label><input type="date" id="m-data" value="${r?r.data:hojeStr()}" required></div></div><div class="form-2col"><div class="form-linha"><label>Hora</label><input id="m-hora" value="${r?r.hora:'9:00'}" placeholder="9:00"></div><div class="form-linha"><label>Duração</label><input id="m-dur" value="${r?r.duracao:'1h'}" placeholder="1h"></div></div><div class="form-linha"><label>Participantes (separados por vírgula)</label><input id="m-part" value="${r?r.participantes.join(', '):''}"></div><div class="form-linha"><label>Notas</label><textarea id="m-notas" rows="2">${r?r.notas:''}</textarea></div><button class="btn-verde btn-largo">Salvar Reunião</button></form>`;
  } else if(tipo==='compromisso'){
    const c = editId ? state.compromissos.find(x=>x.id===editId) : null;
    title.textContent = c?'Editar Compromisso':'Novo Compromisso';
    body.innerHTML = `<form onsubmit="saveCompromisso(event,'${editId||''}')"><div class="form-linha"><label>Título</label><input id="mc-titulo" value="${c?c.titulo:''}" required></div><div class="form-2col"><div class="form-linha"><label>Área</label><select id="mc-area"><optgroup label="Linhas de Serviço">${AREAS.programas.map(a=>`<option value="${a.id}" ${c&&c.area===a.id?'selected':''}>${a.nome}</option>`).join('')}</optgroup><optgroup label="Processos">${AREAS.processos.map(a=>`<option value="${a.id}" ${c&&c.area===a.id?'selected':''}>${a.nome}</option>`).join('')}</optgroup><optgroup label="Iniciativas">${AREAS.iniciativas.map(a=>`<option value="${a.id}" ${c&&c.area===a.id?'selected':''}>${a.nome}</option>`).join('')}</optgroup></select></div><div class="form-linha"><label>Prioridade</label><select id="mc-prioridade"><option value="urgente" ${c&&c.prioridade==='urgente'?'selected':''}>🔴 Urgente</option><option value="alta" ${c&&c.prioridade==='alta'?'selected':''}>🟠 Alta</option><option value="media" ${!c||c.prioridade==='media'?'selected':''}>🔵 Média</option><option value="baixa" ${c&&c.prioridade==='baixa'?'selected':''}>🟢 Baixa</option></select></div></div><div class="form-2col"><div class="form-linha"><label>Responsável</label><input id="mc-resp" value="${c?c.responsavel:''}" required></div><div class="form-linha"><label>Prazo</label><input type="date" id="mc-prazo" value="${c?c.prazo:daquiDias(7)}" required></div></div><div class="form-2col"><div class="form-linha"><label>Origem</label><input id="mc-origem" value="${c?c.origem:''}" placeholder="Ex.: Reunião com cliente"></div><div class="form-linha"><label>Estado</label><select id="mc-estado"><option value="pendente" ${!c||c.estado==='pendente'?'selected':''}>Pendente</option><option value="andamento" ${c&&c.estado==='andamento'?'selected':''}>Em andamento</option><option value="concluido" ${c&&c.estado==='concluido'?'selected':''}>Concluído</option></select></div></div><div class="form-linha"><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="mc-delegada" style="width:auto" ${c&&c.delegada?'checked':''}> Este compromisso foi delegado</label></div><button class="btn-verde btn-largo">Salvar Compromisso</button></form>`;
  } else if(tipo==='evento'){
    const e = editId ? state.eventos.find(x=>x.id===editId) : null;
    title.textContent = e?'Editar Evento':'Novo Evento';
    body.innerHTML = `<form onsubmit="saveEvento(event,'${editId||''}')"><div class="form-linha"><label>Título</label><input id="me-titulo" value="${e?e.titulo:''}" required></div><div class="form-2col"><div class="form-linha"><label>Tipo</label><select id="me-tipo"><option value="reuniao" ${e&&e.tipo==='reuniao'?'selected':''}>Reunião</option><option value="externa" ${e&&e.tipo==='externa'?'selected':''}>Reunião externa</option><option value="campo" ${e&&e.tipo==='campo'?'selected':''}>Visita de campo</option><option value="pessoal" ${e&&e.tipo==='pessoal'?'selected':''}>Gestão pessoal</option></select></div><div class="form-linha"><label>Área</label><select id="me-area"><option value="direcao" ${e&&e.area==='direcao'?'selected':''}>Direção</option>${getAllAreas().map(a=>`<option value="${a.id}" ${e&&e.area===a.id?'selected':''}>${a.nome}</option>`).join('')}</select></div></div><div class="form-2col"><div class="form-linha"><label>Data</label><input type="date" id="me-data" value="${e?e.data:hojeStr()}" required></div><div class="form-linha"><label>Hora</label><input id="me-hora" value="${e?e.hora:'9:00'}"></div></div><div class="form-linha"><label>Notas</label><textarea id="me-notas" rows="2">${e?e.notas:''}</textarea></div><button class="btn-verde btn-largo">Salvar Evento</button></form>`;
  } else {
    title.textContent = 'Nova Delegação';
    body.innerHTML = `<form onsubmit="saveDelegacao(event)"><div class="form-linha"><label>Tarefa a delegar</label><input id="md-tarefa" required></div><div class="form-linha"><label>Delegar para</label><input id="md-para" required placeholder="Nome do responsável"></div><div class="form-2col"><div class="form-linha"><label>Prazo</label><input type="date" id="md-prazo" value="${daquiDias(7)}" required></div><div class="form-linha"><label>Estado inicial</label><select id="md-estado"><option value="pendente">Pendente</option><option value="andamento">Em andamento</option></select></div></div><div class="form-linha"><label>Notas / instruções</label><textarea id="md-notas" rows="2"></textarea></div><button class="btn-verde btn-largo">Criar Delegação</button></form>`;
  }
}
function closeModal(){document.getElementById('modal-overlay').classList.add('hidden')}

// ===== SALVAR / EDITAR / EXCLUIR =====
function saveReuniao(e, editId){e.preventDefault(); const d={titulo:val('m-titulo'),tipo:val('m-tipo'),data:val('m-data'),hora:val('m-hora'),duracao:val('m-dur'),participantes:val('m-part').split(',').map(s=>s.trim()).filter(Boolean),notas:val('m-notas')}; if(editId){Object.assign(state.reuniones.find(x=>x.id===editId),d)}else{d.id='r'+Date.now();d.acordos=[];state.reuniones.push(d)} saveState();closeModal();renderReuniones()}
function saveCompromisso(e, editId){e.preventDefault(); const d={titulo:val('mc-titulo'),area:val('mc-area'),prioridade:val('mc-prioridade'),responsavel:val('mc-resp'),prazo:val('mc-prazo'),origem:val('mc-origem'),estado:val('mc-estado'),delegada:document.getElementById('mc-delegada').checked}; if(editId){Object.assign(state.compromissos.find(x=>x.id===editId),d)}else{d.id='c'+Date.now();d.criado=hojeStr();state.compromissos.push(d)} saveState();closeModal();renderCompromisos()}
function saveEvento(e, editId){e.preventDefault(); const d={titulo:val('me-titulo'),tipo:val('me-tipo'),area:val('me-area'),data:val('me-data'),hora:val('me-hora'),notas:val('me-notas')}; if(editId){Object.assign(state.eventos.find(x=>x.id===editId),d)}else{d.id='e'+Date.now();state.eventos.push(d)} saveState();closeModal();renderAgenda()}
function saveDelegacao(e){e.preventDefault(); state.delegacoes.push({id:'d'+Date.now(),tarefa:val('md-tarefa'),para:val('md-para'),feita:hojeStr(),prazo:val('md-prazo'),estado:val('md-estado'),notas:val('md-notas')}); saveState();closeModal();renderDelegacoes()}
function editReuniao(id){openModal('reuniao',id)} function editCompromisso(id){openModal('compromisso',id)} function editEvento(id){openModal('evento',id)}
function deleteReuniao(id){if(!confirm('Excluir esta reunião e seus acordos?'))return; state.reuniones=state.reuniones.filter(r=>r.id!==id); saveState(); renderReuniones()}
function deleteCompromisso(id){if(!confirm('Excluir este compromisso?'))return; state.compromissos=state.compromissos.filter(c=>c.id!==id); saveState(); renderCompromisos()}
function deleteEvento(id){if(!confirm('Excluir este evento?'))return; state.eventos=state.eventos.filter(e=>e.id!==id); saveState(); renderAgenda()}

// ===== ATALHO ＋ NOVO =====
function openQuickAdd(){const c=prompt('O que deseja criar?\n1 - Reunião\n2 - Compromisso\n3 - Evento\n4 - Delegação'); if(c==='1')openModal('reuniao'); else if(c==='2')openModal('compromisso'); else if(c==='3')openModal('evento'); else if(c==='4')openModal('delegacao')}

// ===== NOTIFICAÇÕES =====
function toggleNotifications(){const p=document.getElementById('notif-panel'); p.classList.toggle('hidden'); if(!p.classList.contains('hidden')) renderNotifications()}
function renderNotifications(){
  const hoje = hojeStr(); const n=[];
  state.compromissos.filter(c=>c.estado!=='concluido'&&c.prazo<hoje).forEach(c=>n.push({t:'n-perigo',x:`⚠️ Vencido: ${c.titulo}`,s:`Responsável: ${c.responsavel}`}));
  const d3 = daquiDias(3);
  state.compromissos.filter(c=>c.estado!=='concluido'&&c.prazo>=hoje&&c.prazo<=d3).forEach(c=>n.push({t:'n-aviso',x:`⏰ Vence em breve: ${c.titulo}`,s:`Prazo: ${dataCurta(c.prazo)}`}));
  state.eventos.filter(e=>e.data===hoje).forEach(e=>n.push({t:'n-info',x:`📅 Hoje: ${e.titulo}`,s:e.hora}));
  document.getElementById('notif-list').innerHTML = n.length ? n.map(x=>`<div class="notif ${x.t}"><p>${x.x}</p><small>${x.s}</small></div>`).join('') : '<p class="vazio">Tudo em dia ✨</p>';
  const b = document.getElementById('notif-badge'); b.textContent = n.length; b.style.display = n.length?'flex':'none';
}

// ===== UTILITÁRIOS =====
function val(id){return document.getElementById(id).value.trim()}
function hojeStr(){return new Date().toISOString().split('T')[0]}
function daquiDias(n){const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().split('T')[0]}
function inicioSemana(off){const d=new Date(); d.setDate(d.getDate()-((d.getDay()+6)%7)+(off*7)); return d}
function naSemana(ds){const s=inicioSemana(0), e=new Date(s); e.setDate(s.getDate()+6); return ds>=s.toISOString().split('T')[0]&&ds<=e.toISOString().split('T')[0]}
function dataCurta(ds){const d=new Date(ds+'T12:00:00'); const m=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']; return `${d.getDate()} ${m[d.getMonth()]}`}
function dataLonga(ds){const d=new Date(ds+'T12:00:00'); const dd=['domingo','segunda','terça','quarta','quinta','sexta','sábado']; const mm=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; return `${dd[d.getDay()]}, ${d.getDate()} de ${mm[d.getMonth()]}`}

// ===== INICIALIZAÇÃO =====
function init(){
  loadState();
  document.getElementById('current-date').textContent = dataLonga(hojeStr());
  renderDashboard(); renderNotifications();
  document.addEventListener('click', e=>{
    const p = document.getElementById('notif-panel');
    if(!p.classList.contains('hidden') && !e.target.closest('#notif-panel') && !e.target.closest('.sino')) p.classList.add('hidden');
  });
  document.getElementById('modal-overlay').addEventListener('click', e=>{if(e.target===document.getElementById('modal-overlay')) closeModal()});
}
init();
