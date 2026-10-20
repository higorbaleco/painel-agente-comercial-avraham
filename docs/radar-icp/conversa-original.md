Vamos criar um plugin de um Agente
Vamos criar um Agente de IA especializado, transformado em um plugin reutilizável no ChatGPT.

A ideia é construir um agente com identidade própria, metodologia de trabalho, capacidade de pesquisa, ferramentas, critérios de decisão e entregáveis padronizados.

Qual será a especialidade e a missão principal desse agente?

Me explica o que você está imaginando, mesmo que a ideia ainda esteja incompleta. A partir disso, vamos estruturar suas capacidades, definir como ele deve raciocinar e executar tarefas e criar o plugin.


Texto colado.txt
Documento

Pensou por 5m 7s
Plugin criado com sucesso
Radar ICP | Inteligência Comercial
O agente foi criado a partir da conversa que você enviou, com uma metodologia própria de pesquisa, qualificação e prospecção comercial.

Radar ICP — v1.0.0

Plugin privado · Avraham Digital
O que ele sabe fazer
Investigar empresas: pesquisar CNPJ, CNAE, presença digital, operação comercial, sinais de crescimento e potenciais necessidades.

Qualificar clientes: avaliar oito critérios ponderados em um score de até 100 pontos, considerando também a confiabilidade e a cobertura dos dados.

Identificar oportunidades: descobrir qual problema a empresa possivelmente pagaria para resolver e recomendar a oferta mais adequada.

Construir a prospecção: comparar empresas, priorizar leads, preparar abordagens personalizadas e aperfeiçoar o ICP a partir de vendas, cancelamentos e margens reais.

O diferencial do agente
Ele separa duas perguntas fundamentais:

A empresa tem potencial para comprar?

Vale a pena para a Avraham vender e atender essa empresa?

O agente considera capacidade de investimento, recorrência, custos de implantação, complexidade de entrega e retenção. Também distingue dados comprovados de hipóteses.

Incluí os casos da Pizza do Gordo, Dom Janu, Super Massas, Clínica Dr. Lucas Neres e Marcher Brasil como referências iniciais, sem presumir resultados não comprovados.

Como começar a usar
Experimente esta solicitação diretamente no plugin:

Analise a Dom Janu Restaurante & Pizzaria, CNPJ 61.982.967/0001-00. Investigue seu potencial para contratar a Avraham, quais dores justificariam um investimento, o melhor produto para oferecer e qual abordagem comercial devo utilizar. Compare seu perfil ao da Pizza do Gordo.

Importante: esta primeira versão é um agente de pesquisa e decisão comercial, não um crawler autônomo com banco de dados próprio. Ele utiliza as ferramentas de pesquisa disponíveis no ambiente e pode trabalhar com listas e planilhas fornecidas.

Também deixei o pacote completo disponível:

Baixar o plugin em ZIP

A versão 1.0.0 está salva e seus quatro módulos de especialidade foram verificados.


Lista Restaurantes Maringá .xlsx
Planilha
Bussolé rooftop ( Tem Chatbot já mas é ruim)
La Gondola Trattoria  (Só atendimento humano)
Granchio Bistrô (Só atendimento humano)
O Casarão Londrina (Só atendimento humano)
Fornalha Pizza Maringá (Acho que não tem fit, muito pequeno)
Manzini Pizzaria Maringá (Só atendimento Humano) 
Pizzaria MK fechada em reforma
J Maia Pizzaria | Sem perfil 
Costelaria O Rancho | Já tem a IA da própria Meta
Marcelus | Hilton
Bizzo Pizzaria | +55 44 9837-4994 | 
Pizzeria da Praça | Não tem IA nem nada
Pizza Prime  (44)99919-8908 Tem IA e atendimento Humano

Pensou por 6m 12s

from artifact_tool import Blob, SpreadsheetFile
path="/mnt/data/Lista Restaurantes Maringá .xlsx"
wb=SpreadsheetFile.import_xlsx(Blob.load(path))
print(wb.inspect({"kind":"sheet","include":"id,name"}).ndjson)
{"kind":"sheet","id":"ws/z9yozm","name":"Empresas","index":0,"range":"A1:BD52","address":"A1:BD52"}
{"kind":"sheet","id":"ws/07em7n","name":"Sócios e Responsáveis","index":1,"range":"A1:X78","address":"A1:X78"}
{"kind":"sheet","id":"ws/xa36mk","name":"Funcionários","index":2,"range":"A1:G314","address":"A1:G314"}

out=wb.inspect({"kind":"table","range":"Empresas!A1:BD3","include":"values","table_max_cols":56,"table_max_rows":3})
print(out.ndjson[:20000])
{"kind":"table","sheet":"Empresas","address":"A1:BD3","rows":3,"cols":56,"values":[["CNPJ","Razão Social","Nome Fantasia","Situação Cadastral","Data de Abertura","Idade (anos)","Porte","Tipo Jurídico","Matriz/Filial","Qtd. Filiais","Segmento","CNAE Principal — Código","CNAE Principal — Descrição","CNAEs Secundários (códigos)","Capital Social","Faturamento Estimado","Qtd. Funcionários","Simples — Status","MEI — Status","Simples — Data Opção","Endereço 1 — Tipo","Endereço 1 — Logradouro","Endereço 1 — Número","Endereço 1 — Complemento","Endereço 1 — Bairro","Endereço 1 — Cidade","Endereço 1 — UF","Endereço 1 — CEP","Endereço 2 — Tipo","Endereço 2 — Logradouro","Endereço 2 — Número","Endereço 2 — Complemento","Endereço 2 — Bairro","Endereço 2 — Cidade","Endereço 2 — UF","Endereço 2 — CEP","Endereço 3 — Tipo","Endereço 3 — Logradouro","Endereço 3 — Número","Endereço 3 — Complemento","Endereço 3 — Bairro","Endereço 3 — Cidade","Endereço 3 — UF","Endereço 3 — CEP","Endereço 4 — Tipo","Endereço 4 — Logradouro","Endereço 4 — Número","Endereço 4 — Complemento","Endereço 4 — Bairro","Endereço 4 — Cidade","Endereço 4 — UF","Endereço 4 — CEP","Telefones Fixos","Celulares","Emails","Celulares com WhatsApp"],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","FRANGO NA BRASA","ATIVA",39785,"17 anos 9 meses","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5620104,"Fornecimento de alimentos preparados preponderantemente para consumo domiciliar",null,110000,"DE R$ 100 MIL ATÉ R$ 250 MIL","ATE 9 FUNCIONARIOS","S","N",39785,"Avenida","Morangueira","746","Sala 02","Vila Santo Antonio","Maringa","PR","87030300",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"(44) 30316200; (44) 32628699","(44) 999267971","rei_lela@yahoo.com.br","(44) 999267971"],["22.378.147/0001-52","HABANERO GROUP LTDA","GRUPO HABANERO","ATIVA",42128,"11 anos 4 meses","DEMAIS","Sociedade Empresária Limitada","MATRIZ",5,"Alimentação",5611201,"Restaurantes e similares",null,300000,"DE R$ 250 MIL ATÉ R$ 500 MIL","ATE 9 FUNCIONARIOS","N","N",42128,"Avenida","Prudente De Morais","601","Box  71a73-92a94-97a104","Zona Armazem","Maringa","PR","87020121",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"(44) 30463250; (44) 30404026","(44) 997327021; (44) 999926401; (44) 999219080","nfe@qualittafood.com.br; escritoriocontroller@gmail.com; nfe@grupohabanero.com.br","(44) 997327021; (44) 999926401; (44) 999219080"]]}

s=wb.worksheets.get_item("Empresas")
raw=s.get_range("A1:BD52").values
headers=raw[0]
for i,r in enumerate(raw[1:],2):
    print(f'{i:>2} | {str(r[2] or "")[:27]:27} | {str(r[1] or "")[:25]:25} | {str(r[6] or ""):<7} | {str(r[15] or ""):<30} | {str(r[16] or ""):<20} | filial={r[9]}')
 2 | FRANGO NA BRASA             | RV FRANGO NA BRASA LTDA   | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   | ATE 9 FUNCIONARIOS   | filial=0
 3 | GRUPO HABANERO              | HABANERO GROUP LTDA       | DEMAIS  | DE R$ 250 MIL ATÉ R$ 500 MIL   | ATE 9 FUNCIONARIOS   | filial=5
 4 | PIMENTA BIQUINHO            | RESTAURANTE PIMENTA BIQUI | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   | ATE 9 FUNCIONARIOS   | filial=0
 5 | GIROLETO E FILHO RESTAURANT | GIROLETO RESTAURANTE LTDA | ME      | DE R$ 500 MIL ATÉ R$ 1 MM      | ATE 9 FUNCIONARIOS   | filial=0
 6 | BE HAPPY                    | BEHAPPY RESTAURANTE LTDA  | ME      | ATÉ R$ 50 MIL                  | ATE 9 FUNCIONARIOS   | filial=0
 7 | DOM CARNIVORO               | K6W HAMBURGUERIA LTDA     | EPP     | DE R$ 250 MIL ATÉ R$ 500 MIL   | ATE 9 FUNCIONARIOS   | filial=0
 8 | BLACK BULL STEAKHOUSE - CER | BLACKBULL RESTAURANTE LTD | ME      | DE R$ 500 MIL ATÉ R$ 1 MM      | ATE 9 FUNCIONARIOS   | filial=0
 9 | DOMINO S PIZZA MARINGA      | FLK FOODS LTDA.           | ME      | DE R$ 1 MM ATÉ R$ 2 MM         | ATE 9 FUNCIONARIOS   | filial=0
10 | CASEBRE DO DITO             | CASEBRE DO DITO RESTAURAN | EPP     | DE R$ 250 MIL ATÉ R$ 500 MIL   | ATE 9 FUNCIONARIOS   | filial=0
11 | PIZZARIA MARCELUS           | HILTON ISHIZU PIZZARIA LT | ME      | DE R$ 1 MM ATÉ R$ 2 MM         | ATE 9 FUNCIONARIOS   | filial=0
12 | PASTEL DO TOM               | PASTEL DO TOM - MASSAS E  | ME      | DE R$ 500 MIL ATÉ R$ 1 MM      | ATE 9 FUNCIONARIOS   | filial=0
13 | LANCHONETE SAL & LIMAO      | RAFAELA GOES PICIOLI LANC | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   | ATE 9 FUNCIONARIOS   | filial=0
14 | ALMAZA                      | GOD ALIMENTOS LTDA        | ME      | ATÉ R$ 50 MIL                  | ATE 9 FUNCIONARIOS   | filial=0
15 | PIZZARIA E COSTELARIA J. MA | MAIA & LOUSANO PIZZARIA E | EPP     | DE R$ 500 MIL ATÉ R$ 1 MM      | ATE 9 FUNCIONARIOS   | filial=0
16 | CHALE DO BOLO               | MARQUEZONI BOLOS LTDA     | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   | ATE 9 FUNCIONARIOS   | filial=0
17 | BIZZA RESTAURANTE E PIZZARI | BIZZAVO RESTAURANTE E PIZ | ME      | ATÉ R$ 50 MIL                  | ATE 9 FUNCIONARIOS   | filial=0
18 | TOMIO PASTEIS E SALGADOS    | NAKAMURA E CIA LTDA       | ME      | DE R$ 250 MIL ATÉ R$ 500 MIL   | ATE 9 FUNCIONARIOS   | filial=0
19 | BRAZAI SUSHI                | H2G COMERCIO DE ALIMENTOS | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   | ATE 9 FUNCIONARIOS   | filial=0
20 | PIZZARIA SAO FRANCISCO      | PIZZARIA SAO FRANCISCO LT | ME      | ATÉ R$ 50 MIL                  | ATE 9 FUNCIONARIOS   | filial=0
21 | FOGAREU ASSADOS             | FOGAREU - ASSADOS E MASSA | ME      | ATÉ R$ 50 MIL                  | ATE 9 FUNCIONARIOS   | filial=1
22 | ARMAZEM RESTAURANTE         | RESTAURANTE ARMAZEM MARIN | DEMAIS  | DE R$ 2 MM ATÉ R$ 5 MM         | ATE 9 FUNCIONARIOS   | filial=0
23 | STREET BURGER SMASH HOUSE   | VIELA BURGER HAMBURGUERIA | EPP     | DE R$ 100 MIL ATÉ R$ 250 MIL   | ATE 9 FUNCIONARIOS   | filial=0
24 | OKA SUSHI                   | BORTOLETTO RESTAURANTES L | ME      | DE R$ 50 MIL ATÉ R$ 100 MIL    | ATE 9 FUNCIONARIOS   | filial=0
25 | COSTELARIA E PETISCARIA O R | COSTELARIA E PETISCARIA O | ME      | DE R$ 500 MIL ATÉ R$ 1 MM      |                      | filial=0
26 | SBR ADMINISTRADORA DE BENS  | SBR ADMINISTRADORA DE BEN | DEMAIS  | DE R$ 1 MM ATÉ R$ 2 MM         |                      | filial=0
27 | M J LANCHES                 | M. J. LANCHES LTDA        | ME      | DE R$ 50 MIL ATÉ R$ 100 MIL    |                      | filial=0
28 | REI DA PIZZA                | REI DA PIZZA DELIVERY EXP | ME      | DE R$ 500 MIL ATÉ R$ 1 MM      |                      | filial=0
29 | PIZZARIA NICE DELIVERY      | ZANELLI PIZZARIA LTDA     | ME      | DE R$ 1 MM ATÉ R$ 2 MM         |                      | filial=0
30 | PIZZERIA DA PRACA           | PIZZERIA DA PRACA LTDA    | ME      | ATÉ R$ 50 MIL                  |                      | filial=0
31 | RESTAURANTE E PIZZARIA MK   | LAERCIO LICHMANN RAIMUNDO | ME      | ATÉ R$ 50 MIL                  |                      | filial=0
32 | THE BOOT PIZZA BAR          | ASSIS E POPPI PIZZARIA LT | ME      | ATÉ R$ 50 MIL                  |                      | filial=0
33 | R2 LANCHONETE E ARENA SOCIE | R2 LANCHONETE E COMERCIO  | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   |                      | filial=0
34 | CAFETERIA E CHOCOLATARIA LU | VAZ - CAFETERIA E CHOCOLA | ME      | DE R$ 250 MIL ATÉ R$ 500 MIL   |                      | filial=0
35 | PIZZA PRIME MARINGA         | MARTINS COMERCIO DE ALIME | ME      | DE R$ 250 MIL ATÉ R$ 500 MIL   |                      | filial=0
36 | FRANGO NO POTE MARINGA      | FNP FRANGO MARINGA LTDA   | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   |                      | filial=0
37 | MATRIARCA PUB               | MATRIARCA BAR E RESTAURAN | ME      | DE R$ 250 MIL ATÉ R$ 500 MIL   |                      | filial=0
38 | ESTACAO BOLICHE             | ESTACAO ENTRETENIMENTO IN | ME      | DE R$ 2 MM ATÉ R$ 5 MM         |                      | filial=0
39 | TAMURA CAFE ESPECIAL        | TAMURA CAFE ESPECIAL LTDA | ME      | DE R$ 500 MIL ATÉ R$ 1 MM      |                      | filial=0
40 |                             | DIVINA COSTELA LTDA       | ME      | DE R$ 100 MIL ATÉ R$ 250 MIL   |                      | filial=0
41 | TAKE AND GO PIZZARIA        | TAKE AND GO PIZZARIA LTDA | ME      | DE R$ 250 MIL ATÉ R$ 500 MIL   |                      | filial=0
42 | BURGER PERK                 | PERK HAMBURGUERIA LTDA    | ME      | DE R$ 250 MIL ATÉ R$ 500 MIL   |                      | filial=0
43 | PIZZARIA JACARE VERMELHO HE | PIZZARIA HERVAL LTDA      | EPP     | DE R$ 50 MIL ATÉ R$ 100 MIL    |                      | filial=0
44 | DONA OSIRES BAR E LANCHONET | SILVA E FORTUNATO LTDA    | ME      | DE R$ 50 MIL ATÉ R$ 100 MIL    |                      | filial=0
45 | PANELA DO DJALMA            | PANELA DO DJALMA DELIVERY | ME      | NÃO INFORMADO                  |                      | filial=0
46 | MANZINI PIZZARIA MARINGA    | CARLA FRIIA BERNARDO TAZI | ME      | NÃO INFORMADO                  |                      | filial=0
47 | POKER BURGER                | 60.253.185 RAYFRAN DARLLY | ME      | DE R$ 50 MIL ATÉ R$ 100 MIL    |                      | filial=0
48 | TOP DOG LANCHES             | CAIO PACHECO DA SILVA TOP | ME      | DE R$ 50 MIL ATÉ R$ 100 MIL    |                      | filial=0
49 | CAVALINHO COSTELARIA        | CAVALINHO COSTELARIA MARI | ME      | NÃO INFORMADO                  |                      | filial=0
50 | SANTA PIZZA                 | FSF MASSAS LTDA           | ME      | NÃO INFORMADO                  |                      | filial=0
51 | JG BURGUER                  | F. H. GESUALDO BURGUER LT | ME      | NÃO INFORMADO                  |                      | filial=0
52 | DOG KING                    | MAYM FAST FOOD LTDA       | ME      | NÃO INFORMADO                  |                      | filial=0

