/*
   - Query params => meusite.com/users?nome=rodolfo&age=28 // filtros
   - Route params => /users/2  // Buscar, Deletar ou Atualizar algo especifico
   - Request Body => { "name": "joão", "age":}

   - GET   => Buscar informaçoes no back-end
   - POST  => Criar informaçoes no back-end
   - PUT / PATH  => Alterar/atualizar informaçoes no back-end
   - DELETE  => Deletar informaçoes no back-end

   - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados de requisição

   const {name, age} = request.query; // Destructuring assingnment
*/

const express = require("express");
const port = 3000;
const uuid = require("uuid");

const app = express();
app.use(express.json())// Avisando pro express que vamos usar json


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params;

    const index = users.findIndex(user => user.id === id) // Retorna o local do array que está sua informação 

    if(index < 0){
        return response.status(404).json({message: "User not Found"});
    }

    request.userIndex = index;
    request.userId = id;

    next();
}



app.get('/users',  (request, response) => {
    return response.json(users)
});



app.post('/users', (request, response) => {
    try{
    const { name, age } = request.body;
    // Para jogar um novo erro fazemos da seguinte maneira
    // if(age < 18) throw new Error()
 
    const user = { id:uuid.v4(), name, age } // id:uuid.v4(): Isso vai gerar um id único

    users.push(user)// push adiciona valores em um array
    return response.status(201).json(user)
    } catch(err){
        return response.status(500).json({error: "error not found"})
    } finally {
        // O finally, ele é opcional
        console.log('termino tudo')
    }
});


app.put('/users/:id',checkUserId,  (request, response) => {
    
    const { name, age} = request.body;
    const index = request.userIndex;
    const id = request.userId;

    const updateUsers = { id, name, age}

 
 
   users[index] = updateUsers;

    return response.json(updateUsers)
});

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex;



    users.splice(index, 1);

    return response.status(204).json(users)
});











app.listen(3000, () => {
    console.log(`Server started on port ${port} 🚀 `)
});

