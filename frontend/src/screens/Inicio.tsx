import { ArrowRight, Target } from 'lucide-react'
import { CAMINHOS } from '../lib/rotas'

const PASSOS = [
  'Definir o segmento (CNAEs) e a localidade',
  'Ver a lista de empresas encontradas na base da Receita',
  'Diagnosticar: score ICP e dor provável por empresa',
  'Revisar: aprovar ou reprovar cada lead, com motivo',
  'Acompanhar os aprovados no pipeline até o fechamento',
]

export function Inicio() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">
        <Target size={16} aria-hidden="true" />
        Inteligência comercial · Avraham Digital
      </p>
      <h1 className="hero__titulo">
        Da busca por CNAE ao <em>lead aprovado</em>, sem digitar empresa à mão
      </h1>
      <p className="hero__texto">
        Uma busca gera a lista de empresas do segmento na localidade escolhida. Você revisa cada lead e só os aprovados entram no pipeline.
      </p>
      <ol className="hero__passos">
        {PASSOS.map(passo => <li key={passo}>{passo}</li>)}
      </ol>
      <a className="botao botao--primario" href={CAMINHOS.buscaNova}>
        Nova busca
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </section>
  )
}
