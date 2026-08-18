// =====================================================
// SPGD · PONTO DAS INTEGRAÇÕES (ative na hora certa)
// =====================================================

const INTEGRATIONS = {
  supabase:false, auth:false, mcp:false,
  whatsapp:false, email:false, cron:false
};

// [INT-1] SUPABASE — banco de dados
async function dbSalvar(tabela, dados){
  if(!INTEGRATIONS.supabase) return console.log('[offline]', tabela, dados);
  // TODO: await supabase.from(tabela).insert(dados);
}

// [INT-2] SUPABASE AUTH — login
async function authLogin(email, senha){
  if(!INTEGRATIONS.auth) return console.log('[offline] sessão local');
  // TODO: await supabase.auth.signInWithPassword({email, password:senha});
}

// [INT-3] MCP — agente de IA (Hermes)
async function iaConsultar(pergunta){
  if(!INTEGRATIONS.mcp) return console.log('[offline] IA não conectada');
  // TODO: fetch(MCP_URL,{method:'POST',body:JSON.stringify({pergunta})});
}

// [INT-4] WHATSAPP — follow-up e avisos
function whatsNotificar(numero, msg){
  if(!INTEGRATIONS.whatsapp) return console.log('[offline] sem WhatsApp');
  // TODO: window.open('https://wa.me/'+numero+'?text='+encodeURIComponent(msg));
}

// [INT-5] EMAIL — propostas e relatórios
async function emailEnviar(destino, assunto, corpo){
  if(!INTEGRATIONS.email) return console.log('[offline] sem email');
  // TODO: fetch('https://formsubmit.co/ajax/'+destino,{method:'POST',body:JSON.stringify({assunto, corpo})});
}

// [INT-6] CRON — rotinas diárias (Vercel)
async function cronVencimentos(){
  if(!INTEGRATIONS.cron) return console.log('[offline] sem cron');
  // TODO: verificar vencimentos e notificar
}
