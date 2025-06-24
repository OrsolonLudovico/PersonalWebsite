/* ========================================
   NAVIGATION AND PAGE LOADING
   ======================================== */

/**
 * Handles navigation button selection and page loading
 */
function selectButton(button) {
    const buttons = document.querySelectorAll('.navbar-nav .nav-link');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
    });

    button.classList.add('active');
    button.setAttribute('aria-current', 'page');

    // Determine file to load
    const pageId = button.id;
    const pageUrl = `pages/${pageId}.html`;

    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading page: ${pageUrl}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('placeholder').innerHTML = data;
            
            // Execute page-specific scripts
            executePageScripts(button.id);
        })
        .catch(error => {
            console.error('Loading error:', error);
            document.getElementById('placeholder').innerHTML = 
                '<div class="alert alert-danger p-3">Content not found. Make sure the file exists in the "pages" folder.</div>';
        });
}

/* ========================================
   PAGE-SPECIFIC FUNCTIONALITY
   ======================================== */

/**
 * Executes scripts specific to each page
 */
function executePageScripts(pageId) {
    switch(pageId) {
        case 'home':
            calculateAge();
            break;
        case 'MyNotes':
            setupOneNoteModal();
            break;
    }
}

/**
 * Calculates and displays user's age
 */
function calculateAge() {
    const birthDate = new Date(2001, 3, 30); // April 30, 2001
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const ageSpan = document.getElementById('age');
    if (ageSpan) {
        ageSpan.textContent = age;
    }
}

/**
 * Sets up OneNote help modal functionality
 */
function setupOneNoteModal() {
    const onenoteHelpLink = document.getElementById('onenote-help-link');
    if (onenoteHelpLink) {
        onenoteHelpLink.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('onenoteHelpModal'));
            modal.show();
        });
    }
}

/* ========================================
   INITIALIZATION
   ======================================== */

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    const homeButton = document.getElementById('home');
    if (homeButton) {
        selectButton(homeButton);
    }
});

// Make selectButton globally accessible for onclick handlers
window.selectButton = selectButton;
