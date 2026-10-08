(() => {
    const agreementKey = 'oscar-disclaimer-agreed-v1';
    const disclaimerUrl = new URL('../DISCLAIMER.md', document.currentScript.src);

    const escapeHtml = value => value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const renderMarkdown = markdown => {
        const lines = markdown.replace(/\r\n/g, '\n').split('\n');
        const blocks = [];
        let paragraph = [];
        let list = [];

        const inline = text => escapeHtml(text)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/_(.+?)_/g, '<em>$1</em>');
        const flushParagraph = () => {
            if (paragraph.length) {
                blocks.push(`<p>${inline(paragraph.join(' '))}</p>`);
                paragraph = [];
            }
        };
        const flushList = () => {
            if (list.length) {
                blocks.push(`<ul>${list.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`);
                list = [];
            }
        };

        lines.forEach(line => {
            const trimmed = line.trim();
            const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
            const listItem = trimmed.match(/^-\s+(.+)$/);

            if (listItem) {
                flushParagraph();
                list.push(listItem[1]);
                return;
            }

            flushList();
            if (!trimmed || trimmed === '---' || heading || trimmed.startsWith('>')) flushParagraph();
            if (!trimmed || trimmed === '---') return;
            if (heading) {
                const level = heading[1].length;
                blocks.push(`<h${level}>${inline(heading[2])}</h${level}>`);
            } else if (trimmed.startsWith('>')) {
                blocks.push(`<blockquote>${inline(trimmed.slice(1).trim())}</blockquote>`);
            } else {
                paragraph.push(trimmed);
            }
        });

        flushParagraph();
        flushList();
        return blocks.join('');
    };

    const createDialog = () => {
        const overlay = document.createElement('div');
        overlay.className = 'disclaimer-overlay';
        overlay.innerHTML = `
            <section class="disclaimer-dialog" role="dialog" aria-modal="true"
                aria-labelledby="disclaimer-title" aria-describedby="disclaimer-instructions">
                <h1 id="disclaimer-title">OSCAR Project Disclaimer</h1>
                <p id="disclaimer-instructions" class="disclaimer-instructions">
                    Read the complete disclaimer below. You must scroll to the end and agree before using this website.
                </p>
                <div class="disclaimer-reading" tabindex="0" aria-label="Disclaimer statement">
                    <p class="disclaimer-loading">Loading the official disclaimer…</p>
                </div>
                <p class="disclaimer-error" role="alert" hidden></p>
                <label class="disclaimer-agreement">
                    <input type="checkbox" disabled>
                    <span>I have read and agree to the disclaimer.</span>
                </label>
                <div class="disclaimer-actions">
                    <button type="button" class="disclaimer-decline">I do not agree</button>
                    <button type="button" class="disclaimer-accept" disabled>Agree and continue</button>
                </div>
            </section>`;

        const readingArea = overlay.querySelector('.disclaimer-reading');
        const errorMessage = overlay.querySelector('.disclaimer-error');
        const checkbox = overlay.querySelector('.disclaimer-agreement input');
        const acceptButton = overlay.querySelector('.disclaimer-accept');
        const declineButton = overlay.querySelector('.disclaimer-decline');
        const inertElements = Array.from(document.body.children);
        let reachedEnd = false;

        inertElements.forEach(element => {
            element.inert = true;
        });
        document.body.appendChild(overlay);
        document.body.classList.add('disclaimer-open');

        const updateReadState = () => {
            if (reachedEnd || readingArea.scrollTop + readingArea.clientHeight < readingArea.scrollHeight - 2) return;
            reachedEnd = true;
            checkbox.disabled = false;
        };
        readingArea.addEventListener('scroll', updateReadState);
        window.addEventListener('resize', updateReadState);

        checkbox.addEventListener('change', () => {
            acceptButton.disabled = !reachedEnd || !checkbox.checked;
        });
        acceptButton.addEventListener('click', () => {
            if (!reachedEnd || !checkbox.checked) return;

            try {
                localStorage.setItem(agreementKey, 'true');
            } catch (error) {
                errorMessage.hidden = false;
                errorMessage.textContent = `Your agreement could not be saved (${error.message}). Please enable local storage and reload to continue.`;
                return;
            }

            window.removeEventListener('resize', updateReadState);
            inertElements.forEach(element => {
                element.inert = false;
            });
            document.body.classList.remove('disclaimer-open');
            overlay.remove();
        });
        declineButton.addEventListener('click', () => {
            window.close();
            readingArea.innerHTML = '<p>You did not agree to the disclaimer, so access to this website remains blocked. Please close this browser tab or window.</p>';
            errorMessage.hidden = true;
            checkbox.closest('.disclaimer-agreement').hidden = true;
            overlay.querySelector('.disclaimer-actions').hidden = true;
            readingArea.focus();
        });

        fetch(disclaimerUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(markdown => {
                readingArea.innerHTML = renderMarkdown(markdown);
                updateReadState();
                readingArea.focus();
            })
            .catch(error => {
                readingArea.innerHTML = '<p>The disclaimer could not be loaded. Website access is locked until it can be displayed.</p>';
                errorMessage.hidden = false;
                errorMessage.textContent = `Failed to load the official disclaimer (${error.message}). Check your connection and reload the page.`;
                checkbox.disabled = true;
                acceptButton.disabled = true;
            });

        declineButton.focus();
    };

    try {
        if (localStorage.getItem(agreementKey) !== 'true') createDialog();
    } catch (error) {
        createDialog();
        const errorMessage = document.querySelector('.disclaimer-error');
        errorMessage.hidden = false;
        errorMessage.textContent = `Local storage could not be accessed (${error.message}). The site will verify that your agreement can be saved before continuing.`;
    }
})();
