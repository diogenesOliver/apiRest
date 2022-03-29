<h2 align='center'> Validação de dados com JWT </h2>

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

Ainda dentro de  `linkController.js`, temos uma função chamada `routeAdmin`. O objetivo dessa função é determinar quem pode e quem não pode acessar determinada rota privada.<br>
Dentro do modelo da nossa aplicação `/models/User.js`, temos uma atributo chamado `admin` que recebe por padrão o valor de `[False]`. Dessa maneira podemos verificar, através do Boolean retornado pelo admin, se o usuário está apto para acessar determinada rota ou não.

<br>

**authController - Verificando autenticidade do TOKEN**

O arquivo `authController.js` da pasta `routeController` tem como única funcionalidade verificar o `TOKEN` do usuário.<br>
A constante `token` pega o token gerado no `header` da requisição, caso não esteja lá esse valor é retornado uma mensagem de status - (401) - `Token não encontrado`.<br>
Seguindo na aplicação temos o código abaixo:<br><br>

``` 

    try {
        
        const userVerified = jwt.verify(token, process.env.SECRET)
        req.user = userVerified
        next()

    } catch (error) {
     
        return res.status(401).json({ msg: 'Acesso negado! Token inválido' })

    }

```

>[` const userVerified = jwt.verify(token, process.env.SECRET) `]

- Responsável por verificar se o TOKEN gerado e a chave SECRET são compatíveis

<br>

- Caso contrário retorna uma mensagem de status(401) - `Token inválido!`