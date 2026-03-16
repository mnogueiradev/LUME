const mysql = require('mysql2');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Configurando banco de dados MySQL...');

rl.question('Digite a senha do root do MySQL: ', (password) => {
    // Conectar ao MySQL
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: password
    });

    connection.connect((err) => {
        if (err) {
            console.error('❌ Erro ao conectar:', err.message);
            rl.close();
            return;
        }
        console.log('✅ Conectado ao MySQL!');
    });

    // Criar banco de dados
    connection.query('CREATE DATABASE IF NOT EXISTS lume_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
        if (err) {
            console.error('❌ Erro ao criar banco:', err);
            rl.close();
            return;
        }
        console.log('✅ Banco "lume_db" criado com sucesso!');
        
        // Conectar ao banco lume_db
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: password,
            database: 'lume_db'
        });

        db.connect((err) => {
            if (err) {
                console.error('❌ Erro ao conectar ao lume_db:', err);
                rl.close();
                return;
            }
            console.log('✅ Conectado ao banco lume_db!');
        });

        // Criar tabela users
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `;

        db.query(createUsersTable, (err) => {
            if (err) {
                console.error('❌ Erro ao criar tabela users:', err);
                rl.close();
                return;
            }
            console.log('✅ Tabela "users" criada com sucesso!');
            
            console.log('\n🎉 Banco de dados LUME configurado!');
            console.log('📊 Tabelas criadas: users');
            
            db.end();
            connection.end();
            rl.close();
        });
    });
});
