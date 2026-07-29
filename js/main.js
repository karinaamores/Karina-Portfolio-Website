lucide.createIcons();
const resumeView = document.getElementById('resume-view');
const workView = document.getElementById('work-view');
const resumeNav = document.getElementById('resume-nav');
const headerBackButton = document.getElementById('header-back-button');
const viewWorkButton = document.getElementById('view-work-button');
const workCtaButton = document.getElementById('work-cta-button');
const brandName = document.getElementById("brand-name");

function showWorkView()  {
  resumeView.classList.add('view-hidden');
  workView.classList.remove('view-hidden');
  resumeNav.style.display = 'none';
  headerBackButton.classList.remove('hidden');
  headerBackButton.classList.add('inline-flex');
  brandName.textContent = "Portfolio";
  window.scrollTo( {
    top: 0, 
    behavior: 'smooth'
  });
}
function showResumeView(targetId) {
  workView.classList.add('view-hidden');
  resumeView.classList.remove('view-hidden');
  resumeNav.style.display = '';
  headerBackButton.classList.add('hidden');
  headerBackButton.classList.remove('inline-flex');
  brandName.textContent = 'Karina Esquivel';

  if (targetId) {
    requestAnimationFrame(() => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

if (viewWorkButton) {
  viewWorkButton.addEventListener('click', showWorkView);
}

if (headerBackButton) {
  headerBackButton.addEventListener('click', () => {
    showResumeView('overview');
  });
}

if (workCtaButton) {
  workCtaButton.addEventListener('click', () => {
    showResumeView();
  });
}
const timelineExpandButton = document.getElementById('timeline-expand-button');
const timelineExpandedJobs = document.getElementById('timeline-expanded-jobs');
if (timelineExpandButton)  {
  timelineExpandButton.addEventListener('click', () =>  {
    const isHidden = timelineExpandedJobs.classList.contains('hidden');
    const buttonLabel = timelineExpandButton.querySelector('[data-template-id="timeline-expand-label"]');
    if (isHidden)  {
      timelineExpandedJobs.classList.remove('hidden');
      if (buttonLabel) buttonLabel.textContent = 'Show Less';
    } else  {
      timelineExpandedJobs.classList.add('hidden');
      if (buttonLabel) buttonLabel.textContent = 'More Experience';
    }
  }
  );
}
const observer = new IntersectionObserver((entries) =>  {
  entries.forEach(entry =>  {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
  );
}
,  {
  threshold: 0.12
}
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(link =>  {
  link.addEventListener('click', (e) =>  {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    showResumeView(targetId);
  }
  );
}
);
// ---------------------------------------------
// SIDE NAVIGATION SCROLL HIGHLIGHT
// ---------------------------------------------

const sideNavLinks = document.querySelectorAll(
  ".nav-link[data-section]"
);

const trackedSections = Array.from(sideNavLinks)
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

function updateActiveSideNavigation() {
  if (!trackedSections.length) return;

  // Position below the sticky header where a section becomes active
  const activationPoint = 200;

  let currentSectionId = trackedSections[0].id;

  trackedSections.forEach((section) => {
    const sectionTop =
      section.getBoundingClientRect().top;

    if (sectionTop <= activationPoint) {
      currentSectionId = section.id;
    }
  });

  // Ensure the final section activates near the bottom of the page
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 50;

  if (nearBottom) {
    currentSectionId =
      trackedSections[trackedSections.length - 1].id;
  }

  sideNavLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.dataset.section === currentSectionId
    );
  });
}

window.addEventListener(
  "scroll",
  updateActiveSideNavigation,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateActiveSideNavigation
);

// Run once when the script loads
updateActiveSideNavigation();