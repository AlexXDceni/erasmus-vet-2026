async function loadComponents() {
    try {
        const navResponse = await fetch('components/navbar.html');
        if (!navResponse.ok) throw new Error(`Navbar HTTP ${navResponse.status}`);
        const navData = await navResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navData;

        const footerResponse = await fetch('components/footer.html');
        if (!footerResponse.ok) throw new Error(`Footer HTTP ${footerResponse.status}`);
        const footerData = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerData;

        // Previne comportamentul implicit pe link-urile cu dropdown
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });        

        // Inițializează meniul mobil după ce componentele au fost injectate în DOM
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

    // Închide sidebar-ul când se dă click pe un link final
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    });

    // Control Nivel 1 (Experienta culturala, Jurnale)
    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.parentElement;

            // Închide celelalte dropdown-uri de nivel 1
            document.querySelectorAll('.mobile-dropdown').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });

            parent.classList.toggle('open');
        });
    });

    // Control Nivel 2 (Fluxul 1, Fluxul 2)
    document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.parentElement;

            // Închide celelalte fluxuri din interiorul aceluiași submeniu
            const currentSubmenu = parent.closest('.mobile-submenu');
            if (currentSubmenu) {
                currentSubmenu.querySelectorAll('.mobile-nested-dropdown').forEach(item => {
                    if (item !== parent) item.classList.remove('open');
                });
            }

            parent.classList.toggle('open');
        });
    });
}

// Execută la încărcarea DOM-ului
document.addEventListener('DOMContentLoaded', loadComponents);