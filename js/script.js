const controlsForm = document.forms.controls;
const button = document.querySelector('.btn');
const code = document.querySelector('.code-css');

controlsForm.addEventListener('change', handleChange);

// Objeto destinado ao armazenamento das funções que serão chamadas de acordo com o nome do input
const addPropertie = {
    element: button,
    text(value) {
        this.element.innerText = value;
    },
    color(value, name) {
        this.element.style[name] = value;
    },
    backgroundColor(value, name) {
        this.element.style[name] = value;
    },
    height(value, name) {
        this.element.style[name] = value + "px";
    },
    width(value, name) {
        this.element.style[name] = value + "px";
    },
    border(value, name) {
        this.element.style[name] = value;
    },
    borderRadius(value, name) {
        this.element.style[name] = value + "px";
    },
    fontFamily(value, name) {
        this.element.style[name] = value;
    },
    fontSize(value, name) {
        this.element.style[name] = value + "rem";
    }
}

// Função responsável por pegar os valores do input que acionar o evento "change", e posteriormente acionar a função correspondente no objeto "addPropertie" com os devios parâmetros
function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    addPropertie[name](value, name);
    saveValues(name, value);
    showCss();
}

// Função responsável por apresentar o código css gerado no botão
function showCss() {
    const cssText = button.style.cssText;
    const cssTextArray = `<span>${cssText.split('; ').join(';</span><span>')}`;
    code.innerHTML = cssTextArray;
}

// Função responsável por salvar todas as configurações do botão no local storage 
function saveValues(key, value) {
    localStorage[key] = value;
}

// Função responsável por consumir as configurações que foram salvas no local storage
function consumeLocalStorage() {
    Object.keys(localStorage).forEach((key) => {
        controlsForm.elements[key].value = localStorage[key];
        addPropertie[key](localStorage[key], key);
        showCss();
    });
}

consumeLocalStorage();