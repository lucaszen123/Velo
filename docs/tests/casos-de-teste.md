# Documento de Casos de Teste - Velô Sprint

## Informações do Sistema
**Nome do sistema:** Velô Sprint - Configurador de Veículo Elétrico
**Descrição:** SPA web desenvolvida em React para configuração, simulação de financiamento e compra do veículo elétrico Velô Sprint.

---

### CT01 - Acesso e navegação na Landing Page

#### Objetivo
Garantir que o usuário consegue acessar a Landing Page e visualizar as informações iniciais e botão de ação para iniciar a configuração.

#### Pré-Condições
- O sistema deve estar acessível pelo navegador.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a URL raiz do sistema (`/`) | A Landing Page é carregada corretamente. |
| 2 | Verificar o conteúdo da página | O título da página e as imagens do Velô Sprint são exibidos. |
| 3 | Clicar no botão para iniciar configuração ("Configurar agora" ou similar) | O sistema redireciona o usuário para a página do Configurador de Veículo (`/configure`). |

#### Resultados Esperados
- O usuário é capaz de acessar a página inicial sem erros e navegar para o configurador.

#### Critérios de Aceitação
- A Landing Page carrega em menos de 3 segundos (percepção funcional).
- O botão de ação redireciona corretamente para a rota do configurador.

---

### CT02 - Configuração básica e precificação dinâmica

#### Objetivo
Validar que a alteração de componentes altera o preço final do veículo conforme as regras de negócio.

#### Pré-Condições
- O usuário deve estar na página do Configurador (`/configure`).
- Valor base do veículo é de R$ 40.000.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Visualizar o preço inicial ao abrir o configurador | O valor total exibido deve ser R$ 40.000. |
| 2 | Selecionar a opção de roda "Sport" | O valor total é atualizado para R$ 42.000 (+R$ 2.000). |
| 3 | Selecionar o opcional "Precision Park" | O valor total é atualizado para R$ 47.500 (+R$ 5.500). |
| 4 | Selecionar o opcional "Flux Capacitor" | O valor total é atualizado para R$ 52.500 (+R$ 5.000). |
| 5 | Desmarcar o opcional "Precision Park" | O valor total é reduzido e atualizado para R$ 47.000. |

#### Resultados Esperados
- O preço final é calculado dinamicamente de forma correta e instantânea, refletindo as regras de precificação estabelecidas.

#### Critérios de Aceitação
- Preço base: R$ 40.000.
- Rodas "Sport": Adiciona R$ 2.000.
- "Precision Park": Adiciona R$ 5.500.
- "Flux Capacitor": Adiciona R$ 5.000.
- O resumo da configuração deve listar corretamente os itens e seus valores.

---

### CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço

#### Objetivo
Validar se a seleção de Opciionais ("Precision Park" e "Flux Capacitor") atualiza dinamicamente o preço do veículo.

#### Pré-Condições
- Estar na página do Configurador.
- Veículo sem opcionais selecionados (Preço R$: 40.000,00).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Marcar o checkbox do opcional "Precision Park" | O preço de venda deve ser acrescido de R$ 5.500,00 (Total 
temporário: R$ 45.500,00). |
| 2 | Marcar o checkbox do opcional "Flux Capacitor" | O preço de venda deve ser acrescido de R$ 5.000,00 (Total
temporário: R$ 50.500,00). |
| 3 | Desmarcar os checkboxes dos opcionais | O preço total deve subtrair os valores respectivos e voltar a R$ 40.000,00. |
| 4 | Clicar no botão "Monteu o Seu" (Checkout) | O usuário é redirecionado para a página de checkout (`/order`) com os valores persistidos. |


#### Resultados Esperados
- O preço total acompanha de forma exata a marcação e desmarcação dos opcionais.
- O redirecionamento leva a configuração e o preço corretos para o checkout

#### Critérios de Aceitação
- O opcional "Precision Park" custa +R$ 5.500 e "Flux Capacitor" custar +R$ 5.000.

---

### CT04 - Validação de campos obrigatórios e dados inválidos no Checkout

#### Objetivo
Garantir que o sistema impede o envio do formulário de pedido se os dados estiverem ausentes ou forem inválidos.

