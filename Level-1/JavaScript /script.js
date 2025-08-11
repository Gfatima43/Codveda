document.addEventListener("DOMContentLoaded", function () {
    // Utility Functions
    function hideElement(el) {
        el.classList.remove('show');
    }

    function showElement(el) {
        el.classList.add('show');
    }

    function toggleElement(el) {
        el.classList.toggle('show');
    }

    // === Simple Dropdown ===
    const simpleDropdownBtn = document.getElementById("simpleDropdown");
    const simpleDropdownContent = document.getElementById("simpleDropdownContent");
    const simpleSelected = document.getElementById("simpleSelected");

    simpleDropdownBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        simpleDropdownBtn.classList.toggle("active");
        toggleElement(simpleDropdownContent);
    });

    simpleDropdownContent.addEventListener("click", function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const text = e.target.textContent;
            simpleDropdownBtn.innerHTML = `${text} <span class="arrow">▼</span>`;
            simpleSelected.textContent = text;
            simpleDropdownBtn.classList.remove("active");
            hideElement(simpleDropdownContent);
        }
    });

    // === Multi-level Dropdown ===
    const multiDropdownBtn = document.getElementById("multiDropdown");
    const multiDropdownContent = document.getElementById("multiDropdownContent");
    const multiSelected = document.getElementById("multiSelected");

    multiDropdownBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        multiDropdownBtn.classList.toggle("active");
        toggleElement(multiDropdownContent);
    });

    // Handle selection of all submenu items
    document.querySelectorAll('.dropdown-content a[data-value]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const value = this.textContent;
            multiSelected.textContent = value;
            multiDropdownContent.classList.remove('show');
        });
    });

    document.addEventListener('mouseleave', function (e) {
        const hasSubmenu = e.target.closest('.has-submenu');
        if (hasSubmenu) {
            const submenu = hasSubmenu.querySelector('.submenu');
            if (submenu) {
                // Add a small delay to allow moving to submenu
                setTimeout(() => {
                    if (!submenu.matches(':hover') && !hasSubmenu.matches(':hover')) {
                        submenu.classList.remove('show');
                    }
                }, 100);
            }
        }
    });


    // === Global: Click outside to close ===
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            simpleDropdownBtn.classList.remove("active");
            multiDropdownBtn.classList.remove("active");
            hideElement(simpleDropdownContent);
            hideElement(multiDropdownContent);
        }
    });

    // === Global: Escape key to close ===
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            simpleDropdownBtn.classList.remove("active");
            multiDropdownBtn.classList.remove("active");
            hideElement(simpleDropdownContent);
            hideElement(multiDropdownContent);
        }
    });

    // === Searchable Dropdown ===
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchSelected = document.getElementById('searchSelected');

    const countries = [
        'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
        'Japan', 'Australia', 'Brazil', 'India', 'China', 'Russia',
        'Italy', 'Spain', 'Mexico', 'South Korea', 'Netherlands'
    ];

    // Filter results on input
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length > 0) {
            const filtered = countries.filter(country =>
                country.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                filtered.forEach(country => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.textContent = country;
                    item.addEventListener('click', function () {
                        searchInput.value = country;
                        searchSelected.textContent = country;
                        hideElement(searchResults);
                    });
                    searchResults.appendChild(item);
                });
                showElement(searchResults);
            } else {
                hideElement(searchResults);
            }
        } else {
            hideElement(searchResults);
        }
    });

    searchInput.addEventListener('focus', function () {
        if (this.value.length > 0) {
            showElement(searchResults);
        }
    });

    // Close search dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-dropdown')) {
            hideElement(searchResults);
        }
    });

    // === Utility Functions ===
    function showElement(element) {
        if (element) {
            element.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideElement(element) {
        if (element) {
            element.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');

        if (field && errorElement) {
            field.classList.add('error');
            field.classList.remove('success');
            errorElement.textContent = message;
            errorElement.className = 'error-message';
        }
    }

    function showSuccess(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');

        if (field && errorElement) {
            field.classList.add('success');
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.className = '';
        }
    }

    function clearValidation(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');

        if (field && errorElement) {
            field.classList.remove('error', 'success');
            errorElement.textContent = '';
            errorElement.className = '';
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // === Modal Functionality ===
    const modals = {
        basic: {
            overlay: document.getElementById('basicModalOverlay'),
            openBtn: document.getElementById('openBasicModal'),
            closeBtn: document.getElementById('closeBasicModal'),
            cancelBtn: document.getElementById('basicModalCancel'),
            okBtn: document.getElementById('basicModalOk')
        },
        confirm: {
            overlay: document.getElementById('confirmModalOverlay'),
            openBtn: document.getElementById('openConfirmModal'),
            closeBtn: document.getElementById('closeConfirmModal'),
            cancelBtn: document.getElementById('confirmModalCancel'),
            deleteBtn: document.getElementById('confirmModalDelete'),
            result: document.getElementById('confirmResult')
        },
        form: {
            overlay: document.getElementById('formModalOverlay'),
            openBtn: document.getElementById('openFormModal'),
            closeBtn: document.getElementById('closeFormModal'),
            cancelBtn: document.getElementById('formModalCancel'),
            saveBtn: document.getElementById('formModalSave'),
            form: document.getElementById('userForm'),
            userList: document.getElementById('userList')
        },
        image: {
            overlay: document.getElementById('imageModalOverlay'),
            closeBtn: document.getElementById('closeImageModal'),
            image: document.getElementById('modalImage')
        }
    };

    // Basic Modal
    modals.basic.openBtn.addEventListener('click', () => {
        showElement(modals.basic.overlay);
    });

    [modals.basic.closeBtn, modals.basic.cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            hideElement(modals.basic.overlay);
        });
    });

    modals.basic.okBtn.addEventListener('click', () => {
        alert('OK button clicked!');
        hideElement(modals.basic.overlay);
    });

    // Confirmation Modal
    modals.confirm.openBtn.addEventListener('click', () => {
        showElement(modals.confirm.overlay);
    });

    [modals.confirm.closeBtn, modals.confirm.cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            hideElement(modals.confirm.overlay);
        });
    });

    modals.confirm.deleteBtn.addEventListener('click', () => {
        modals.confirm.result.textContent = 'Item deleted successfully!';
        modals.confirm.result.className = 'modal-result success';
        hideElement(modals.confirm.overlay);
        setTimeout(() => {
            modals.confirm.result.textContent = '';
            modals.confirm.result.className = 'modal-result';
        }, 3000);
    });

    // Form Modal
    let users = [];

    modals.form.openBtn.addEventListener('click', () => {
        showElement(modals.form.overlay);
        modals.form.form.reset();
        clearFormValidation();
    });

    [modals.form.closeBtn, modals.form.cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            hideElement(modals.form.overlay);
        });
    });

    modals.form.saveBtn.addEventListener('click', () => {
        if (validateUserForm()) {
            const formData = new FormData(modals.form.form);
            const user = {
                id: Date.now(),
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role')
            };

            users.push(user);
            updateUserList();
            hideElement(modals.form.overlay);

            // Show success message
            const resultElement = document.getElementById('confirmResult');
            resultElement.textContent = `User "${user.name}" added successfully!`;
            resultElement.className = 'modal-result success';
            setTimeout(() => {
                resultElement.textContent = '';
                resultElement.className = 'modal-result';
            }, 3000);
        }
    });

    function validateUserForm() {
        let isValid = true;

        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();

        if (!name) {
            showError('userName', 'Name is required');
            isValid = false;
        } else {
            showSuccess('userName');
        }

        if (!email) {
            showError('userEmail', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('userEmail', 'Please enter a valid email');
            isValid = false;
        } else {
            showSuccess('userEmail');
        }

        return isValid;
    }

    function clearFormValidation() {
        clearValidation('userName');
        clearValidation('userEmail');
    }

    function updateUserList() {
        modals.form.userList.innerHTML = '';
        if (users.length === 0) {
            modals.form.userList.innerHTML = '<p>No users found.</p>';
            return;
        }

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                </div>
                <div class="user-actions">
                    <span class="user-role">${user.role}</span>
                    <button class="delete-user" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            `;
            modals.form.userList.appendChild(userItem);
        });
    }

    function deleteUser(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
            if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
                users = users.filter(u => u.id !== userId);
                updateUserList();

                // Show success message
                const resultElement = document.getElementById('confirmResult');
                resultElement.textContent = 'User deleted successfully!';
                resultElement.className = 'modal-result success';
                setTimeout(() => {
                    resultElement.textContent = '';
                    resultElement.className = 'modal-result';
                }, 3000);
            }
        }
    }

    // Image Modal
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const fullImageSrc = thumb.getAttribute('data-full');
            modals.image.image.src = fullImageSrc;
            showElement(modals.image.overlay);
        });
    });

    modals.image.closeBtn.addEventListener('click', () => {
        hideElement(modals.image.overlay);
    });

    // Close modals when clicking overlay
    Object.values(modals).forEach(modal => {
        if (modal.overlay) {
            modal.overlay.addEventListener('click', (e) => {
                if (e.target === modal.overlay) {
                    hideElement(modal.overlay);
                }
            });
        }
    });

    // === Form Validation Functions ===
    function validatePhone(phone) {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    }

    function validatePassword(password) {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    }

    function getPasswordStrength(password) {
        const checks = validatePassword(password);
        const score = Object.values(checks).filter(Boolean).length;

        if (score < 3) return 'weak';
        if (score < 5) return 'medium';
        return 'strong';
    }

    // === Form Validation ===
    const registrationForm = document.getElementById('registrationForm');
    const contactForm = document.getElementById('contactForm');

    // Registration Form
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateRegistrationForm()) {
            const result = document.getElementById('registrationResult');
            result.className = 'form-result success';
            result.textContent = 'Registration successful! Welcome aboard.';
            this.reset();
            clearAllValidation();
        }
    });

    // Real-time validation for registration form
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const birthDate = document.getElementById('birthDate');
    const terms = document.getElementById('terms');

    firstName.addEventListener('blur', () => {
        const value = firstName.value.trim();
        if (!value) {
            showError('firstName', 'First name is required');
        } else if (value.length < 2) {
            showError('firstName', 'First name must be at least 2 characters');
        } else {
            showSuccess('firstName');
        }
    });

    lastName.addEventListener('blur', () => {
        const value = lastName.value.trim();
        if (!value) {
            showError('lastName', 'Last name is required');
        } else if (value.length < 2) {
            showError('lastName', 'Last name must be at least 2 characters');
        } else {
            showSuccess('lastName');
        }
    });

    email.addEventListener('blur', () => {
        const value = email.value.trim();
        if (!value) {
            showError('email', 'Email is required');
        } else if (!validateEmail(value)) {
            showError('email', 'Please enter a valid email address');
        } else {
            showSuccess('email');
        }
    });

    phone.addEventListener('blur', () => {
        const value = phone.value.trim();
        if (value && !validatePhone(value)) {
            showError('phone', 'Please enter a valid phone number');
        } else if (value) {
            showSuccess('phone');
        } else {
            clearValidation('phone');
        }
    });

    password.addEventListener('input', () => {
        const value = password.value;
        const strengthIndicator = document.getElementById('passwordStrength');

        if (value) {
            const strength = getPasswordStrength(value);
            strengthIndicator.className = `password-strength ${strength}`;
        } else {
            strengthIndicator.className = 'password-strength';
        }
    });

    password.addEventListener('blur', () => {
        const value = password.value;
        if (!value) {
            showError('password', 'Password is required');
        } else if (value.length < 8) {
            showError('password', 'Password must be at least 8 characters');
        } else {
            const checks = validatePassword(value);
            if (!checks.uppercase || !checks.lowercase || !checks.number) {
                showError('password', 'Password must contain uppercase, lowercase, and number');
            } else {
                showSuccess('password');
            }
        }
    });

    confirmPassword.addEventListener('blur', () => {
        const value = confirmPassword.value;
        const passwordValue = password.value;

        if (!value) {
            showError('confirmPassword', 'Please confirm your password');
        } else if (value !== passwordValue) {
            showError('confirmPassword', 'Passwords do not match');
        } else {
            showSuccess('confirmPassword');
        }
    });

    birthDate.addEventListener('blur', () => {
        const value = birthDate.value;
        if (value) {
            const today = new Date();
            const birth = new Date(value);
            const age = today.getFullYear() - birth.getFullYear();

            if (age < 13) {
                showError('birthDate', 'You must be at least 13 years old');
            } else if (age > 120) {
                showError('birthDate', 'Please enter a valid birth date');
            } else {
                showSuccess('birthDate');
            }
        }
    });

    terms.addEventListener('change', () => {
        if (!terms.checked) {
            showError('terms', 'You must agree to the terms and conditions');
        } else {
            showSuccess('terms');
        }
    });

    function validateRegistrationForm() {
        let isValid = true;

        // Validate all fields
        const fields = [
            { id: 'firstName', required: true, minLength: 2 },
            { id: 'lastName', required: true, minLength: 2 },
            { id: 'email', required: true, type: 'email' },
            { id: 'phone', required: false, type: 'phone' },
            { id: 'password', required: true, type: 'password' },
            { id: 'confirmPassword', required: true, type: 'confirmPassword' },
            { id: 'birthDate', required: false, type: 'date' },
            { id: 'terms', required: true, type: 'checkbox' }
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            const value = element.type === 'checkbox' ? element.checked : element.value.trim();

            if (field.required && (!value || (field.type === 'checkbox' && !value))) {
                showError(field.id, `${field.id.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
                isValid = false;
            } else if (value) {
                // Type-specific validation
                switch (field.type) {
                    case 'email':
                        if (!validateEmail(value)) {
                            showError(field.id, 'Please enter a valid email address');
                            isValid = false;
                        }
                        break;
                    case 'phone':
                        if (!validatePhone(value)) {
                            showError(field.id, 'Please enter a valid phone number');
                            isValid = false;
                        }
                        break;
                    case 'password':
                        const checks = validatePassword(value);
                        if (value.length < 8 || !checks.uppercase || !checks.lowercase || !checks.number) {
                            showError(field.id, 'Password must be at least 8 characters with uppercase, lowercase, and number');
                            isValid = false;
                        }
                        break;
                    case 'confirmPassword':
                        if (value !== password.value) {
                            showError(field.id, 'Passwords do not match');
                            isValid = false;
                        }
                        break;
                    case 'date':
                        const today = new Date();
                        const birth = new Date(value);
                        const age = today.getFullYear() - birth.getFullYear();
                        if (age < 13 || age > 120) {
                            showError(field.id, 'Please enter a valid birth date');
                            isValid = false;
                        }
                        break;
                }

                // Length validation
                if (field.minLength && value.length < field.minLength) {
                    showError(field.id, `Must be at least ${field.minLength} characters`);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // Contact Form
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const charCounter = document.querySelector('.char-counter');

    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        charCount.textContent = length;

        charCounter.classList.remove('warning', 'danger');
        if (length > 400) {
            charCounter.classList.add('danger');
        } else if (length > 300) {
            charCounter.classList.add('warning');
        }
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateContactForm()) {
            const result = document.getElementById('contactResult');
            result.className = 'form-result success';
            result.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            this.reset();
            charCount.textContent = '0';
            charCounter.classList.remove('warning', 'danger');
        }
    });

    function validateContactForm() {
        let isValid = true;
        const contactName = document.getElementById('contactName');
        const contactEmail = document.getElementById('contactEmail');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Validate name
        if (!contactName.value.trim()) {
            showError('contactName', 'Name is required');
            isValid = false;
        } else {
            showSuccess('contactName');
        }

        // Validate email
        if (!contactEmail.value.trim()) {
            showError('contactEmail', 'Email is required');
            isValid = false;
        } else if (!validateEmail(contactEmail.value.trim())) {
            showError('contactEmail', 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess('contactEmail');
        }

        // Validate subject
        if (!subject.value.trim()) {
            showError('subject', 'Subject is required');
            isValid = false;
        } else {
            showSuccess('subject');
        }

        // Validate message
        if (!message.value.trim()) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.value.length > 500) {
            showError('message', 'Message must be 500 characters or less');
            isValid = false;
        } else {
            showSuccess('message');
        }

        return isValid;
    }

    function clearAllValidation() {
        const fields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'birthDate', 'terms'];
        fields.forEach(field => clearValidation(field));

        // Clear password strength indicator
        const strengthIndicator = document.getElementById('passwordStrength');
        strengthIndicator.className = 'password-strength';
    }

    // === Tab Functionality ===
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // === Accordion Functionality ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // === Counter Functionality ===
    let counterValue = 0;
    const counterDisplay = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetCounter');
    const setBtn = document.getElementById('setCounter');
    const setInput = document.getElementById('setCounterValue');

    function updateCounter() {
        counterDisplay.textContent = counterValue;
    }

    incrementBtn.addEventListener('click', () => {
        counterValue++;
        updateCounter();
    });

    decrementBtn.addEventListener('click', () => {
        counterValue--;
        updateCounter();
    });

    resetBtn.addEventListener('click', () => {
        counterValue = 0;
        updateCounter();
    });

    setBtn.addEventListener('click', () => {
        const newValue = parseInt(setInput.value);
        if (!isNaN(newValue)) {
            counterValue = newValue;
            updateCounter();
            setInput.value = '';
        }
    });

    setInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setBtn.click();
        }
    });

    // === Color Picker Functionality ===
    const colorInput = document.getElementById('colorInput');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorValue = document.getElementById('colorValue');

    function updateColorDisplay() {
        const color = colorInput.value;
        colorDisplay.style.backgroundColor = color;
        colorValue.textContent = color;
    }

    colorInput.addEventListener('input', updateColorDisplay);

    // Initialize color display
    updateColorDisplay();

    // === Smooth scrolling for navigation links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === Form reset functionality ===
    document.querySelectorAll('button[type="reset"]').forEach(resetBtn => {
        resetBtn.addEventListener('click', () => {
            // Clear all validation states
            setTimeout(() => {
                clearAllValidation();

                // Clear form results
                document.querySelectorAll('.form-result').forEach(result => {
                    result.style.display = 'none';
                });

                // Reset character counter
                if (charCount) {
                    charCount.textContent = '0';
                    charCounter.classList.remove('warning', 'danger');
                }

                // Reset password strength indicator
                const strengthIndicator = document.getElementById('passwordStrength');
                if (strengthIndicator) {
                    strengthIndicator.className = 'password-strength';
                }
            }, 10);
        });
    });

    // === Keyboard accessibility ===
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal.overlay && modal.overlay.classList.contains('show')) {
                    hideElement(modal.overlay);
                }
            });

            // Close dropdowns
            simpleDropdownBtn.classList.remove('active');
            multiDropdownBtn.classList.remove('active');
            hideElement(simpleDropdownContent);
            hideElement(multiDropdownContent);
            hideElement(searchResults);
        }
    });

    // === Add loading states to forms ===
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    }

    // Add loading states to submit buttons
    document.querySelectorAll('button[type="submit"]').forEach(submitBtn => {
        submitBtn.addEventListener('click', (e) => {
            const form = submitBtn.closest('form');
            if (form && form.checkValidity()) {
                addLoadingState(submitBtn);
            }
        });
    });

    console.log('Interactive JavaScript elements initialized successfully!');
});