target_rows = [11,15,17,25,30,31,35,46,9,22,29,38,3]
for i in target_rows:
 r=raw[i-1]
 print(i, r[0], r[2],r[1],f"{r[20]} {r[21]} {r[22]}, {r[25]}", "cap:",r[14],"rec:",r[15],"fone:",r[52:56])
11 28.589.698/0001-41 PIZZARIA MARCELUS HILTON ISHIZU PIZZARIA LTDA Rua Paranagua 450, Maringa cap: 100000 rec: DE R$ 1 MM ATÉ R$ 2 MM fone: ['(44) 32620442', '(44) 999519937; (44) 998298154', 'ishizuhilton@hotmail.com; jalopes.transportes@gmail.com', '(44) 999519937; (44) 998298154']
15 31.583.140/0001-63 PIZZARIA E COSTELARIA J. MAIA MAIA & LOUSANO PIZZARIA E COSTELARIA LTDA. Avenida Doutor Alexandre Rasgulaeff 2586, Maringa cap: 400000 rec: DE R$ 500 MIL ATÉ R$ 1 MM fone: ['🚫 Telefone de contador; (44) 32686184', '(44) 998590992', 'esc_santos@hotmail.com; joaolousano@gmail.com', '(44) 998590992']
17 31.749.851/0001-65 BIZZA RESTAURANTE E PIZZARIA BIZZAVO RESTAURANTE E PIZZARIA LTDA Avenida Sao Paulo 2925, Maringa cap: 104500 rec: ATÉ R$ 50 MIL fone: ['🚫 Telefone de contador', None, 'gi_botti@hotmail.com', None]
25 36.624.902/0001-46 COSTELARIA E PETISCARIA O RANCHO COSTELARIA E PETISCARIA O RANCHO LTDA Avenida Kakogawa 1095, Maringa cap: 110000 rec: DE R$ 500 MIL ATÉ R$ 1 MM fone: ['(44) 33548469', '(44) 991142828', 'oranchomaringa@hotmail.com', '(44) 991142828']
30 38.545.699/0001-48 PIZZERIA DA PRACA PIZZERIA DA PRACA LTDA Praca Rocha Pombo 248, Maringa cap: 125000 rec: ATÉ R$ 50 MIL fone: ['(44) 33463536', '(47) 999326002', None, '(47) 999326002']
31 41.480.147/0001-03 RESTAURANTE E PIZZARIA MK LAERCIO LICHMANN RAIMUNDO RESTAURANTE E PIZZARIA Avenida Tuiuti 1375, Maringa cap: 100000 rec: ATÉ R$ 50 MIL fone: ['🚫 Telefone de contador', '(44) 997733520', 'v.gcontabilidade@hotmail.com', '(44) 997733520']
35 46.180.589/0001-58 PIZZA PRIME MARINGA MARTINS COMERCIO DE ALIMENTOS LTDA Avenida Advogado Horacio Raccanello Filho 5410, Maringa cap: 350000 rec: DE R$ 250 MIL ATÉ R$ 500 MIL fone: ['(44) 33465271; (44) 30466984', '(44) 991660019', 'diasmarcos.araujo@gmail.com; maringa@pizzaprime.com.br; gabriel.concon@pizzaprime.com.br', None]
46 58.421.782/0001-12 MANZINI PIZZARIA MARINGA CARLA FRIIA BERNARDO TAZINAZO LTDA Avenida Doutor Alexandre Rasgulaeff 5368, Maringa cap: 250000 rec: NÃO INFORMADO fone: ['🚫 Telefone de contador', None, 'contato@escritoriomillenium.com.br', None]
9 28.249.012/0001-73 DOMINO S PIZZA MARINGA FLK FOODS LTDA. Avenida Joao Paulino Vieira Filho 342, Maringa cap: 200000 rec: DE R$ 1 MM ATÉ R$ 2 MM fone: ['🚫 Telefone de contador', '(44) 999160041; (44) 997320062', 'dominospizzamaringa@hotmail.com', '(44) 999160041; (44) 997320062']
22 33.101.153/0001-84 ARMAZEM RESTAURANTE RESTAURANTE ARMAZEM MARINGA LTDA Avenida Joaquim Duarte Moleirinho 1801, Maringa cap: 200000 rec: DE R$ 2 MM ATÉ R$ 5 MM fone: ['(45) 30384642', None, 'armazemrestaurantemga@gmail.com; financeiro@restaurantearmazem.com.br', None]
29 38.036.177/0001-10 PIZZARIA NICE DELIVERY ZANELLI PIZZARIA LTDA Avenida Kakogawa 981, Maringa cap: 110000 rec: DE R$ 1 MM ATÉ R$ 2 MM fone: [None, '(44) 999077089; (44) 999946969; (44) 999831103', 'marciazanelli@gmail.com', '(44) 999077089; (44) 999946969; (44) 999831103']
38 47.081.349/0001-69 ESTACAO BOLICHE ESTACAO ENTRETENIMENTO INGA LTDA Avenida Morangueira 3196, Maringa cap: 110200 rec: DE R$ 2 MM ATÉ R$ 5 MM fone: ['(44) 30318683', None, 'financeiro@estacaoboliche.com.br; comercial@estacaoboliche.com.br', None]
3 22.378.147/0001-52 GRUPO HABANERO HABANERO GROUP LTDA Avenida Prudente De Morais 601, Maringa cap: 300000 rec: DE R$ 250 MIL ATÉ R$ 500 MIL fone: ['(44) 30463250; (44) 30404026', '(44) 997327021; (44) 999926401; (44) 999219080', 'nfe@qualittafood.com.br; escritoriocontroller@gmail.com; nfe@grupohabanero.com.br', '(44) 997327021; (44) 999926401; (44) 999219080']

from artifact_tool import SpreadsheetFile
from datetime import datetime

triagem = [
# nome, cidade, status, source statement, internet evidence, confirmed CNPJ/identity, fit, diagnosis, offer, priority, confidence, validation, contact, source, notes
("Boussolé Rooftop","Londrina","Chatbot existente, ruim (relato)","Reservas de almoço/jantar, experiências e eventos anunciados publicamente","Não consta na base de Maringá","A — investigar primeiro","A automação atual pode deixar reservas especiais e eventos sem acompanhamento","Recuperação de reservas + qualificação de eventos + pós-visita","A","Média","Medir reservas que ficam sem resposta; testar a jornada atual e identificar gestor","", "https://linktr.ee/boussolerooftop","Não vender simplesmente outro chatbot; já tem reserva online."),
("La Gondola Trattoria","Londrina","Atendimento humano (relato)","Trattoria histórica, reservas por WhatsApp, experiência gastronômica e ocasiões especiais","Não consta na base de Maringá","A — investigar primeiro","Rotina de reservas e clientes de ocasião pode gerar trabalho repetitivo","Confirmações + follow-up de reservas + relacionamento","A","Média","Validar reservas/mês, cancelamentos e equipe envolvida","(43) 99995-6050","https://restaurantelagondola.com.br/","Não confundir com La Gôndola de Maringá."),
("Granchio Bistrô","Londrina","Atendimento humano (relato)","Bistrô com reservas/delivery; tíquete percebido superior a alimentação rápida","Não consta na base de Maringá","A — investigar primeiro","Reservas, eventos e clientes que retornam podem justificar réguas de relacionamento","Reservas, pós-visita e campanhas de retorno","A","Média","Verificar agenda, lista de clientes, consentimentos, eventos e capacidade de investimento","(43) 99944-8800","https://restaurantguru.com.br/Granchio-Bistro-Londrina","Ticket ao consumidor não é margem nem orçamento de tecnologia."),
("O Casarão Londrina","Londrina","Atendimento humano (relato)","CNPJ ativo; serviços relacionados a eventos/bufê e canal WhatsApp público","Não consta na base de Maringá","A — investigar primeiro","Eventos/grupos e atendimento recorrente podem gerar alto valor de negociação","Qualificação de eventos + orçamento + acompanhamento","A","Média","Confirmar volume e valor de eventos, tempo de resposta, decisor","(43) 3026-2020","https://casadosdados.com.br/solucao/cnpj/o-casarao-restaurante-londrina-ltda-44587249000110","CNPJ público 44.587.249/0001-10; conferir mesma operação."),
("Manzini Pizzaria Maringá","Maringá","Atendimento humano (relato)","Rodízio, salão, reservas e grupos; presença pública com operação estruturada","58.421.782/0001-12 — linha 46","A — investigar primeiro","Reservas de grupos/aniversários, dúvidas recorrentes e confirmação","Jornada de reservas e eventos + confirmações","A","Média","Reservas/semana, gestão de aniversários, cancelamentos e taxa de comparecimento","(44) 99834-6798","https://www.google.com/maps/search/?api=1&query=Manzini+Pizzaria+Maringa","O diferencial não é necessariamente chatbot de delivery."),
("Fornalha Pizza Maringá","Maringá","Provavelmente pequeno (hipótese do usuário)","Pizzaria identificada em delivery/retirada; sinais de pedidos em marketplace","Não consta na base de Maringá","B — qualificar volume","A presença em aplicativos merece checagem antes de concluir falta de fit","Recompra, reativação da base e atendimento de pedidos","B","Média","Volume de pedidos por canal, pedidos diretos vs apps, tamanho da equipe","(44) 3228-3102","https://www.diariocidade.com/pr/maringa/guia/restaurantes/pg-9/","Não descartar pelo porte percebido sem medir transações."),
("Pizzaria MK","Maringá","Fechada para reforma (relato)","CNPJ aparece na planilha; funcionamento atual não confirmado independentemente","41.480.147/0001-03 — linha 31","P — monitorar reabertura","Campanha de reabertura pode ser oportunidade quando a casa retomar","Reativação / campanha de reinauguração","P","Baixa","Confirmar reabertura e novo responsável; não prospectar oferta mensal agora","","","Reforma não equivale a empresa baixada ou encerrada."),
("J Maia Pizzaria","Maringá","Sem perfil encontrado (relato)","Rodízio, buffet e costelaria com endereço e telefone público identificáveis","31.583.140/0001-63 — linha 15 (endereço pode variar)","B — qualificar canal","Reservas, eventos, celebrações e contatos recebidos por telefone","Central de reservas + follow-up de grupos","B","Média","Verificar contas oficiais, número correto, demanda por grupos","(44) 3268-6184","https://www.diariocidade.com/pr/maringa/guia/restaurantes/pg-9/","Ausência de perfil social não é ausência de operação comercial."),
("Costelaria O Rancho","Maringá","Usa IA da Meta (relato)","Operação em rodízio, grupos, reservas e delivery; presença em marketplaces","36.624.902/0001-46 — linha 25","B — qualificar lacunas","IA nativa pode não acompanhar campanhas e jornada, mas limites não foram testados","Jornada de reservas + retorno de clientes, apenas se houver lacuna","B","Média","Testar IA atual; confirmar se há contatos consentidos e processo de recompra","(44) 99114-2828","https://restaurantguru.com.br/Costelaria-e-Petiscaria-o-Rancho-Maringa","Não assumir que IA atual é ruim nem propor troca sem diagnóstico."),
("Pizzaria Marcelus | Hilton","Maringá","Sem diagnóstico de atendimento (relato)","Registro Pizzaria Marcelus; razão social Hilton Ishizu Pizzaria Ltda","28.589.698/0001-41 — linha 11","B — qualificar canal","Delivery e atendimento comercial precisam de verificação direta","Atendimento e recompra, condicional ao volume","B","Média","WhatsApp de vendas atual, pedidos/mês, atendimento e fidelização","(44) 99951-9937","", "Correspondência Hilton/Marcelus vem da planilha do usuário."),
("Bizzo Pizzaria","Não confirmado","Contato informado; automação não diagnosticada","Nome e número do usuário; não foi possível confirmar correspondência pública inequívoca","Não vincular à Bizza da planilha sem confirmação","I — identidade pendente","Não há identidade/porte confirmados para propor solução","Investigar somente após confirmar estabelecimento","I","Baixa","Validar cidade, endereço, Instagram, CNPJ e telefone com a empresa","+55 44 9837-4994","", "BIZZA RESTAURANTE E PIZZARIA na base não significa Bizzo."),
("Pizzeria da Praça","Maringá","Sem IA/automação (relato)","Atende via marketplace de delivery; CNPJ ativo e operação local","38.545.699/0001-48 — linha 30","B — qualificar volume","Recorrência de pedidos pode justificar marketing e automação leve","Recompra + pós-venda antes de IA complexa","B","Média","Volume mensal, distribuição por app/WhatsApp, margem e consentimentos","(44) 3346-3536","https://aiqfome.com/PR/maringa/pizzeria-da-praca","Estimativa de faturamento da base é baixa e sem período/metodologia definidos."),
("Pizza Prime Maringá","Maringá","IA + humanos (relato)","Unidade de rede, salão, delivery e retirada; identificação societária pública","46.180.589/0001-58 — linha 35","B — qualificar autonomia","Possível melhoria de recuperação/pós-venda, sujeita a franqueadora e sistemas","Otimizar jornada existente, integração e CRM","B","Média","Quem aprova tecnologia? Medir falhas da IA atual e autonomia da unidade","(44) 99919-8908","https://www.econodata.com.br/consulta-empresa/46180589000158-martins-comercio-de-alimentos-ltda","Não abordar com promessa de instalar IA do zero."),
]
len(triagem)
13

from artifact_tool import Workbook

painel=wb.worksheets.add("Radar - Painel")
short=wb.worksheets.add("Radar - 13 Restaurantes")
mais=wb.worksheets.add("Radar - Novos Alvos")
guia=wb.worksheets.add("Radar - Metodologia")

# Tabela de triagem: rastreabilidade explícita entre relatos, pesquisas e hipótese comercial.
colheaders=["Empresa","Cidade","Relato do teste","Sinal público observado","Correspondência na base","Etapa ICP","Dor a validar","Oferta hipotética","Prioridade","Confiança","Próxima verificação","Contato","Fonte pública","Observação e risco","Etapa comercial"]
short.get_range("A1:O1").values=[colheaders]
rows=[list(r)+["Pesquisa"] for r in triagem]
rows[6][-1]="Pausado" # MK
short.get_range("A2:O14").values=rows
short.freeze_panes.freeze_rows(1)

