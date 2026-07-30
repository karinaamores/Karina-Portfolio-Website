// ---------------------------------------------
// LUCIDE ICONS
// ---------------------------------------------

if (window.lucide) {
  lucide.createIcons();
}


// ---------------------------------------------
// EXPERIENCE TIMELINE EXPAND / COLLAPSE
// ---------------------------------------------

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


// ---------------------------------------------
// REVEAL ANIMATIONS
// ---------------------------------------------

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


// ---------------------------------------------
// SMOOTH SCROLL FOR INTERNAL LINKS
// ---------------------------------------------

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


// ---------------------------------------------
// SIDE NAVIGATION SCROLL HIGHLIGHT
// ---------------------------------------------

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
/* =========================================================
   BRIDGE CHALLENGE IMAGE CAROUSEL
========================================================= */

const challengeCarouselImage = document.getElementById(
    "challenge-carousel-image"
);

const challengeCarouselCaption = document.getElementById(
    "challenge-carousel-caption"
);

const challengeCarouselCounter = document.getElementById(
    "challenge-carousel-counter"
);

const challengePreviousButton = document.getElementById(
    "challenge-prev-button"
);

const challengeNextButton = document.getElementById(
    "challenge-next-button"
);

if (
    challengeCarouselImage &&
    challengeCarouselCaption &&
    challengeCarouselCounter &&
    challengePreviousButton &&
    challengeNextButton
) {
    const challengeImages = [
        {
            src: "assets/images/bridge-challenge-1.png",
            alt: "Original bridge data example 1",
            caption: "Where the data is stored."
        },
        {
            src: "assets/images/bridge-challenge-2.png",
            alt: "Original bridge data example 2",
            caption: "The main menu page of data and where I went to get the specific data."
        },
        {
            src: "assets/images/bridge-challenge-3.png",
            alt: "Original bridge data example 3",
            caption: "Bridge condition information before dashboard development."
        },
        {
            src: "assets/images/bridge-challenge-4.png",
            alt: "Original bridge data example 4",
            caption: "Another example of the complex data public users needed to interpret. "
        }
    ];

    let currentChallengeImage = 0;

    function updateChallengeCarousel() {
        const selectedImage =
            challengeImages[currentChallengeImage];

        challengeCarouselImage.src = selectedImage.src;
        challengeCarouselImage.alt = selectedImage.alt;
        challengeCarouselCaption.textContent =
            selectedImage.caption;

        challengeCarouselCounter.textContent =
            `${currentChallengeImage + 1} / ${challengeImages.length}`;
    }

    challengePreviousButton.addEventListener("click", () => {
        currentChallengeImage =
            (currentChallengeImage - 1 + challengeImages.length) %
            challengeImages.length;

        updateChallengeCarousel();
    });

    challengeNextButton.addEventListener("click", () => {
        currentChallengeImage =
            (currentChallengeImage + 1) %
            challengeImages.length;

        updateChallengeCarousel();
    });

    updateChallengeCarousel();
}
/* =========================================================
    BRIDGE SOLUTION IMAGE CAROUSEL
========================================================= */

const solutionCarouselImage = document.getElementById(
    "solution-carousel-image"
);

const solutionCarouselCaption = document.getElementById(
    "solution-carousel-caption"
);

const solutionCarouselCounter = document.getElementById(
    "solution-carousel-counter"
);

const solutionPreviousButton = document.getElementById(
    "solution-prev-button"
);

const solutionNextButton = document.getElementById(
    "solution-next-button"
);

if (
    solutionCarouselImage &&
    solutionCarouselCaption &&
    solutionCarouselCounter &&
    solutionPreviousButton &&
    solutionNextButton
) {
    const solutionImages = [
        {
            src: "assets/images/bridge-solution-1.png",
            alt: "Bridge dashboard solution example 1",
            caption: "Here is where I first started learning."
        },
        {
            src: "assets/images/bridge-solution-2.png",
            alt: "Bridge dashboard solution example 2",
            caption: "Then much of my help and ideas came from this guy. Much respect."
        },
        {
            src: "assets/images/bridge-solution-3.png",
            alt: "Bridge dashboard solution example 3",
            caption: "Example of where I would get my icons, or I would just make them in Adobe photoshop/Canva."
        },
        {
            src: "https://www.spguides.com/wp-content/uploads/2024/02/Change-Data-Type-in-Power-BI.jpg",
            alt: "Bridge dashboard solution example 4",
            caption: "Where the transformation of data happend. A lot of cleaning, a lot of sorting."
        }
    ];

    let currentSolutionImage = 0;

    function updateSolutionCarousel() {
        const selectedImage =
            solutionImages[currentSolutionImage];

        solutionCarouselImage.src = selectedImage.src;
        solutionCarouselImage.alt = selectedImage.alt;
        solutionCarouselCaption.textContent =
            selectedImage.caption;

        solutionCarouselCounter.textContent =
            `${currentSolutionImage + 1} / ${solutionImages.length}`;
    }

    solutionPreviousButton.addEventListener("click", () => {
        currentSolutionImage =
            (currentSolutionImage - 1 + solutionImages.length) %
            solutionImages.length;

        updateSolutionCarousel();
    });

    solutionNextButton.addEventListener("click", () => {
        currentSolutionImage =
            (currentSolutionImage + 1) %
            solutionImages.length;

        updateSolutionCarousel();
    });

    updateSolutionCarousel();
}