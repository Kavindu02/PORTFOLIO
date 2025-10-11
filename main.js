(function() {
  "use strict";

  /**
   * Header toggle
   */
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');

  const headerToggle = () => {
    header?.classList.toggle('header-show');
    headerToggleBtn?.classList.toggle('bi-list');
    headerToggleBtn?.classList.toggle('bi-x');
  };

  headerToggleBtn?.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (header?.classList.contains('header-show')) headerToggle();
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', e => {
      e.preventDefault();
      const parent = dropdown.parentNode;
      parent.classList.toggle('active');
      parent.nextElementSibling?.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  window.addEventListener('load', () => preloader?.remove());

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  const toggleScrollTop = () => {
    scrollTop?.classList.toggle('active', window.scrollY > 100);
  };

  scrollTop?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll (AOS) init
   */
  const aosInit = () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  };
  window.addEventListener('load', aosInit);

  /**
   * Typed.js
   */
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    const typedStrings = typedEl.getAttribute('data-typed-items')?.split(',') ?? [];
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Pure Counter
   */
  new PureCounter();

  /**
   * Skills animation
   */
  const skillCircles = document.querySelectorAll('.skill-circle');
let skillsAnimated = false;

const animateCircularSkills = () => {
  if (skillsAnimated) return;
  skillCircles.forEach(circle => {
    const value = circle.getAttribute('data-skill');
    const stroke = circle.querySelectorAll('circle')[1];
    const info = circle.querySelector('span');
    const offset = 339.292 - (339.292 * value) / 100;

    stroke.style.strokeDashoffset = offset;
let count = 0;
const interval = setInterval(() => {
  if (count >= value) {  
    info.textContent = value + '%';
    clearInterval(interval);
  } else {
    info.textContent = count + '%';
    count++;
  }
}, 15);

  });
  skillsAnimated = true;
};


document.querySelectorAll('.skill-circle').forEach(circle => {
  const progress = circle.querySelector('.progress');
  const number = circle.querySelector('span');
  const skillValue = circle.dataset.skill;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  // animate stroke-dashoffset
  setTimeout(() => {
    const offset = circumference - (skillValue / 100) * circumference;
    progress.style.strokeDashoffset = offset;
  }, 200);

  // animate number count
  let current = 0;
  const interval = setInterval(() => {
    if (current < skillValue) {
      current++;
      number.textContent = current + '%';
    } else {
      clearInterval(interval);
    }
  }, 15);
});


window.addEventListener('scroll', () => {
  const section = document.querySelector('#skills');
  const sectionTop = section.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionTop < screenPos) {
    animateCircularSkills();
  }
});

  /**
   * GLightbox init
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        filterBtn.classList.add('filter-active');
        initIsotope.arrange({ filter: filterBtn.getAttribute('data-filter') });
        aosInit();
      });
    });
  });

  /**
   * Swiper sliders
   */
  const initSwiper = () => {
    document.querySelectorAll(".init-swiper").forEach(swiperEl => {
      const configEl = swiperEl.querySelector(".swiper-config");
      if (!configEl) return;
      const config = JSON.parse(configEl.innerHTML.trim());

      if (swiperEl.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperEl, config);
      } else {
        new Swiper(swiperEl, config);
      }
    });
  };
  window.addEventListener('load', initSwiper);

  /**
   * Correct scroll on page load with hash
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
          window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  const navLinks = document.querySelectorAll('.navmenu a');
  const navmenuScrollspy = () => {
    const position = window.scrollY + 200;
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
