# jdatas

O jdatas é uma poderosa biblioteca de gerenciamento de dados em formato JSON, projetada para oferecer uma solução simples e eficiente para armazenar e manipular informações em seu aplicativo. Com o jdatas, você pode facilmente criar, atualizar, ler e excluir objetos de dados, além de validar os dados usando esquemas personalizados.

## Instalação

Para instalar o jdatas, você precisará ter o Node.js instalado em seu ambiente de desenvolvimento. Em seguida, execute o seguinte comando para adicionar o jdatas ao seu projeto:

```
npm install jdatas
```

## Como usar

```javascript
// Importe a biblioteca
const JDB = require('JDB');

// Crie uma instância do JDB com o diretório onde os dados serão armazenados
// O caminho para o arquivo não precisa ser criado manualmente, um exemplo:
// const salersUsers = new JDB('salers/users'); cria uma pasta users dentro de uma pasta salers na raiz do projeto. 
const salersUsers = new JDB('caminho/para/o/diretorio'); 

// Defina o esquema para validar os dados posteriormente
const userSchema = {
  nome: String,
  idade: Number,
  email: String
};

// Crie um modelo para manipular os dados com o esquema definido
// Neste exemplo abaixo, o 'usuarios' será o nome do arquivo. Pode ser definido também um código nesta parte para identificar dentro do id automático ao que se refere:
// id automátido => '0/salers@2212025|1716|¨1740255392180'
// id com código definido como 'user' => 'user/salers@2212025|1716|¨1740255392180'
const userModel = salersUsers.Model('usuarios', userSchema);

// Por retornar uma promise, pode e deve ser usado como try/catch, ou then/catch
// Salve dados no modelo
// Dentro de save, pode-se inserir uma id manualmente, deixando livre a decisão que for melhor para cada projeto.
try {
  userModel.save({ 
    nome: 'João', 
    idade: 30, 
    email: 'joao@example.com' 
  });
} catch (error) {
  console.error(error);
}

// Leia todos os dados salvos
try {
  const data = userModel.getAll();
  console.log(data); // Exibe todos os objetos salvos
} catch (error) {
  console.error(error);
}
```

## Contribuição e Melhorias

O jdatas é um projeto em constante evolução, e a contribuição da comunidade é fundamental para o seu aprimoramento contínuo. Se você deseja contribuir para o jdatas, fique à vontade para enviar pull requests com melhorias, correções de bugs ou novos recursos relacionados a esquemas e opções de criptografia de dados.

Algumas sugestões de melhorias incluem:

- Adicionar suporte para criptografia de dados armazenados.
- Implementar opções de configuração para permitir o uso de diferentes formatos de arquivo para armazenamento (por exemplo, CSV, XML).
- Aumentar a flexibilidade dos esquemas, permitindo validações mais avançadas e personalizadas.
- Melhorar a documentação para fornecer exemplos detalhados de uso e cenários comuns.

Suas contribuições serão analisadas cuidadosamente e serão muito bem-vindas! Para mais informações sobre como contribuir, mande um e-mail para: gabrielmateuscm@gmail.com.

## Licença

O jdatas é distribuído sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir o código conforme os termos da licença.
