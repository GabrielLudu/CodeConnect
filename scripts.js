const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagRemover = evento.target.parentElement;
    listaTags.removeChild(tagRemover);
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "HTML",
  "CSS",
  "JavaScript",
];

async function verificarTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificarTagsDisponiveis(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não disponível");
        }
      } catch (erro) {
        console.error("Erro ao verificar a tag");
        alert("Erro ao verificar a tag");
      }
    }
  }
});

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;
      if (deuCerto) {
        resolve("Projeto publicado com sucesso!");
      } else {
        reject("Erro ao publicar o projeto.");
      }
    }, 2000);
  });
}

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("li p")).map(
    (tag) => tag.textContent
  );
  try {
    const resultado = await publicarProjeto(
      nomeDoProjeto,
      descricaoDoProjeto,
      tagsProjeto
    );
    console.log(resultado);
    alert("Deu certo! Projeto publicado com sucesso!");
  } catch (erro) {
    console.error(erro);
    alert("Erro ao publicar o projeto.");
  }
});

const botaoDescatar = document.querySelector(".botao-descarte");

botaoDescatar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const formulario = document.querySelector("form");
  formulario.reset();
  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "imagem_projeto.png";
  listaTags.innerHTML = "";
});
