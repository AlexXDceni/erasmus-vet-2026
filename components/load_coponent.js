async function loadComponents() {
    try {
        // Obținem calea curentă
        const pathname = window.location.pathname;
        
        // Calculăm câte niveluri suntem în interior (ex: /pages/culturala/spania.html are 2 subfoldere)
        // Eliminăm prima și ultima parte (domeniul/fișierul)
        const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
        
        // Dacă suntem pe GitHub Pages, ignorăm numele repository-ului dacă apare în cale
        const cleanSegments = pathSegments.filter(s => !s.includes('.html') && s !== 'erasmus-vet-2026');
        
        // Generăm prefixul de urcare în directoare (ex: "", "../", "../../")
        const depth = cleanSegments.length;
        const rootPrefix = depth > 0 ? '../'.repeat(depth) : './';

        // 1. Încarcă Navbar-ul
        const navResponse = await fetch(rootPrefix + 'components/navbar.html');
        const navData = await navResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navData;

        // 2. Încarcă Footer-ul
        const footerResponse = await fetch(rootPrefix + 'components/footer.html');
        const footerData = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerData;

        // 3. Corectează căile link-urilor din meniu
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });        

        // 4. Activează meniul mobil și dropdown-urile
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

    document.querySelectorAll('.mobile-menu a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    });

    // Control Submeniuri Mobil
    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.parentElement;
            parent.classList.toggle('open');
        });
    });
}

// Execută la încărcarea DOM-ului
document.addEventListener('DOMContentLoaded', loadComponents);