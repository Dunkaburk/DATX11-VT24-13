# DATX11-VT24-13
DATX11-24-13_Python Tutorial Package

## Första körning av projektet
1. Installera Docker Desktop

3. Starta container
    ```javascript
    docker compose up -d
    ```

#### Backend:
1. Gå till backend directoriet

2. Kör följande kommandon i terminal:
    ```
     npm install
    ```
    ```
     npx prisma generate
    ```

3. Initiera databas
    ```
     npx prisma migrate dev
    ```
    Populera databas med testdata
    ```
     npx prisma db seed
    ```

