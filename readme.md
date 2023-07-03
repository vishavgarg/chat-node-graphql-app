
## Project installation:

### Backend:

1. Install all dependencies, 
    npm install

2. Make a database in postgres

3. Create following variables in env,

    DB_HOST="Database host"
    
    DB_NAME="Database name"
    
    DB_USER="Database user"
    
    DB_PASSWORD="Database password"
    
    DB_PORT="Database port"

4. Run all migrations,

    npx knex migrate:latest

5. Run seed files

    npx knex seed:run

6. Start the server

    npm start
