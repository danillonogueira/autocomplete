// TODO:

/*
(1): implementar o funcionamento do enter e das setas
(2): encontrar uma maneira de fazer o sort() ignorar os acentos nos nomes das cidades
(3): o app dá a impressão de estar meio pesado [UX/UI training missing]
(4): resultados repetidos, problema de comunicação com o servidor
*/

// GOAL

/*

1. Ao clicar no botao do lado, ou pressionar a seta para baixo no teclado, listar todas as empresas
2. Ao digitar no campo, exibir resultados que correspondem ao texto digitado (nao precisa fazer o highlight igual ta na foto ali)
3. Quando as opçoes estao visiveis, pressionar pra baixo vai navegando entre os itens
4. Ao pressionar enter ou clicar em uma das opçoes, preencher o campo com o valor da opçao, e esconder a lista
5. Caso nenhum resultado seja encontrado, exibir uma mensagem dizendo "Nenhuma cidade encontrada" como se fosse uma opçao da lista
6. Ao apertar ESC, as opçoes sao escondidas e o campo é limpo

https://servicodados.ibge.gov.br/api/v1/localidades/municipios

*/

// VARIABLES

const btn = document.querySelector('.btn');
const display = document.querySelector('.display');
const input = document.querySelector('.input');

// FUNCTIONS

function queryMunicipios() {
  
  if (display.classList.contains('hidden')) {
    
    const municipios = new XMLHttpRequest();

    municipios.onreadystatechange = () => {
      
      if (municipios.readyState === 4 && municipios.status === 200) {
        
        JSON.parse(municipios.response)
          .map(cidade => cidade.nome)
            .sort()
              .forEach((item) => {        
                
                const cidade = document.createElement('span');
                cidade.classList.add('item');
                cidade.textContent = item;
                display.appendChild(cidade);       
              });

        display.classList.remove('hidden');                
      } 
    }

    municipios.open('GET', 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios', true);
    municipios.send();
  }
}

function hide() {

  input.value = event.target.textContent;

  display.classList.add('hidden');
}

function type() {

  display.innerHTML = '';

  if (input.value !== '') {

    display.classList.remove('hidden'); 

    const municipios = new XMLHttpRequest();

    municipios.onreadystatechange = () => {
      
      if (municipios.readyState === 4 && municipios.status === 200) {

        JSON.parse(municipios.response)
          .map(cidade => cidade.nome)
            .filter((item) => {

              return item.match(RegExp(input.value, 'i'));
            })
              .sort()
                .forEach((item) => {
                  const cidade = document.createElement('span');
                  cidade.classList.add('item');
                  cidade.textContent = item;
                  display.appendChild(cidade);
                });                   
      }
    } 

    municipios.open('GET', 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios', true);
    municipios.send();   
  } else {
    display.classList.add('hidden');
  }

}

// EVENT LISTENERS

btn.addEventListener('click', queryMunicipios);
display.addEventListener('click', hide);
input.addEventListener('input', type);

// JSON ELEMENT FORMAT

/*

{
  "id": 1100015,
  "nome":"Alta Floresta D'Oeste",
  "microrregiao": {
    "id":11006,
    "nome":"Cacoal",
    "mesorregiao":{
      "id":1102,
      "nome":"Leste Rondoniense",
      "UF":{
        "id":11,
        "sigla":"RO",
        "nome":"Rondônia",
        "regiao":{
          "id":1,
          "sigla":"N",
          "nome":"Norte"
        }
      }
    }
  }
}

*/
