import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { supabase } from './supabaseClient'

import Login from './Login'
import AdminLayout from './Adm'

/* ======================================================
   COMPONENTE CARD DO ATLETA
   Separado para deixar o código mais organizado e reutilizável
====================================================== */
function AthleteCard({ atleta }) {
  const isPago = atleta.status_pagamento === 'pago'

  return (
    <div className=
    "bg-[#1e1e1e] border border-white/5 rounded-2xl p-5 shadow-lg transition-all duration-300hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-[#0057A8] group">
      
      {/* TOPO DO CARD */}
      <div className="flex items-start justify-between mb-4">

        {/* NÚMERO DA CAMISA */}
        <div className="bg-[#0057A8] w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black rotate-3 transition-transform group-hover:rotate-0">
          #{atleta.numero_camisa}
        </div>

        {/* STATUS */}
        <span
          className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
            isPago
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {atleta.status_pagamento || 'pendente'}
        </span>
      </div>

      {/* INFORMAÇÕES */}
      <h3 className="text-xl font-bold uppercase tracking-tight">
        {atleta.apelido}
      </h3>

      <p className="text-pretty text-[#67839e] mb-2 mt-2
      ">
        Altura:{' '}
          {atleta.altura
          ? parseFloat(atleta.altura).toFixed(2)
          : 'Não informada'}
      </p>
       
      <p className="text-pretty text-[#67839e] mb-4 mt-1">
        Posição:{' '}
          {atleta.altura
          ? `${String(atleta.posicao).replace()}`
          : 'Não informada'}
      </p>
       
      

      {/* RODAPÉ DO CARD */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
        <span>White Rock</span>
        <span className="opacity-50">v.2026</span>
      </div>
    </div>
  )
}

/* ======================================================
   COMPONENTE DE LOADING
====================================================== */
function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-[#0057A8] animate-spin" />
    </div>
  )
}

/* ======================================================
   COMPONENTE DE LISTA VAZIA
====================================================== */
function EmptyState() {
  return (
    <div className="bg-[#1e1e1e] border border-dashed border-white/10 rounded-3xl py-20 text-center">
      <p className="text-gray-500">
        Nenhum atleta encontrado no banco de dados.
      </p>
    </div>
  )
}

/* ======================================================
   HEADER
====================================================== */
function Header() {
  const navigate = useNavigate()

  return (
    
    <header className="bg-[#003B73] border-b border-[#0057A8] shadow-2xl p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter">
          WHITE ROCK <span className="text-[#00A8E8]">MANAGER</span>
        </h1>

        <button
          onClick={() => navigate('/login')}
          className="bg-white text-black px-5 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-400 transition-colors"
        >
          Login Adm
        </button>
      </div>
      {/* HERO SECTION */}
<section

  className="
    relative
    overflow-hidden
    rounded-3xl
    mb-10
    p-10
    md:p-20
    border
    border-cyan-400/10
    bg-gradient-to-br
    from-[#0a0a0a]
    via-[#111827]
    to-[#003B73]
  "
>

  {/* EFEITO DE LUZ */}
  <div
    className="
      absolute
      w-72
      h-72
      bg-cyan-400/20
      blur-3xl
      rounded-full
      top-[-50px]
      right-[-50px]
    "
  />

  {/* CONTEÚDO */}
  <div className="relative z-10 max-w-3xl">

    {/* TEXTO PEQUENO */}
    <span
      className="
        uppercase
        tracking-[0.3em]
        text-cyan-200
        text-xs
        font-bold
      "
    >
      White Rock Basketball Team
    </span>

    {/* TÍTULO */}
    <h1

      className="
        text-5xl
        md:text-7xl
        font-black
        leading-none
        mt-4
        mb-6
      "
    >

      DOMINE
      <br />

      <span

        className="
          text-cyan-400
        "

       
      >
        A QUADRA
      </span>

    </h1>

    {/* DESCRIÇÃO */}
    <p
      className="
        text-gray-300
        text-lg
        leading-relaxed
        max-w-2xl
      "
    >

      O White Rock é mais que um time.
      Somos disciplina, intensidade e evolução.

      Cada treino constrói atletas mais fortes
      dentro e fora das quadras.

    </p>

    {/* BOTÕES */}
    <div className="flex flex-wrap gap-4 mt-8">

      <button

        className="
          bg-cyan-400
          text-black
          px-8
          py-4
          rounded-2xl
          font-bold
          hover:scale-105
          transition-all
          shadow-[0_0_25px_#22d3ee]
        "
      >
        Conhecer Atletas
      </button>

      <button

        className="
          border
          border-white/10
          bg-white/5
          backdrop-blur-md
          px-8
          py-4
          rounded-2xl
          font-bold
          hover:bg-white/10
          transition-all
        "
      >
        História do Time
      </button>

    </div>

  </div>

</section>
    </header>
    
  )
}


/* ======================================================
   FOOTER
====================================================== */
function Footer() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-white/5 pt-12 pb-8 mt-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* MARCA */}
          <div className="space-y-4">
            <h3 className="text-[#0057A8] text-xl font-black italic">
              WHITE ROCK
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Sistema de gestão de atletas e controle financeiro.
              Desenvolvido para organizar o jogo e fortalecer o time.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Navegação
            </h4>

            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-[#00A8E8] transition-colors cursor-pointer">
                Início
              </li>

              <li className="hover:text-[#00A8E8] transition-colors cursor-pointer">
                Plantão de atletas
              </li>
            </ul>
          </div>

          {/* LOCALIZAÇÃO */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Localização
            </h4>

            <p className="text-sm text-gray-500">
              Bangu, Rio de Janeiro <br />
              Centro de Treinamento White Rock
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-gray-600">
          
          <p>
            © 2026 WHITE ROCK MANAGER - TODOS OS DIREITOS RESERVADOS
          </p>

          <p>
            Desenvolvido por{' '}
            <span className="text-white font-bold">
              Ellen Gama
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ======================================================
   HOME PAGE
====================================================== */
function HomePage() {
  const [atletas, setAtletas] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetchAtletas()
  }, [])

  /* ======================================================
     BUSCAR ATLETAS NO SUPABASE
  ====================================================== */
  async function fetchAtletas() {
    try {
      const { data, error } = await supabase
        .from('atletas')
        .select('*')
        .order('numero_camisa', { ascending: true })

      if (error) {
        throw error
      }

      setAtletas(data || [])
    } catch (error) {
      console.error('Erro ao buscar atletas:', error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white font-sans">

      <Header />

      {/* CONTEÚDO */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6">

        {/* TÍTULO */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest border-l-4 border-[#0057A8] pl-4">
            Plantão de Atletas
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Sejam bem-vindos!!
          </p>
        </section>

        {/* LOADING */}
        {carregando && <Loading />}

        {/* LISTA DE ATLETAS */}
        {!carregando && atletas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {atletas.map((atleta) => (
              <AthleteCard
                key={atleta.id}
                atleta={atleta}
              />
            ))}
          </div>
        )}

        {/* SEM ATLETAS */}
        {!carregando && atletas.length === 0 && (
          <EmptyState />
        )}
      </main>

      <Footer />
    </div>
  )
}

/* ======================================================
   APP
====================================================== */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />} />
    </Routes>
  )
}