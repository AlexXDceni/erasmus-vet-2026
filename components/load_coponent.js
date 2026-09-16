async function loadComponents() {
    try {
        // Detectăm dacă pagina curentă este într-un subfolder (ex: pages/portugalia.html)
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const fetchPrefix = isInPagesFolder ? '../components/' : 'components/';

        // 1. Încarcă Navbar-ul
        const navResponse = await fetch(fetchPrefix + 'navbar.html');
        const navData = await navResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navData;

        // 2. Încarcă Footer-ul
        const footerResponse = await fetch(fetchPrefix + 'footer.html');
        const footerData = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerData;

        // 3. Corectează AUTOMAT căile din meniu (desktop + mobil)
        fixNavigationLinks(isInPagesFolder);

        // 4. Activează meniul mobil
        initMobileMenu();

    } catch (error) {
        console.error('Eroare la încărcarea componentelor:', error);
    }
}

function fixNavigationLinks(isInPagesFolder) {
    // Calculăm prefixul pentru legături: dacă suntem în /pages/, urcăm un nivel cu ../
    const pathPrefix = isInPagesFolder ? '../' : './';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Selectăm toate legăturile din meniu (Desktop și Mobil)
    const allLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a, .nav-brand');

    allLinks.forEach(link => {
        // Dacă este logo-ul
        if (link.classList.contains('nav-brand')) {
            link.setAttribute('href', pathPrefix + 'index.html');
            return;
        }

        // Preluăm fișierul țintă (ex: "portugalia.html" sau "index.html")
        let targetPage = link.getAttribute('data-page');
        if (!targetPage) {
            const hrefParts = link.getAttribute('href').split('/');
            targetPage = hrefParts[hrefParts.length - 1];
        }

        // Construim calea corectă
        if (targetPage === 'index.html') {
            link.setAttribute('href', pathPrefix + 'index.html');
        } else {
            link.setAttribute('href', pathPrefix + 'pages/' + targetPage);
        }

        // Marcăm clasa 'active' pe pagina curentă
        if (targetPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (!hamburgerBtn || !mobileSidebar) return;

    function toggleMenu() {
        mobileSidebar.classList.toggle('open');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    if (sidebarClose) sidebarClose.addEventListener('click', toggleMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    });
}

// Execută la încărcarea DOM-ului
document.addEventListener('DOMContentLoaded', loadComponents);