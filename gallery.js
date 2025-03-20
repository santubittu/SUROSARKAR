// Gallery Image Collections
const galleryCollections = {
    wedding: [
        'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061629_DSC_5177.jpg',
        'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061636_DSC_5250.jpg',
        'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061648_DSC_5326.jpg',
        'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1647495870_275743695_519756359672098_6221822314462299576_n.jpg',
        'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1659331132_DSC_8104.jpg',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh36sSOKPJphktYJ-762myppuKZD1TwYbvM7w213HRCr0VhmgWOtET1hRv8E_nkhVYdNwPFU-Px4TUje7hl6JueMgGpkh3a6bLzzefAJf3n7GuE2QHqv6YtgVfMmneGbwoCwRK7SnpzDu3fG5cWCfCNgnSmpaTMH4GNfDimEov_nqNH84Pi-6ACbNvDx-Q/s3922/DSC_83522.jpg',     
        // // Add more wedding photos here
    ],
    preWedding: [
        'https://image.wedmegood.com/resized/1000X/uploads/project/229988/1672312701_DSC_1232.jpg',
        'https://image.wedmegood.com/resized/1000X/uploads/project/229988/1672312726_DSC_1486.jpg',
        'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061641_DSC_5055.jpg',
        // Add more pre-wedding photos here
    ],
    birthday: [
        // Add birthday photos here
    ],
    events: [
        // Add event photos here
    ]
};

// Function to get current gallery type from URL
function getCurrentGalleryType() {
    const path = window.location.pathname;
    if (path.includes('wedding.html')) return 'wedding';
    if (path.includes('pre-wedding.html')) return 'preWedding';
    if (path.includes('birthday.html')) return 'birthday';
    if (path.includes('events.html')) return 'events';
    return 'all';
}

// Function to get all images for 'all' gallery
function getAllImages() {
    return Object.values(galleryCollections).flat();
}

// Function to create gallery item
function createGalleryItem(imageUrl, index) {
    return `
        <div class="gallery-item fade-in">
            <a href="${imageUrl}" data-lightbox="gallery" data-title="Photo ${index + 1}">
                <img src="${imageUrl}" alt="Gallery Image ${index + 1}">
            </a>
        </div>
    `;
}

// Initialize Gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryType = getCurrentGalleryType();
    
    if (!galleryContainer) return;

    let images = galleryType === 'all' ? getAllImages() : galleryCollections[galleryType];
    
    // If no images found for the category, show a message
    if (!images || images.length === 0) {
        galleryContainer.innerHTML = '<div class="col-12 text-center"><p>No images available in this category yet.</p></div>';
        return;
    }

    // Populate gallery with images
    const galleryHTML = images.map((image, index) => createGalleryItem(image, index)).join('');
    galleryContainer.innerHTML = galleryHTML;

    // Initialize fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => observer.observe(element));

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Photo %1 of %2',
        'fadeDuration': 300
    });
}); 