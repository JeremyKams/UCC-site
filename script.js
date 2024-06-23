const hamburger = document.querySelector('.hambuger'); 
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener("click", () => { 
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
// CAROUSEL FOR IMAGE
document.addEventListener('DOMContentLoaded', () => {
  // Image Carousel
  const imageCarouselInner = document.querySelector('.carousel-inner');
  const imageCarouselItems = document.querySelectorAll('.carousel-item');
  let imageCurrentIndex = 0;
  const imageIntervalTime = 5000; // 5 seconds interval

  function showNextImage() {
      imageCarouselItems[imageCurrentIndex].classList.remove('active');
      imageCurrentIndex = (imageCurrentIndex + 1) % imageCarouselItems.length;
      imageCarouselItems[imageCurrentIndex].classList.add('active');
      imageCarouselInner.style.transform = `translateX(-${imageCurrentIndex * 100}%)`;
  }

  setInterval(showNextImage, imageIntervalTime);

  // Video Carousel
  const videoCarouselInner = document.querySelector('.video-carousel-inner');
  const videoCarouselItems = document.querySelectorAll('.video-carousel-item');
  let videoCurrentIndex = 0;

  function showNextVideo() {
      videoCarouselItems.forEach(item => {
          const video = item.querySelector('video');
          video.pause();
          video.currentTime = 0;
      });

      videoCurrentIndex = (videoCurrentIndex + 1) % videoCarouselItems.length;
      videoCarouselInner.style.transform = `translateX(-${videoCurrentIndex * 100}%)`;
  }

  setInterval(showNextVideo, imageIntervalTime);

  // Enlarge image on click
  imageCarouselItems.forEach(item => {
      item.querySelector('img').addEventListener('click', () => {
          const imgSrc = item.querySelector('img').src;
          const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><img src="${imgSrc}" alt="Enlarged image"></div>`;
          document.body.appendChild(modal);

          // Close modal
          modal.querySelector('.close').addEventListener('click', () => {
              document.body.removeChild(modal);
          });

          // Close modal on outside click
          modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                  document.body.removeChild(modal);
              }
          });
      });
  });

  // Enlarge video on click
  videoCarouselItems.forEach(item => {
      const video = item.querySelector('video');
      video.addEventListener('click', () => {
          const videoSrc = video.src;
          const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><video src="${videoSrc}" controls autoplay></video></div>`;
          document.body.appendChild(modal);

          // Pause the carousel video
          video.pause();

          // Close modal
          modal.querySelector('.close').addEventListener('click', () => {
              document.body.removeChild(modal);
              video.play(); // Resume playing the carousel video
          });

          // Close modal on outside click
          modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                  document.body.removeChild(modal);
                  video.play(); // Resume playing the carousel video
              }
          });
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function(event) {
      event.preventDefault();
      const answer = this.nextElementSibling;
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
      } else {
        faqQuestions.forEach(q => q.nextElementSibling.style.display = 'none');
        answer.style.display = 'block';
      }
    });
  });

  document.addEventListener('click', function(event) {
    if (!event.target.classList.contains('faq-question')) {
      faqQuestions.forEach(question => {
        question.nextElementSibling.style.display = 'none';
      });
    }
  });
});

document.querySelectorAll('.nav-link.non-functional').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      alert('This page is not yet active. We are working on it. it will be soon available');
  });
});

// JavaScript to display the tribute modal
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById("tributeModal");
  var span = document.getElementsByClassName("close-button")[0];

  // Show the modal
  modal.style.display = "block";

  // Close the modal when the close button is clicked
  span.onclick = function () {
    modal.style.display = "none";
  }

  // Close the modal when clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

// JavaScript for Image Modal
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("modalCaption");
  var images = document.querySelectorAll(".gallery-container .carousel-item img");
  var span = document.getElementsByClassName("close-image-modal")[0];

  images.forEach(function(image) {
    image.onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      var details = this.nextElementSibling.cloneNode(true);
      captionText.innerHTML = "";
      captionText.appendChild(details);
    }
  });

  // Close the modal when the close button is clicked
  span.onclick = function() {
    modal.style.display = "none";
  }

  // Close the modal when clicking outside the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.home-activity-carousel');
  let currentSectionIndex = 0;
  let currentItemIndex = 0;
  const sectionIntervalTime = 20000; // Time for each section to be visible (in ms)
  const itemIntervalTime = 5000; // Time for each card to be visible (in ms)

  function showItem(carousel, index) {
    const items = carousel.querySelectorAll('.home-carousel-item');
    items.forEach((item, i) => {
      item.classList.remove('active');
      if (i === index) {
        item.classList.add('active');
      }
    });
  }

  function slideSection() {
    const currentSection = carousels[currentSectionIndex];
    currentSection.classList.remove('active');

    currentSectionIndex = (currentSectionIndex + 1) % carousels.length;
    const nextSection = carousels[currentSectionIndex];
    nextSection.classList.add('active');

    currentItemIndex = 0;
    showItem(nextSection, currentItemIndex);

    // Start item carousel for the next section
    startItemCarousel(nextSection);
  }

  function startItemCarousel(section) {
    const items = section.querySelectorAll('.home-carousel-item');
    function showNextItem() {
      currentItemIndex = (currentItemIndex + 1) % items.length;
      showItem(section, currentItemIndex);

      // If it's the last item, schedule the section transition
      if (currentItemIndex === items.length - 1) {
        setTimeout(slideSection, itemIntervalTime);
      } else {
        setTimeout(showNextItem, itemIntervalTime);
      }
    }
    setTimeout(showNextItem, itemIntervalTime);
  }

  // Initialize the first section and start its item carousel
  carousels[currentSectionIndex].classList.add('active');
  showItem(carousels[currentSectionIndex], currentItemIndex);
  startItemCarousel(carousels[currentSectionIndex]);
});




document.addEventListener('DOMContentLoaded', function() {
  const testimoniesCarousel = document.getElementById('testimonies-carousel');
  const carouselItems = testimoniesCarousel.querySelectorAll('.carousel-item');
  const totalItems = carouselItems.length;
  let currentItem = 0;

  function showCarouselItem(index) {
    const offset = index * -100;
    testimoniesCarousel.style.transform = `translateX(${offset}%)`;
  }

  // Automatically switch testimonies every 5 seconds
  function autoSwitchTestimonies() {
    setInterval(function() {
      if (!document.querySelector('.testimony.zoomed')) {
        currentItem = (currentItem + 1) % totalItems;
        showCarouselItem(currentItem);
      }
    }, 5000); // Adjust timing as needed
  }

  // Initialize carousel
  showCarouselItem(currentItem);
  autoSwitchTestimonies();

  // Add click event to testimonies for zoom effect
  carouselItems.forEach(item => {
    const testimony = item.querySelector('.testimony');
    const closeButton = item.querySelector('.close-btn');

    testimony.addEventListener('click', function() {
      testimony.classList.add('zoomed');
    });

    closeButton.addEventListener('click', function(event) {
      event.stopPropagation();
      testimony.classList.remove('zoomed');
    });
  });
});
