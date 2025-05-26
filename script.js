//Captura do formulário e envio

// Seleciona o formulário pelo ID
const form = document.querySelector("#form");
// Adiciona um evento ao formulário para capturar o envio
form.addEventListener("submit", function (e) {
    // Impede o envio padrão do formulário (recarregar a página)
  e.preventDefault();

//Campos que serao validados

// Define os campos do formulário que serão validados
  const fields = [
    {
      id: "name",  // ID do campo no HTML
      label: "Nome", // Nome legível
      validator: nameIsValid,  // Função de validação
    },
    {
      id: "last_name",
      label: "Sobrenome",
      validator: nameIsValid,
    },
    {
      id: "birthdate",
      label: "Nascimento",
      validator: dateIsValid,
    },
    {
      id: "email",
      label: "Email",
      validator: emailIsValid,
    },
    {
      id: "password",
      label: "Senha",
      validator: passwordIsSecure,
    },
    {
      id: "confirm_password",
      label: "Confirmar senha",
      validator: passwordMatch,
    },
  ];

//Ícone de erro 

// Define o ícone HTML a ser exibido quando houver erro
  const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

//Validacao dos campos

// Percorre todos os campos definidos acima
  fields.forEach(function (field) {
// Seleciona o input pelo ID
    const input = document.getElementById(field.id);
// Seleciona o elemento mais próximo com a classe .input-box (o container)
    const inputBox = input.closest(".input-box");
// Pega o valor atual do input
    const inputValue = input.value;
// Seleciona a <span> de erro dentro da input-box
    const errorSpan = inputBox.querySelector(".error");
// Limpa mensagens de erro anteriores
    errorSpan.innerHTML = "";
// Remove classes de erro e adiciona classe de sucesso
    inputBox.classList.remove("invalid");
    inputBox.classList.add("valid");
// Valida o campo usando a função correspondente
    const fieldValidator = field.validator(inputValue);
// Se o campo for inválido:
    if (!fieldValidator.isValid) {
// Mostra a mensagem de erro com ícone
      errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
// Adiciona classe de erro e remove classe de sucesso
      inputBox.classList.add("invalid");
      inputBox.classList.remove("valid");
// Para a execução dessa iteração
      return;
    }
  });

//Validacao do campo de genero

// Seleciona os radio buttons pelo name
  const genders = document.getElementsByName("gender");
// Seleciona o container dos radios
  const radioContainer = document.querySelector("#radio-container");
// Seleciona a <span> de erro para o radio
  const genderErrorSpan = radioContainer.querySelector(".error");
// Verifica se algum radio está marcado
  const selectedGender = [...genders].find((input) => input.checked);
// Por padrão, marca como inválido e mostra erro
  radioContainer.classList.add("invalid");
  radioContainer.classList.remove("valid");
  genderErrorSpan.innerHTML = `${errorIcon}Selecione um genero!`;
// Se algum estiver selecionado, limpa o erro
  if (selectedGender) {
    radioContainer.classList.add("valid");
    radioContainer.classList.remove("invalid");
    genderErrorSpan.innerHTML = "";
  }
});

//Funcao auxilixar para verificar se o campo está vazio

//Retorna true se o valor for vazio
function isEmpty(value) {
  return value === "";
}

//Validacao do nome e sobrenome

function nameIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };
// Verifica se o valor está vazio
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "O campo é obrigatório!";
    return validator;
  }
// Verifica se tem pelo menos 3 caracteres
  const min = 3;

  if (value.length < min) {
    validator.isValid = false;
    validator.errorMessage = `O nome deve ter no mínimo ${min} caracteres!`;
    return validator;
  }
// Verifica se contém apenas letras e espaços
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "O campo deve conter apenas letras!";
  }

  return validator;
}
//Validacao da data de nascimento
function dateIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };
// Verifica se está vazio
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "A data é obrigatória!";
    return validator;
  }
// Extrai o ano da data
  const year = new Date(value).getFullYear();
// Verifica se o ano está dentro de um intervalo válido
  if (year < 1920 || year > new Date().getFullYear()) {
    validator.isValid = false;
    validator.errorMessage = "Data inválida!";
    return validator;
  }

  return validator;
}

//Validacao do Email

function emailIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };
// Verifica se está vazio
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "O email é obrigatório!";
    return validator;
  }
// Expressão regular para validar emails
  const regex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "Email inválido!";
    return validator;
  }
  return validator;
}

//Validacao da seguranca da senha

function passwordIsSecure(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };
// Verifica se está vazio
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "A senha é obrigatoria!";
    return validator;
  }
// Expressão regular para senhas seguras
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"
  );
// Verifica se a senha atende aos critérios
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = `
      A senha deve conter no mínimo: <br>
      8 dígitos <br>
      1 letra maiúscula <br>
      1 letra minúscula <br>
      1 número <br>
      1 caractere especial!
    `;
    return validator;
  }
  return validator;
}

//Confirmacao de senha

function passwordMatch(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "A senha é obrigatoria!";
    return validator;
  }
// Pega o valor da senha principal
  const passwordValue = document.getElementById("password").value;
// Verifica se as senhas coincidem
  if (value === "" || passwordValue !== value) {
    validator.isValid = false;
    validator.errorMessage = "Senhas não condizem!";
    return validator;
  }
  return validator;
}

// Seleciona todos os ícones com a classe .password-icon
const passwordIcons = document.querySelectorAll(".password-icon");
// Para cada ícone encontrado
passwordIcons.forEach((icon) => {
  // Adiciona evento de clique no ícone
  icon.addEventListener("click", function () {
    // Encontra o input de senha dentro do mesmo contêiner
    const input = this.parentElement.querySelector(".form-control");
    // Alterna entre mostrar e esconder a senha
    input.type = input.type === "password" ? "text" : "password";
    // Alterna a classe do ícone (por exemplo, olho aberto ou fechado)
    this.classList.toggle("fa-eye");
  });
});
