import { useState } from 'react'
import { supabase } from './supabaseClient'

import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  Settings
} from 'lucide-react'

/* =========================
   FORMULÁRIO NOVO ATLETA
========================= */

function FormNovoAtleta() {

  // ESTADOS DOS CAMPOS
  const [nome, setNome] = useState('')
  const [apelido, setApelido] = useState('')
  const [posicao, setPosicao] = useState('')
  const [numero, setNumero] = useState('')

  // CONTROLA LOADING DO BOTÃO
  const [carregando, setCarregando] = useState(false)

  // ENVIO DO FORMULÁRIO
  async function handleSubmit(e) {

    e.preventDefault()

    // VALIDAÇÃO
    if (!nome || !apelido || !posicao || !numero) {
      alert('Preencha todos os campos!')
      return
    }

    setCarregando(true)

    try {

      // INSERE DADOS NO SUPABASE
      const { error } = await supabase
        .from('atletas')
        .insert([
          {
            nome,
            apelido,
            posicao,
            numero_camisa: parseInt(numero),
            status_pagamento: 'pendente'
          }
        ])

      // SE DER ERRO
      if (error) throw error

      // ALERTA DE SUCESSO
      alert(`🏀 ${apelido} cadastrado com sucesso!`)

      // LIMPA CAMPOS
      setNome('')
      setApelido('')
      setPosicao('')
      setNumero('')

    } catch (error) {

      alert('Erro: ' + error.message)

    } finally {

      setCarregando(false)

    }
  }

  return (

    <form
      onSubmit={handleSubmit}

      /* 
        w-full = ocupa largura total
        max-w-lg = limita tamanho no desktop
      */
      className="w-full max-w-lg space-y-4"
    >

      {/* INPUT NOME */}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}

        className="
          w-full
          bg-black/20
          border
          border-white/10
          p-3
          rounded-xl
          focus:outline-none
          focus:border-[#0057A8]
        "
      />

      {/* INPUT APELIDO */}
      <input
        type="text"
        placeholder="Apelido"
        value={apelido}
        onChange={(e) => setApelido(e.target.value)}

        className="
          w-full
          bg-black/20
          border
          border-white/10
          p-3
          rounded-xl
          focus:outline-none
          focus:border-[#0057A8]
        "
      />

      {/* SELECT POSIÇÃO */}
      <select
        value={posicao}
        onChange={(e) => setPosicao(e.target.value)}

        className="
          w-full
          bg-black/20
          border
          border-white/10
          p-3
          rounded-xl
          text-gray-300
          focus:outline-none
          focus:border-[#0057A8]
        "
      >

        <option value="">Posição...</option>

        <option value="PG">PG - Armador</option>
        <option value="SG">SG - Escolta</option>
        <option value="SF">SF - Ala</option>
        <option value="PF">PF - Ala-Pivô</option>
        <option value="C">C - Pivô</option>

      </select>

      {/* INPUT NÚMERO */}
      <input
        type="number"
        placeholder="Nº Camisa"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}

        className="
          w-full
          bg-black/20
          border
          border-white/10
          p-3
          rounded-xl
          focus:outline-none
          focus:border-[#0057A8]
        "
      />

      {/* BOTÃO */}
      <button
        type="submit"
        disabled={carregando}

        className="
          w-full
          bg-[#0057A8]
          py-3
          rounded-xl
          font-bold
          hover:bg-[#003B73]
          transition-all
          disabled:opacity-50
        "
      >

        {carregando
          ? 'Salvando...'
          : 'Salvar Atleta'
        }

      </button>

    </form>
  )
}

/* =========================
   PAINEL ADMIN
========================= */

export default function AdminLayout() {

  // ABA ATIVA
  const [activeTab, setActiveTab] = useState('dashboard')

  // ITENS DO MENU
  const menuItems = [

    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    },

    {
      id: 'atletas',
      label: 'Atletas',
      icon: <Users size={20} />
    },

    {
      id: 'novo',
      label: 'Novo',
      icon: <UserPlus size={20} />
    },

    {
      id: 'config',
      label: 'Config',
      icon: <Settings size={20} />
    },

  ]

  return (

    /*
      flex-col no celular
      flex-row no desktop
    */
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212] text-white">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside

        /*
          mobile:
          w-full

          desktop:
          largura fixa
        */
        className="
          w-full
          md:w-64
          bg-[#0b0b0b]
          border-b
          md:border-b-0
          md:border-r
          border-white/5
          flex
          flex-col
        "
      >

        {/* LOGO */}
        <div className="p-6 border-b border-white/5">

          <h2 className="text-[#0057A8] font-bold italic tracking-tighter">

            WR MANAGER

            <span className="block text-[10px] text-white opacity-50 not-italic">
              PAINEL ADM
            </span>

          </h2>

        </div>

        {/* MENU */}
        <nav

          /*
            Mobile:
            horizontal

            Desktop:
            vertical
          */
          className="
            flex
            md:flex-col
            overflow-x-auto
            p-2
            md:p-4
            gap-2
          "
        >

          {menuItems.map((item) => (

            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}

              className={`
                flex
                items-center
                gap-2
                px-4
                py-3
                rounded-xl
                whitespace-nowrap
                transition-all

                ${activeTab === item.id
                  ? 'bg-[#0057A8] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >

              {item.icon}

              <span className="text-sm font-medium">
                {item.label}
              </span>

            </button>

          ))}

        </nav>

        {/* BOTÃO SAIR */}
        <div className="p-4 border-t border-white/5">

          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-3
              rounded-xl
              text-red-500
              hover:bg-red-500/10
              transition-all
            "
          >

            <LogOut size={18} />

            <span className="text-sm font-medium">
              Sair
            </span>

          </button>

        </div>

      </aside>

      {/* =========================
          CONTEÚDO PRINCIPAL
      ========================= */}

      <main

        /*
          padding menor no mobile
          padding maior desktop
        */
        className="
          flex-1
          p-4
          md:p-8
          overflow-y-auto
        "
      >

        {/* HEADER */}
        <header className="mb-8">

          <h1 className="text-2xl font-bold capitalize">
            {activeTab}
          </h1>

          <p className="text-gray-500 text-sm">
            Bem-vindo de volta, Tavin.
          </p>

        </header>

        {/* CARD PRINCIPAL */}
        <div

          className="
            bg-[#1e1e1e]
            border
            border-white/5
            rounded-3xl
            p-4
            md:p-8
            min-h-[400px]
          "
        >

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <p>
              Aqui você verá o resumo financeiro.
            </p>
          )}

          {/* ATLETAS */}
          {activeTab === 'atletas' && (
            <p>
              Aqui ficará a tabela de atletas.
            </p>
          )}

          {/* NOVO */}
          {activeTab === 'novo' && (

            <div>

              <h2 className="text-xl font-bold mb-6">
                Cadastrar Novo Jogador
              </h2>

              <FormNovoAtleta />

            </div>

          )}

        </div>

      </main>

    </div>
  )
}