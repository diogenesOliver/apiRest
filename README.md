<h2 align='center'> Validação de daos com JWT </h2>

<br>

<p align='center'> Neste projeto é criado uma API Rest para a validação de dados de um usuário </p>

<br>

**Criando um Novo Usuário**

Pode-se observar que o código `linkController.js` da pasta `routeController` começa com uma função chamada `createUser`, onde a mesma tem como objetivo criar um um novo usuário, pegando as requisições que o cliente for passando como `(username, confirmpassword, password, email, age)`. <br>
Essas requisições serão salvas no banco dade dados. As requisições `(password, confirmpassword)`, também são salvas, porém já criptografadas.

<br>

**Usuário Logando**

Ainda no `linkController.js` da pasta `routeController` pode-se observar uma função chamada `loginUser`, onde, depois de criado um novo usuário e salvo no banco de dados, o cliente passa o seu email e sua senha. A variável `user` é responsável por buscar no banco de dados o email que o usuário passou, caso encontre segue com a aplicação, caso contrário retorna uma mensagem de status (404) - `Usuário não encontrado`. <br>
Em seguida o usuário passa sua senha. A variável `verificaPassword` é resposável por comparar a senha que o usuário passa no corpo da requisição com a senha criptografada no Banco de Dados. Essa variável retorna um Boolean, se for `[True]` as senhas são compatíveis, se for `[False]` significa que as senhas são diferentes.<br>
Assim que o usuário é logado com status (200) é gerado um `TOKEN`.

<br>

**Rota Privada**

[DOCUMENTAÇÃO DO PROJETO EM ANDAMENTO]