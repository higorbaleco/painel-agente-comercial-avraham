import { useEffect, useState } from 'react'
import { Layout } from './components/layout/Layout'
import { AvisoProvider } from './lib/aviso'
import { useRota } from './lib/rotas'
import { Configuracoes, type Tema } from './screens/Configuracoes'
import { Empresas } from './screens/Empresas'
import { EmpresaForm } from './screens/EmpresaForm'
import { Inicio } from './screens/Inicio'
import { Painel } from './screens/Painel'

const TEMA_CHAVE = 'agente-comercial-tema'

function temaInicial(): Tema {
  const salvo = localStorage.getItem(TEMA_CHAVE)
  return salvo === 'claro' || salvo === 'alto-contraste' ? salvo : 'escuro'
}

export default function App() {
  const rota = useRota()
  const [tema, setTema] = useState<Tema>(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem(TEMA_CHAVE, tema)
  }, [tema])

  let conteudo
  switch (rota.nome) {
    case 'inicio':
      conteudo = <Inicio />
      break
    case 'painel':
      conteudo = <Painel />
      break
    case 'empresas':
      conteudo = <Empresas />
      break
    case 'nova':
      conteudo = <EmpresaForm id={null} />
      break
    case 'editar':
      conteudo = <EmpresaForm id={rota.id} />
      break
    case 'configuracoes':
      conteudo = <Configuracoes tema={tema} onTema={setTema} />
      break
  }

  return (
    <AvisoProvider>
      <Layout rotaAtual={rota.nome}>{conteudo}</Layout>
    </AvisoProvider>
  )
}
