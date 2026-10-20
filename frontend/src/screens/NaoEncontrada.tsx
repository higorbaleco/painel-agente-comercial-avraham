import { Compass, Home } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { CAMINHOS } from '../lib/rotas'

export function NaoEncontrada() {
  return (
    <Estado
      tipo="vazio"
      icone={<Compass size={24} aria-hidden="true" />}
      titulo="Página não encontrada"
      texto="O endereço não existe ou foi movido. Use o menu para continuar."
      acoes={
        <a className="botao botao--primario" href={CAMINHOS.inicio}>
          <Home size={18} aria-hidden="true" />
          Ir para o início
        </a>
      }
    />
  )
}
