import express from 'express';
 
import Sequelize from 'sequelize';
 
const app = express();
//app.use(bodyParser.json());

 // Definir rutas aquí
app.get('/', (req, res) => res.send('Hola Mundo!'));

// Rutas
app.post('/nicolasmurciaviernes', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
 
app.get('/nicolasmurciaviernes', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
 
app.put('/nicolasmurciaviernes/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const [updated] = await User.update(req.body, {
          where: { id: id }
      });
      if (updated) {
          const updatedUser = await User.findOne({ where: { id: id } });
          res.status(200).json(updatedUser);
      } else {
          res.status(404).send("User not found");
      }
  } catch (error) {
      res.status(500).send(error);
  }
});
 
app.delete('/nicolasmurciaviernes/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const deleted = await User.destroy({
          where: { id: id }
      });
      if (deleted) {
          res.status(204).send("User deleted");
      } else {
          res.status(404).send("User not found");
      }
  } catch (error) {
      res.status(500).send(error);
  }
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));