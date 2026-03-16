const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lume_db'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        console.log('\n⚠️  VERIFIQUE:');
        console.log('1. MySQL Server está rodando?');
        console.log('2. Banco "lume_db" existe?');
        console.log('3. Senha do root está correta no arquivo .env');
        console.log('4. Execute: mysql -u root -p < database.sql');
        return;
    }
    console.log('✅ Conectado ao banco de dados MySQL!');
    
    // Criar tabela de usuários se não existir
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar tabela users:', err);
        } else {
            console.log('✅ Tabela users verificada/criada com sucesso!');
        }
    });
});

// Rotas
app.get('/', (req, res) => {
    res.json({ 
        message: 'LUME API Server is running!',
        database: 'MySQL',
        status: 'Connected'
    });
});

// Endpoint de registro de usuários
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('📝 Tentativa de registro:', { email, passwordLength: password?.length });

        // Validação básica
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Verificar se o email já existe
        const checkEmailQuery = 'SELECT id FROM users WHERE email = ?';
        db.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error('❌ Erro ao verificar email:', err);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            // Criptografar senha no backend
            const hashedPassword = await bcrypt.hash(password, 10);

            // Inserir novo usuário
            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            db.query(insertUserQuery, [email, hashedPassword], (err, results) => {
                if (err) {
                    console.error('❌ Erro ao inserir usuário:', err);
                    return res.status(500).json({ error: 'Erro ao criar usuário' });
                }

                console.log('✅ Usuário criado com sucesso:', { id: results.insertId, email: email });

                res.status(201).json({
                    message: 'Usuário criado com sucesso!',
                    userId: results.insertId,
                    email: email
                });
            });
        });

    } catch (error) {
        console.error('❌ Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint de login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔑 Tentativa de login:', { email });

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error('❌ Erro ao buscar usuário:', err);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }

            const user = results[0];

            try {
                // Comparar senha
                const passwordMatch = await bcrypt.compare(password, user.password);
                
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Email ou senha inválidos' });
                }

                console.log('✅ Login realizado com sucesso:', { id: user.id, email: user.email });

                res.json({
                    message: 'Login realizado com sucesso!',
                    user: {
                        id: user.id,
                        email: user.email
                    }
                });
            } catch (bcryptError) {
                console.error('❌ Erro ao comparar senhas:', bcryptError);
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });

    } catch (error) {
        console.error('❌ Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint para listar usuários (apenas para desenvolvimento)
app.get('/api/users', (req, res) => {
    const query = 'SELECT id, email, created_at FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Erro ao listar usuários:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        res.json({
            message: 'Lista de usuários',
            users: results
        });
    });
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor LUME rodando na porta ${PORT}`);
    console.log(`📡 Acesse: http://localhost:${PORT}`);
    console.log(`🗄️  Banco: MySQL`);
    console.log(`\n📝 Endpoints disponíveis:`);
    console.log(`   GET  /              - Status do servidor`);
    console.log(`   POST /api/auth/register - Registro de usuário`);
    console.log(`   POST /api/auth/login    - Login de usuário`);
    console.log(`   GET  /api/users         - Listar usuários (dev)`);
});

// Exportar para testes
module.exports = app;
