# RadiologyControl System

## Descrição

O **RadiologyControl** é um sistema desenvolvido para gerenciar e analisar dados radiológicos e cirúrgicos. Ele permite a leitura de PDFs para extrair contagens de procedimentos específicos, além de fornecer um formulário para entrada de dados cirúrgicos, exibir registros, remover registros com confirmação e gerar relatórios em PDF.

## Funcionalidades

### 1. Leitura de PDF

- **Carregamento de Arquivo PDF**: Permite o carregamento de arquivos PDF.
- **Processamento de Conteúdo**: Processa o conteúdo do PDF e extrai contagens de procedimentos específicos, como RX, TC, US, e DO.
- **Exibição de Resultados**: Exibe os resultados da análise de PDF na interface do sistema e inclui esses resultados no relatório gerado.

### 2. Entrada de Dados Cirúrgicos

- **Formulário de Entrada**: Coleta dados sobre procedimentos cirúrgicos, incluindo:
  - Data e Hora da cirurgia.
  - Tempo gasto na cirurgia.
  - Nome do médico.
  - Nome do radiologista que auxiliou.
  - Nome do procedimento.
- **Adição de Registros**: Adiciona os dados coletados à lista de registros exibidos.

### 3. Exibição de Registros

- **Visualização**: Exibe os registros de dados cirúrgicos em cards horizontais na interface.
- **Detalhamento**: Cada card mostra os detalhes completos de um registro.

### 4. Remoção de Registros

- **Botão de Exclusão**: Cada card inclui um botão 'X' para remover o registro.
- **Confirmação de Exclusão**: Um modal de confirmação de exclusão aparece antes de remover um registro para prevenir exclusões acidentais.

### 5. Geração de Relatório em PDF

- **Geração de PDF**: Permite a geração de um relatório em PDF que inclui:
  - Resultados da análise do PDF carregado.
  - Registros de dados cirúrgicos em uma tabela organizada.

## Requisitos do Sistema

### Funcionais

1. **Leitura de PDF**:
   - Permitir o carregamento e processamento de arquivos PDF.
   - Extrair contagens de procedimentos e exibir resultados.

2. **Entrada de Dados Cirúrgicos**:
   - Coletar e adicionar dados de cirurgias através de um formulário.
   - Exibir registros adicionados na interface.

3. **Remoção de Registros**:
   - Permitir a remoção de registros com confirmação via modal.

4. **Geração de Relatório em PDF**:
   - Gerar relatórios em PDF com dados de PDF carregados e dados cirúrgicos.

### Não Funcionais

1. **Usabilidade**:
   - Interface intuitiva e fácil de usar.

2. **Responsividade**:
   - Funcionamento adequado em diferentes dispositivos e tamanhos de tela.

3. **Desempenho**:
   - Processamento eficiente de PDFs e manipulação rápida de registros.

4. **Acessibilidade**:
   - Suporte básico a acessibilidade, incluindo navegação por teclado e suporte a leitores de tela.

5. **Estilo e Design**:
   - Design moderno, com esquemas de cores consistentes e fontes legíveis.

6. **Segurança**:
   - Validação de entrada de dados para prevenir injeção de scripts.

7. **Manutenção**:
   - Código modular e organizado, facilitando a manutenção e expansão futura.

## Estrutura do Projeto

- **components/**: Contém os componentes React usados no projeto.
  - `Header.js`: Componente do cabeçalho.
  - `PdfAnalysis.js`: Componente para leitura e análise de PDF.
  - `GetDataRadiologySupport.js`: Componente para entrada de dados cirúrgicos.
  - `ConfirmDeleteModal.js`: Componente para modal de confirmação de exclusão.
- **App.js**: Componente principal que integra todos os componentes.
- **App.css**: Arquivo de estilos para o projeto.
- **index.js**: Arquivo de entrada principal do React.

## Como Usar

1. **Instale as Dependências**:
   ```bash
   npm install
    ```
Execute o Projeto:

```bash
npm start
```
Carregue um PDF: Use a interface para arrastar e soltar ou selecionar um arquivo PDF.

Adicione Dados: Preencha o formulário de entrada de dados cirúrgicos e adicione os registros.

Remova Registros: Use o botão 'X' em cada card para remover registros com confirmação.

Gere Relatório em PDF: Clique no botão para gerar um PDF consolidando os resultados da análise de PDF e os registros de dados cirúrgicos.

Dependências:

react
react-dom
react-modal
jspdf
jspdf-autotable
