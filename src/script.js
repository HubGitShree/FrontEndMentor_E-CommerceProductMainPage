// This is to handle the product image gallery and lightbox modal

//Array of product images
const productImages = [
    "../images/image-product-1.jpg",
    "../images/image-product-2.jpg",
    "../images/image-product-3.jpg",
    "../images/image-product-4.jpg"
  ];
  
  let currentImageIndex = 0;
  
  //Get elements
  const mainProductImage = document.getElementById('mainProductImage');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = document.getElementById('closeLightbox');
  const prevImage = document.getElementById('prevImage');
  const nextImage = document.getElementById('nextImage');
  const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
  const mainThumbnails = document.querySelectorAll('.thumbnail');
  

  //Image Switcher Functionality
  //This is to update the main product image when clicking a thumbnail
  function updateMainImage(index) {
    currentImageIndex = index;
    mainProductImage.src = productImages[currentImageIndex];
    mainProductImage.classList.remove('opacity-0'); // Smooth transition efffects
    mainProductImage.classList.add('opacity-0');
    setTimeout(() => {
      mainProductImage.src = productImages[currentImageIndex];
      mainProductImage.classList.remove('opacity-0');
    }, 300); // match Tailwind's transition duration 
    
    //Add orange border to the clicked thumbnail
    mainThumbnails.forEach((thumb, idx) => {
        if (idx === index) {
          thumb.classList.add('border-orange-400', 'border-10', 'opacity-75');
        } else {
          thumb.classList.remove('border-orange-400', 'border-10', 'opacity-75');
        }
      });
  }
  
  //Function to open the lightbox
  function openLightbox() {
    lightboxImage.src = productImages[currentImageIndex];
    lightbox.classList.remove('hidden');
    
    // Add orange border to the clicked corresponding lightbox thumbnail
    lightboxThumbnails.forEach((thumb, idx) => {
      if (idx === currentImageIndex) {
        thumb.classList.add('border-orange-400', 'border-10', 'opacity-75');
      } else {
        thumb.classList.remove('border-orange-400', 'border-10', 'opacity-75');
      }
    });
  }
  
  //Function to close the lightbox
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
  
  //Function to show the previous image in the lightbox
  prevImage.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    lightboxImage.src = productImages[currentImageIndex];
    highlightLightboxThumbnail();
  });
  
  //Function to show the next image in the lightbox
  nextImage.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    lightboxImage.src = productImages[currentImageIndex];
    highlightLightboxThumbnail();
  });
  
  //Function to show the clicked image from the lightbox thumbnails
  function showLightboxImage(index) {
    currentImageIndex = index;
    lightboxImage.src = productImages[currentImageIndex];
    highlightLightboxThumbnail();
  }
  
  //Function to add the orange border to the clicked lightbox thumbnail
  function highlightLightboxThumbnail() {
    lightboxThumbnails.forEach((thumb, idx) => {
      if (idx === currentImageIndex) {
        thumb.classList.add('border-orange-400', 'border-10', 'opacity-75');
      } else {
        thumb.classList.remove('border-orange-400', 'border-10', 'opacity-75');
      }
    });
  }
  