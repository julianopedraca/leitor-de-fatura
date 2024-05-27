<p style="display:flex;justify-content:center;align-items:center;" align="center">
  <a href="https://expressjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="100" alt="Express Logo"/></a>
  <span style="font-weight:900; font-size:30px;margin:0 10px;color:white">+</span>
  <a href="https://react.dev/" target="blank"><img style="background-color:white;" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo"/></a>
  <span style="font-weight:900; font-size:30px;margin:0 10px;color:white">+</span>
  <a href="https://react.dev/" target="blank"><img style="background-color:white;" src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" alt="Postgres Logo"/></a>
  <span style="font-weight:900; font-size:30px;margin:0 10px;color:white">+</span>
  <a href="https://www.docker.com/" target="blank"><img style="background-color:white;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1024px-Docker_%28container_engine%29_logo.svg.png" width="100" alt="docker Logo"/></a>
  <span style="font-weight:900; font-size:30px;margin:0 10px;color:white">+</span>
  <a href="https://www.prisma.io/" target="blank"><img style="background-color:white;" src="https://www.prisma.io/docs/img/logo.svg" width="100" alt="Prisma Logo"/></a>

</p>

# Leitor de Faturas
## Visão Geral
O Leitor de Faturas é um aplicativo completo para automatizar a extração de dados de faturas em PDF e armazená-los em um banco de dados PostgreSQL. Ele oferece uma interface amigável para visualizar e gerenciar suas faturas, tudo em um ambiente seguro e escalável.

## Características
- **Extração automática de dados:** O Leitor de Faturas utiliza scripts Python para extrair dados relevantes de seus arquivos PDF, como número da fatura, data de vencimento, valor total e itens da fatura. 
- **Banco de dados PostgreSQL:** Armazene seus dados de forma segura e escalável com o PostgreSQL, um banco de dados robusto e confiável.
- **API RESTful:** A API RESTful permite que você integre o Leitor de Faturas com outros sistemas ou aplicativos.
- **Contêinerização Docker:** O projeto é totalmente containerizado com Docker, facilitando a instalação, o uso e a escalabilidade.

## Prerequisites
- **Docker Compose:** Versão 2.27.0 ou superior.


## Instalação
Clone o repositório:

```Bash
git clone https://github.com/julianopedraca/leitor-de-fatura
```

Navegue até o projeto:
```Bash
cd leitor-de-fatura
```

Rode o projeto:

```Bash
docker compose up
```

simples assim!
O docker já deve instalar as imagens, preparar o ambiente, popular o banco de dados, executar o servidor e construir o frontend

para acessar o dashboard entre no link
http://localhost:4000

## Rotas
**/api/bill/find-client-number:** Busca o cliente pelo numero.

**/api/bill/add-bill:** Adiciona várias faturas ao banco de dados.

**/api/bill/bills:** Retorna todas as faturas do banco de dados

*O Dashboard foi construido em cima do template gratuito disposto pela [mui](https://mui.com/) você pode acessar o repositório original [aqui](https://github.com/devias-io/material-kit-react)*