# Replicar as oportunidades adicionais da base sem qualificá-las como oportunidades comprovadas.
extra_rows_data=[
(3,"Grupo Habanero","5 filiais registradas na planilha","Operação multiunidade a confirmar","Padronização de atendimento, CRM, relacionamento B2B", "Confirmar composição do grupo, canais e poder de decisão", "B - pesquisar","Média"),
(22,"Armazém Restaurante","Faturamento estimado na base: R$ 2 a 5 MM, período não informado","Empresa com porte declarado 'demais'","Atendimento, reservas e pós-venda", "Verificar se a faixa de estimativa é atual e qual a jornada real", "B - pesquisar","Baixa"),
(38,"Estação Boliche","Estimativa de faturamento: R$ 2 a 5 MM, período não informado","Lazer/eventos e alimentação","Reserva de pistas, grupos, festas e recuperação de eventos", "Validar canal de reservas e pacotes de eventos", "B - pesquisar","Média"),
(29,"Pizzaria Nice Delivery","Estimativa de faturamento: R$ 1 a 2 MM, período não informado","Modelo delivery","Recompra e recuperação de clientes inativos", "Validar pedidos mensais, mix apps/WhatsApp e margem", "B - pesquisar","Média"),
(9,"Domino's Pizza Maringá","Estimativa de faturamento: R$ 1 a 2 MM, período não informado","Unidade vinculada à marca de rede","Relacionamento/recompra, apenas com autonomia tecnológica", "Checar políticas de franquia e decisão centralizada", "C - validar autonomia","Média"),
(5,"Giroleto e Filho Restaurante","Estimativa de faturamento: R$ 500 mil a 1 MM, período não informado","Restaurante estabelecido no cadastro","Atendimento e relacionamento recorrente", "Validar canais digitais e operação", "B - pesquisar","Baixa"),
]
extra_header=["Empresa","CNPJ","Cidade","Indício da planilha","Hipótese de operação","Oportunidade a investigar","Próximo dado necessário","Fila","Confiança","Fonte"]
mais.get_range("A1:J1").values=[extra_header]
extra_rows=[]
for ri,nome,sinal,oper,hip,acao,fila,conf in extra_rows_data:
    r=raw[ri-1]
    extra_rows.append([nome,r[0],r[25],sinal,oper,hip,acao,fila,conf,"Planilha original do usuário — aba Empresas"])
mais.get_range("A2:J7").values=extra_rows
mais.freeze_panes.freeze_rows(1)

# Dashboard legível e com métricas formula-driven.
painel.merge_cells("A1:J2")
painel.get_range("A1").values=[["RADAR ICP  |  FOOD  •  TRIAGEM COMERCIAL"]]
painel.merge_cells("A3:J3")
painel.get_range("A3").values=[["Maringá + Londrina  |  19 out 2026  |  hipóteses não equivalem a fit confirmado"]]

metrics=[
("Empresas na planilha original","=COUNTA(Empresas!A2:A52)"),
("Restaurantes testados pelo usuário","=COUNTA('Radar - 13 Restaurantes'!A2:A14)"),
("Correspondências diretas na base",'=COUNTIF(\'Radar - 13 Restaurantes\'!E2:E14,"*linha*")'),
("Alta prioridade preliminar",'=COUNTIF(\'Radar - 13 Restaurantes\'!I2:I14,"A")'),
("A investigar (prioridade B)",'=COUNTIF(\'Radar - 13 Restaurantes\'!I2:I14,"B")'),
("Pendentes / pausados",'=COUNTIF(\'Radar - 13 Restaurantes\'!I2:I14,"P")+COUNTIF(\'Radar - 13 Restaurantes\'!I2:I14,"I")'),
]
painel.get_range("A5:B10").values=[[m,None] for m,_ in metrics]
for ix,(_,formula) in enumerate(metrics,5):
    painel.get_range(f"B{ix}").formulas=[[formula]]
painel.merge_cells("D5:J5")
painel.get_range("D5").values=[["O QUE MUDOU COM OS TESTES"]]
summary=[
"1. Ter atendimento 100% humano não prova que automatizar seja rentável.",
"2. IA existente não elimina fit: verificar lacunas, integrações e métricas.",
"3. Restaurantes de salão/rodízio: reserva, eventos e recompra antes de chatbot de pedidos.",
"4. Fornalha: pequeno porte presumido não basta para descarte; medir volume.",
"5. Bizzo/Bizza: identidade não resolvida, não unificar.",
"6. CNPJ/capital/estimativas de receita não confirmam orçamento atual."
]
for ix,st in enumerate(summary,6):
    painel.merge_cells(f"D{ix}:J{ix}")
    painel.get_range(f"D{ix}").values=[[st]]
painel.merge_cells("A13:J13")
painel.get_range("A13").values=[["CRITÉRIOS DE AVANÇO PARA DIAGNÓSTICO"]]
for ix,sentence in enumerate([
"• Volume comprovado de conversas, reservas, orçamentos ou pedidos.",
"• Problema relevante: perdas de conversão, horas de trabalho ou baixa recompra.",
"• Capacidade de investimento validada pelo decisor — nunca apenas pelo cadastro.",
"• Prova de execução: acesso ao canal, integração necessária, LGPD e limites técnicos.",
"• Lucro para cliente e margem de sustentação para a Avraham."
],14):
    painel.merge_cells(f"A{ix}:J{ix}")
    painel.get_range(f"A{ix}").values=[[sentence]]
painel.merge_cells("A21:J21")
painel.get_range("A21").values=[["DADOS DE ORIGEM: abas Empresas, Sócios e Responsáveis e Funcionários foram preservadas sem alteração intencional."]]

# Matriz de uso do Radar sem scores artificiais.
guia.get_range("A1:D1").values=[["Critério","Como testar na conversa","Qual evidência aceita","Alerta"]]
method=[
("Demanda operacional","Pedidos/semana? Reservas/semana? Atendimento no WhatsApp?","Métrica do cliente, amostragem real","Avaliações ≠ pedidos"),
("Dor mensurável","Quantos contatos ficam sem resposta? Quantos cancelam?","Tempo de resposta, faltas, volume de orçamentos","Relato isolado não confirma perda"),
("Impacto potencial","Ticket e margem de contribuição? Horas liberadas?","Dados fornecidos pelo decisor","Receita ≠ margem ≠ caixa"),
("Maturidade digital","Usa WhatsApp Business, chatbot, CRM e software?","Demonstração ou sistema identificado","Sem IA ≠ necessidade"),
("Viabilidade técnica","Onde entra o dado? APIs/webhooks? Políticas de mensagens?","Acesso, documentação, consentimento e escopo","Integração pode inviabilizar"),
("Recorrência","Qual tarefa importante a solução fará todo mês?","KPI de reservas, recuperação, recompra","Mensalidade deve ter valor contínuo"),
("Economia da Avraham","Horas, integrações, API, suporte, impostos e risco?","Orçamento de implantação + custo de operação","Não vender contrato sem margem"),
("Decisão","Quem aprova? Prazo? Orçamento? Franquia?","Conversa com decisor / confirmação da alçada","Franquia pode impedir compra local")
]
guia.get_range("A2:D9").values=[list(m) for m in method]
guia.get_range("A11:D11").values=[["Faixa","Definição","Ação","Confiança"]]
defs=[
("A","Evidência pública de operação e proposta de valor plausível","Abordar para validar dados, não enviar proposta cega","Confiança da pesquisa, não da compra"),
("B","Potencial possível com dúvida relevante","Pesquisar e testar jornada; marcar diagnóstico se houver lacuna","Sempre registrar dado não encontrado"),
("I","Identidade inconclusiva","Resolver CNPJ/telefone/endereço antes de prospectar","Sem pontuação comercial"),
("P","Operação temporariamente indisponível ou outra restrição","Verificar retomada antes de entrar na cadência","Não confundir pausa com descarte")
]
guia.get_range("A12:D15").values=[list(v) for v in defs]
print("Criadas:", [x for x in ["Radar - Painel","Radar - 13 Restaurantes","Radar - Novos Alvos","Radar - Metodologia"]])
Criadas: ['Radar - Painel', 'Radar - 13 Restaurantes', 'Radar - Novos Alvos', 'Radar - Metodologia']

MINT="#1B9C9B"; DARK="#11343B"; LIGHT="#EAF7F6"; MUTED="#697D86"; WHITE="#FFFFFF"; SOFT="#F2F6F6"
hdr={"fill":DARK,"font":{"bold":True,"color":WHITE},"vertical_alignment":"center","wrap_text":True,"row_height":36}
for sh,ncols,lastrow,widths in [
    (short,15,14,[28,14,26,47,35,22,52,43,13,14,47,22,45,48,18]),
    (mais,10,7,[29,23,14,45,39,45,45,20,15,41]),
    (guia,4,15,[24,56,52,48])]:
    sh.get_range_by_indexes(0,0,1,ncols).format=hdr
    sh.get_range_by_indexes(0,0,lastrow,ncols).format.wrap_text=True
    if sh==short: sh.get_range("A2:O14").format.row_height=64
    elif sh==mais: sh.get_range("A2:J7").format.row_height=56
    else: sh.get_range("A2:D15").format.row_height=54
    for c, w in enumerate(widths):
        sh.get_range_by_indexes(0,c,lastrow,1).format.column_width=w
short.get_range("I2:I14").conditional_formats.add_custom('=I2="A"',{"fill":"#DBF4F0","font":{"color":"#075F5C","bold":True}})
short.get_range("I2:I14").conditional_formats.add_custom('=I2="B"',{"fill":"#FDF3D5","font":{"color":"#8A5A10","bold":True}})
short.get_range("I2:I14").conditional_formats.add_custom('=OR(I2="I",I2="P")',{"fill":"#FBE4E6","font":{"color":"#9C3041","bold":True}})
short.get_range("O2:O14").data_validation={"rule":{"type":"list","values":["Não iniciado","Pesquisa","Contato","Diagnóstico","Proposta","Ganho","Perdido","Pausado"]}}
short.get_range("J2:J14").data_validation={"rule":{"type":"list","values":["Alta","Média","Baixa"]}}
painel.get_range("A1:J2").format={"fill":DARK,"font":{"bold":True,"color":WHITE,"size":18},"vertical_alignment":"center","row_height":28}
painel.get_range("A3:J3").format={"fill":LIGHT,"font":{"color":DARK},"row_height":30}
painel.get_range("A5:A10").format={"fill":SOFT,"font":{"bold":True,"color":DARK},"row_height":32}
painel.get_range("B5:B10").format={"fill":LIGHT,"font":{"bold":True,"color":MINT,"size":17},"horizontal_alignment":"center","row_height":32}
painel.get_range("D5:J5").format={"fill":DARK,"font":{"bold":True,"color":WHITE},"row_height":32}
painel.get_range("D6:J11").format={"fill":SOFT,"font":{"color":DARK},"wrap_text":True,"row_height":27}
painel.get_range("A13:J13").format={"fill":DARK,"font":{"bold":True,"color":WHITE},"row_height":32}
painel.get_range("A14:J18").format={"fill":SOFT,"font":{"color":DARK},"row_height":29}
painel.get_range("A21:J21").format={"fill":LIGHT,"font":{"color":MUTED},"wrap_text":True,"row_height":30}
for c in "ABCDEFGHIJ":
    painel.get_range(f"{c}1:{c}22").format.column_width=20
painel.get_range("A1:A22").format.column_width=24
painel.get_range("B1:B22").format.column_width=15
for a in ("A5:A10","B5:B10"): painel.get_range(a).format.wrap_text=True
print(wb.inspect({"kind":"table","range":"Radar - Painel!A5:B10","include":"values,formulas","table_max_rows":6,"table_max_cols":2}).ndjson[:8000])
{"kind":"table","sheet":"Radar - Painel","address":"A5:B10","rows":6,"cols":2,"values":[["Empresas na planilha original",51],["Restaurantes testados pelo usuário",13],["Correspondências diretas na base",0],["Alta prioridade preliminar",5],["A investigar (prioridade B)",6],["Pendentes / pausados",2]]}

short.get_range("P1").values=[["Consta na base?"]]
presence=["Sim" if "linha" in x[4].lower() else "Não" for x in triagem]
short.get_range("P2:P14").values=[[p] for p in presence]
short.get_range("P1").format=hdr
short.get_range("P1:P14").format.column_width=18
short.get_range("P2:P14").format.wrap_text=True
painel.get_range("B7").formulas=[["=COUNTIF('Radar - 13 Restaurantes'!P2:P14,\"Sim\")"]]
print("presença: ",presence.count("Sim"))
print(wb.inspect({"kind":"table","range":"Radar - Painel!A5:B10","include":"values,formulas","table_max_rows":6,"table_max_cols":2}).ndjson)
presença:  7
{"kind":"table","sheet":"Radar - Painel","address":"A5:B10","rows":6,"cols":2,"values":[["Empresas na planilha original",51],["Restaurantes testados pelo usuário",13],["Correspondências diretas na base",7],["Alta prioridade preliminar",5],["A investigar (prioridade B)",6],["Pendentes / pausados",2]]}

print(wb.inspect({"kind":"match","search_term":"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A","options":{"use_regex":True,"max_results":50},"summary":"scan de fórmulas"}).ndjson[:4000])
print(wb.inspect({"kind":"table","range":"Radar - 13 Restaurantes!A1:C6","include":"values","table_max_cols":3,"table_max_rows":6}).ndjson[:4000])
dest="/mnt/data/radar_icp_restaurantes_maringa_londrina.xlsx"
SpreadsheetFile.export_xlsx(wb).save(dest)
import os
print(dest,os.path.getsize(dest))
{"kind":"notice","message":"Cell search matched 0 entries."}
{"kind":"table","sheet":"Radar - 13 Restaurantes","address":"A1:C6","rows":6,"cols":3,"values":[["Empresa","Cidade","Relato do teste"],["Boussolé Rooftop","Londrina","Chatbot existente, ruim (relato)"],["La Gondola Trattoria","Londrina","Atendimento humano (relato)"],["Granchio Bistrô","Londrina","Atendimento humano (relato)"],["O Casarão Londrina","Londrina","Atendimento humano (relato)"],["Manzini Pizzaria Maringá","Maringá","Atendimento humano (relato)"]]}
/mnt/data/radar_icp_restaurantes_maringa_londrina.xlsx 65006
Radar ICP — Análise da lista de restaurantes
Cruzei seus apontamentos com a planilha de empresas e fiz uma primeira verificação pública.

Empresas avaliadas

13
Encontradas na planilha

7
Registros na base original

51
Primeira conclusão
Não devemos priorizar automaticamente os restaurantes sem IA. Um restaurante com chatbot ruim pode ser mais interessante que outro com atendimento 100% humano, desde que exista um problema relevante e orçamento para resolvê-lo.

Alguns pontos da pesquisa mudam a classificação inicial:

Boussolé Rooftop: está em Londrina, possui canais de reservas, eventos e experiências especiais. Melhor investigar conversão de reservas e eventos do que simplesmente substituir o chatbot. 

Linktree
+1

Manzini Pizzaria: apresenta uma operação de rodízio, salão e reservas. A oportunidade pode estar em reservas, grupos e aniversários, não necessariamente em pedidos por IA. 

google.com

Fornalha Pizza: ainda não descartaria por ser pequena. Existem sinais de delivery estruturado e atividade em marketplaces que justificam investigar seu volume de pedidos. 

tripadvisor.com

La Gondola Trattoria e Granchio Bistrô: também estão em Londrina. Ambos têm perfil de experiência gastronômica, onde relacionamento, reservas e eventos podem ser mais relevantes que atendimento automatizado genérico. 

Guia Bom Gourmet
+1

Os faturamentos estimados da planilha não comprovam receita efetiva nem capacidade de pagamento. Vou preservar essas informações como sinais de pesquisa, sem utilizá-las como orçamento confirmado.

Priorização inicial para prospecção
Prioridade

Empresa

O que investigar para vender

A

Boussolé Rooftop

Melhorar conversão de reservas e eventos

A

O Casarão Londrina

Qualificação e acompanhamento de eventos e grupos

A

Granchio Bistrô

Reservas, relacionamento e retorno de clientes

A

Manzini Pizzaria

Reservas de grupos, aniversários e confirmações

