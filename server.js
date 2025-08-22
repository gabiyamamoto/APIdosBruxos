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

  //Pegar o id da URL e transformar em number
  const id = parseInt(req.params.id);

  //Buscar no array/objeto/json
  const bruxo = bruxos.find(b => b.id === id);

    //Verificar se existe
  if (bruxo) {
    //Se existir, enviar na resposta com o res e o status 200
    res.status(200).json({
      success: true,
      message: `Bruxo ${bruxo.nome} encontrado!`,
      data: bruxo
    });
 } else {
    //Se não existir, enviar na resposta um feeedback e o status 404
    res.status(404).json({
      error: "Bruxo não encontrado...",
      message: `Nenhum bruxo com ID ${id} foi encontrado`,
      codigo: "WIZARD_NOT_FOUND"
    });
 }
});

//Rota GET by name
app.get("/bruxos/nome/:nome", (req, res) => {

  //Pegar o nome da URL
  let nome = req.params.nome.toLowerCase();

  //Buscar no array/objeto/json usando "constains"
  const nomesEncontrados = bruxos.filter(b => b.nome.toLowerCase().includes(nome));

  if (nomesEncontrados.length > 0) {
    //Se encontrar, retorna todos os que batem com o nome
    res.status(200).json(nomesEncontrados);
  } else {
    //Se não existir, enviar feedback e status 404
    res.status(404).json({
      message: "Bruxo(s) não encontrado(s)!"
    });
  }
});

//Rota GET by casa
app.get("/bruxos/casa/:casa", (req, res) => {

  //Pegar a casa da URL
  let casa = req.params.casa;

  //Buscar no array/objeto/json
  const bruxosDaCasa = bruxos.filter(b => b.casa.toLowerCase() === casa.toLowerCase());

  if (bruxosDaCasa.length > 0) {
    //Se existir, enviar na resposta com o res e o status 200
    res.status(200).json(bruxosDaCasa);
  } else {
    //Se não existir, enviar na resposta um feedback o e status 400
    res.status(404).json({
      message: "Nenhum bruxo encontrado nessa casa!"
    });
  }
});

//Rota para bruxos mortos
app.get("/bruxos/vivos/nao", (req, res) => {
  const resultado = bruxos.filter((b) => !b.status);

  if (resultado) {
    res.status(200).json(resultado);
  } else {
    res.status(404).json({ erro: "Nenhum bruxo morto encontrado 💀"})
  }
})

app.listen(serverPort, () => {
    console.log(`⚡ Servidor Hogwarts iniciado em: http://localhost:${serverPort}`);
    console.log(`🧙‍♂️ API dos Bruxos está no ar na porta ${serverPort}!`);
});