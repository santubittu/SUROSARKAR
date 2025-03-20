// Gallery Images Array
const galleryImages = [
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061629_DSC_5177.jpg',
        alt: 'Wedding Photography'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061636_DSC_5250.jpg',
        alt: 'Pre-Wedding Shoot'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061648_DSC_5326.jpg',
        alt: 'Engagement Photography'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1647495870_275743695_519756359672098_6221822314462299576_n.jpg',
        alt: 'Wedding Ceremony'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1659331132_DSC_8104.jpg',
        alt: 'Pre-Wedding Romance'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/project/229988/1672312701_DSC_1232.jpg',
        alt: 'Special Events'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/project/229988/1672312726_DSC_1486.jpg',
        alt: 'Wedding Moments'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061641_DSC_5055.jpg',
        alt: 'Special Moments'
    }
];

// Hero Carousel Images
const carouselImages = [
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061629_DSC_5177.jpg',
        alt: 'Beautiful Wedding Moment'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1659331132_DSC_8104.jpg',
        alt: 'Pre-Wedding Romance'
    },
    {
        url: 'https://image.wedmegood.com/resized/1000X/uploads/member/2897930/1703061636_DSC_5250.jpg',
        alt: 'Wedding Ceremony'
    }
];

// Sample Reviews
const reviews = [
    {
        name: 'Priya & Rahul',
        text: 'Suro and his team captured our wedding beautifully. The photos are absolutely stunning!',
        rating: 5
    },
    {
        name: 'Anita & Raj',
        text: 'Professional service and amazing quality. Highly recommend Subha Lagna for any special occasion.',
        rating: 5
    },
    {
        name: 'Meera & Arun',
        text: 'Our pre-wedding shoot was magical. The team made us feel very comfortable and natural.',
        rating: 5
    }
];

// Function to preload images
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
    });
}

// Function to create gallery item
function createGalleryItem(image, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item fade-in';
    galleryItem.innerHTML = `
        <img src="${image.url}" alt="${image.alt}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-content">
                <h4>${image.alt}</h4>
            </div>
        </div>
    `;
    return galleryItem;
}

// Function to create gallery modal
function createGalleryModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <span class="gallery-close">&times;</span>
            <div class="gallery-modal-body"></div>
            <button class="gallery-prev">❮</button>
            <button class="gallery-next">❯</button>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Function to show gallery modal
function showGalleryModal(images, startIndex = 0) {
    const modal = document.querySelector('.gallery-modal') || createGalleryModal();
    const modalBody = modal.querySelector('.gallery-modal-body');
    let currentIndex = startIndex;

    function showImage(index) {
        modalBody.innerHTML = `
            <img src="${images[index].url}" alt="${images[index].alt}" class="gallery-modal-img">
            <div class="gallery-caption">${images[index].alt}</div>
        `;
        currentIndex = index;
    }

    modal.querySelector('.gallery-close').onclick = () => modal.style.display = 'none';
    modal.querySelector('.gallery-prev').onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };
    modal.querySelector('.gallery-next').onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    showImage(currentIndex);
    modal.style.display = 'flex';
}

// Image loading handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Get all gallery images
    const images = document.querySelectorAll('.gallery-img');
    
    // Load each image with animation
    images.forEach(img => {
        img.crossOrigin = "anonymous";
        img.style.opacity = '1'; // Make images visible immediately
    });

    // Handle category card clicks
    document.querySelectorAll('.category-card').forEach((card, index) => {
        card.onclick = (e) => {
            e.preventDefault();
            const categoryName = card.querySelector('h3').textContent;
            const categoryImages = galleryImages.filter(img => 
                img.alt.toLowerCase().includes(categoryName.toLowerCase())
            );
            showGalleryModal(categoryImages.length ? categoryImages : galleryImages);
        };
    });

    // Handle "View All Photos" button
    const viewAllBtn = document.querySelector('.btn-primary.btn-lg');
    if (viewAllBtn) {
        viewAllBtn.onclick = (e) => {
            e.preventDefault();
            showGalleryModal(galleryImages);
        };
    }

    // Make featured items clickable
    document.querySelectorAll('.featured-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.onclick = () => {
            const imgSrc = item.querySelector('img').src;
            const startIndex = galleryImages.findIndex(img => img.url === imgSrc);
            showGalleryModal(galleryImages, Math.max(0, startIndex));
        };
    });

    // Initialize Bootstrap Carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            ride: true
        });
    }

    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
}); 