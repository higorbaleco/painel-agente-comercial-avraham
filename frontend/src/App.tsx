import { useEffect, useState } from 'react'
import { Layout } from './components/layout/Layout'
import { AvisoProvider } from './lib/aviso'
import { useRota } from './lib/rotas'
import { salvarTema, temaInicial, type Tema } from './lib/tema'
import { Buscas } from './screens/Buscas'
import { Campanhas } from './screens/Campanhas'
import { Configuracoes } from './screens/Configuracoes'
import { Detalhe } from './screens/Detalhe'
import { Empresas } from './screens/Empresas'
import { EmpresaForm } from './screens/EmpresaForm'
import { Inicio } from './screens/Inicio'
import { Inteligencia } from './screens/Inteligencia'
import { ListaBusca } from './screens/ListaBusca'
import { NovaBusca } from './screens/NovaBusca'
import { Oportunidades } from './screens/Oportunidades'
import { Pipeline } from './screens/Pipeline'
import { NaoEncontrada } from './screens/NaoEncontrada'
import { Painel } from './screens/Painel'

export default function App() {
  const rota = useRota()
  const [tema, setTema] = useState<Tema>(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    salvarTema(tema)
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
    case 'detalhe':
      conteudo = <Detalhe id={rota.id} />
      break
    case 'editar':
      conteudo = <EmpresaForm id={rota.id} />
      break
    case 'buscas':
      conteudo = <Buscas />
      break
    case 'buscas-nova':
      conteudo = <NovaBusca />
      break
    case 'busca-lista':
      conteudo = <ListaBusca id={rota.id} />
      break
    case 'campanhas':
      conteudo = <Campanhas />
      break
    case 'oportunidades':
      conteudo = <Oportunidades />
      break
    case 'pipeline':
      conteudo = <Pipeline />
      break
    case 'inteligencia':
      conteudo = <Inteligencia />
      break
    case 'configuracoes':
      conteudo = <Configuracoes tema={tema} onTema={setTema} />
      break
    case 'nao-encontrada':
      conteudo = <NaoEncontrada />
      break
  }

  return (
    <AvisoProvider>
      <Layout rotaAtual={rota.nome} tema={tema} onTema={setTema}>
        {conteudo}
      </Layout>
    </AvisoProvider>
  )
}
