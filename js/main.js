document.documentElement.classList.add('js-enabled');

// =========================================================
// LUCIDE ICONS
// =========================================================

if (window.lucide) {
  lucide.createIcons();
}


// =========================================================
// EXPERIENCE TIMELINE EXPAND / COLLAPSE
// =========================================================

const timelineExpandButton = document.getElementById(
  'timeline-expand-button'
);

const timelineExpandedJobs = document.getElementById(
  'timeline-expanded-jobs'
);

if (timelineExpandButton && timelineExpandedJobs) {

  timelineExpandButton.addEventListener('click', () => {

    const isHidden =
      timelineExpandedJobs.classList.contains(
        'hidden'
      );

    timelineExpandedJobs.classList.toggle(
      'hidden',
      !isHidden
    );

    const buttonLabel =
      timelineExpandButton.querySelector(
        '[data-template-id="timeline-expand-label"]'
      );

    if (buttonLabel) {
      buttonLabel.textContent =
        isHidden
          ? 'Show Less'
          : 'More Experience';
    }

  });

}


// =========================================================
// REVEAL ANIMATIONS
// =========================================================

let revealObserver = null;

function initializeRevealAnimations() {

  const revealElements =
    document.querySelectorAll(
      '.reveal:not(.visible)'
    );

  if (!revealElements.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {

    revealElements.forEach((element) => {
      element.classList.add('visible');
    });

    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          'visible'
        );

        revealObserver.unobserve(
          entry.target
        );

      });

    },

    {
      threshold: 0.05,
      rootMargin:
        '120px 0px 120px 0px'
    }

  );

  revealElements.forEach((element) => {

    const position =
      element.getBoundingClientRect();

    const shouldShowImmediately =

      position.top <
        window.innerHeight + 120 &&

      position.bottom > -120;

    if (shouldShowImmediately) {

      element.classList.add(
        'visible'
      );

    } else {

      revealObserver.observe(
        element
      );

    }

  });

}

initializeRevealAnimations();

window.addEventListener(
  'pageshow',
  initializeRevealAnimations
);


// =========================================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// =========================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      'click',
      (event) => {

        const targetId =
          link.getAttribute('href');

        if (
          !targetId ||
          targetId === '#'
        ) {
          return;
        }

        const targetSection =
          document.querySelector(
            targetId
          );

        if (!targetSection) {
          return;
        }

        event.preventDefault();

        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        history.replaceState(
          null,
          '',
          targetId
        );

      }
    );

  });


// =========================================================
// SIDE NAVIGATION + HEADER QUICK LINKS
// =========================================================

const sideNavLinks =
  document.querySelectorAll(
    '.nav-link[data-section]'
  );

const trackedSections =
  Array.from(sideNavLinks)
    .map((link) =>
      document.getElementById(
        link.dataset.section
      )
    )
    .filter(Boolean);

const headerQuickLinks =
  document.getElementById(
    'header-quick-links'
  );

const showQuickLinksAfter = 400;

let scrollUpdateRequested = false;

function updateActiveSideNavigation() {

  if (!trackedSections.length) {
    return;
  }

  const activationPoint = 200;

  let currentSectionId =
    trackedSections[0].id;

  trackedSections.forEach(
    (section) => {

      if (
        section.getBoundingClientRect().top <=
        activationPoint
      ) {
        currentSectionId =
          section.id;
      }

    }
  );

  const nearBottom =

    window.innerHeight +
      window.scrollY >=

    document.documentElement
      .scrollHeight - 50;

  if (nearBottom) {

    currentSectionId =
      trackedSections[
        trackedSections.length - 1
      ].id;

  }

  sideNavLinks.forEach((link) => {

    link.classList.toggle(
      'active',
      link.dataset.section ===
        currentSectionId
    );

  });

}

function updateHeaderQuickLinks() {

  if (!headerQuickLinks) {
    return;
  }

  const shouldShow =
    window.scrollY >
    showQuickLinksAfter;

  headerQuickLinks.style.opacity =
    shouldShow ? '1' : '0';

  headerQuickLinks.style.transform =
    shouldShow
      ? 'translateY(0)'
      : 'translateY(8px)';

  headerQuickLinks.style.pointerEvents =
    shouldShow
      ? 'auto'
      : 'none';

  headerQuickLinks.setAttribute(
    'aria-hidden',
    String(!shouldShow)
  );

}

function updateScrollFeatures() {

  updateActiveSideNavigation();

  updateHeaderQuickLinks();

  scrollUpdateRequested = false;

}

function requestScrollFeatureUpdate() {

  if (scrollUpdateRequested) {
    return;
  }

  scrollUpdateRequested = true;

  requestAnimationFrame(
    updateScrollFeatures
  );

}

window.addEventListener(
  'scroll',
  requestScrollFeatureUpdate,
  { passive: true }
);

window.addEventListener(
  'resize',
  requestScrollFeatureUpdate
);

updateScrollFeatures();


// =========================================================
// GENERIC IMAGE CAROUSELS
// =========================================================

function parseCarouselImages(carouselElement) {

  const imageData =
    carouselElement.dataset.carouselImages;

  if (!imageData) {
    return [];
  }

  try {

    const images =
      JSON.parse(imageData);

    return Array.isArray(images)
      ? images
      : [];

  } catch (error) {

    console.error(
      'Unable to read carousel images.',
      error
    );

    return [];
  }

}


// =========================================================
// INITIALIZE SINGLE CAROUSEL
// =========================================================

function initializeCarousel(carouselElement) {

  const carouselName =
    carouselElement.dataset.carousel;

  if (!carouselName) {
    return;
  }

  const images =
    parseCarouselImages(carouselElement);

  const imageElement =
    document.getElementById(
      `${carouselName}-carousel-image`
    );

  const captionElement =
    document.getElementById(
      `${carouselName}-carousel-caption`
    );

  const counterElement =
    document.getElementById(
      `${carouselName}-carousel-counter`
    );

  const previousButton =
    document.getElementById(
      `${carouselName}-prev-button`
    );

  const nextButton =
    document.getElementById(
      `${carouselName}-next-button`
    );

  if (
    !imageElement ||
    !captionElement ||
    !counterElement ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  if (!images.length) {

    previousButton.classList.add(
      'hidden'
    );

    nextButton.classList.add(
      'hidden'
    );

    counterElement.textContent =
      '0 / 0';

    return;

  }

  let currentImage = 0;

  const hasMultipleImages =
    images.length > 1;

  previousButton.classList.toggle(
    'hidden',
    !hasMultipleImages
  );

  nextButton.classList.toggle(
    'hidden',
    !hasMultipleImages
  );

  function updateCarousel() {

    const image =
      images[currentImage];

    imageElement.src =
      image.src;

    imageElement.alt =
      image.alt;

    captionElement.textContent =
      image.caption;

    counterElement.textContent =
      `${currentImage + 1} / ${images.length}`;

  }

  previousButton.addEventListener(
    'click',
    () => {

      currentImage =
        (currentImage - 1 + images.length) %
        images.length;

      updateCarousel();

    }
  );

  nextButton.addEventListener(
    'click',
    () => {

      currentImage =
        (currentImage + 1) %
        images.length;

      updateCarousel();

    }
  );

  updateCarousel();

}


// =========================================================
// INITIALIZE ALL CAROUSELS
// =========================================================

document
  .querySelectorAll(
    '[data-carousel]'
  )
  .forEach((carousel) => {

    initializeCarousel(
      carousel
    );

  });