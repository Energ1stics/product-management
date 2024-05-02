# Product Management

# Table of Contents

1. [Todo](#todo)
2. [Requirements](#requirementss)
3. [Installation](#installation)
    - [Source Code](#source-code)
    - [Docker](#docker)
4. [Problems](#problems)

## TODO

-   [x] Initialise Frontend
-   [x] Initialise Backend
-   [x] Backend API
    -   [x] List products
    -   [x] Add product
    -   [x] Update product
    -   [x] Delete product
-   [ ] Frontend
    -   [x] List products
    -   [x] Add product
    -   [x] Update product
    -   [x] Delete product
    -   [ ] Improve API Error handling
    -   [x] Show form errors
    -   [x] Confirm product delete
-   [x] Add category to product
-   [ ] Cleanup unused backend code from scaffolding
-   [ ] Create docker compose file

## Requirements

-   [Node.js v20](https://nodejs.org/en/download/current/)
-   [.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0)
-   Docker

#### Optional

-   [nvm](https://github.com/nvm-sh/nvm)
-   [pnpm](https://pnpm.io/)
-   Running MSSQL Server on port 1433

## Installation

### Source Code

#### Clone the repository

```bash
git clone https://github.com/Energ1stics/product-management.git
```

#### 1. Setup DB

If you don't have a MSSQL Server running, you can use the following command to create a development database.

```bash
docker run -d -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=DB-dev-123!' -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
```

Preferably, open two terminals inside the new folder `product-management`.

#### 2. Frontend

Preferably, use [nvm](https://github.com/nvm-sh/nvm) to install and activate the correct version of node.js. Then install pnpm and install the dependencies.

```bash
cd product-management
cd frontend
nvm use
npm install -g pnpm
pnpm i
```

#### 3. Backend

With the second terminal, go into the backend api project and run it.

```bash
cd product-management
cd backend/src/Web
dotnet run
```

In development mode, the db schema will be updated and seeded with some data. You can reach Swagger UI at https://localhost:5001.

#### Done

You can now visit the frontend at http://localhost:4200 and play around.

### Docker

From the root folder, run `docker compose up -d` to create and start a multicontainer in detached mode. This can take some time.

After the containers are up and running, you can visit the frontend at http://localhost:4200 and play around. The Swagger UI is available at http://localhost:5000.

In docker mode are currently no categories seeded and none can be created. Thus no products can be added.

## Problems

-   Project initialization took too long
-   Angular sources are scarce
-   Personal preferences towards tailwind and good looking ui took a lot of time
-   Docker backend container fails to connect to database
