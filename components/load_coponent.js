async function loadComponents() {
    try {
        // Verificăm dacă suntem într-un subfolder (ex: /pages/jurnale.html)
        const isInSubfolder = window.location.pathname.includes('/pages/');
        const prefix = isInSubfolder ? '../components/' : 'components/';

        const navResponse = await fetch(prefix + 'navbar.html');
        const navData = await navResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navData;

        const footerResponse = await fetch(prefix + 'footer.html');
        const footerData = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerData;

        // Restul codului...
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
            if (link.getAttribute('href') === currentPage || link.getAttribute('href').endsWith('/' + currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        initMobileMenu();
    } catch (error) {
        console.error('Eroare la încărcarea componentelor:', error);
    }
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
        // Rulează funcția la încărcarea paginii
        document.addEventListener('DOMContentLoaded', loadComponents);