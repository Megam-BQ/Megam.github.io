const repoOwner = "Megam-BQ";
const repoName = "Base-de-Datos-II";

// Todas las semanas usan main
const semanaBranches = {
  "01": "main",
  "02": "main",
  "03": "main",
  "04": "main",
  "05": "main",
  "06": "main",
  "07": "main",
  "08": "main",
  "09": "main",
  "10": "main",
  "11": "main",
  "12": "main",
  "13": "main",
  "14": "main",
  "15": "main",
  "16": "main"
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

          // USAR URL CORRECTA PARA VER PDF
          const fileURL = file.download_url || file.browser_download_url;

          fetchFileContent(fileURL, file.name);
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
  const pdfViewer = document.getElementById("pdfViewer");

  // Si es PDF, mostrar visor embebido
  if (filename.toLowerCase().endsWith(".pdf")) {
    console.log("Mostrando PDF:", url);
    
    filePreview.style.display = "none";
    pdfViewer.style.display = "block";

    // MOSTRAR PDF DIRECTAMENTE
    pdfViewer.src = url;

    return;
  }

  // Otros archivos
  pdfViewer.style.display = "none";
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