A

La Gondola Trattoria

Confirmações e relacionamento com clientes recorrentes

B

Fornalha Pizza

Volume de delivery e oportunidades de recompra

B

J Maia Pizzaria

Identificar canais oficiais e gestão de reservas

B

Costelaria O Rancho

Descobrir limitações reais da IA existente

B

Pizzaria Marcelus

Verificar funcionamento do WhatsApp comercial

B

Pizzeria da Praça

Validar volume de pedidos e margem

B

Pizza Prime

Avaliar IA atual e autonomia da unidade

Pendente

Bizzo Pizzaria

Confirmar identidade e CNPJ

Pausado

Pizzaria MK

Confirmar reabertura

Essas classificações representam prioridade para investigação, não probabilidade calculada de fechamento.

Planilha atualizada
Radar ICP — Restaurantes Maringá e Londrina

Planilha Excel com a base original preservada, 13 restaurantes avaliados, 6 alvos adicionais e metodologia de qualificação.
Identifiquei ainda algumas empresas da sua base original que merecem investigação, principalmente Grupo Habanero, Estação Boliche, Armazém Restaurante e Pizzaria Nice Delivery. Elas foram separadas na aba de novos alvos, sem serem classificadas como clientes qualificados.

O próximo filtro do agente
Antes de enviar propostas, o Radar ICP precisa descobrir três coisas: quantos atendimentos, pedidos ou reservas chegam mensalmente; o que deixa de ser concluído ou consome tempo da equipe; e quem pode aprovar um investimento para resolver isso.

A recomendação é começar pelos cinco restaurantes da faixa A com diagnósticos curtos. O primeiro produto a testar deve ser recuperação e gestão de oportunidades, não necessariamente uma nova IA de atendimento.

Fontes e cobertura: observações fornecidas por você, 51 registros da planilha original e verificações públicas de estabelecimentos. Não foram auditadas as conversas internas, o faturamento real ou as ferramentas contratadas. Não houve acesso a plataforma paga de enriquecimento empresarial.

Chate, é o seguinte, eu te mandei aqui uma descrição do que eu preciso de alguns clientes, certo? Deixa eu tentar tangibilizar. Eu te mandei aqui uma lista com possíveis prospectos de Maringá e Londrina. Peguei uma lista bem grande de clientes. A maior parte deles, eu já entrei em contato com eles no WhatsApp para ver se eles têm hoje uma dificuldade, algum tipo de dor que a gente resolve com relação ao WhatsApp. O que eu fiz? Eu entrei em contato via WhatsApp com essas empresas e perguntei por exemplo, vocês tem cardápio? Posso fazer um pedido aqui? Para cada empresa eu mandei algum tipo de coisa diferente para esperar o retorno. Se esse retorno passa dos 30 minutos, essa empresa não tem IA, não tem nenhum tipo de atendimento automatizado. Beleza, só que parte dessa lista que eu te passei, que tá no PDF, que tá em anexo aqui, são clientes que eu sei, eu tenho o telefone do dono, são empresas já extraídas. Agora, tem outros que, por exemplo, igual o Chachichão que eu te mandei, eu não sei se esse é um potencial cliente, porque eu não tenho tantas informações assim. E aí o que eu quero saber de você? Como eu consigo qualificar e separar esses dois clientes? Por exemplo, quais são os outros pizzas do gordo que poderia ter dentro dessa base? Entendeu? Quais são os outros potenciais clientes? Ou clientes até melhores, porque por exemplo, um que eu tenho certeza é o grupo A Maneiro, que inclusive a gente está em contato com eles. Mas por exemplo, pizza da praça, pizza prime, tem outras opções como hamburgueria. Por exemplo, empresas que têm um alto volume de pedidos no WhatsApp têm esse tipo de dor. Então por exemplo, lanche. O que seria lanche? lanche prensado, dogão, cheese, hambúrguer, essa galera que trabalha com alto volume de delivery geralmente precisa de nós. Agora, por exemplo, a Brenda até citou aqui um cliente, um restaurante da região por exemplo, Black Bull. Black Bull talvez não seja o cliente ideal, por quê? Porque já tem um branding, já é uma empresa que tem majoritariamente física, tem um espaço e as pessoas já vão direto pra lá E dia geralmente vai ter uma ou duas coisas ali, só tipo resposta ali, depois horário e tal, mas coisas mais pontuais. Nada muito que dependa da operação pra isso, entendeu? Não é uma operação braço comercial. Então talvez não tenha tantas dores assim. É isso que a gente vai precisar agora mapear, a gente vai precisar separar esse público, identificar o que a gente consegue ver não só nessa lista, mas também nessa forma de scrapping como eu te falei. Então, por exemplo, Se eu pesquisar aqui por... Empresas de... Por pizzaria de Maringá. O que eu tenho que olhar nesses filtros? O que a gente tem que olhar pra saber quem é e quem não é? Se a gente for sair do nicho de pizza, por exemplo, de food, né? Pizza, lanche e tudo mais. Quem que a gente vai que seria assertivo? Por exemplo, clínicas. Quais tipos de clínicas? Por exemplo, pegar uma pizza que tem pouca demanda do WhatsApp, não faz sentido. Agora, o doutor Lucas, por exemplo, que atende lá seus... tem 5 mil contatos na base, atende... chega a bater, se eu não me engano, são 200 atendimentos por semana. Eu não lembro do número em si, mas que tem 200 números, mais ou menos... vamos pensar assim, são oito doutores. Vamos pensar de um jeito básico. São oito doutores. Deixa eu ver se eu tenho essa informação. Só esse mês, só esse mês até agora, em outubro, foram 366 pacientes. Em setembro, foram 596. Então, nós temos uma média muito grande desses clientes. Então, eu quero que a gente, por exemplo, esse tipo de perfil de cliente é um cliente ideal. Porque ele precisa realmente desse volume, ele precisa confirmar agenda, ele precisa fazer coisa assim. Quais mais empresas têm esse tipo de dor? Por exemplo, loja de imóvel, loja que vende sofá, por exemplo, Aeron Decor, empresas como a Duna de Cianorte, só que empresas maiores, empresas que estão mais dispostas a investir em outras cidades. Estou procurando saber exatamente quais são esses critérios que a gente tem que analisar, beleza?
…

Pensou por 10m 9s

from artifact_tool import Blob,SpreadsheetFile
for fn in ["/mnt/data/Lista Restaurantes Maringá .xlsx","/mnt/data/radar_icp_restaurantes_maringa_londrina.xlsx"]:
    w=SpreadsheetFile.import_xlsx(Blob.load(fn))
    print("\nFILE",fn)
    print(w.inspect({"kind":"sheet","include":"id,name"}).ndjson[:4000])
    for i in range(min(5,len(w.worksheets.items)) if hasattr(w.worksheets,"items") else 3):
        try:
            s=w.worksheets.get_item_at(i)
            print("sheet",s.name)
            print(w.inspect({"kind":"table","range":f"'{s.name}'!A1:O7","include":"values,formulas","table_max_rows":7,"table_max_cols":15}).

FILE /mnt/data/Lista Restaurantes Maringá .xlsx
{"kind":"sheet","id":"ws/fozdgv","name":"Empresas","index":0,"range":"A1:BD52","address":"A1:BD52"}
{"kind":"sheet","id":"ws/4ni1ko","name":"Sócios e Responsáveis","index":1,"range":"A1:X78","address":"A1:X78"}
{"kind":"sheet","id":"ws/ss8mgu","name":"Funcionários","index":2,"range":"A1:G314","address":"A1:G314"}
sheet Empresas
{"kind":"table","sheet":"Empresas","address":"A1:O7","rows":7,"cols":15,"values":[["CNPJ","Razão Social","Nome Fantasia","Situação Cadastral","Data de Abertura","Idade (anos)","Porte","Tipo Jurídico","Matriz/Filial","Qtd. Filiais","Segmento","CNAE Principal — Código","CNAE Principal — Descrição","CNAEs Secundários (códigos)","Capital Social"],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","FRANGO NA BRASA","ATIVA",39785,"17 anos 9 meses","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5620104,"Fornecimento de alimentos preparados preponderantemente para consumo domiciliar",null,110000],["22.378.147/0001-52","HABANERO GROUP LTDA","GRUPO HABANERO","ATIVA",42128,"11 anos 4 meses","DEMAIS","Sociedade Empresária Limitada","MATRIZ",5,"Alimentação",5611201,"Restaurantes e similares",null,300000],["23.162.660/0001-74","RESTAURANTE PIMENTA BIQUINHO LTDA","PIMENTA BIQUINHO","ATIVA",42241,"11 anos 1 mês","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611201,"Restaurantes e similares",null,1000000],["23.351.580/0001-67","GIROLETO RESTAURANTE LTDA","GIROLETO E FILHO RESTAURANTE","ATIVA",42272,"11 anos 0 mês","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611201,"Restaurantes e similares",null,105000],["23.728.932/0001-50","BEHAPPY RESTAURANTE LTDA","BE HAPPY","ATIVA",42333,"10 anos 10 meses","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611201,"Restaurantes e similares",null,105000],["23.752.294/0001-03","K6W HAMBURGUERIA LTDA","DOM CARNIVORO","ATIVA",42335,"10 anos 10 meses","EPP","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611203,"Lanchonetes, casas de chá, de sucos e similares",null,150000]]}
sheet Sócios e Responsáveis
{"kind":"table","sheet":"Sócios e Responsáveis","address":"A1:O7","rows":7,"cols":15,"values":[["CNPJ Vínculo","Razão Social Vínculo","Tipo de Vínculo","Qualificação","Participação (%)","CPF","CNPJ Sócio (PJ)","Nome / Razão Social","Situação CPF","Data Nascimento","Idade","Sexo","Nome da Mãe","CBO","Renda Estimada"],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","Sócio","Sócio-Administrador",0,"203.931.721-04",null,"REINALDO SANCHES DIAS","REGULAR",22284,65,"Masculino","AUREA SANCHES DIAS","EMPRESÁRIO","MAIS DE R$ 4.000,00 A R$ 5.000,00"],["22.378.147/0001-52","HABANERO GROUP LTDA","Sócio","Sócio-Administrador",0,"007.869.299-79",null,"THIAGO DE CARVALHO ABRAO",null,32170,38,"Masculino",null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","Sócio","Sócio-Administrador",0,"023.050.779-47",null,"LEANDRO PASTORIL CARREIRA DE SOUZA","REGULAR",28546,48,"Masculino","CELIA PASTORIL CARREIRA DE SOUZA","EMPRESÁRIO","MAIS DE R$ 4.000,00 A R$ 5.000,00"],["22.378.147/0001-52","HABANERO GROUP LTDA","Sócio","Sócio-Administrador",0,"074.322.379-99",null,"GUILHERME MENEGUETTI MORRONI","REGULAR",32360,38,"Masculino","VILMA MENEGHETTI MORRONI","EMPRESÁRIO","MAIS DE R$ 3.000,00 A R$ 4.000,00"],["23.162.660/0001-74","RESTAURANTE PIMENTA BIQUINHO LTDA","Sócio","Sócio-Administrador",0,"695.329.319-53",null,"JOAO WALDECIR STECCA","REGULAR",23143,63,"Masculino","MARIA JOSEFA MARTINS STECCA","EMPRESÁRIO","MAIS DE R$ 4.000,00 A R$ 5.000,00"],["23.351.580/0001-67","GIROLETO RESTAURANTE LTDA","Sócio","Sócio-Administrador",0,"033.771.379-04",null,"MARCELO GIROLETO","REGULAR",29788,45,"Masculino","SONIA MARIA B GIROLETO","EMPRESÁRIO","MAIS DE R$ 3.000,00 A R$ 4.000,00"]]}
sheet Funcionários
{"kind":"table","sheet":"Funcionários","address":"A1:O7","rows":7,"cols":15,"values":[["CNPJ Vínculo","Razão Social Vínculo","Cargo","Código do Cargo","Status do Vínculo","CPF","Nome",null,null,null,null,null,null,null,null],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","COZINHEIRO GERAL","513205","Última informação obtida","026.735.599-81","LUCIMARA DOS SANTOS RODRIGUES SILVA",null,null,null,null,null,null,null,null],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","HISTORICO - ADMINISTRADOR","252105","Informação histórica","641.743.449-49","VALERIA LESSA DIAS",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","HISTORICO - AUXILIAR NOS SERVICOS DE ALIMENTACAO","513505","Informação histórica","033.465.069-08","ALESSANDRO MAURO SPOTI",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","AUXILIAR NOS SERVICOS DE ALIMENTACAO","513505","Última informação obtida","119.392.279-84","ALICIA VITORIA BUZATO ANDRADE",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","GARCOM","513405","Última informação obtida","054.878.589-93","ALISSON TIAGO DOS REIS DE SOUZA",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","PIZZAIOLO","513610","Última informação obtida","108.905.739-30","AMANDA FERREIRA ROSSI",null,null,null,null,null,null,null,null]]}

