<h1 align="center">
  Cookmaster Project :cook:
</h1>
<h4 align="center"> 
  :notebook_with_decorative_cover: Armazene e consulte suas melhores receitas! :fried_egg:
</h4>

## Sobre o projeto

Consiste numa [API](https://palenske-cookmaster.herokuapp.com/) que armazena e fornece receitas :yum:
Nela é possível fazer o cadastro e login de pessoas usuárias, sendo apenas essas pessoas que poderão acessar, modificar e deletar as receitas que cadastrou.
As funcionalidades desse projeto são:
  - [Cadastro de usuário](#1---cadastrar-usuário)
  - [Login](#2---login-de-usuários)
  - [Cadastro de receitas](#3---cadastrar-receita)
  - [listar receitas](#4---crie-um-endpoint-para-a-listagem-de-receitas)
  - [listar receita por ID](#5---crie-um-endpoint-para-visualizar-uma-receita-específica)
  - [editar receita]()
  - [excluir receita]()
  - [adicionar imagem a uma receita]()

## Tecnologias usadas
- Node.js
- Express.js
- Validações com [JOI](https://www.npmjs.com/package/joi)
- upload de arquivos com o [multer](https://www.npmjs.com/package/multer)
- JWT
- Arquitetura REST e MSC
- Mocha/Chai
- Sinon
- MongoDB (cloud)
- Heroku

## Habilidades desenvolvidas

- Gerar tokens a partir de informações como login e senha;
- Autenticar rotas do Express, usando o token JWT;
- Fazer upload de arquivos em APIs REST;
- Salvar arquivos no servidor através de uma API REST;
- Consultar arquivos do servidor através de uma api REST.
- Realizar testes de integração


## Como rodar a aplicação localmente e executar testes de integração
> Certifique-se de que tenha o Git e o NPM instalados em sua máquina. Caso não os tenha rode os seguintes comandos:
> `sudo apt install git-all` && `sudo apt install npm`
- Faça um clone do repositório em sua máquina:
  `git clone https://github.com/palenske/cookmaster.git`
- Entre no diretório do projeto:
  `cd cookmaster`
- Instale as dependências:
  `npm install`
- Inicie a aplicação:
  `npm start`
- Para rodar os testes, com a aplicação rodando, rode o seguinte comando:
 `npm run dev:test`

## Como utilizar os end-points da API:
> A aplicação está rodando num servidor [heroku](https://palenske-cookmaster.herokuapp.com/), configurada para salvar os dados num cluster MongoDB em nuvem.
> O heroku mantém as aplicações free em estado de dormencia, acesse o [link](https://palenske-cookmaster.herokuapp.com/) para ligar-las.
> para consumir a API, exemplificarei com o [postman](https://web.postman.co/home)

### 1 - Cadastrar usuário

- Utilize a seguinte rota: `https://palenske-cookmaster.herokuapp.com/users`

- O verbo HTTP deverá ser `POST`

- No banco, um usuário terá os campos Email, Senha, Nome e Role.

- Para criar um usuário através da API, todos os campos são obrigatórios, com exceção do Role.

- O campo Email deve ser único.

- Usuários criados através desse endpoint terão o campo Role com o atributo _user_, ou seja, usuários comuns, e não admins.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

**Validações:**

- **[Será validado que o campo "name" é obrigatório]**

- **[Será validado que o campo "email" é obrigatório]**

- **[Será validado que não é possível cadastrar usuário com o campo email inválido]**

- **[Será validado que o campo "senha" é obrigatório]**

- **[Será validado que o campo "email" é único]**

- **[Será validado que o usuário foi cadastrado com sucesso]**

- **[Será validado que, ao cadastrar usuário, o valor do campo "role" tenha o valor "user"]**
Se o usuário for cadastrado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:

![Usuário Cadastrado](./public/create_user_success.png)

### 2 - Login de usuários

- Utilize a seguinte rota: `https://palenske-cookmaster.herokuapp.com/login`

- O verbo HTTP deverá ser `POST`

- A rota deve receber os campos Email e Senha e esses campos devem ser validados no banco de dados.

- Na configuração do `JWT` **não está sendo utilizado variáveis de ambientes**.

- Um token `JWT` será gerado e retornado caso haja sucesso no login. 

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

**Validações:**

- **[Será validado que o campo "email" é obrigatório]**

- **[Será validado que o campo "password" é obrigatório]**

- **[Será validado que não é possível fazer login com um email inválido]**

- **[Será validado que não é possível fazer login com uma senha inválida]**

- **[Será validado que é possível fazer login com sucesso]**
Se foi feito login com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
> copie o `token` para realizar os próximo passos.
![Login com Sucesso](./public/login_user_success_get_token.png)

### 3 - Cadastrar receita

- Utilize a seguinte rota: `https://palenske-cookmaster.herokuapp.com/recipes`

- A receita só pode ser criada caso o usuário esteja logado e o token `JWT` validado.
![Headers>Authorization>Token](./public/set_token_authorization.png)

- O verbo HTTP deverá ser `POST`

- No banco, a receita terá os campos Nome, Ingredientes, Modo de preparo, URL da imagem e Id do Autor.

- Nome, ingredientes e modo de preparo devem ser recebidos no corpo da requisição, com o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```

- O campo dos ingredientes pode ser um campo de texto aberto.

- O campo ID do autor, será extraído do token JWT.

- A URL da imagem será preenchida através de outro endpoint

**Validações:**

- **[Será validado que não é possível cadastrar receita sem o campo "name"]**

- **[Será validado que não é possível cadastrar receita sem o campo "ingredients"]**

- **[Será validado que não é possível cadastrar receita sem o campo "preparation"]**

- **[Será validado que não é possível cadastrar uma receita com token invalido]**

- **[Será validado que é possível cadastrar uma receita com sucesso]**
O resultado retornado para cadastrar a receita com sucesso deverá ser conforme exibido abaixo, com um status http `201`:

![Receita com Sucesso](./public/create_recipe_success.png)

### 4 - Listar receitas

- A rota deve ser (`https://palenske-cookmaster.herokuapp.com/recipes`).

- O verbo HTTP deverá ser `GET`

- A rota pode ser acessada por usuários logados ou não

**Validações:**

- **[Será validado que é possível listar todas as receitas sem estar autenticado]**

- **[Será validado que é possível listar todas as receitas estando autenticado]**

![Receita com Sucesso](./public/list_recipes.png)

### 5 - Crie um endpoint para visualizar uma receita específica

- A rota deve ser (`/recipes/:id`).

- A rota pode ser acessada por usuários logados ou não

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que é possível listar uma receita específica sem estar autenticado]**

O resultado retornado para listar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Listar uma Receita](./public/listarumareceita.png)

- **[Será validado que é possível listar uma receita específica estando autenticado]**

O resultado retornado para listar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Listar uma Receita](./public/listarumareceita.png)

- **[Será validado que não é possível listar uma receita que não existe]**

O resultado retornado para listar uma receita que não existe deverá ser conforme exibido abaixo, com um status http `404`:

![Listar uma Receita inexistente](./public/receitanaoencontrada.png)

### 6 - Crie uma query em mongo que insira uma pessoa usuária com permissões de admin

Crie um arquivo `seed.js` na raiz do projeto com uma query do Mongo DB capaz de inserir um usuário na coleção _users_ com os seguintes valores:

`{ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }`

**Obs.:** Esse usuário tem o poder de criar, deletar, atualizar ou remover qualquer receita, independente de quem a cadastrou. Isso será solicitado ao longo dos próximos requisitos.

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o projeto tem um arquivo de seed, com um comando para inserir um usuário root e verifico que é possível fazer login]**    

Será validado no arquivo `seed.js` existe a query para criar um usuário root

### 7 - Crie um endpoint para a edição de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado, ou caso esse usuário seja um admin.

- O corpo da requisição deve receber o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que não é possível editar receita sem estar autenticado]**

O resultado retornado para editar receita sem autenticação deverá ser conforme exibido abaixo, com um status http `401`:

![Editar uma Receita sem autenticação](./public/editarsemautenticacao.png)

- **[Será validado que não é possível editar receita com token inválido]**

O resultado retornado para editar receita com token inválido deverá ser conforme exibido abaixo, com um status http `401`:

![Editar uma Receita com token inválido](./public/editartokeninvalido.png)

- **[Será validado que é possível editar receita estando autenticado]**

O resultado retornado para editar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Editar uma Receita](./public/editarcomsucesso.png)

- **[Será validado que é possível editar receita com usuário admin]**

O resultado retornado para editar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Editar uma Receita](./public/editarcomsucesso.png)

### 8 - Crie um endpoint para a exclusão de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser excluída caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser excluída caso pertença ao usuário logado, ou caso o usuário logado seja um admin.

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que não é possível excluir receita sem estar autenticado]**

O resultado retornado para excluir uma receita sem autenticação deverá ser conforme exibido abaixo, com um status http `401`:

![Excluir uma Receita sem autenticação](./public/excluirsemautenticacao.png)

- **[Será validado que é possível excluir receita estando autenticado]**

O resultado retornado para excluir uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `204`:

![Excluir uma Receita](./public/excluircomsucesso.png)

- **[Será validado que é possível excluir receita com usuário admin]**

O resultado retornado para excluir uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `204`:

![Excluir uma Receita](./public/excluircomsucesso.png)

### 9 - Crie um endpoint para a adição de uma imagem a uma receita

- A rota deve ser (`/recipes/:id/image/`).

- A imagem deve ser lida do campo `image`.

- O endpoint deve aceitar requisições no formato `multipart/form-data`.

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado ou caso o usuário logado seja admin.

- O upload da imagem deverá ser feito utilizando o `Multer`.

- O nome do arquivo deve ser o ID da receita, e sua extensão `.jpeg`.

- A URL completa para acessar a imagem através da API deve ser gravada no banco de dados, junto com os dados da receita.

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que é possível enviar foto com usuário autenticado]**

O resultado retornado para adicionar uma foto na receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Foto Autenticada](./public/fotocomsucesso.png)

- **[Será validado que ao enviar foto, o nome da imagem é alterada para o id da receita]**

O resultado retornado para adicionar uma foto na receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Foto Autenticada](./public/fotocomsucesso.png)

