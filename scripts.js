document.addEventListener('DOMContentLoaded', function () {
    const fileList = document.getElementById('file-list');
    const pdfViewer = document.getElementById('pdf-viewer');
    const searchInput = document.getElementById('search');
    const filterType = document.getElementById('filter-type');
    const themeToggle = document.getElementById('theme-toggle');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const pageNum = document.getElementById('page-num');
    const pdfSearch = document.getElementById('pdf-search');
    const pdfSearchBtn = document.getElementById('pdf-search-btn');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    let files = [
        { name: 'Gramática.pdf', path: 'pdfs/gramatica.pdf', type: 'pdf' },
        { name: 'Big Data.pdf', path: 'pdfs/big-data.pdf', type: 'pdf' },
        // Adicione mais arquivos aqui...
    ];

    let currentFileIndex = -1;
    let currentPage = 1;
    let totalPages = 1;
    let scale = 1;

    function renderFileList() {
        const searchTerm = searchInput.value.toLowerCase();
        const filter = filterType.value;

        const filteredFiles = files.filter(file => {
            const matchesSearch = file.name.toLowerCase().includes(searchTerm);
            const matchesFilter = filter === 'all' || file.type === filter;
            return matchesSearch && matchesFilter;
        });

        fileList.innerHTML = filteredFiles
            .map(file => `
                <a href="#" class="list-group-item list-group-item-action" data-path="${file.path}" data-type="${file.type}">
                    <i class="bi ${getFileIcon(file.type)} me-2"></i>${file.name}
                </a>
            `)
            .join('');
    }

    function getFileIcon(type) {
        switch (type) {
            case 'pdf': return 'bi-file-earmark-pdf';
            case 'image': return 'bi-file-earmark-image';
            case 'text': return 'bi-file-earmark-text';
            default: return 'bi-file-earmark';
        }
    }

    function loadFile(filePath) {
        pdfViewer.setAttribute('src', filePath);
        currentPage = 1;
        updatePageControls();
    }

    function updatePageControls() {
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= totalPages;
        pageNum.textContent = `Página: ${currentPage}/${totalPages}`;
    }

    function updateZoom() {
        pdfViewer.style.transform = `scale(${scale})`;
    }

    pdfViewer.onload = function () {
        pdfViewer.contentWindow.PDFViewerApplication.initializedPromise.then(() => {
            totalPages = pdfViewer.contentWindow.PDFViewerApplication.pagesCount;
            updatePageControls();
        });
    };

    prevPageBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            pdfViewer.contentWindow.PDFViewerApplication.page = currentPage;
            updatePageControls();
        }
    });

    nextPageBtn.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            pdfViewer.contentWindow.PDFViewerApplication.page = currentPage;
            updatePageControls();
        }
    });

    zoomInBtn.addEventListener('click', function () {
        scale += 0.1;
        updateZoom();
    });

    zoomOutBtn.addEventListener('click', function () {
        scale -= 0.1;
        updateZoom();
    });

    fullscreenBtn.addEventListener('click', function () {
        if (pdfViewer.requestFullscreen) {
            pdfViewer.requestFullscreen();
        } else if (pdfViewer.mozRequestFullScreen) { // Firefox
            pdfViewer.mozRequestFullScreen();
        } else if (pdfViewer.webkitRequestFullscreen) { // Chrome, Safari and Opera
            pdfViewer.webkitRequestFullscreen();
        } else if (pdfViewer.msRequestFullscreen) { // IE/Edge
            pdfViewer.msRequestFullscreen();
        }
    });

    pdfSearchBtn.addEventListener('click', function () {
        const searchTerm = pdfSearch.value;
        if (searchTerm) {
            pdfViewer.contentWindow.PDFViewerApplication.findController.executeCommand('find', { query: searchTerm });
        }
    });

    searchInput.addEventListener('input', renderFileList);
    filterType.addEventListener('change', renderFileList);

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode
            ? '<i class="bi bi-sun"></i> Modo Claro'
            : '<i class="bi bi-moon"></i> Modo Escuro';
    });

    fileList.addEventListener('click', function (e) {
        if (e.target.classList.contains('list-group-item')) {
            e.preventDefault();
            const filePath = e.target.getAttribute('data-path');
            currentFileIndex = files.findIndex(file => file.path === filePath);
            loadFile(filePath);
        }
    });

    toggleSidebar.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        toggleSidebar.innerHTML = isCollapsed
            ? '<i class="bi bi-chevron-right"></i>' // Ícone para expandir
            : '<i class="bi bi-chevron-left"></i>'; // Ícone para recolher
    });

    renderFileList();
});

function getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    if (['txt'].includes(ext)) return 'text';
    return 'other';
}