import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'

 function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Erro ao fazer login: ' + error.message)
    } else {
      navigate('/admin') // Se logar, vai para a sidebar
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#121212]  flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#1e1e1e] border border-blue/5 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-[#0057A8] font-black text-2xl italic">WHITE ROCK</h2>
          <p className="text-gray-400 text-sm">Acesso Administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-gray-500 ml-1">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 mt-1 focus:border-[#0057A8] outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-gray-500 ml-1">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 mt-1 focus:border-[#0057A8] outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0057A8] hover:bg-[#003B73] text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar no Painel'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login