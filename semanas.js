const repoOwner = "Megam-BQ";
const repoName = "Base-de-Datos-II";

const semanaBranches = {
  "01": "b79b21a0217de083dd76c70ed70dedccad6548bb",
  "02": "f4687286edf413a79338f428251136b7c139c78f",
  // resto igual...
};

function padSemana(num) {
  return num.toString().padStart(2, "0");
}

const urlParams = new URLSearchParams(window.location.search);
let semana = urlParams.get("semana");
if (semana) semana = padSemana(semana);

const titulo = document.getElementById("titulo");
const loading = document.getElementById("loading");
const fileListEl = document.getElementById("fileList");
const filePreview = document.getElementById("filePreview");

if (!semana || !semanaBranches[semana]) {
  titulo.textContent = "Semana no válida";
  loading.textContent = "No se encontró información para esta semana.";
} else {
  titulo.textContent = `Archivos de la Semana ${semana}`;
  fetchFiles(semana);
}

function fetchFiles(semana) {
  const branch = semanaBranches[semana];
  const folderPath = `Semana ${semana}`;

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${encodeURIComponent(folderPath)}?ref=${branch}`;
  console.log("API URL:", apiUrl);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Error al obtener archivos: ${response.statusText}`);
      return response.json();
    })
    .then(files => {
      loading.style.display = "none";

      if (!files.length) {
        fileListEl.innerHTML = "<li>No hay archivos en esta semana.</li>";
        return;
      }

      files.forEach(file => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = file.name;
        a.style.cursor = "pointer";
        a.addEventListener("click", e => {
          e.preventDefault();
          fetchFileContent(file.download_url, file.name);
        });
        li.appendChild(a);
        fileListEl.appendChild(li);
      });
    })
    .catch(error => {
      loading.textContent = `Error: ${error.message}`;
      console.error(error);
    });
}

function fetchFileContent(url, filename) {
  filePreview.style.display = "block";
  filePreview.textContent = `Cargando contenido de ${filename}...`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar archivo: ${response.statusText}`);
      return response.text();
    })
    .then(text => {
      filePreview.textContent = text;
    })
    .catch(error => {
      filePreview.textContent = `Error al cargar archivo: ${error.message}`;
      console.error(error);
    });
}