#### Pré-Condições
- O usuário deve estar na página de Checkout/Pedido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar todos os campos em branco e clicar em "Confirmar Pedido" | O sistema exibe mensagens de erro abaixo de cada campo obrigatório (Nome, Sobrenome, Email, Telefone, CPF, Loja, Termos). |
| 2 | Preencher o Email com formato inválido (ex: `usuario@.com`) | O sistema exibe erro de "Email inválido". |
| 3 | Preencher CPF incompleto (ex: `123.456`) | O sistema exibe erro de "CPF inválido". |
| 4 | Preencher o Telefone incompleto | O sistema exibe erro de "Telefone inválido". |
| 5 | Preencher os dados corretamente, mas NÃO aceitar os termos e clicar em Confirmar | O sistema impede o envio e exibe erro solicitando o aceite dos termos. |

#### Resultados Esperados
- O sistema bloqueia a continuação do pedido até que todos os campos estejam preenchidos com os formatos corretos.

#### Critérios de Aceitação
- Mensagens de erro claras são exibidas próximas aos campos com problema.
- Validação de formato de Email, CPF (mínimo de 14 caracteres com máscara) e Telefone (mínimo de 14 caracteres com máscara).
- Aceite de termos é obrigatório.

---

### CT05 - Financiamento aprovado por Score de Crédito Alto (Score > 700)

#### Objetivo
Validar a regra de negócio de aprovação automática de crédito quando o score do cliente é superior a 700.

#### Pré-Condições
- Usuário na página de Checkout/Pedido com os dados pessoais corretamente preenchidos.
- Mock ou CPF que retorne um Score > 700 na integração da API.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a forma de pagamento "Financiamento" | O formulário exibe o campo para Valor da Entrada e o resumo do parcelamento em 12x. |
| 2 | Informar um valor de entrada de R$ 0,00 | O valor financiado e as parcelas são calculados sobre o total. |
| 3 | Clicar em "Confirmar Pedido" | O sistema realiza a chamada à API de crédito. |
| 4 | Aguardar o processamento e retorno da API com Score > 700 | O pedido é finalizado e o usuário é redirecionado para a página de Confirmação. |

#### Resultados Esperados
- O pedido é registrado com o status "APROVADO".
- A página de Sucesso deve exibir a forma de pagamento como "Financiamento".

#### Critérios de Aceitação
- Score > 700 resulta na aprovação automática do pedido de financiamento.

---

### CT06 - Financiamento reprovado por Score Baixo (Score <= 500)

#### Objetivo
Validar a regra de negócio de reprovação de crédito quando o score é igual ou inferior a 500 (e a entrada é menor que 50%).

#### Pré-Condições
- Usuário na página de Checkout/Pedido com dados válidos.
- Mock ou CPF que retorne Score <= 500.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a forma de pagamento "Financiamento" | Detalhes do financiamento são exibidos. |
| 2 | Inserir entrada igual a 0 | Parcelas calculadas. |
| 3 | Clicar em "Confirmar Pedido" | O sistema processa a análise de crédito. |
| 4 | O sistema recebe o retorno da API com Score <= 500 | O pedido é finalizado, redirecionado para a tela de conclusão, porém o status gravado na base de dados (e possivelmente exibido no resumo) é "REPROVADO". |

#### Resultados Esperados
- O sistema registra o pedido com status "REPROVADO" seguindo a regra do score baixo.

#### Critérios de Aceitação
- Score <= 500 (sem entrada alta) resulta no status "REPROVADO".

---

### CT07 - Financiamento Em Análise por Score Médio (Score 501 a 700)

#### Objetivo
Validar que os clientes com score intermediário ficam com o pedido retido para análise manual.

#### Pré-Condições
- Usuário na página de Checkout/Pedido com dados válidos.
- Mock ou CPF que retorne Score entre 501 e 700.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar "Financiamento" e preencher a entrada como 0 | Cálculo exibido na tela. |
| 2 | Clicar em "Confirmar Pedido" | A análise de crédito é processada. |
| 3 | O sistema recebe o retorno com Score 600 | O pedido é finalizado. |

#### Resultados Esperados
- O pedido é salvo no sistema com o status "EM_ANALISE".

#### Critérios de Aceitação
- Score entre 501 e 700 define o status do pedido como "EM_ANALISE".

---

