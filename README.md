# DATX11-VT24-13
DATX11-24-13_Python Tutorial Package


## Databas
- Databasens tabeller bestäms av schemat i 
    - /prisma/schema.prisma
- Exempel på anrop till databasen finns i index.ts


### Sätta upp databas i lokal utvecklingsmiljö
1. Se till att postgres är installerat https://www.postgresql.org/download/

2. Lägg till prisma till projektet med följande kommandon i backend-directoriet:
    ```
     npm install prisma --save-dev
    ```
    ```
     npm install @prisma/client
    ```
    ```
     prisma generate
    ```
    
3. Se till att din .env fil innehåller variabeln DATABASE_URL på följande form:
    - DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
- **Exempel:** Agnes har i postgresinstallationen satt både user och password till "postgres" samt använt standardport 5432. Innehållet i hennes .env fil ser därför ut som följer:
    - DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kandidat?schema=public"

4. För att sätta upp databas och lägga till tabeller kör kommando:
    ```
     npx prisma migrate
    ```
    Om det inte funkar, pröva:

    ```
     npx prisma migrate dev --name init
    ```