FILE /mnt/data/radar_icp_restaurantes_maringa_londrina.xlsx
{"kind":"sheet","id":"ws/r21fd0","name":"Empresas","index":0,"range":"A1:BD52","address":"A1:BD52"}
{"kind":"sheet","id":"ws/vaa5b8","name":"Sócios e Responsáveis","index":1,"range":"A1:X78","address":"A1:X78"}
{"kind":"sheet","id":"ws/dbeps4","name":"Funcionários","index":2,"range":"A1:G314","address":"A1:G314"}
{"kind":"sheet","id":"ws/1j1e2j","name":"Radar - Painel","index":3,"range":"A1:D21","address":"A1:D21"}
{"kind":"sheet","id":"ws/4no55g","name":"Radar - 13 Restaurantes","index":4,"range":"A1:P14","address":"A1:P14"}
{"kind":"sheet","id":"ws/hwrt98","name":"Radar - Novos Alvos","index":5,"range":"A1:J7","address":"A1:J7"}
{"kind":"sheet","id":"ws/i3rc32","name":"Radar - Metodologia","index":6,"range":"A1:D15","address":"A1:D15"}
sheet Empresas
{"kind":"table","sheet":"Empresas","address":"A1:O7","rows":7,"cols":15,"values":[["CNPJ","Razão Social","Nome Fantasia","Situação Cadastral","Data de Abertura","Idade (anos)","Porte","Tipo Jurídico","Matriz/Filial","Qtd. Filiais","Segmento","CNAE Principal — Código","CNAE Principal — Descrição","CNAEs Secundários (códigos)","Capital Social"],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","FRANGO NA BRASA","ATIVA",39785,"17 anos 9 meses","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5620104,"Fornecimento de alimentos preparados preponderantemente para consumo domiciliar",null,110000],["22.378.147/0001-52","HABANERO GROUP LTDA","GRUPO HABANERO","ATIVA",42128,"11 anos 4 meses","DEMAIS","Sociedade Empresária Limitada","MATRIZ",5,"Alimentação",5611201,"Restaurantes e similares",null,300000],["23.162.660/0001-74","RESTAURANTE PIMENTA BIQUINHO LTDA","PIMENTA BIQUINHO","ATIVA",42241,"11 anos 1 mês","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611201,"Restaurantes e similares",null,1000000],["23.351.580/0001-67","GIROLETO RESTAURANTE LTDA","GIROLETO E FILHO RESTAURANTE","ATIVA",42272,"11 anos 0 mês","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611201,"Restaurantes e similares",null,105000],["23.728.932/0001-50","BEHAPPY RESTAURANTE LTDA","BE HAPPY","ATIVA",42333,"10 anos 10 meses","ME","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611201,"Restaurantes e similares",null,105000],["23.752.294/0001-03","K6W HAMBURGUERIA LTDA","DOM CARNIVORO","ATIVA",42335,"10 anos 10 meses","EPP","Sociedade Empresária Limitada","MATRIZ",0,"Alimentação",5611203,"Lanchonetes, casas de chá, de sucos e similares",null,150000]]}
sheet Sócios e Responsáveis
{"kind":"table","sheet":"Sócios e Responsáveis","address":"A1:O7","rows":7,"cols":15,"values":[["CNPJ Vínculo","Razão Social Vínculo","Tipo de Vínculo","Qualificação","Participação (%)","CPF","CNPJ Sócio (PJ)","Nome / Razão Social","Situação CPF","Data Nascimento","Idade","Sexo","Nome da Mãe","CBO","Renda Estimada"],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","Sócio","Sócio-Administrador",0,"203.931.721-04",null,"REINALDO SANCHES DIAS","REGULAR",22284,65,"Masculino","AUREA SANCHES DIAS","EMPRESÁRIO","MAIS DE R$ 4.000,00 A R$ 5.000,00"],["22.378.147/0001-52","HABANERO GROUP LTDA","Sócio","Sócio-Administrador",0,"007.869.299-79",null,"THIAGO DE CARVALHO ABRAO",null,32170,38,"Masculino",null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","Sócio","Sócio-Administrador",0,"023.050.779-47",null,"LEANDRO PASTORIL CARREIRA DE SOUZA","REGULAR",28546,48,"Masculino","CELIA PASTORIL CARREIRA DE SOUZA","EMPRESÁRIO","MAIS DE R$ 4.000,00 A R$ 5.000,00"],["22.378.147/0001-52","HABANERO GROUP LTDA","Sócio","Sócio-Administrador",0,"074.322.379-99",null,"GUILHERME MENEGUETTI MORRONI","REGULAR",32360,38,"Masculino","VILMA MENEGHETTI MORRONI","EMPRESÁRIO","MAIS DE R$ 3.000,00 A R$ 4.000,00"],["23.162.660/0001-74","RESTAURANTE PIMENTA BIQUINHO LTDA","Sócio","Sócio-Administrador",0,"695.329.319-53",null,"JOAO WALDECIR STECCA","REGULAR",23143,63,"Masculino","MARIA JOSEFA MARTINS STECCA","EMPRESÁRIO","MAIS DE R$ 4.000,00 A R$ 5.000,00"],["23.351.580/0001-67","GIROLETO RESTAURANTE LTDA","Sócio","Sócio-Administrador",0,"033.771.379-04",null,"MARCELO GIROLETO","REGULAR",29788,45,"Masculino","SONIA MARIA B GIROLETO","EMPRESÁRIO","MAIS DE R$ 3.000,00 A R$ 4.000,00"]]}
sheet Funcionários
{"kind":"table","sheet":"Funcionários","address":"A1:O7","rows":7,"cols":15,"values":[["CNPJ Vínculo","Razão Social Vínculo","Cargo","Código do Cargo","Status do Vínculo","CPF","Nome",null,null,null,null,null,null,null,null],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","COZINHEIRO GERAL","513205","Última informação obtida","026.735.599-81","LUCIMARA DOS SANTOS RODRIGUES SILVA",null,null,null,null,null,null,null,null],["10.517.806/0001-05","RV FRANGO NA BRASA LTDA","HISTORICO - ADMINISTRADOR","252105","Informação histórica","641.743.449-49","VALERIA LESSA DIAS",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","HISTORICO - AUXILIAR NOS SERVICOS DE ALIMENTACAO","513505","Informação histórica","033.465.069-08","ALESSANDRO MAURO SPOTI",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","AUXILIAR NOS SERVICOS DE ALIMENTACAO","513505","Última informação obtida","119.392.279-84","ALICIA VITORIA BUZATO ANDRADE",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","GARCOM","513405","Última informação obtida","054.878.589-93","ALISSON TIAGO DOS REIS DE SOUZA",null,null,null,null,null,null,null,null],["22.378.147/0001-52","HABANERO GROUP LTDA","PIZZAIOLO","513610","Última informação obtida","108.905.739-30","AMANDA FERREIRA ROSSI",null,null,null,null,null,null,null,null]]}
sheet Radar - Painel
{"kind":"table","sheet":"Radar - Painel","address":"A1:O7","rows":7,"cols":15,"values":[["RADAR ICP  |  FOOD  •  TRIAGEM COMERCIAL",null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["Maringá + Londrina  |  19 out 2026  |  hipóteses não equivalem a fit confirmado",null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["Empresas na planilha original",51,null,"O QUE MUDOU COM OS TESTES",null,null,null,null,null,null,null,null,null,null,null],["Restaurantes testados pelo usuário",13,null,"1. Ter atendimento 100% humano não prova que automatizar seja rentável.",null,null,null,null,null,null,null,null,null,null,null],["Correspondências diretas na base",7,null,"2. IA existente não elimina fit: verificar lacunas, integrações e métricas.",null,null,null,null,null,null,null,null,null,null,null]]}
sheet Radar - 13 Restaurantes
{"kind":"table","sheet":"Radar - 13 Restaurantes","address":"A1:O7","rows":7,"cols":15,"values":[["Empresa","Cidade","Relato do teste","Sinal público observado","Correspondência na base","Etapa ICP","Dor a validar","Oferta hipotética","Prioridade","Confiança","Próxima verificação","Contato","Fonte pública","Observação e risco","Etapa comercial"],["Boussolé Rooftop","Londrina","Chatbot existente, ruim (relato)","Reservas de almoço/jantar, experiências e eventos anunciados publicamente","Não consta na base de Maringá","A — investigar primeiro","A automação atual pode deixar reservas especiais e eventos sem acompanhamento","Recuperação de reservas + qualificação de eventos + pós-visita","A","Média","Medir reservas que ficam sem resposta; testar a jornada atual e identificar gestor",null,"https://linktr.ee/boussolerooftop","Não vender simplesmente outro chatbot; já tem reserva online.","Pesquisa"],["La Gondola Trattoria","Londrina","Atendimento humano (relato)","Trattoria histórica, reservas por WhatsApp, experiência gastronômica e ocasiões especiais","Não consta na base de Maringá","A — investigar primeiro","Rotina de reservas e clientes de ocasião pode gerar trabalho repetitivo","Confirmações + follow-up de reservas + relacionamento","A","Média","Validar reservas/mês, cancelamentos e equipe envolvida","(43) 99995-6050","https://restaurantelagondola.com.br/","Não confundir com La Gôndola de Maringá.","Pesquisa"],["Granchio Bistrô","Londrina","Atendimento humano (relato)","Bistrô com reservas/delivery; tíquete percebido superior a alimentação rápida","Não consta na base de Maringá","A — investigar primeiro","Reservas, eventos e clientes que retornam podem justificar réguas de relacionamento","Reservas, pós-visita e campanhas de retorno","A","Média","Verificar agenda, lista de clientes, consentimentos, eventos e capacidade de investimento","(43) 99944-8800","https://restaurantguru.com.br/Granchio-Bistro-Londrina","Ticket ao consumidor não é margem nem orçamento de tecnologia.","Pesquisa"],["O Casarão Londrina","Londrina","Atendimento humano (relato)","CNPJ ativo; serviços relacionados a eventos/bufê e canal WhatsApp público","Não consta na base de Maringá","A — investigar primeiro","Eventos/grupos e atendimento recorrente podem gerar alto valor de negociação","Qualificação de eventos + orçamento + acompanhamento","A","Média","Confirmar volume e valor de eventos, tempo de resposta, decisor","(43) 3026-2020","https://casadosdados.com.br/solucao/cnpj/o-casarao-restaurante-londrina-ltda-44587249000110","CNPJ público 44.587.249/0001-10; conferir mesma operação.","Pesquisa"],["Manzini Pizzaria Maringá","Maringá","Atendimento humano (relato)","Rodízio, salão, reservas e grupos; presença pública com operação estruturada","58.421.782/0001-12 — linha 46","A — investigar primeiro","Reservas de grupos/aniversários, dúvidas recorrentes e confirmação","Jornada de reservas e eventos + confirmações","A","Média","Reservas/semana, gestão de aniversários, cancelamentos e taxa de comparecimento","(44) 99834-6798","https://www.google.com/maps/search/?api=1&query=Manzini+Pizzaria+Maringa","O diferencial não é necessariamente chatbot de delivery.","Pesquisa"],["Fornalha Pizza Maringá","Maringá","Provavelmente pequeno (hipótese do usuário)","Pizzaria identificada em delivery/retirada; sinais de pedidos em marketplace","Não consta na base de Maringá","B — qualificar volume","A presença em aplicativos merece checagem antes de concluir falta de fit","Recompra, reativação da base e atendimento de pedidos","B","Média","Volume de pedidos por canal, pedidos diretos vs apps, tamanho da equipe","(44) 3228-3102","https://www.diariocidade.com/pr/maringa/guia/restaurantes/pg-9/","Não descartar pelo porte percebido sem medir transações.","Pesquisa"]]}

wb=SpreadsheetFile.import_xlsx(Blob.load("/mnt/data/Lista Restaurantes Maringá .xlsx"))
s=wb.worksheets.get_item("Empresas")
data=s.get_range("A1:BD52").values
print("COLUMNS:", len(data[0]))
for i,v in enumerate(data[0]):
    print(i, v)
print("\nROWS:")
for i,r in enumerate(data[1:], start=2):
    # name, porte, employees, annual estimated revenue, ordering, phone and city fields.
    print(f"{i}: {str(r[2])[:29]:29s}  Porte={r[6]}  filial={r[9]}  | "+ ", ".join([f"{j}:{str(r[j])[:30]}" for j in range(15,len(r)) if r[j] not in [None,""]][:7]))
COLUMNS: 56
0 CNPJ
1 Razão Social
2 Nome Fantasia
3 Situação Cadastral
4 Data de Abertura
5 Idade (anos)
6 Porte
7 Tipo Jurídico
8 Matriz/Filial
9 Qtd. Filiais
10 Segmento
11 CNAE Principal — Código
12 CNAE Principal — Descrição
13 CNAEs Secundários (códigos)
14 Capital Social
15 Faturamento Estimado
16 Qtd. Funcionários
17 Simples — Status
18 MEI — Status
19 Simples — Data Opção
20 Endereço 1 — Tipo
21 Endereço 1 — Logradouro
22 Endereço 1 — Número
23 Endereço 1 — Complemento
24 Endereço 1 — Bairro
25 Endereço 1 — Cidade
26 Endereço 1 — UF
27 Endereço 1 — CEP
28 Endereço 2 — Tipo
29 Endereço 2 — Logradouro
30 Endereço 2 — Número
31 Endereço 2 — Complemento
32 Endereço 2 — Bairro
33 Endereço 2 — Cidade
34 Endereço 2 — UF
35 Endereço 2 — CEP
36 Endereço 3 — Tipo
37 Endereço 3 — Logradouro
38 Endereço 3 — Número
39 Endereço 3 — Complemento
40 Endereço 3 — Bairro
41 Endereço 3 — Cidade
42 Endereço 3 — UF
43 Endereço 3 — CEP
44 Endereço 4 — Tipo
45 Endereço 4 — Logradouro
46 Endereço 4 — Número
47 Endereço 4 — Complemento
48 Endereço 4 — Bairro
49 Endereço 4 — Cidade
50 Endereço 4 — UF
51 Endereço 4 — CEP
52 Telefones Fixos
53 Celulares
54 Emails
55 Celulares com WhatsApp

ROWS:
2: FRANGO NA BRASA                Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:39785, 20:Avenida, 21:Morangueira
3: GRUPO HABANERO                 Porte=DEMAIS  filial=5  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:ATE 9 FUNCIONARIOS, 17:N, 18:N, 19:42128, 20:Avenida, 21:Prudente De Morais
4: PIMENTA BIQUINHO               Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:45292, 20:Rua, 21:Mathias De Albuquerque
5: GIROLETO E FILHO RESTAURANTE   Porte=ME  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43831, 20:Rua, 21:Joubert De Carvalho
6: BE HAPPY                       Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:ATE 9 FUNCIONARIOS, 17:N, 18:N, 19:43831, 20:Avenida, 21:Advogado Horacio Raccanello Fi
7: DOM CARNIVORO                  Porte=EPP  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:42335, 20:Avenida, 21:Nobrega
8: BLACK BULL STEAKHOUSE - CERRO  Porte=ME  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:ATE 9 FUNCIONARIOS, 17:N, 18:N, 19:44197, 20:Avenida, 21:Cerro Azul
9: DOMINO S PIZZA MARINGA         Porte=ME  filial=0  | 15:DE R$ 1 MM ATÉ R$ 2 MM, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:42940, 20:Avenida, 21:Joao Paulino Vieira Filho
10: CASEBRE DO DITO                Porte=EPP  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:42979, 20:Av, 21:Gastao Vidigal
11: PIZZARIA MARCELUS              Porte=ME  filial=0  | 15:DE R$ 1 MM ATÉ R$ 2 MM, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:42984, 20:Rua, 21:Paranagua
12: PASTEL DO TOM                  Porte=ME  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43084, 20:Av, 21:Sete De Setembro
13: LANCHONETE SAL & LIMAO         Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:ATE 9 FUNCIONARIOS, 17:N, 18:N, 19:43228, 20:Avenida, 21:Cerro Azul
14: ALMAZA                         Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:45292, 20:Avenida, 21:Tuiuti
15: PIZZARIA E COSTELARIA J. MAIA  Porte=EPP  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43831, 20:Avenida, 21:Doutor Alexandre Rasgulaeff
16: CHALE DO BOLO                  Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43376, 20:Avenida, 21:Doutor Luiz Teixeira Mendes
17: BIZZA RESTAURANTE E PIZZARIA   Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43384, 20:Avenida, 21:Sao Paulo
18: TOMIO PASTEIS E SALGADOS       Porte=ME  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43392, 20:Rua, 21:Amilcar Vecchi
19: BRAZAI SUSHI                   Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:ATE 9 FUNCIONARIOS, 17:N, 18:N, 19:45292, 20:Avenida, 21:Tuiuti
20: PIZZARIA SAO FRANCISCO         Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:45292, 20:Av, 21:Sophia Rasgulaeff
21: FOGAREU ASSADOS                Porte=ME  filial=1  | 15:ATÉ R$ 50 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43831, 20:Rua, 21:Mitsuzo Taguchi
22: ARMAZEM RESTAURANTE            Porte=DEMAIS  filial=0  | 15:DE R$ 2 MM ATÉ R$ 5 MM, 16:ATE 9 FUNCIONARIOS, 20:Avenida, 21:Joaquim Duarte Moleirinho, 22:1801, 23:Quadraesq Demetrio Koteski, 24:Jardim Alamar
23: STREET BURGER SMASH HOUSE      Porte=EPP  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:ATE 9 FUNCIONARIOS, 17:N, 18:N, 19:43612, 20:Avenida, 21:Parana
24: OKA SUSHI                      Porte=ME  filial=0  | 15:DE R$ 50 MIL ATÉ R$ 100 MIL, 16:ATE 9 FUNCIONARIOS, 17:S, 18:N, 19:43714, 21:Av Santa Catarina, 22:762
25: COSTELARIA E PETISCARIA O RAN  Porte=ME  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:0, 17:S, 18:N, 19:46023, 20:Avenida, 21:Kakogawa
26: SBR ADMINISTRADORA DE BENS     Porte=DEMAIS  filial=0  | 15:DE R$ 1 MM ATÉ R$ 2 MM, 16:0, 20:Avenida, 21:Cerro Azul, 22:572, 23:Sala 01, 24:Zona 02
27: M J LANCHES                    Porte=ME  filial=0  | 15:DE R$ 50 MIL ATÉ R$ 100 MIL, 16:0, 17:S, 18:N, 19:43978, 20:Praca, 21:Santos Dumont
28: REI DA PIZZA                   Porte=ME  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:0, 17:S, 18:N, 19:44041, 20:Avenida, 21:19 De Dezembro
29: PIZZARIA NICE DELIVERY         Porte=ME  filial=0  | 15:DE R$ 1 MM ATÉ R$ 2 MM, 16:0, 17:N, 18:N, 19:44053, 20:Avenida, 21:Kakogawa
30: PIZZERIA DA PRACA              Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:0, 17:S, 18:N, 19:44092, 20:Praca, 21:Rocha Pombo
31: RESTAURANTE E PIZZARIA MK      Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:0, 17:S, 18:N, 19:44293, 20:Avenida, 21:Tuiuti
32: THE BOOT PIZZA BAR             Porte=ME  filial=0  | 15:ATÉ R$ 50 MIL, 16:0, 17:N, 18:N, 19:44579, 20:Rua, 21:Vereador Basilio Sautchuk
33: R2 LANCHONETE E ARENA SOCIETY  Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:0, 17:S, 18:N, 19:44580, 20:Rua, 21:Pioneira Amalia Carzoni Baltaz
34: CAFETERIA E CHOCOLATARIA LUGA  Porte=ME  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:0, 17:N, 18:N, 19:44642, 21:Piratininga, 22:291
35: PIZZA PRIME MARINGA            Porte=ME  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:0, 17:S, 18:N, 19:44927, 20:Avenida, 21:Advogado Horacio Raccanello Fi
36: FRANGO NO POTE MARINGA         Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:0, 17:N, 18:N, 19:44685, 20:Avenida, 21:Curitiba
37: MATRIARCA PUB                  Porte=ME  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:0, 17:S, 18:N, 19:44720, 20:Rua, 21:Vereador Basilio Sautchuk
38: ESTACAO BOLICHE                Porte=ME  filial=0  | 15:DE R$ 2 MM ATÉ R$ 5 MM, 16:0, 17:S, 18:N, 19:44750, 20:Avenida, 21:Morangueira
39: TAMURA CAFE ESPECIAL           Porte=ME  filial=0  | 15:DE R$ 500 MIL ATÉ R$ 1 MM, 16:0, 17:S, 18:N, 19:44914, 21:Rua Pastor Anísio Francisco Da, 25:Maringá
40: None                           Porte=ME  filial=0  | 15:DE R$ 100 MIL ATÉ R$ 250 MIL, 16:0, 17:S, 18:N, 19:44956, 20:Avenida, 21:Amazonas
41: TAKE AND GO PIZZARIA           Porte=ME  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:0, 17:S, 18:N, 19:45292, 20:Rua, 21:Yoshinori Kubota
42: BURGER PERK                    Porte=ME  filial=0  | 15:DE R$ 250 MIL ATÉ R$ 500 MIL, 16:0, 17:S, 18:N, 19:45238, 20:Rua, 21:Farmaceutico Luiz Andrade
43: PIZZARIA JACARE VERMELHO HERV  Porte=EPP  filial=0  | 15:DE R$ 50 MIL ATÉ R$ 100 MIL, 16:0, 17:S, 18:N, 19:45338, 20:Avenida, 21:Herval
44: DONA OSIRES BAR E LANCHONETE   Porte=ME  filial=0  | 15:DE R$ 50 MIL ATÉ R$ 100 MIL, 16:0, 17:S, 18:N, 19:45347, 20:Avenida, 21:Osires Stenghel Guimaraes
45: PANELA DO DJALMA               Porte=ME  filial=0  | 15:NÃO INFORMADO, 16:0, 17:S, 18:N, 19:45658, 20:Rua, 21:Solimoes
46: MANZINI PIZZARIA MARINGA       Porte=ME  filial=0  | 15:NÃO INFORMADO, 16:0, 17:S, 18:N, 19:45637, 20:Avenida, 21:Doutor Alexandre Rasgulaeff
47: POKER BURGER                   Porte=ME  filial=0  | 15:DE R$ 50 MIL ATÉ R$ 100 MIL, 16:0, 17:S, 18:N, 19:45751, 20:Avenida, 21:Humaita
48: TOP DOG LANCHES                Porte=ME  filial=0  | 15:DE R$ 50 MIL ATÉ R$ 100 MIL, 16:0, 17:S, 18:N, 19:45779, 20:Avenida, 21:Dona Sophia Rasgulaeff
49: CAVALINHO COSTELARIA           Porte=ME  filial=0  | 15:NÃO INFORMADO, 16:0, 17:S, 18:N, 19:45863, 20:Avenida, 21:Advogado Horacio Raccanello Fi
50: SANTA PIZZA                    Porte=ME  filial=0  | 15:NÃO INFORMADO, 16:0, 17:S, 18:N, 19:45943, 20:Avenida, 21:Carlos Correa Borges
51: JG BURGUER                     Porte=ME  filial=0  | 15:NÃO INFORMADO, 16:0, 17:S, 18:N, 19:46006, 20:Rua, 21:Constituiçao
52: DOG KING                       Porte=ME  filial=0  | 15:NÃO INFORMADO, 16:0, 17:S, 18:N, 19:46199, 20:Rua, 21:Jose Moreno Junior

wprev=SpreadsheetFile.import_xlsx(Blob.load("/mnt/data/radar_icp_restaurantes_maringa_londrina.xlsx"))
prev=wprev.worksheets.get_item("Radar - 13 Restaurantes").get_range("A1:P14").values
for r in prev: print([r[0],r[1],r[2],r[8],r[9]])
['Empresa', 'Cidade', 'Relato do teste', 'Prioridade', 'Confiança']
['Boussolé Rooftop', 'Londrina', 'Chatbot existente, ruim (relato)', 'A', 'Média']
['La Gondola Trattoria', 'Londrina', 'Atendimento humano (relato)', 'A', 'Média']
['Granchio Bistrô', 'Londrina', 'Atendimento humano (relato)', 'A', 'Média']
['O Casarão Londrina', 'Londrina', 'Atendimento humano (relato)', 'A', 'Média']
['Manzini Pizzaria Maringá', 'Maringá', 'Atendimento humano (relato)', 'A', 'Média']
['Fornalha Pizza Maringá', 'Maringá', 'Provavelmente pequeno (hipótese do usuário)', 'B', 'Média']
['Pizzaria MK', 'Maringá', 'Fechada para reforma (relato)', 'P', 'Baixa']
['J Maia Pizzaria', 'Maringá', 'Sem perfil encontrado (relato)', 'B', 'Média']
['Costelaria O Rancho', 'Maringá', 'Usa IA da Meta (relato)', 'B', 'Média']
['Pizzaria Marcelus | Hilton', 'Maringá', 'Sem diagnóstico de atendimento (relato)', 'B', 'Média']
['Bizzo Pizzaria', 'Não confirmado', 'Contato informado; automação não diagnosticada', 'I', 'Baixa']
['Pizzeria da Praça', 'Maringá', 'Sem IA/automação (relato)', 'B', 'Média']
['Pizza Prime Maringá', 'Maringá', 'IA + humanos (relato)', 'B', 'Média']

target=["PIZZARIA NICE DELIVERY","FRANGO NA BRASA","PIZZARIA MARCELUS","DOM CARNIVORO","STREET BURGER SMASH HOUSE","TOP DOG LANCHES","BURGER PERK","GRUPO HABANERO","PIZZERIA DA PRACA","REI DA PIZZA","TAKE AND GO PIZZARIA","PIZZA PRIME MARINGA","BLACK BULL STEAKHOUSE - CERRO","PASTEL DO TOM"]
for r in data[1:]:
    if r[2] and any(x in r[2] for x in target):
        print(r[2], "—",r[20],r[21],r[22],r[25],r[26], "|",r[0],r[15])
FRANGO NA BRASA — Avenida Morangueira 746 Maringa PR | 10.517.806/0001-05 DE R$ 100 MIL ATÉ R$ 250 MIL
GRUPO HABANERO — Avenida Prudente De Morais 601 Maringa PR | 22.378.147/0001-52 DE R$ 250 MIL ATÉ R$ 500 MIL
DOM CARNIVORO — Avenida Nobrega 240 Maringa PR | 23.752.294/0001-03 DE R$ 250 MIL ATÉ R$ 500 MIL
BLACK BULL STEAKHOUSE - CERRO AZUL — Avenida Cerro Azul 1033 Maringa PR | 26.956.146/0001-07 DE R$ 500 MIL ATÉ R$ 1 MM
PIZZARIA MARCELUS — Rua Paranagua 450 Maringa PR | 28.589.698/0001-41 DE R$ 1 MM ATÉ R$ 2 MM
PASTEL DO TOM — Av Sete De Setembro 634 Maringa PR | 29.279.416/0001-72 DE R$ 500 MIL ATÉ R$ 1 MM
STREET BURGER SMASH HOUSE — Avenida Parana 1512 Maringa PR | 33.736.485/0001-35 DE R$ 100 MIL ATÉ R$ 250 MIL
REI DA PIZZA — Avenida 19 De Dezembro 393 Maringa PR | 37.907.432/0001-90 DE R$ 500 MIL ATÉ R$ 1 MM
PIZZARIA NICE DELIVERY — Avenida Kakogawa 981 Maringa PR | 38.036.177/0001-10 DE R$ 1 MM ATÉ R$ 2 MM
PIZZERIA DA PRACA — Praca Rocha Pombo 248 Maringa PR | 38.545.699/0001-48 ATÉ R$ 50 MIL
PIZZA PRIME MARINGA — Avenida Advogado Horacio Raccanello Filho 5410 Maringa PR | 46.180.589/0001-58 DE R$ 250 MIL ATÉ R$ 500 MIL
TAKE AND GO PIZZARIA — Rua Yoshinori Kubota 13 Maringa PR | 51.416.346/0001-06 DE R$ 250 MIL ATÉ R$ 500 MIL
BURGER PERK — Rua Farmaceutico Luiz Andrade 653 Maringa PR | 52.821.960/0001-16 DE R$ 250 MIL ATÉ R$ 500 MIL
TOP DOG LANCHES — Avenida Dona Sophia Rasgulaeff 2386 Maringa PR | 60.637.760/0001-36 DE R$ 50 MIL ATÉ R$ 100 MIL

from artifact_tool import Workbook, SpreadsheetFile, Blob
from collections import Counter

wb2=Workbook.create()
dash=wb2.worksheets.add("Visão Geral")
base=wb2.worksheets.add("Base 51 | Triagem")
tests=wb2.worksheets.add("Testes WhatsApp")
regras=wb2.worksheets.add("Motor de Score")
nichos=wb2.worksheets.add("Nichos e Buscas")

BLACK="#17262A"; TEAL="#138C85"; PALE="#E8F6F3"; LIGHT="#F4F7F8"; GRAY="#64748B"; YELLOW="#FFF3DC"
def head(sheet, a1, color=BLACK):
    sheet.get_range(a1).format={"fill":color,"font":{"bold":True,"color":"#FFFFFF","size":10},"row_height":31,"vertical_alignment":"center","wrap_text":True}
def title(sheet, a1, size=17):
    sheet.get_range(a1).format={"fill":BLACK,"font":{"bold":True,"color":"#FFFFFF","size":size},"row_height":44}
def widths(sheet, mapping):
    for col,wd in mapping.items():
        sheet.get_range(f"{col}:{col}").format.column_width=wd
def wrap(sheet, a1):
    sheet.get_range(a1).format.wrap_text=True
def ctype(n):
    q=n.upper()
    if "DOMINO S" in q or "PIZZA PRIME" in q or "DOG KING" in q:
        return "Pedidos | validar autonomia da unidade","Franquia/rede: governança pode limitar implantação.","P2 | autonomia"
    if "NICE DELIVERY" in q:
        return "Pedidos | delivery explícito","WhatsApp de pedidos listado em diretório público.","P1 | pesquisa"
    if "PIZZARIA MARCELUS" in q:
        return "Pedidos | delivery e app","Site divulga delivery, cardápio e app; WhatsApp precisa ser medido.","P1 | pesquisa"
    if "TOP DOG" in q:
        return "Pedidos | lanches delivery","Retirada/delivery descritos em cadastro público.","P1 | pesquisa"
    if "FRANGO NA BRASA" in q:
        return "Pedidos | refeições prontas","CNAE informa fornecimento de alimentos para consumo domiciliar.","P1 | pesquisa"
    if "GRUPO HABANERO" in q:
        return "Presencial/híbrido | multissede","Várias unidades; investigar reservas e eventos, não presumir chat de pedidos.","P2 | outra oferta"
    if "BLACK BULL" in q:
        return "Presencial | steakhouse","Hipótese de menor dependência comercial do WhatsApp (relato do usuário).","P3 | baixa prioridade"
    if "PIZZERIA DA PRACA" in q:
        return "Pedidos | pizzaria a validar","Usuário relata falta de automação; sem evidência de demanda.","P2 | medir volume"
    if "REST. E PIZZARIA MK" in q or "PIZZARIA MK" in q:
        return "Indefinido | reforma","Usuário informou fechamento temporário para reforma.","Pausar"
    if "STREET BURGER" in q or "BURGER PERK" in q:
        return "Híbrido | hambúrguer + delivery","Há perfis públicos com delivery; conferir correspondência CNPJ/endereço.","P1 | pesquisa"
    if any(x in q for x in ["PIZZARIA", "PIZZA", "BURGUER", "BURGER", "LANCH", "DOG", "FRANGO", "SUSHI", "PASTEIS"]):
        return "Pedidos | hipótese pelo segmento","Nome/CNAE sugerem possível canal de pedidos; participação WhatsApp não verificada.","P2 | canal"
    if any(x in q for x in ["BAR", "PUB", "BOLICHE", "ARMAZEM", "ESTACAO"]):
        return "Presencial/híbrido | eventos","Testar reservas, eventos, grupos e campanhas de recompra.","P2 | outra oferta"
    return "Indefinido | atendimento","Não inferir demanda no WhatsApp apenas pelo CNAE.","P3 | avaliar"

known={
 "PIZZARIA NICE DELIVERY":"https://estabelecimentos.maringa.com/delivery",
 "PIZZARIA MARCELUS":"https://pizzariamarcelus.com.br/",
 "GRUPO HABANERO":"https://www.econodata.com.br/consulta-empresa/22378147000152-habanero-group-ltda",
 "BURGER PERK":"https://www.ifood.com.br/delivery/maringa-pr/burger-perk-zona-02/fc5c73ff-48ce-4533-857a-4c8fb1e8cd0e",
 "DOM CARNIVORO":"https://www.ifood.com.br/delivery/maringa-pr/dom-carnivoro-zona-04/080003ad-11e2-4e65-8ca3-c6959919a1f6",
 "PIZZA PRIME MARINGA":"https://www.ifood.com.br/delivery/maringa-pr/pizza-prime---maringa-zona-7/b96a3130-8bf0-4439-a980-e4ab9478a62e",
}
def how(n, profile):
    if "reforma" in profile.lower(): return "Confirmar reabertura antes de contato."
    if "autonomia" in profile.lower(): return "Quem pode contratar solução fora do padrão da marca?"
    if "Presencial" in profile: return "Quantas reservas, eventos ou orçamentos iniciam pelo WhatsApp/mês?"
    return "Quantos pedidos começam no WhatsApp/dia, e quantos são concluídos?"

values=[]
for r in data[1:]:
    name=r[2] if r[2] else (r[1] or "SEM NOME FANTASIA")
    modelo,ev,pri=ctype(name)
    city=r[25] or r[33] or "Maringá (a verificar)"
    url=known.get(name,"")
    value=[r[0],name,city,r[6],r[9],r[15],modelo,ev,pri,how(name,modelo),url,
           None,None,None,None,None,None,None,None,None,"","Não iniciado",""
          ]
    values.append(value)
print("Rows",len(values),"sizes",len(values[0]))
# Original city plus named companies only: no CPF/socio/employee personal fields.
headers=["CNPJ","Empresa","Cidade","Porte","Filiais (cadastro)","Fat. estimado | origem","Modelo provável","Sinal / evidência","Prioridade inicial","Pergunta para qualificar","Fonte pública",
         "WhatsApp (0–5)","Volume (0–5)","Dor (0–5)","Economia (0–5)","Decisor (0–5)","Execução (0–5)",
         "Cobertura %","Score (0–100)","Classificação ICP","Teste / observação","Status comercial","Risco de identidade"]
base.get_range("A1:W1").values=[headers]
base.get_range("A2:W52").values=values
head(base,"A1:W1")
base.freeze_panes.freeze_rows(1)
base.freeze_panes.freeze_columns(2)
wrap(base,"F2:K52")
widths(base,{"A":22,"B":31,"C":19,"D":11,"E":12,"F":23,"G":36,"H":50,"I":23,"J":47,"K":53,
             "L":17,"M":17,"N":16,"O":17,"P":16,"Q":17,"R":16,"S":18,"T":24,"U":40,"V":19,"W":37})
base.get_range("A2:W52").format.row_height=32
base.get_range("L2:Q52").format.fill=PALE
base.get_range("R2:T52").format.fill=LIGHT
base.get_range("R2").formulas=[["=ROUND(COUNT(L2:Q2)/6*100,0)"]]
base.get_range("S2").formulas=[["=IF(COUNT(L2:Q2)<6,\"A validar\",ROUND(SUMPRODUCT(L2:Q2,'Motor de Score'!$B$7:$G$7)/5,0))"]]
base.get_range("T2").formulas=[["=IF(COUNT(L2:Q2)<6,\"Não qualificado\",IF(S2>=75,\"Fit alto\",IF(S2>=55,\"Fit médio\",\"Fit baixo\")))"]]
base.get_range("R2:R52").fill_down()
base.get_range("S2:S52").fill_down()
base.get_range("T2:T52").fill_down()
for c in "LMNOPQ":
    base.get_range(f"{c}2:{c}52").data_validation={"rule":{"type":"list","values":["0","1","2","3","4","5"]}}
base.get_range("V2:V52").data_validation={"rule":{"type":"list","values":["Não iniciado","Pesquisar","Teste WhatsApp","Contatar decisor","Discovery","Proposta","Ganho","Perdido","Pausado"]}}
print("Base done")
Rows 51 sizes 23
Base done

# Motor de score
regras.get_range("A1:H1").merge()
regras.get_range("A1").values=[["RADAR ICP  |  QUALIFICAÇÃO COM EVIDÊNCIAS"]]
title(regras,"A1:H1")
regras.get_range("A3:H3").merge()
regras.get_range("A3").values=[["Escalas 0–5 são preenchidas após pesquisa ou discovery; campo em branco = desconhecido, não nota zero."]]
regras.get_range("A3:H3").format={"fill":PALE,"font":{"color":BLACK,"size":10},"row_height":26}
regras.get_range("A5:H5").values=[["Variável / peso","Dependência WA","Volume","Dor real","Economia / ROI","Acesso decisor","Viabilidade","TOTAL"]]
head(regras,"A5:H5")
regras.get_range("A7:H7").values=[["Peso %",25,25,15,15,10,10,100]]
regras.get_range("A7:H7").format={"fill":PALE,"font":{"bold":True,"color":BLACK},"row_height":30}
regras.get_range("A9:H9").merge()
regras.get_range("A9").values=[["COMO PONTUAR (investigação, não palpite)"]]
head(regras,"A9:H9")
metricas=[
["Dependência WA","0: canal irrelevante | 3: participa do atendimento | 5: canal crítico para concluir transações"],
["Volume","0: confirmado mínimo | 3: moderado validado | 5: alto e recorrente confirmado"],
["Dor real","0: processo satisfatório comprovado | 3: fricção relatada | 5: perda relevante mensurada"],
["Economia / ROI","0: investimento inviável | 3: retorno plausível | 5: benefício conservador cobre o custo"],
["Acesso decisor","0: sem acesso ou orçamento | 3: decisor alcançável | 5: patrocinador ativo e verba disponível"],
["Viabilidade","0: dependência técnica impeditiva | 3: implementação viável | 5: simples, replicável e margem sustentável"]
]
regras.get_range("A10:B15").values=metricas
regras.get_range("A10:A15").format.font.bold=True
regras.get_range("B10:B15").format.wrap_text=True
regras.get_range("A10:B15").format.row_height=32
regras.get_range("A17:H17").merge()
regras.get_range("A17").values=[["TRAVAS: se faltar volume, WA, dor, ou ROI, não chamar de ICP confirmado. Faturamento estimado é somente pista, nunca fluxo de caixa."]]
regras.get_range("A17:H17").format={"fill":YELLOW,"font":{"color":BLACK},"wrap_text":True,"row_height":37}
regras.get_range("A19:H19").merge()
regras.get_range("A19").values=[["SCORING 100% preenchido: >=75 Alto | 55 a 74 Médio | abaixo de 55 Baixo. Score não é taxa de fechamento."]]
regras.get_range("A19:H19").format={"fill":LIGHT,"font":{"color":BLACK},"row_height":30}
widths(regras,{"A":23,"B":73,"C":16,"D":17,"E":19,"F":18,"G":18,"H":12})
regras.freeze_panes.freeze_rows(5)

# Manual WhatsApp tests
thead=["Empresa","Cidade","Observação fornecida","Dia e horário do teste",
       "Dentro do expediente?","Pergunta realizada","Resposta automática observada?","1ª resposta (min)",
       "Conseguiu concluir a solicitação?","Destino do pedido","Mensagens/mês comprovadas",
       "Diagnóstico do teste","Pergunta de discovery","Fonte pública"]
tests.get_range("A1:N1").values=[thead]
head(tests,"A1:N1")
testvals=[]
questions={
 "Boussolé Rooftop":"Qual porcentagem das reservas, aniversários e eventos entra via WhatsApp?",
 "La Gondola Trattoria":"Quantas reservas e alterações de reserva chegam via WhatsApp/semana?",
 "Granchio Bistrô":"Quantas reservas são feitas via mensagens e quantos clientes retornam?",
 "O Casarão Londrina":"Quantos eventos/orçamentos chegam por mês? Quanto leva o follow-up?",
 "Manzini Pizzaria Maringá":"Quantas reservas de grupos, aniversários e pedidos de delivery passam no WhatsApp?",
 "Fornalha Pizza Maringá":"Quantos pedidos/dia chegam por WhatsApp versus marketplaces?",
 "Pizzaria MK":"Qual a data de reabertura e como será o processo de pedidos?",
 "J Maia Pizzaria":"Qual canal oficial recebe pedidos e reservas?",
 "Costelaria O Rancho":"A IA Meta registra clientes, atualiza cardápio e faz follow-up?",
 "Pizzaria Marcelus | Hilton":"Qual proporção de pedidos vem de WhatsApp, do app e do cardápio online?",
 "Bizzo Pizzaria":"Qual o nome oficial/CNPJ dessa operação? Bizzo e Bizza são empresas diferentes?",
 "Pizzeria da Praça":"Quantos pedidos por WhatsApp/dia e perdas por falta de acompanhamento?",
 "Pizza Prime Maringá":"Que tarefas a IA atual não conclui e a unidade pode contratar integrações?"
}
for r in prev[1:]:
    name, city, note, link = r[0],r[1],r[2],r[12]
    ist="Indefinido"
    if "chatbot" in (note or "").lower() or "ia da meta" in (note or "").lower() or "IA + humanos" in (note or ""): ist="Sim (relato)"
    elif "humano" in (note or "").lower() or "sem ia" in (note or "").lower(): ist="Não (relato)"
    testvals.append([name,city,note,None,None,None,ist,None,None,None,None,None,questions.get(name,"Confirmar canal de pedidos, volume e gargalo."),link or ""])
tests.get_range("A2:N14").values=testvals
tests.get_range("L2").formulas=[["=IF(OR(E2=\"\",H2=\"\"),\"Sem evidência suficiente\",IF(E2<>\"Sim\",\"Fora do expediente\",IF(H2>=30,\"Demora >= 30min; ausência de IA não comprovada\",IF(G2=\"Sim\",\"Resposta automática observada\",\"Resposta <30min; origem desconhecida\"))))"]]
tests.get_range("L2:L14").fill_down()
widths(tests,{"A":31,"B":16,"C":45,"D":25,"E":22,"F":37,"G":26,"H":19,"I":26,"J":26,"K":25,"L":42,"M":49,"N":56})
tests.get_range("A2:N14").format.row_height=42
tests.get_range("A2:N14").format.wrap_text=True
tests.get_range("D2:F14").format.fill=PALE
tests.get_range("H2:K14").format.fill=PALE
tests.get_range("E2:E14").data_validation={"rule":{"type":"list","values":["Sim","Não"]}}
tests.get_range("I2:I14").data_validation={"rule":{"type":"list","values":["Sim","Não","Parcial"]}}
tests.freeze_panes.freeze_rows(1)
tests.freeze_panes.freeze_columns(2)
print("Scoring and tests ready")
Scoring and tests ready

# Add material entity-resolution caveats and public evidence URLs
for row_ix,r in enumerate(data[1:],start=2):
    n=(r[2] or "").upper()
    if "STREET BURGER" in n:
        base.get_range(f"W{row_ix}").values=[["Cadastro: Av. Paraná 1512; perfil comercial pesquisado: Av. Prudente de Morais 36. Confirmar vínculo."]]
    elif "BURGER PERK" in n:
        base.get_range(f"W{row_ix}").values=[["Cadastro: Rua Farmacêutico Luiz Andrade 653; perfil pesquisado aponta Rua Vereador Arlindo Planas 653. Confirmar."]]
    elif "PIZZARIA MARCELUS" in n:
        base.get_range(f"W{row_ix}").values=[["Nome fantasia cadastro 'PIZZARIA MARCELUS'; site usa 'Marcelu’s' e endereço Rua Paranaguá 450."]]
    elif "PIZZA PRIME" in n:
        base.get_range(f"W{row_ix}").values=[["Marca de rede: verificar autoridade comercial da unidade e integração com sistemas oficiais."]]
    elif "PIZZARIA NICE" in n:
        base.get_range(f"U{row_ix}").values=[["Diretório registra WhatsApp para pedido; medir resposta em horário aberto e % pedidos por esse canal."]]
        
# vertical opportunities
n_headers=["Vertical / subtipo","Transação repetida","Gatilhos públicos pesquisáveis","Dados ainda não públicos","Oferta inicial","Filtro negativo","Padrão de busca para scraping"]
n_rows=[
["Pizzaria delivery","Pedidos, dúvidas de sabores, adicionais e entrega","Delivery explícito; botão WhatsApp; cardápio online; 6–7 dias de operação","Pedidos iniciados no WA/dia; conversão; capacidade de caixa","Conversão de pedidos + recompra","Pedidos concentrados 100% em app com automação satisfatória",'pizzaria delivery "whatsapp" "Maringá"'],
["Dogão / prensados / lanches","Pedidos rápidos noturnos, combos, personalização","Delivery noturno; pedidos por WhatsApp; combos; retirada","Chats nos horários de pico e ticket/margem","Atendimento em pico + cardápio + recompra","Vendas exclusivamente balcão; raras conversas",'lanches prensados delivery whatsapp Maringá'],
["Hamburgueria delivery","Pedidos com variações, adicionais e recompra","Cardápio WhatsApp; promoções; delivery/retirada","Pedidos diretos vs app; tempo da equipe","Pedidos + recuperação de carrinho","App resolve todo o pedido e WhatsApp é residual",'hamburgueria delivery pedidos whatsapp Maringá'],
["Marmitaria / comida diária","Pedidos recorrentes e assinaturas, empresas","Cardápio da semana; entregas; pedidos por WhatsApp","Clientes recorrentes; encomendas/dia","Rotina de pedidos + recompra","Pouquíssimos pedidos e nenhum controle da base",'marmitaria marmitex whatsapp entrega Maringá'],
["Sushi / culinária delivery","Pedidos com adicionais, promoções, recompra","Delivery; cardápio digital; WhatsApp e iFood","Qual % WA? fluxo de pedido ou link direto?","Recompra + qualificação","Volume WhatsApp insuficiente",'sushi delivery whatsapp Maringá'],
["Clínica odontológica multi-profissional","Agendar, confirmar, pós, retorno, orçamento","3+ profissionais; múltiplas salas; agendamento via WhatsApp","Consultas/mês; faltas; verba e sistemas","Jornada do paciente + confirmação + retorno","Uma cadeira, agenda baixa, sistema fechado","clínica odontológica dentistas agendamento whatsapp Maringá"],
["Clínica estética / dermatologia","Avaliação, pacotes e revisitas","Múltiplas profissionais; agenda on-line; campanhas","Agenda, leads, taxa de comparecimento e ticket","Pré-atendimento + recuperação de orçamentos","Baixa demanda; procedimentos 100% por encaminhamento","clinica estética procedimentos agendamento WhatsApp Londrina"],
["Fisioterapia / reabilitação / pilates","Sessões recorrentes, reposições, faltas","Turmas/sessões múltiplas; agendamento por WhatsApp","Sessões/mês; regras de faltas e reposição","Confirmação + renovação de pacotes","Profissional solo com agenda pequena","pilates fisioterapia varias salas whatsapp Maringá"],
["Clínica veterinária / hospital pet","Agendamento, vacinas, pós, retornos","Múltiplos veterinários; 24h; consultas e exames","Consultas/mês; autorização de contatos; sistemas","Agenda + lembretes + retornos","Canal crítico inadequado para automação sem humano","hospital veterinario consulta agendamento whatsapp Maringá"],
["Imobiliária com anúncios","Leads de imóveis, agendamento, follow-up","Imóveis anunciados; múltiplos corretores; CTA WhatsApp","Leads/mês; velocidade; perdas; CRM","Qualificação + distribuição + recuperação","Poucas entradas e funil puramente indicação","imobiliaria corretores apartamentos anuncio whatsapp Londrina"],
["Loja de sofás / planejados","Orçamento, simulação, agendamento, follow-up","Catálogos; móveis sob medida; vendedores; WhatsApp","Orçamentos/mês, ticket, conversão, margem","Recuperação de orçamento + agendamento","Vendas quase todas imediatas no salão","sofas planejados moveis loja whatsapp orçamento Paraná"],
["Revenda de veículos","Anúncio, avaliação de troca, financiamento, visita","Muitos veículos publicados; vendedores; WhatsApp em anúncios","Leads/mês; CRM; visitas; conversões","Qualificação + recuperação de leads","Baixo estoque; pouco lead; sistema central fechado","revenda seminovos estoque whatsapp proposta Maringá"],
["Distribuidor / atacado B2B","Recompra, pedido, cotação, representantes","Catálogo; atacado; televendas; área de cobertura","Pedidos/mês; número vendedores; ERP","Pedido recorrente + pré-vendas B2B","Sem carteira recorrente ou integrações acessíveis","distribuidora atacadista representantes whatsapp pedidos Paraná"],
["Restaurante de salão / experiência","Reservas, grupos, eventos, comemorações","Reserva WhatsApp; formulário evento; turismo; local eventos","Solicitações de reservas/eventos, ticket e perda","Reservas + eventos + pós-visita","Reservas raras e consumo quase todo espontâneo","restaurante reservar aniversário grupos Maringá"],
]
nichos.get_range("A1:G1").values=[n_headers]
nichos.get_range("A2:G15").values=n_rows
head(nichos,"A1:G1")
nichos.get_range("A2:G15").format.row_height=59
nichos.get_range("A2:G15").format.wrap_text=True
widths(nichos,{"A":32,"B":43,"C":54,"D":42,"E":41,"F":48,"G":61})
nichos.freeze_panes.freeze_rows(1)

# Executive dashboard: no fake scores
dash.get_range("A1:H1").merge()
dash.get_range("A1").values=[["RADAR ICP  |  MOTOR DE DEMANDA COMERCIAL"]]
title(dash,"A1:H1")
dash.get_range("A3:H3").merge()
dash.get_range("A3").values=[["Pré-filtro de pesquisa ≠ ICP confirmado  |  19 OUT 2026  |  Base fornecida pelo usuário"]]
dash.get_range("A3:H3").format={"fill":PALE,"font":{"color":BLACK},"row_height":28}
dash.get_range("A5:D5").values=[["Registros na base original",len(values),"Testes/observações informados",len(testvals)]]
dash.get_range("A5:D5").format={"fill":LIGHT,"font":{"color":BLACK,"bold":True},"row_height":30}
dash.get_range("A7:H7").merge()
dash.get_range("A7").values=[["PRIMEIRA ONDA — VALIDAR DEMANDA DE CONVERSA E CAPACIDADE, NÃO FECHAR POR TAMANHO"]]
head(dash,"A7:H7")
shortlist=[
["Pizzaria Nice Delivery","Pedido direto","WhatsApp e delivery públicos","% pedidos WhatsApp e volume por noite","1ª onda"],
["Marcelu's / Pizzaria Marcelus","Delivery multicanal","Site, aplicativo e delivery","% pedidos WA vs app; etapas manuais","1ª onda"],
["Top Dog Lanches","Delivery de lanches","Delivery/retirada registrados","Pedidos por WhatsApp/noite e margem","1ª onda"],
["Burger Perk","Hamburgueria híbrida","iFood e presença de delivery","Confirmação do CNPJ e origem dos pedidos","1ª onda"],
["Street Burger Smash House","Hamburgueria híbrida","Perfil delivery encontrado","Confirmar divergência do endereço e % WA","1ª onda"],
["Frango na Brasa","Refeições para casa","CNAE 5620104","Pedidos por canal; atendimento de pico","1ª onda"],
["Pizza Prime Maringá","Delivery com IA","Bot+humano (relato usuário)","Lacunas IA + autonomia franquia","2ª onda"],
["Pizzeria da Praça","Pizzaria sem IA","Atendimento sem IA (relato)","Pedidos por canal; ticket e margem","2ª onda"],
["Grupo Habanero","Multunidade/restaurante","Várias filiais cadastrais","Reservas e eventos: gargalo real?","Oferta alternativa"],
["Black Bull Steakhouse","Salão/experiência","Hipótese de baixo uso comercial WA","Reservas/eventos WhatsApp ou dispensar","Despriorizar até prova"]
]
dash.get_range("A8:E17").values=shortlist
dash.get_range("A8:E17").format.row_height=32
dash.get_range("A8:E17").format.wrap_text=True
dash.get_range("A19:H19").merge()
dash.get_range("A19").values=[["NÃO REPLICAR: 'demorou 30 min' → 'não tem IA'. Fora de expediente, sistemas de pedidos e caminhos do bot distorcem o teste."]]
dash.get_range("A19:H19").format={"fill":YELLOW,"wrap_text":True,"font":{"color":BLACK},"row_height":40}
dash.get_range("A21:H21").merge()
dash.get_range("A21").values=[["REFERÊNCIA VALIDADA: Pizza do Gordo R$ 3.000 + R$ 350/mês. Dr. Lucas: 596 pacientes em setembro; 366 em outubro até o relato. Volumes diferentes, mesmo princípio: tarefa recorrente."]]
dash.get_range("A21:H21").format={"fill":PALE,"wrap_text":True,"font":{"color":BLACK},"row_height":44}
dash.get_range("A23:H23").merge()
dash.get_range("A23").values=[["SEQUÊNCIA: filtrar modelo → verificar canais → testar fluxo no horário correto → perguntar volume → qualificar impacto → qualificar verba e decisor → ofertar."]]
dash.get_range("A23:H23").format={"fill":LIGHT,"wrap_text":True,"font":{"color":BLACK},"row_height":44}
widths(dash,{"A":31,"B":25,"C":35,"D":55,"E":24,"F":16,"G":16,"H":17})
dash.freeze_panes.freeze_rows(3)
print("Dashboard and niches complete",Counter(v[8] for v in values))
Dashboard and niches complete Counter({'P2 | canal': 19, 'P3 | avaliar': 16, 'P1 | pesquisa': 6, 'P2 | outra oferta': 4, 'P2 | autonomia': 3, 'P3 | baixa prioridade': 1, 'P2 | medir volume': 1, 'Pausar': 1})

print(wb2.inspect({"kind":"table","range":"'Base 51 | Triagem'!L1:W5","include":"values,formulas","table_max_rows":5,"table_max_cols":12}).ndjson[:5000])
print(wb2.inspect({"kind":"table","range":"'Motor de Score'!A5:H7","include":"values","table_max_rows":3,"table_max_cols":8}).ndjson[:1700])
print("Errors",wb2.inspect({"kind":"match","search_term":"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A","options":{"use_regex":True,"max_results":15},"summary":"formula errors"}).ndjson[:1400])
out="/mnt/data/Radar_ICP_v2_Matriz_51_Empresas.xlsx"
SpreadsheetFile.export_xlsx(wb2).save(out)
import os
print("SAVED",
{"kind":"table","sheet":"Base 51 | Triagem","address":"L1:W5","rows":5,"cols":12,"values":[["WhatsApp (0–5)","Volume (0–5)","Dor (0–5)","Economia (0–5)","Decisor (0–5)","Execução (0–5)","Cobertura %","Score (0–100)","Classificação ICP","Teste / observação","Status comercial","Risco de identidade"],[null,null,null,null,null,null,0,"A validar","Não qualificado","","Não iniciado",""],[null,null,null,null,null,null,0,"A validar","Não qualificado","","Não iniciado",""],[null,null,null,null,null,null,0,"A validar","Não qualificado","","Não iniciado",""],[null,null,null,null,null,null,0,"A validar","Não qualificado","","Não iniciado",""]]}
{"kind":"table","sheet":"Motor de Score","address":"A5:H7","rows":3,"cols":8,"values":[["Variável / peso","Dependência WA","Volume","Dor real","Economia / ROI","Acesso decisor","Viabilidade","TOTAL"],[null,null,null,null,null,null,null,null],["Peso %",25,25,15,15,10,10,100]]}
Errors {"kind":"notice","message":"Cell search matched 0 entries."}
SAVED /mnt/data/Radar_ICP_v2_Matriz_51_Empresas.xlsx 23178
Radar ICP — Como descobrir quem realmente tem potencial para comprar da Avraham
Agora ficou claro o que precisamos construir: um sistema capaz de descobrir empresas parecidas com a Pizza do Gordo, com a Clínica Dr. Lucas e com o Grupo A Maneiro — e, principalmente, empresas economicamente melhores.

O objetivo não é simplesmente localizar quem ainda não utiliza inteligência artificial.

É identificar empresas que tenham três características simultâneas:

Dependência operacional: o WhatsApp participa diretamente de vendas, agendamentos, orçamentos ou relacionamento recorrente.

Volume suficiente: a quantidade de interações cria trabalho, perdas ou oportunidades que justificam automatizar.

Capacidade de investimento: a empresa consegue pagar por uma solução e tem razões econômicas para mantê-la funcionando.

Uma pizzaria que recebe 250 pedidos por mês pelo WhatsApp pode ser mais interessante que um restaurante sofisticado com 1.500 clientes presenciais e apenas 20 consultas pelo aplicativo.

Da mesma forma, uma clínica com 600 atendimentos mensais pode ser excelente mesmo que seu atendimento de WhatsApp seja rápido, porque há confirmações, reagendamentos, pós-atendimento e retornos acontecendo continuamente.

1. Os quatro perfis que devemos separar
Perfil A — Operação de pedidos

Pizzarias delivery, hamburguerias, lanches prensados, dogões, marmitarias e açaí delivery.

O WhatsApp pode participar da venda, das dúvidas sobre produtos, do acompanhamento e da recompra.

Perfil B — Operação de agenda

Clínicas odontológicas, estética, diagnóstico, fisioterapia e outros negócios com agendas frequentes.

A oportunidade está em confirmações, reagendamentos, faltas, pós-atendimento e reativação.

Perfil C — Operação de orçamento

Imobiliárias, móveis planejados, lojas de sofás, concessionárias, distribuidores e serviços consultivos.

Cada lead pode representar uma venda de valor elevado. A dor está na qualificação, acompanhamento e recuperação de orçamentos.

Perfil D — Operação predominantemente presencial

Steakhouses, restaurantes de experiência, cafeterias e estabelecimentos com baixo volume de conversas comerciais.

Não são necessariamente clientes ruins, mas o produto de atendimento e vendas no WhatsApp tende a exigir mais validação.

A Black Bull pode estar no perfil D, como você sugeriu. Porém, se descobrirmos que recebe muitos pedidos de eventos, reservas de grupos ou delivery, ela pode migrar para outro perfil.

O segmento indica onde procurar. O modelo operacional determina o verdadeiro potencial.

2. Os seis critérios do nosso novo motor de qualificação
Este é o score que proponho colocar no centro do processo de pesquisa e scraping.

Critério

Peso

O que precisamos descobrir

Dependência do WhatsApp

25%

Quantas vendas ou tarefas realmente acontecem nesse canal?

Volume operacional

25%

Quantas conversas, pedidos, agendamentos ou orçamentos existem por mês?

Dor identificada

15%

Há demora, retrabalho, abandono ou falta de acompanhamento?

Potencial econômico

15%

Resolver esse problema justificaria o investimento?

Acesso ao decisor

10%

Conseguimos falar com alguém que pode aprovar a contratação?

Viabilidade de entrega

10%

Conseguimos implementar, integrar e sustentar com boa margem?

Critérios para considerar uma empresa qualificada


Confirmamos que o WhatsApp é relevante na operação

Validamos ou estimamos com dados confiáveis o volume de trabalho

Identificamos uma dor ou oportunidade mensurável

Existe capacidade plausível de investimento

A solução é tecnicamente e financeiramente viável
5 de 5 condições verificadas

Pronto para aprofundar proposta

Cada dimensão terá nota de 0 a 5, mas sem dados não existe nota. O agente deverá registrar a cobertura das evidências e não produzir um score fictício. Os pesos são uma hipótese inicial, a calibrar com resultados comerciais reais.

3. Quem mais parece uma Pizza do Gordo na sua base?
Depois de analisar os 51 registros da planilha original e confrontar alguns com fontes públicas, esta é a primeira onda de investigação que eu faria.

Empresa

Por que investigar

Filtro decisivo

Nice Delivery Pizzaria

Delivery e WhatsApp anunciados publicamente 

Estabelecimentos com DELIVERY em Maringá

Quantos pedidos diretos chegam por noite?

Pizzaria Marcelu's

Site próprio, aplicativo e delivery 

Pizzaria

O WhatsApp recebe pedidos ou só encaminha ao aplicativo?

Top Dog Lanches

Perfil de lanchonete com retirada e delivery

Volume do atendimento humano e dos pedidos diretos

Frango na Brasa

CNAE de alimentos preparados para consumo domiciliar

Participação real do WhatsApp na venda

Essas quatro são candidatas a um perfil semelhante ao da Pizza do Gordo, mas ainda não são ICPs validados.

Outras duas merecem uma pesquisa de identidade antes de prospectar: Burger Perk e Street Burger Smash House. Ambas têm indícios de delivery, mas encontrei divergências entre o endereço dos cadastros da planilha e os perfis comerciais consultados. 

iFood
 Não associaria automaticamente o CNPJ a esses perfis.

Já a Pizza Prime exige outra abordagem: você observou IA e atendimento humano. O diagnóstico correto é descobrir o que a automação atual não faz, e se a unidade tem autonomia para adquirir outro serviço.

Use two fingers to move the mapUse ctrl + scroll to zoom the map
O Grupo Habanero merece uma trilha distinta. A base indica cinco filiais e as fontes cadastrais confirmam uma estrutura com várias unidades. Isso sugere potencial para um contrato maior, mas não demonstra grande volume de pedidos pelo WhatsApp. Eu investigaria reservas, eventos, relacionamento e gestão entre unidades. 

Atualizado em Setembro de 2026

4. O que exatamente o scraper precisa encontrar?
A pesquisa deve ocorrer em três camadas.

Camada 1 — Dados públicos da empresa

CNPJ, CNAE, cidade, filiais, operação ativa, Google Maps, avaliações recentes, site, Instagram, cardápio, delivery, links de WhatsApp, anúncios e presença em marketplaces.

Saída: identificar o modelo de negócio e a probabilidade de existir um processo conversacional relevante.

Camada 2 — Auditoria da jornada do WhatsApp

Identificar bot, menu, atendimento humano, tempo de primeira resposta, capacidade de responder à solicitação, encaminhamento ao pedido e eventual abandono.

Aqui devemos registrar o horário do teste. Demorar 30 minutos não comprova ausência de IA. Pode haver atendimento fora do expediente, automação parcial ou pedido realizado por outra plataforma.

Camada 3 — Validação comercial

Perguntar volume de mensagens, pedidos ou consultas; quantos ficam pendentes; número de atendentes; existência de CRM ou plataforma de pedidos; orçamento; decisor.

É nesta camada que o agente pode transformar um prospect promissor em oportunidade comercial qualificada.

O scraper também precisa diferenciar pedido concluído pelo WhatsApp, WhatsApp que apenas envia um link de checkout, pedido no iFood e consumo presencial. Essas quatro jornadas geram oportunidades muito diferentes.

5. Os outros segmentos que eu priorizaria
A lógica deve funcionar fora do setor Food, sem mudar a pergunta principal: existe uma tarefa recorrente e economicamente relevante que conseguimos automatizar?

Nicho

Sinal de ICP mais forte

Produto provável

Odontologia com vários profissionais

Centenas de atendimentos e rotina de confirmação

Jornada do paciente

Estética com múltiplas profissionais

Consultas, avaliações, pacotes e retornos

Agenda + recuperação

Veterinárias estruturadas

Consultas, vacinas, exames e acompanhamento

Lembretes + pós-atendimento

Imobiliárias com equipe de corretores

Anúncios, leads e visitas frequentes

Qualificação + follow-up

Lojas de sofás e móveis planejados

Muitos orçamentos de valor elevado

Recuperação de orçamentos

Revendas de veículos

Estoque anunciado, leads e negociações

Pré-vendas + CRM

Distribuidoras e atacadistas

Pedidos recorrentes e carteira B2B

Automação de pedidos

A Clínica Dr. Lucas é um exemplo relevante de demanda recorrente. Você relatou 596 pacientes em setembro e 366 em outubro até o momento do levantamento. Mesmo que o WhatsApp responda rapidamente, permanece a necessidade de gerenciar confirmações, pós-atendimento e retornos.

Para empresas como Aeron Decor e Duna, eu investigaria antes a quantidade de orçamentos iniciados por WhatsApp, o número de vendedores, o ticket médio e a taxa de acompanhamento. O potencial pode ser maior que o de um delivery, pois uma venda recuperada pode ter contribuição econômica superior.

6. O arquivo operacional já está estruturado
Radar ICP v2 — Matriz de 51 Empresas

Excel com a base de investigação, motor de score, auditoria de WhatsApp e critérios por segmento.
Baixar matriz completa

A planilha tem cinco abas: Visão Geral, Base 51 | Triagem, Testes WhatsApp, Motor de Score e Nichos e Buscas. As pontuações dependentes de informações ainda não verificadas ficaram em branco, para que o ranking seja construído com dados reais.

O processo comercial ideal passa a ser:

Pesquisar

Pré-filtrar

Diagnosticar

Ofertar

O Grupo A Maneiro, por já estar em contato comercial com vocês, pode seguir diretamente para validação de volume e diagnóstico — não precisa voltar ao início do funil de prospecção.

A decisão mais importante para o Radar ICP: tratar empresas que recebem muitas conversas e empresas que realizam muitas transações como universos relacionados, mas diferentes. O que conecta ambos é a oportunidade de automatizar uma etapa que hoje custa tempo ou dinheiro. É essa evidência, e não a simples ausência de chatbot, que deve determinar quem entra na próxima lista de prospecção.

Cobertura: 51 registros da planilha fornecida, 13 observações anteriores de atendimento e pesquisa pública complementar. Os volumes comerciais, orçamentos e gargalos internos dos prospects continuam sujeitos à validação. Fontes externas são sinais de investigação, não confirmação de capacidade financeira.

