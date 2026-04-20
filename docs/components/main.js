// not needed yet, maybe in the furure for dynamic content or shared components        // ── Build sidebar from headings ──
        const sidebar = document.getElementById('sidebar-nav');
        const headings = document.querySelectorAll('.doc-content h1[id], .doc-content h2[id], .doc-content h3[id]');

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
                        active.scrollIntoView({ block: 'nearest' });
                    }
                }
            });
        }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

        headings.forEach(h => observer.observe(h));

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