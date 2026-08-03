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
      timelineExpandedJobs.classList.contains('hidden');

    const buttonLabel = timelineExpandButton.querySelector(
      '[data-template-id="timeline-expand-label"]'
    );

    if (isHidden) {
      timelineExpandedJobs.classList.remove('hidden');

      if (buttonLabel) {
        buttonLabel.textContent = 'Show Less';
      }
    } else {
      timelineExpandedJobs.classList.add('hidden');

      if (buttonLabel) {
        buttonLabel.textContent = 'More Experience';
      }
    }
  });
}


// =========================================================
// REVEAL ANIMATIONS
// =========================================================

let revealObserver = null;

function initializeRevealAnimations() {
  const revealElements =
    document.querySelectorAll('.reveal');

  if (!revealElements.length) {
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((element) => {
    const position =
      element.getBoundingClientRect();

    const isVisibleNow =
      position.top < window.innerHeight &&
      position.bottom > 0;

    if (isVisibleNow) {
      element.classList.add('visible');
    } else {
      revealObserver.observe(element);
    }
  });
}

initializeRevealAnimations();

window.addEventListener('pageshow', () => {
  initializeRevealAnimations();
});


// =========================================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    history.replaceState(null, '', targetId);
  });
});


// =========================================================
// SIDE NAVIGATION SCROLL HIGHLIGHT
// =========================================================

const sideNavLinks = document.querySelectorAll(
  '.nav-link[data-section]'
);

const trackedSections = Array.from(sideNavLinks)
  .map((link) =>
    document.getElementById(link.dataset.section)
  )
  .filter(Boolean);

function updateActiveSideNavigation() {
  if (!trackedSections.length) {
    return;
  }

  const activationPoint = 200;
  let currentSectionId = trackedSections[0].id;

  trackedSections.forEach((section) => {
    const sectionTop =
      section.getBoundingClientRect().top;

    if (sectionTop <= activationPoint) {
      currentSectionId = section.id;
    }
  });

  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 50;

  if (nearBottom) {
    currentSectionId =
      trackedSections[trackedSections.length - 1].id;
  }

  sideNavLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.dataset.section === currentSectionId
    );
  });
}

window.addEventListener(
  'scroll',
  updateActiveSideNavigation,
  { passive: true }
);

window.addEventListener(
  'resize',
  updateActiveSideNavigation
);

updateActiveSideNavigation();


// =========================================================
// CASE STUDY IMAGE DATA
// =========================================================

const currentPage = document.body.dataset.page || '';

const caseStudyImages = {
  'bridge-condition': {
    challenge: [
      {
        src: 'assets/images/bridge-challenge-1.png',
        alt: 'Original bridge data example 1',
        caption: 'Where bridge data is stored.'
      },
      {
        src: 'assets/images/bridge-challenge-2.png',
        alt: 'Original bridge data example 2',
        caption: 'Additional bridge records from the source system.'
      },
      {
        src: 'assets/images/bridge-challenge-3.png',
        alt: 'Original bridge data example 3',
        caption:
          'Bridge condition information before dashboard development.'
      },
      {
        src: 'assets/images/bridge-challenge-4.png',
        alt: 'Original bridge data example 4',
        caption:
          'Complex data that users needed to interpret.'
      }
    ],

    solution: [
      {
        src: 'assets/images/bridge-solution-1.png',
        alt: 'Bridge dashboard learning resource',
        caption: 'Here is where I first started learning.'
      },
      {
        src: 'assets/images/bridge-solution-2.png',
        alt: 'Bridge dashboard design inspiration',
        caption:
          'Much of my early help and design inspiration came from this resource.'
      },
      {
        src: 'assets/images/bridge-solution-3.png',
        alt: 'Icons used during dashboard development',
        caption:
          'Icons were sourced here or created in Adobe Photoshop and Canva.'
      },
      {
        src:
          'https://www.spguides.com/wp-content/uploads/2024/02/Change-Data-Type-in-Power-BI.jpg',
        alt: 'Power BI data transformation example',
        caption:
          'This represents the data-transformation stage, including cleaning, sorting, and formatting.'
      }
    ]
  },

  'amp-dashboard': {
    challenge: [
      {
        src: 'assets/images/amp-challenge-1.png',
        alt: 'Original AMP data and reporting example',
        caption: 'The original AMP data and reporting process.'
      },
      {
        src: 'assets/images/amp-challenge-2.png',
        alt: 'Additional AMP reporting example',
        caption:
          'The existing AMP reporting structure before dashboard development.'
      }
    ],

    solution: [
      {
        src: 'assets/images/amp-solution-1.png',
        alt: 'AMP Dashboard solution example 1',
        caption: 'The overall AMP Dashboard reporting view.'
      },
      {
        src: 'assets/images/amp-solution-2.png',
        alt: 'AMP Dashboard solution example 2',
        caption:
          'Interactive navigation between reporting sections.'
      },
      {
        src: 'assets/images/amp-solution-3.png',
        alt: 'AMP Dashboard solution example 3',
        caption:
          'Filters help users focus on specific districts and reporting areas.'
      },
      {
        src: 'assets/images/amp-solution-4.png',
        alt: 'AMP Dashboard solution example 4',
        caption:
          'Visual summaries make AMP results easier to understand.'
      }
    ]
  },

  'ecnl-scheduling-engine': {
    challenge: [
      {
        src: 'https://media1.tenor.com/images/150a384449082125a8bffbd805b9b856/tenor.gif?itemid=5499082',
        alt: 'Original ECNL manual scheduling process',
        caption: 'Me on the phone listening to this opportunity and knowing it CAN be done.'
      }
    ],

    solution: [
      {
        src: 'assets/images/ecnl-solution-1.png',
        alt: 'ECNL tournament analytics dashboard',
        caption:
          "The new ECNL dashboard tailored to their organization."
      }
    ]
  },

  'tp-d-tracker': {
    challenge: [
      {
        src: 'assets/images/tp-d-challenge-1.png',
        alt: 'Original TP-D tracking process',
        caption:
          'The original assignment and project-tracking process.'
      }
    ],

    solution: [
      {
        src: 'assets/images/tp-d-solution-1.png',
        alt: 'TP-D Tracker solution',
        caption:
          'Centralized tracking, filtering, and workflow visibility.'
      }
    ]
  }
};

