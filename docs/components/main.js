// ── Build sidebar from headings ──
const sidebar = document.getElementById('sidebar-nav');
const docSidebar = document.getElementById('doc-sidebar');
const headings = document.querySelectorAll('.doc-content h1[id], .doc-content h2[id], .doc-content h3[id]');

if (sidebar && headings.length) {
    headings.forEach(h => {
        const li = document.createElement('li');
        const tag = h.tagName.toLowerCase();
        li.classList.add('sidebar-' + tag);
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        sidebar.appendChild(li);
    });

    // ── Active link on scroll ──
    const allLinks = sidebar.querySelectorAll('a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                allLinks.forEach(a => a.classList.remove('active'));
                const active = sidebar.querySelector('a[href="#' + entry.target.id + '"]');
                if (active) {
                    active.classList.add('active');
                    // Only scroll the sidebar link into view when on desktop or when the mobile drawer is open
                    // This prevents the page window from auto-scrolling back to the top on mobile/laptop!
                    if (window.innerWidth > 860 || (docSidebar && docSidebar.classList.contains('open'))) {
                        active.scrollIntoView({ block: 'nearest' });
                    }
                }
            }
        });
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

    headings.forEach(h => observer.observe(h));
}

// ── Mobile Sidebar Click Toggle ──
if (docSidebar) {
    const sidebarTitle = docSidebar.querySelector('.sidebar-title');
    if (sidebarTitle) {
        sidebarTitle.addEventListener('click', (e) => {
            e.stopPropagation();
            docSidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking any link inside it
    docSidebar.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            docSidebar.classList.remove('open');
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (docSidebar.classList.contains('open') && !docSidebar.contains(e.target)) {
            docSidebar.classList.remove('open');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && docSidebar.classList.contains('open')) {
            docSidebar.classList.remove('open');
        }
    });
}

// ── Responsive Table Wrappers ──
document.querySelectorAll('table').forEach(table => {
    if (!table.parentElement.classList.contains('table-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    }
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
