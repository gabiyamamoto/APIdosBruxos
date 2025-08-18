import express from "express";
import bruxos from "./src/data/bruxos.js";

const serverPort = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <div style="
      background: linear-gradient(135deg, #1a237e, #3949ab);
      color: white;
      padding: 50px;
      text-align: center;
      font-family: 'Georgia', serif;
      min-height: 100vh;
      margin: 0;
    ">
      <h1 style="
        font-size: 3rem;
        color: #ffd700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 20px;
      ">
        ⚡ Bem-vindo à Hogwarts! ⚡
      </h1>
      <p style="font-size: 1.5rem; margin: 20px 0;">
        🏰 Escola de Magia e Bruxaria
      </p>
      <p style="font-size: 1.2rem; opacity: 0.9;">
        "É preciso muito mais que coragem para enfrentar nossos inimigos, 
        mas muito mais ainda para enfrentar nossos amigos."
      </p>
      <div style="margin-top: 30px;">
        <span style="font-size: 1.1rem;">🦁 Grifinória | 🐍 Sonserina | 🦅 Corvinal | 🦡 Lufa-lufa</span>
      </div>
    </div>
  `);
});

app.get("/bruxos", (req, res) => {
    res.json({
      success: true,
      message: "Todos os bruxos de Hogwarts! 🏰",
      data: bruxos,
      total: `${bruxos.length} bruxos`
    });
});

//Rota GET by ID
app.get("/bruxos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bruxo = bruxos.find(b => b.id === id);

  if (bruxo) {
    res.status(200).json({
      success: true,
      message: `Bruxo ${bruxo.nome} encontrado!`,
      data: bruxo
    });
 } else {
    res.status(404).json({
      error: "Bruxo não encontrado...",
      message: `Nenhum bruxo com ID ${id} foi encontrado`,
      codigo: "WIZARD_NOT_FOUND"
    });
 }
});

app.listen(serverPort, () => {
    console.log(`⚡ Servidor Hogwarts iniciado em: http://localhost:${serverPort}`);
    console.log(`🧙‍♂️ API dos Bruxos está no ar na porta ${serverPort}!`);
});