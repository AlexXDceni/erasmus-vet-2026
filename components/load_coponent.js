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

        // 3. Corectează căile link-urilor din meniu
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
            });
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