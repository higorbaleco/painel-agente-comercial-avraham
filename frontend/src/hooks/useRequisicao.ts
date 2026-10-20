import { useCallback, useEffect, useState } from 'react'
import { mensagemDe } from '../lib/api'

export type EstadoRequisicao = 'carregando' | 'pronto' | 'erro'

export function useRequisicao<T>(buscar: () => Promise<T>, chave: unknown[] = []) {
  const [dados, setDados] = useState<T | null>(null)
  const [estado, setEstado] = useState<EstadoRequisicao>('carregando')
  const [erro, setErro] = useState<string | null>(null)
  const [versao, setVersao] = useState(0)

  useEffect(() => {
    let ativo = true
    setEstado('carregando')
    setErro(null)

    buscar()
      .then(resultado => {
        if (!ativo) return
        setDados(resultado)
        setEstado('pronto')
      })
      .catch((e: unknown) => {
        if (!ativo) return
        setErro(mensagemDe(e))
        setEstado('erro')
      })

    return () => {
      ativo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...chave, versao])

  const recarregar = useCallback(() => setVersao(v => v + 1), [])

  return { dados, estado, erro, recarregar }
}
