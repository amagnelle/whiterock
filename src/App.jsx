import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from './Login'
import AdminLayout from './Adm'

function  HomePage() {
  const [atletas, setAtletas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAtletas()
  }, [])

  async function getAtletas() {
    try {
      const { data, error } = await supabase
        .from('atletas')
        .select('*')
        .order('numero_camisa', { ascending: true })

      if (error) throw error
      if (data) setAtletas(data)
    } catch (error) {
      console.error('Erro ao buscar atletas:', error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    // min-h-screen + flex-col garante que a página ocupe a altura toda
    <div className="min-h-screen bg-[#121212] text-white font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="bg-[#003B73] p-6 shadow-2xl border-b border-[#0057A8]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic">
            WHITE ROCK <span className="text-[#00A8E8]">MANAGER</span>
          </h1>
          
          <button  onClick={() => navigate('/login')}
          className="bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-xl font-bold text-sm shadow-lg transition-colors"
          >
            Login Adm
          </button>
        </div>
      </header>

      {/* MAIN - o flex-1 faz ele "esticar" e empurrar o footer para baixo */}
      <main className="flex-1 max-w-6xl mx-auto p-6 w-full">
        <div className="mb-8">
          <h2 className="text-xl font-bold border-l-4 border-[#0057A8] pl-4 uppercase tracking-widest">
            Plantão de Atletas
          </h2>
          <p className="text-gray-400 text-sm mt-1">Sejam bem vindos!!</p>
        </div>

        {carregando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0057A8]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {atletas.map((atleta) => (
              <div 
                key={atleta.id} 
                className="bg-[#1e1e1e] border border-white/5 rounded-2xl p-5 hover:border-[#0057A8] transition-all duration-300 group shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#0057A8] text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform">
                    #{atleta.numero_camisa}
                  </div>
                  {/* Badge de status que você tinha antes */}
                  <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                    atleta.status_pagamento === 'pago' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {atleta.status_pagamento || 'pendente'}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight">{atleta.apelido}</h3>
                <p className="text-gray-500 text-sm mb-4">{atleta.posicao || 'Posição não definida'}</p>
                
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-400">
                  <span>White Rock F.C.</span>
                  <span className="opacity-50">v.2026</span>
                </div>
              </div> // Fechamento correto da div do card
            ))}
          </div>
        )}
        
        {!carregando && atletas.length === 0 && (
          <div className="text-center py-20 bg-[#1e1e1e] rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500">Nenhum atleta encontrado no banco de dados.</p>
          </div>
        )}
      </main>

      {/* FOOTER - agora posicionado corretamente no final */}
      <footer className="bg-[#0b0b0b] border-t border-white/5 pt-12 pb-8 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            {/* COLUNA 1: Marca */}
            <div className="space-y-4">
              <h3 className="text-[#0057A8] font-black text-xl italic">WHITE ROCK</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sistema de gestão de atletas e controle financeiro.
                Desenvolvido para organizar o jogo e fortalecer o time.
              </p>
            </div>

            {/* COLUNA 2: Navegação */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-[0.2em]">Navegação</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li className="hover:text-[#00A8E8] cursor-pointer transition-colors">Início</li>
                <li className="hover:text-[#00A8E8] cursor-pointer transition-colors">Plantão de atletas</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-[0.2em]">Contato</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li className="hover:text-[#00A8E8] cursor-pointer transition-colors">Email:</li>
                <li className="hover:text-[#00A8E8] cursor-pointer transition-colors"></li>
              </ul>
            </div>

            {/* COLUNA 3: Localização */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-[0.2em]">Localização</h4>
              <p className="text-gray-500 text-sm">
                Bangu, Rio de Janeiro<br />
                Centro de Treinamento White Rock
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600">
            <p>© 2026 WHITE ROCK MANAGER - TODOS OS DIREITOS RESERVADOS</p>
            <p>DESENVOLVIDO POR <span className="text-white font-bold">Ellen gama</span></p>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default function App() {

  return (

    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />} />

    </Routes>

  )
}
