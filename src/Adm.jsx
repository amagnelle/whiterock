import { useState } from 'react'
import { LayoutDashboard, Users, UserPlus, LogOut, Settings } from 'lucide-react' // Ícones bonitos

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'atletas', label: 'Gerenciar Atletas', icon: <Users size={20} /> },
    { id: 'novo', label: 'Novo Atleta', icon: <UserPlus size={20} /> },
    { id: 'config', label: 'Configurações', icon: <Settings size={20} /> },
  ]

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0b0b0b] border-r border-white/5 flex flex-col">
        {/* Logo no topo da Sidebar */}
        <div className="p-6 border-b border-white/5">
          <h2 className="text-[#0057A8] font-bold italic tracking-tighter">WR MANAGER <span className="text-white text-[10px] block not-italic opacity-50">PAINEL ADM</span></h2>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-[#0057A8] text-white shadow-lg shadow-[#0057A8]/20' 
                : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Rodapé da Sidebar (Botão Sair) */}
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
          <p className="text-gray-500 text-sm">Bem-vindo de volta, Tavin.</p>
        </header>

        {/* Onde as telas vão mudar */}
        <div className="bg-[#1e1e1e] border border-white/5 rounded-3xl p-8 min-h-[400px]">
           {activeTab === 'dashboard' && <p>Aqui você verá o resumo financeiro.</p>}
           {activeTab === 'atletas' && <p>Aqui ficará a tabela de editar/excluir.</p>}
           {activeTab === 'novo' && <p>Aqui ficará o formulário de cadastro.</p>}
        </div>
      </main>

    </div>
  )
}