- **[Será validado que não é possível enviar foto sem estar autenticado]**

O resultado retornado para adicionar uma foto na receita com sucesso deverá ser conforme exibido abaixo, com um status http `401`:

![Excluir uma Receita](./public/fotonaoautenticada.png)

- **[Será validado que é possível enviar foto com usuário admin]**

O resultado retornado para adicionar uma foto na receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Foto Autenticada](./public/fotocomsucesso.png)

### 10 - Crie um endpoint para acessar a imagem de uma receita

- As imagens devem estar disponíveis através da rota `/images/<id-da-receita>.jpeg` na API.

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que é retornada uma imagem como resposta]**

O resultado retornado deverá ser do tipo imagem, com um status http `200`:

![Foto Autenticada](./public/imagemrecetornada.png)

### 11 - Crie testes de integração que cubram no mínimo 30% dos arquivos em `src`, com um mínimo de 50 linhas cobertas

- Os testes de integração devem ser criados na pasta `./src/integration-tests`, essa pasta **não pode ser renomeada ou removida**;

- O arquivo `change.me.test.js` pode ser alterado, renomeado ou removido;

- Os testes devem ser criados usando o instrumental e boas práticas apresentado nos conteúdos de testes do course;

- Para rodar os testes, utilize o comando `npm run dev:test`;

