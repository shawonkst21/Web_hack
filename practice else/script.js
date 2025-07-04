//! Get DOM elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const uploadBtn = document.getElementById('uploadBtn');
const previewImage = document.getElementById('previewImage');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const uploadPlaceholder = document.querySelector('.upload-placeholder');


const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const maxFileSize = 10 * 1024 * 1024; 

function validateFile(file) {
    if (!supportedFormats.includes(file.type)) {
        showError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return false;
    }
    
    if (file.size > maxFileSize) {
        showError('File size must be less than 10MB');
        return false;
    }
    
    return true;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function processFile(file) {
    if (!validateFile(file)) {
        return;
    }
    
    hideMessages();
    
    uploadPlaceholder.innerHTML = '<div class="loading"></div><p>Processing image...</p>';
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        uploadPlaceholder.style.display = 'none';
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
                uploadBtn.innerHTML = '<span class="btn-icon">🔄</span>Change Image';
        
        showSuccess();
    };
    
    reader.onerror = function() {
        showError('Failed to read the selected file');
        resetUploadArea();
    };
    
    reader.readAsDataURL(file);
}

function resetUploadArea() {
    uploadPlaceholder.style.display = 'block';
    uploadPlaceholder.innerHTML = `
        <div class="upload-icon">📷</div>
        <p class="upload-text">Click here to upload image</p>
        <p class="upload-subtext">or drag and drop your image</p>
    `;
    previewImage.style.display = 'none';
    previewImage.src = '';
    uploadBtn.innerHTML = '<span class="btn-icon">📁</span>Select Image';
    hideMessages();
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
});

uploadBtn.addEventListener('click', function() {
    fileInput.click();
});

uploadArea.addEventListener('click', function() {
    fileInput.click();
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
});

uploadArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    uploadArea.classList.add('dragover');
}

function unhighlight(e) {
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        const file = files[0];
        processFile(file);
    }
}

uploadArea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
    }
});

uploadArea.setAttribute('tabindex', '0');
uploadArea.setAttribute('role', 'button');
uploadArea.setAttribute('aria-label', 'Click to upload image or drag and drop');