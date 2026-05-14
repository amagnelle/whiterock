import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  Settings
} from 'lucide-react'
/git/
/* ========================================
   ESTILOS REUTILIZÁVEIS
======================================== */

const inputStyle = `
  w-full
  bg-black/20
  border
  border-white/10
  p-3
  rounded-xl
  focus:outline-none
  focus:border-[#0057A8]
`

/* ========================================
   FORMULÁRIO NOVO ATLETA
======================================== */

function FormNovoAtleta() {

  /* ESTADOS DOS INPUTS */
  const [nome, setNome] = useState('')
  const [apelido, setApelido] = useState('')
  const [posicao, setPosicao] = useState('')
  const [numero, setNumero] = useState('')
  const [altura, setAltura] = useState('')

  /* LOADING BOTÃO */
  const [carregando, setCarregando] = useState(false)

  /* ========================================
     FORMATA ALTURA
     EX: 170 -> 1.70
  ======================================== */

  function handleAlturaChange(e) {

    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 3) {
      value = value.slice(0, 3)
    }

    if (value.length >= 2) {
      let decimalPart = value.substring(1).padEnd(2, '0')
      value = value.substring(0, 1) + '.' + decimalPart
    }

    setAltura(value)
  }

  /* ========================================
     SALVAR ATLETA
  ======================================== */

  async function handleSubmit(e) {

    e.preventDefault()

    if (!nome || !apelido || !posicao || !numero || !altura) {
      alert('Preencha todos os campos!')
      return
    }

    setCarregando(true)

    try {

      const { error } = await supabase
        .from('atletas')
        .insert([
          {
            nome,
            apelido,
            altura,
            posicao,
            numero_camisa: Number(numero),
            status_pagamento: 'pendente'
          }
        ])

      if (error) throw error

      alert(`🏀 ${apelido} cadastrado com sucesso!`)

      /* LIMPA CAMPOS */
      setNome('')
      setApelido('')
      setPosicao('')
      setNumero('')
      setAltura('')

    } catch (error) {

      alert(error.message)

    } finally {

      setCarregando(false)

    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-4"
    >

      {/* NOME */}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className={inputStyle}
      />

      {/* APELIDO */}
      <input
        type="text"
        placeholder="Apelido"
        value={apelido}
        onChange={(e) => setApelido(e.target.value)}
        className={inputStyle}
      />

      {/* ALTURA */}
      <div>

        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
          Altura (m)
        </label>

        <input
          type="text"
          placeholder="0.00"
          value={altura}
          onChange={handleAlturaChange}
          maxLength={4}
          className={inputStyle}
        />

      </div>

      {/* POSIÇÃO */}
      <select
        value={posicao}
        onChange={(e) => setPosicao(e.target.value)}
        className={`${inputStyle} text-gray-300`}
      >

        <option value="">Posição...</option>
        <option value="PG">PG - Armador</option>
        <option value="SG">SG - Escolta</option>
        <option value="SF">SF - Ala</option>
        <option value="PF">PF - Ala-Pivô</option>
        <option value="C">C - Pivô</option>

      </select>

      {/* NÚMERO */}
      <input
        type="number"
        placeholder="Nº Camisa"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        className={inputStyle}
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

/* ========================================
   LISTA DE ATLETAS
======================================== */

function ListaAtletas() {

  /* ESTADOS */
  const [atletas, setAtletas] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [atletaEditando, setAtletaEditando] = useState(null)

  /* CAMPOS DO FORM EDIT */
  const [nomeEdit, setNomeEdit] = useState('')
  const [apelidoEdit, setApelidoEdit] = useState('')
  const [alturaEdit, setAlturaEdit] = useState('')
  const [posicaoEdit, setPosicaoEdit] = useState('')
  const [numeroEdit, setNumeroEdit] = useState('')

  /* ========================================
     FORMATA ALTURA EDIT
     EX: 170 -> 1.70
  ======================================== */

  function handleAlturaEditChange(e) {

    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 3) {
      value = value.slice(0, 3)
    }

    if (value.length >= 2) {
      let decimalPart = value.substring(1).padEnd(2, '0')
      value = value.substring(0, 1) + '.' + decimalPart
    }

    setAlturaEdit(value)
  }

  /* ========================================
     BUSCAR ATLETAS
  ======================================== */

  async function fetchAtletas() {

    try {

      const { data, error } = await supabase
        .from('atletas')
        .select('*')
        .order('numero_camisa', { ascending: true })

      if (error) throw error

      setAtletas(data)

    } catch (error) {

      console.error(error.message)

    } finally {

      setLoading(false)

    }
  }

  /* EXECUTA AO ABRIR */
  useEffect(() => {

    fetchAtletas()

  }, [])

  /* ========================================
     EXCLUIR ATLETA
  ======================================== */

  async function handleDelete(id) {

    const confirmar = confirm(
      'Deseja realmente excluir este atleta?'
    )

    if (!confirmar) return

    try {

      const { error } = await supabase
        .from('atletas')
        .delete()
        .eq('id', id)

      if (error) throw error

      /* REMOVE DA TELA */
      setAtletas((prev) =>
        prev.filter((atleta) => atleta.id !== id)
      )

      alert('Atleta removido!')

    } catch (error) {

      alert(error.message)

    }
  }

  /* =========================
     ABRIR MODAL EDITAR
  ========================= */

  function handleOpenEdit(atleta) {

    // SALVA O ATLETA ATUAL
    setAtletaEditando(atleta)

    // PREENCHE OS INPUTS
    setNomeEdit(atleta.nome)
    setApelidoEdit(atleta.apelido)
    let formattedAltura = atleta.altura
    if (formattedAltura) {
      let num = parseFloat(formattedAltura)
      formattedAltura = num.toFixed(2)
    }
    setAlturaEdit(formattedAltura)
    setPosicaoEdit(atleta.posicao)
    setNumeroEdit(atleta.numero_camisa)

    // ABRE MODAL
    setModalOpen(true)
  }

  /* =========================
     SALVAR EDIÇÃO
  ========================= */

  async function handleSaveEdit() {

    try {

      const { error } = await supabase
        .from('atletas')
        .update({
          nome: nomeEdit,
          apelido: apelidoEdit,
          altura: alturaEdit,
          posicao: posicaoEdit,
          numero_camisa: numeroEdit
        })
        .eq('id', atletaEditando.id)

      if (error) throw error

      alert('Atleta atualizado!')

      setModalOpen(false)

      fetchAtletas()

    } catch (error) {

      alert(error.message)

    }
  }

  return (

    <div className="space-y-4">

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">
          Carregando atletas...
        </p>
      )}

      {/* SEM ATLETAS */}
      {!loading && atletas.length === 0 && (
        <p className="text-gray-500">
          Nenhum atleta encontrado.
        </p>
      )}

      {/* LISTA */}
      {!loading && atletas.map((atleta) => (

        <div
          key={atleta.id}
          className="
            bg-black/20
            border
            border-white/10
            rounded-2xl
            p-4
            flex
            flex-col
            md:flex-row
            justify-between
            md:items-center
            gap-4
          "
        >

          {/* DADOS */}
          <div>

            <h3 className="font-bold text-lg">
              {atleta.apelido}
            </h3>

            <p className="text-sm text-gray-400">
              #{atleta.numero_camisa} • {atleta.posicao}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Altura:{' '}
              {atleta.altura
                ? `${parseFloat(atleta.altura).toFixed(2)}m`
                : 'Não informada'}
            </p>

          </div>

          {/* BOTÕES */}
          <div className="flex gap-2">

            {/* EDITAR */}
            <button onClick={() => handleOpenEdit(atleta)}
              className="
                bg-yellow-500
                hover:bg-yellow-600
                px-4
                py-2
                min-w-[100px]
                rounded-xl
                text-sm
                font-bold
                transition-all
              "
            >
              Editar
            </button>

            {/* EXCLUIR */}
            <button
              onClick={() => handleDelete(atleta.id)}
              className="
                bg-red-500
                hover:bg-red-600
                px-4
                py-2
                min-w-[100px]
                rounded-xl
                text-sm
                font-bold
                transition-all
              "
            >
              Excluir
            </button>

          </div>

        </div>

      ))}

      {/* =========================
         MODAL EDITAR ATLETA
      ========================= */}

      {modalOpen && (

        <div

          /*
            FUNDO ESCURO
            cobrindo tela inteira
          */
          className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            z-50
            p-4
          "
        >

          {/* CAIXA DO MODAL */}
          <div

            className="
              w-full
              max-w-lg
              bg-[#1e1e1e]
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            {/* TÍTULO */}
            <h2 className="text-2xl font-bold mb-6">
              Editar Atleta
            </h2>

            {/* INPUT NOME */}
            <input
              type="text"
              placeholder="Nome"

              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}

              className="
                w-full
                bg-black/20
                border
                border-white/10
                p-3
                rounded-xl
                mb-4
                outline-none
                focus:border-[#0057A8]
              "
            />

            {/* INPUT APELIDO */}
            <input
              type="text"
              placeholder="Apelido"

              value={apelidoEdit}
              onChange={(e) => setApelidoEdit(e.target.value)}

              className="
                w-full
                bg-black/20
                border
                border-white/10
                p-3
                rounded-xl
                mb-4
                outline-none
                focus:border-[#0057A8]
              "
            />

            {/* INPUT ALTURA */}
            <input
              type="text"
              placeholder="Altura"

              value={alturaEdit}
              onChange={handleAlturaEditChange}

              className="
                w-full
                bg-black/20
                border
                border-white/10
                p-3
                rounded-xl
                mb-4
                outline-none
                focus:border-[#0057A8]
              "
            />

            {/* SELECT POSIÇÃO */}
            <select

              value={posicaoEdit}
              onChange={(e) => setPosicaoEdit(e.target.value)}

              className="
                w-full
                bg-black/20
                border
                border-white/10
                p-3
                rounded-xl
                mb-4
                outline-none
                focus:border-[#0057A8]
              "
            >

              <option value="PG">PG - Armador</option>
              <option value="SG">SG - Escolta</option>
              <option value="SF">SF - Ala</option>
              <option value="PF">PF - Ala-Pivô</option>
              <option value="C">C - Pivô</option>

            </select>

            {/* INPUT NÚMERO */}
            <input
              type="number"
              placeholder="Número"

              value={numeroEdit}
              onChange={(e) => setNumeroEdit(e.target.value)}

              className="
                w-full
                bg-black/20
                border
                border-white/10
                p-3
                rounded-xl
                mb-6
                outline-none
                focus:border-[#0057A8]
              "
            />

            {/* BOTÕES */}
            <div className="flex gap-3">

              {/* CANCELAR */}
              <button

                onClick={() => setModalOpen(false)}

                className="
                  flex-1
                  bg-gray-700
                  hover:bg-gray-600
                  py-3
                  rounded-xl
                  font-bold
                  transition-all
                "
              >
                Cancelar
              </button>

              {/* SALVAR */}
              <button

                onClick={handleSaveEdit}

                className="
                  flex-1
                  bg-[#0057A8]
                  hover:bg-[#003B73]
                  py-3
                  rounded-xl
                  font-bold
                  transition-all
                "
              >
                Salvar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

/* ========================================
   ADMIN LAYOUT
======================================== */

export default function AdminLayout() {

  /* ABA ATIVA */
  const [activeTab, setActiveTab] =
    useState('dashboard')

  /* MENU */
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
    }
  ]

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212] text-white">

      {/* SIDEBAR */}
      <aside
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

        {/* SAIR */}
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

      {/* CONTEÚDO */}
      <main
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

        {/* CARD */}
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

            <div>

              <h2 className="text-xl font-bold mb-6">
                Lista de Atletas
              </h2>

              <ListaAtletas />

            </div>

          )}

          {/* NOVO */}
          {activeTab === 'novo' && (

            <div>

              <h2 className="text-xl font-bold mb-6 text ">
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