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

    if (pageId === 'home') {
        // Reload the home content from index.html
        const homeContent = `
            <div class="row align-items-center">
                <div class="col-md-5 col-img-min flex-column text-center mb-1 mb-sm-0">
                    <img src="/images/pfp.png" alt="Ludovico Orsolon" class="img-fluid rounded-circle pfp-responsive">
                </div>
                <div class="col-md-7 d-flex flex-column align-items-center move-up-md">
                    <h1 class="card-title text-center mb-1 text-dark-custom">Ludovico Orsolon</h1>
                    <div class="sp-subtitle mb-2 align-self-center-custom">Computer Engineering Student</div>
                    <!-- Social Media Icons -->
                    <div class="mb-2">
                        <a href="https://instagram.com/ludovico_orsolon" target="_blank" class="mx-2 text-dark-custom">
                            <i class="fa-brands fa-instagram fa-xl"></i>
                        </a>
                        <a href="https://linkedin.com/in/ludovico-orsolon" target="_blank" class="mx-2 text-dark-custom">
                            <i class="fa-brands fa-linkedin-in fa-xl"></i>
                        </a>
                        <a href="https://github.com/OrsolonLudovico" target="_blank" class="mx-2 text-dark-custom">
                            <i class="fa-brands fa-github fa-xl"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-6 mb-3 mb-md-0 text-start">
                    <h2 class="h4">About me:</h2>
                    <p class="text-start">
                        I'm a final-year Master's student in Computer Engineering at the University of Padua. I'm passionate about technology and a board game enthusiast.
                        Download my resume <a href="javascript:void(0);" onclick="selectButton(document.getElementById('cv'))" id="cv-link" class="link-button">here</a>.
                    </p>
                </div>
                <div class="col-md-6 text-start">
                    <h2 class="h4">Info:</h2>
                    <ul class="list-unstyled mb-0 text-start">
                        <li><strong>Age:</strong> <span id="age">Error: can't run script to calculate age</span></li>
                        <li><strong>Location:</strong> Montecchio Maggiore (VI), Italy</li>
                        <li><strong>E-mail:</strong> <a class="text-info fw-bold">ludovico.orsolon@gmail.com</a></li>
                    </ul>
                </div>
            </div>
        `;
        document.getElementById('placeholder').innerHTML = homeContent;
        executePageScripts('home');
        return;
    }

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
    // No need to call selectButton for home, content is already loaded
    executePageScripts('home');
});

// Make selectButton globally accessible for onclick handlers
window.selectButton = selectButton;
