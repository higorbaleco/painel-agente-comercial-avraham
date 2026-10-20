"""Score ICP: 8 indicadores (0 a 5) ponderados em 100 pontos.

Pesos definidos na proposta de qualificação (docs/radar-icp/conversa-3-qualificacao-cnpj.md).
Campo em branco = desconhecido, não nota zero: sem os 8 indicadores não há score.
"""

# (chave, rótulo, peso). A soma dos pesos precisa ser 100.
INDICADORES = (
    ('escala', 'Escala operacional', 15),
    ('capacidade', 'Capacidade de investimento', 20),
    ('dependencia', 'Dependência de atendimento', 15),
    ('dor', 'Dor ou ineficiência', 15),
    ('retorno', 'Potencial de retorno', 15),
    ('maturidade', 'Maturidade digital', 10),
    ('momento', 'Momento comercial', 5),
    ('decisor', 'Acesso ao decisor', 5),
)

NOTA_MIN = 0
NOTA_MAX = 5
CLASSE_A_MIN = 75
CLASSE_B_MIN = 55

assert sum(peso for _, _, peso in INDICADORES) == 100


def _nota_valida(valor) -> bool:
    return isinstance(valor, int) and not isinstance(valor, bool) and NOTA_MIN <= valor <= NOTA_MAX


def validar_indicadores(dados) -> dict:
    """Valida o dicionário de indicadores. Chaves ausentes ou None são aceitas (desconhecido)."""
    if dados is None:
        return {}
    if not isinstance(dados, dict):
        raise ValueError('Indicadores devem ser um objeto.')
    chaves = {chave for chave, _, _ in INDICADORES}
    desconhecidas = set(dados) - chaves
    if desconhecidas:
        raise ValueError(f'Indicador desconhecido: {sorted(desconhecidas)[0]}.')
    limpo = {}
    for chave in chaves:
        valor = dados.get(chave)
        if valor is None:
            continue
        if not _nota_valida(valor):
            raise ValueError(f'Indicador {chave} deve ser um inteiro de 0 a 5.')
        limpo[chave] = valor
    return limpo


def calcular(indicadores: dict):
    """Retorna (score, classe). Ambos None quando faltar algum indicador."""
    if not all(_nota_valida(indicadores.get(chave)) for chave, _, _ in INDICADORES):
        return None, None
    score = round(sum(indicadores[chave] * peso for chave, _, peso in INDICADORES) / NOTA_MAX)
    if score >= CLASSE_A_MIN:
        classe = 'A'
    elif score >= CLASSE_B_MIN:
        classe = 'B'
    else:
        classe = 'C'
    return score, classe