### CT08 - Exceção de Aprovação Automática com Entrada >= 50%

#### Objetivo
Validar que o sistema aprova um financiamento, mesmo com um Score reprovado (< 700), caso o cliente dê pelo menos 50% do valor total como entrada.

#### Pré-Condições
- Usuário na página de Checkout/Pedido.
- Veículo configurado no valor total de R$ 40.000.
- Mock ou CPF que retorne um Score = 300 (que normalmente seria reprovado).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar "Financiamento" | Campo de entrada é exibido. |
| 2 | Preencher o campo de "Valor da Entrada" com R$ 20.000 (ou mais) | O sistema calcula o saldo financiado (R$ 20.000) e as parcelas com 2% a.m. |
| 3 | Clicar em "Confirmar Pedido" | O sistema envia a requisição e ignora o Score baixo. |

#### Resultados Esperados
- O pedido é registrado com o status "APROVADO", contornando a regra do Score devido ao alto valor da entrada.

#### Critérios de Aceitação
- Entrada >= 50% forçará a aprovação do crédito, independente de um Score < 700.

---

### CT09 - Cálculo dos juros de Financiamento

#### Objetivo
Garantir que os cálculos matemáticos dos juros do financiamento na tela estão corretos.

#### Pré-Condições
- Veículo base de R$ 40.000.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar "Financiamento" na tela de Checkout | O sistema deve calcular as parcelas em 12x com 2% de juros ao mês. |
| 2 | Verificar o valor da parcela exibido na tela sem entrada | Como (40000 / 12) * 1.02 = 3400. O valor exibido na parcela deve ser R$ 3.400,00 e o total financiado R$ 40.800,00. |

#### Resultados Esperados
- O cálculo da parcela deve aplicar rigorosamente a fórmula: Parcela = (Valor Financiado / 12) * 1.02.

#### Critérios de Aceitação
- Juros travados em 12x com taxa fixa de 2% ao mês em juros compostos simulados simples na prestação.
- O Resumo Total e o Total Financiado devem bater com os cálculos.

---

### CT10 - Consulta de Pedido Existente

#### Objetivo
Validar que um cliente consegue consultar o status e os dados de um pedido previamente realizado.

#### Pré-Condições
- O usuário deve ter um `order_number` válido de um pedido já registrado no banco de dados.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a página de Consulta de Pedidos (`/lookup`) | A página exibe um campo de busca para o número do pedido. |
| 2 | Inserir o `order_number` válido no campo de texto | O campo aceita o input do usuário. |
| 3 | Clicar no botão "Buscar Pedido" | O sistema processa a busca exibindo um indicador de carregamento. |
| 4 | Aguardar o retorno | Os detalhes do pedido, imagem do carro configurado, dados do cliente e o status atual (APROVADO/EM_ANALISE/REPROVADO) são exibidos corretamente na tela. |

#### Resultados Esperados
- O sistema recupera e exibe as informações completas referentes àquele pedido.

#### Critérios de Aceitação
- A consulta só retorna dados se o número do pedido for exatamente igual.
- Todas as informações do pedido devem refletir o banco de dados.

---

### CT11 - Consulta de Pedido com Número Inválido/Inexistente

#### Objetivo
Garantir a segurança dos dados retornando apenas um erro amigável caso o usuário informe um pedido inexistente ou incorreto, sem vazar informações.

#### Pré-Condições
- Acessar a página de Consulta de Pedidos (`/lookup`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Tentar submeter o formulário sem preencher nada | O botão de busca fica desabilitado. |
| 2 | Inserir um número de pedido inexistente (ex: `VLO-XXX999`) | O botão é habilitado. |
| 3 | Clicar em "Buscar Pedido" | O sistema tenta buscar os dados. |
| 4 | Avaliar a tela de resposta | O sistema exibe uma mensagem de "Pedido não encontrado" e orienta a verificar o número do pedido. Nenhuma outra informação é exibida. |

#### Resultados Esperados
- O sistema não quebra, trata a falha de forma graciosa e avisa o usuário que não localizou o pedido.

#### Critérios de Aceitação
- Segurança: Dados de pedidos não podem ser listados sem a chave específica de busca (`order_number`).
- Um card de erro deve ser renderizado quando o pedido não for encontrado.
