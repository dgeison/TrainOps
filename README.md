<div align="center">

# TrainOps
### Operações simples e organizadas para gestão de instrutores e membros.

Aplicação de estudo construída com Node.js, Express e Nunjucks para praticar conceitos de rotas, templates, formulários e operações CRUD persistidas em arquivo JSON, focada na gestão de uma academia (instrutores e membros).

</div>

## 📌 Visão Geral

O TrainOps implementa um pequeno sistema de gestão de academia/estúdio com dois módulos principais:

- Instrutores (Instructors)
- Membros (Members)

Cada módulo possui rotas de listagem, criação, visualização, edição e exclusão. A persistência é feita em `data.json`, adequada para fins didáticos ou prototipagem inicial.

## 🛠 Stack Técnica

- Node.js + Express
- Nunjucks (engine de templates)
- Method Override (para suportar PUT/DELETE em formulários HTML)
- Browser Sync + Nodemon (dev experience com live reload)

## 📂 Estrutura de Pastas (principal)

```
server.js          # Configuração principal do servidor
routes.js          # Definição das rotas
controllers/       # Lógica de cada recurso (Instructors / Members)
views/             # Templates Nunjucks organizados por módulo
public/            # Arquivos estáticos (CSS, JS, imagens)
utils.js           # Funções auxiliares (datas / idade)
data.json          # Fonte de dados (persistência simples)
```

## 🚀 Executando o Projeto

Pré-requisitos: Node.js LTS instalado.

Instalação de dependências:

```powershell
npm install
```

Ambiente de desenvolvimento (com auto reload back + refresh front):

```powershell
npm start
```

Servidor ficará acessível em: http://localhost:5000

### 🐳 Executando com Docker

Build da imagem:
```powershell
docker build -t trainops:latest .
```

Rodar container simples:
```powershell
docker run --name trainops -p 5000:5000 trainops:latest
```

Usando docker-compose (hot reload de código via volume):
```powershell
docker compose up --build
```

Parar:
```powershell
docker compose down
```

Rebuild sem cache:
```powershell
docker compose build --no-cache
```

Notas:
- As alterações no código local refletem no container (volume montado) exceto dependências.
- Para instalar um novo pacote: editar `package.json` e rodar dentro do container ou localmente e reconstruir.

### 🌱 Seed / Reset de Dados

Scripts disponíveis:
```powershell
npm run seed        # Adiciona registros de exemplo sem apagar os existentes
npm run seed:reset  # Substitui completamente o data.json por dados de exemplo
```
Exemplo de uso comum após clonar:
```powershell
npm install
npm run seed:reset
npm start
```
Os IDs são recalculados para evitar colisões quando em modo append.

## 🔗 Rotas Principais

Instructors:
- GET /instructors
- GET /instructors/create
- GET /instructors/:id
- GET /instructors/:id/edit
- POST /instructors
- PUT /instructors
- DELETE /instructors

Members:
- GET /members
- GET /members/create
- GET /members/:id
- GET /members/:id/edit
- POST /members
- PUT /members
- DELETE /members

Observação: PUT e DELETE são enviados via formulário usando `_method` (method-override).

## 🧪 Dados / Persistência

O arquivo `data.json` armazena arrays `instructors` e `members`. Cada operação que modifica os dados reescreve o arquivo inteiro usando `fs.writeFile`.

Limitações da abordagem:
- Condições de corrida (concorrência) não tratadas.
- Sem integridade referencial.
- Pode corromper dados se o processo for interrompido no meio da escrita.

## ⚠️ Pontos de Atenção

- `autoescape` do Nunjucks AGORA está ativado (antes estava desativado). Revisar escapes manuais se adicionar HTML vindo do usuário.
- IDs de instrutores antes da refatoração usavam `length + 1`; agora usa último ID + 1.
- Não há sanitização/validação robusta de input (ex: email, formatos, limites de tamanho).
- Sem testes automatizados.

## ✅ Melhorias Aplicadas Nesta Revisão

- Comentários profissionais adicionados aos arquivos principais.
- Normalização de `services` (trim de itens) em criação/edição de instrutores.
- Correção de variáveis implícitas (`for (const key of ...)`).
- Geração de ID mais previsível para instrutores (segue padrão de members).
- Ativado `autoescape` no Nunjucks (mitigação básica contra XSS de saída).

## 💡 Melhorias Futuras Sugeridas

1. Implementar camada de modelo (abstrair leitura/escrita do JSON).
2. Adicionar validação (Joi / Zod) e sanitização.
3. Migrar para banco relacional (SQLite/PostgreSQL) ou NoSQL.
4. Implementar paginação e busca (filtros por nome / serviço).
5. Adicionar testes (Jest) para controllers e utils.
6. Introduzir TypeScript ou JSDoc mais completo.
7. Criar script de seed e backup de `data.json`.

## 🧪 Teste Rápido Manual Sugerido

1. Criar instrutor (verificar formatação de services).
2. Editar instrutor e remover/alterar serviços (verificar normalização).
3. Criar membro e checar exibição de data.
4. Deletar instrutor e criar outro para confirmar incremento de ID.

## 🛡 Licença

Projeto de estudo — adapte livremente.

## 🙋 Suporte / Dúvidas

Abra uma issue ou continue a conversa indicando o próximo passo desejado (ex: adicionar validação, migrar para banco, criar testes, etc.).

---
