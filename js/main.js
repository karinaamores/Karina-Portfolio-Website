lucide.createIcons();
const resumeView = document.getElementById('resume-view');
const workView = document.getElementById('work-view');
const caseStudyView = document.getElementById('case-study-view');
const resumeNav = document.getElementById('resume-nav');
const headerBackButton = document.getElementById('header-back-button');
const viewWorkButton = document.getElementById('view-work-button');
const workCtaButton = document.getElementById('work-cta-button');
const caseStudyBackButton = document.getElementById('case-study-back-button');
// Map card IDs to case study data
const caseStudyData =  {
  1: 'bridge-dashboard',
  2: 'asset-dashboard',
  3: 'performance-tracker',
  4: 'scheduling-engine',
  5: 'arcgis-integration'
}
;
function showWorkView()  {
  resumeView.classList.add('view-hidden');
  workView.classList.remove('view-hidden');
  caseStudyView.classList.add('view-hidden');
  resumeNav.classList.add('hidden');
  headerBackButton.classList.remove('hidden');
  headerBackButton.classList.add('inline-flex');
  window.scrollTo( {
    top: 0, behavior: 'smooth'
  }
  );
}
function showResumeView(targetId)  {
  workView.classList.add('view-hidden');
  caseStudyView.classList.add('view-hidden');
  resumeView.classList.remove('view-hidden');
  resumeNav.classList.remove('hidden');
  headerBackButton.classList.add('hidden');
  headerBackButton.classList.remove('inline-flex');
  if (targetId)  {
    requestAnimationFrame(() =>  {
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView( {
        behavior: 'smooth', block: 'start'
      }
      );
    }
    );
  } else  {
    window.scrollTo( {
      top: 0, behavior: 'smooth'
    }
    );
  }
}
function showCaseStudyView(cardNumber)  {
  resumeView.classList.add('view-hidden');
  workView.classList.add('view-hidden');
  caseStudyView.classList.remove('view-hidden');
  resumeNav.classList.add('hidden');
  headerBackButton.classList.remove('hidden');
  headerBackButton.classList.add('inline-flex');
  window.scrollTo( {
    top: 0, behavior: 'smooth'
  }
  );
}
// Add click handlers to work cards
for (let i = 1; i <= 5; i++)  {
  const button = document.getElementById(`work-card-button-${i}`);
  if (button)  {
    button.addEventListener('click', () => showCaseStudyView(i));
  }
}
viewWorkButton.addEventListener('click', showWorkView);
headerBackButton.addEventListener('click', showWorkView);
workCtaButton.addEventListener('click', () => showResumeView());
caseStudyBackButton.addEventListener('click', showWorkView);
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