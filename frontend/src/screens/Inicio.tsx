import { ArrowRight, Target } from 'lucide-react'
import { CAMINHOS } from '../lib/rotas'

export function Inicio() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">
        <Target size={16} aria-hidden="true" />
        Para pizzarias, restaurantes e lanchonetes em Maringá
      </p>
      <h1 className="hero__titulo">
        Sua pizzaria está <em>vendendo</em> ou <em>perdendo pedidos</em>?
      </h1>
      <p className="hero__texto">
        Qualifique empresas, organize conversas, agende diagnósticos e feche negócios com um sistema simples e visual.
      </p>
      <a className="botao botao--primario" href={CAMINHOS.empresas}>
        Começar prospecção
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </section>
  )
}