// =========================================================
// REUSABLE CAROUSEL FUNCTION
// =========================================================

function initializeCarousel({
  images,
  imageElement,
  captionElement,
  counterElement,
  previousButton,
  nextButton
}) {
  if (
    !imageElement ||
    !captionElement ||
    !counterElement ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  if (!Array.isArray(images) || images.length === 0) {
    previousButton.classList.add('hidden');
    nextButton.classList.add('hidden');
    counterElement.textContent = '0 / 0';

    return;
  }

  let currentImageIndex = 0;

  function updateCarousel() {
    const selectedImage = images[currentImageIndex];

    imageElement.src = selectedImage.src;
    imageElement.alt = selectedImage.alt;
    captionElement.textContent = selectedImage.caption;

    counterElement.textContent =
      `${currentImageIndex + 1} / ${images.length}`;
  }

  const hasMultipleImages = images.length > 1;

  previousButton.classList.toggle(
    'hidden',
    !hasMultipleImages
  );

  nextButton.classList.toggle(
    'hidden',
    !hasMultipleImages
  );

  previousButton.addEventListener('click', () => {
    currentImageIndex =
      (currentImageIndex - 1 + images.length) %
      images.length;

    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentImageIndex =
      (currentImageIndex + 1) %
      images.length;

    updateCarousel();
  });

  updateCarousel();
}


// =========================================================
// CHALLENGE IMAGE CAROUSEL
// =========================================================

const pageImageData =
  caseStudyImages[currentPage] || {
    challenge: [],
    solution: []
  };

initializeCarousel({
  images: pageImageData.challenge,

  imageElement: document.getElementById(
    'challenge-carousel-image'
  ),

  captionElement: document.getElementById(
    'challenge-carousel-caption'
  ),

  counterElement: document.getElementById(
    'challenge-carousel-counter'
  ),

  previousButton: document.getElementById(
    'challenge-prev-button'
  ),

  nextButton: document.getElementById(
    'challenge-next-button'
  )
});


// =========================================================
// SOLUTION IMAGE CAROUSEL
// =========================================================

initializeCarousel({
  images: pageImageData.solution,

  imageElement: document.getElementById(
    'solution-carousel-image'
  ),

  captionElement: document.getElementById(
    'solution-carousel-caption'
  ),

  counterElement: document.getElementById(
    'solution-carousel-counter'
  ),

  previousButton: document.getElementById(
    'solution-prev-button'
  ),

  nextButton: document.getElementById(
    'solution-next-button'
  )
});

// =========================================================
// HEADER QUICK LINKS ON SCROLL
// =========================================================

const headerQuickLinks = document.getElementById(
  'header-quick-links'
);

if (headerQuickLinks) {
  const showQuickLinksAfter = 400;

  function updateHeaderQuickLinks() {
    const shouldShow =
      window.scrollY > showQuickLinksAfter;

    headerQuickLinks.style.opacity =
      shouldShow ? '1' : '0';

    headerQuickLinks.style.transform =
      shouldShow
        ? 'translateY(0)'
        : 'translateY(8px)';

    headerQuickLinks.style.pointerEvents =
      shouldShow ? 'auto' : 'none';

    headerQuickLinks.setAttribute(
      'aria-hidden',
      String(!shouldShow)
    );
  }

  window.addEventListener(
    'scroll',
    updateHeaderQuickLinks,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateHeaderQuickLinks
  );

  updateHeaderQuickLinks();
}