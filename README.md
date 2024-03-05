# DATX11-VT24-13
DATX11-24-13_Python Tutorial Package


## Databas
- Databasens tabeller bestäms av schemat i /prisma/schema.prisma


### Sätta upp databas i lokal utvecklingsmiljö
1. Veva igång Docker och kör sedan följande kommando i directory DATX11-VT24-13
    ```javascript
    docker compose up -d 
    ```

2. Se till att din .env fil innehåller variabeln DATABASE_URL på följande form:
    ```javascript
    DATABASE_URL="postgresql://g13:pass123@localhost:5432/assignments?schema=public"
    ```
3. Lägg till prisma till projektet med följande kommandon i directory backend:
    ```
     npm install
    ```
    ```
     npx prisma generate
    ```

4. För att initiera databas kör kommando:
    ```
     npx prisma migrate dev
    ```