- Para visualizar a cobertura, utilize o comando `npm run dev:test:coverage`;

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o teste cobre o valor esperado]**

Nenhum teste pode ser pulado;
O resultado do percentual total de cobertura deve ser igual ou maior que `30`;
O resultado do numero total de linhas cobertas deve ser igual ou maior que `50`.

## Requisitos Bônus

### 12 - Crie um endpoint para cadastro de pessoas administradoras

- A rota deve ser (`/users/admin`).

- Só será possível adicionar um admin caso esta ação esteja sendo feita por outro admin, portanto, deve ser validado se há um admin logado.

- Por padrão, as requisições pra esse endpoint devem adicionar um usuário com a role _admin_.

- O corpo da requisição deve ter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que não é possível cadastrar um usuário admin, sem estar autenticado como um usuário admin]**

Se o usuário admin não é criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:

![Criar usuário sem ser admin](./public/soadmincria.png)

- **[Será validado que é possível cadastrar um usuário admin]**

Se o usuário admin é criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:

![Criar admin](./public/criaradmin.png)

### 13 - Crie testes de integração que cubram no mínimo 60% dos arquivos em `src`, com um mínimo de 100 linhas cobertas

- Os testes de integração devem ser criados na pasta `./src/integration-tests`, essa pasta **não pode ser renomeada ou removida**;

- O arquivo `change.me.test.js` pode ser alterado, renomeado ou removido;

- Os testes devem ser criados usando o instrumental e boas práticas apresentado nos conteúdos de testes do course;

- Para rodar os testes, utilize o comando `npm run dev:test`;

- Para visualizar a cobertura, utilize o comando `npm run dev:test:coverage`;

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o teste cobre o valor esperado]**

Nenhum teste pode ser pulado;
O resultado do percentual total de cobertura deve ser igual ou maior que `60`;
O resultado do numero total de linhas cobertas deve ser igual ou maior que `100`.

### 14 - Crie testes de integração que cubram no mínimo 90% dos arquivos em `src`, com um mínimo de 150 linhas cobertas

- Os testes de integração devem ser criados na pasta `./src/integration-tests`, essa pasta **não pode ser renomeada ou removida**;

- O arquivo `change.me.test.js` pode ser alterado, renomeado ou removido;

- Os testes devem ser criados usando o instrumental e boas práticas apresentado nos conteúdos de testes do course;

- Para rodar os testes, utilize o comando `npm run dev:test`;

- Para visualizar a cobertura, utilize o comando `npm run dev:test:coverage`;

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o teste cobre o valor esperado]**

Nenhum teste pode ser pulado;
O resultado do percentual total de cobertura deve ser igual ou maior que `90`;
O resultado do numero total de linhas cobertas deve ser igual ou maior que `150`.

---

## Depois de terminar o desenvolvimento (opcional)

Para sinalizar que o seu projeto está pronto para o _"Code Review"_ dos seus colegas, faça o seguinte:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas:

  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**;

  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**;

  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-00`.

Caso tenha alguma dúvida, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

# Revisando um pull request

Use o conteúdo sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os _Pull Requests_.

#VQV

---

# Avisos finais

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário. Leva menos de 3 minutos!

Link: [FORMULÁRIO DE AVALIAÇÃO DE PROJETO](https://be-trybe.typeform.com/to/ZTeR4IbH#cohort_name=Turma%2011)

O avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?
