# 📂 Desafio de código Dio

## 📃 Descrição

Criando um Validador de Bandeiras de Cartão de Crédito com o GitHub Copilot

### Subir Containers do Projeto

    docker-compose up -d

### Acessar o

Você pode testar a aplicação tanto acessando o Frontend através da url: [http://localhost:8080/](http://localhost:8080/)<br />


Ou também via comando 
    
        node index.js

Que exibirá o resultado da validação via console

- Altere o nome da bandeira da linha 88 do arquivo index.js que exibirá a bandeira correspondente ao número do cartão.
Para facilitar já deixei gerado algumas bandeiras de cartões para testes

---
---

### Encerrar containers em execução

    docker-compose down

### Remover todos os contêineres e imagens em um comando

    docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker rmi $(docker images -q)

---
---

## 📧 Contato

[LinkedIn](https://www.linkedin.com/in/wsawebmaster/)

[wsawebmaster@yahoo.com.br](mailto:wsawebmaster@yahoo.com.br)