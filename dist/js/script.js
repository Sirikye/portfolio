
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener('click', (e) => {
    if ((e.target.classList.contains("tab-item")) && (!e.target.classList.contains(".active"))) {
      const target = e.target.getAttribute("data-target");
      //deactivate existing active 'tab-item
      tabsContainer.querySelector('.active').classList.remove('outer-shadow', 'active')
      //Activate the new 'tab-item'
      e.target.classList.add("active", "outer-shadow")

      //Deactivate existing 'tab-content'

      aboutSection.querySelector(".tab-content.active").classList.remove('active');

      //Activate new 'tab-content'
      aboutSection.querySelector(target).classList.add('active')
    }
  })
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

(() => {
  const filterContainer = document.querySelector(".portfolio-filter");
  const portfolioItemsContainer = document.querySelector(".portfolio-items");
  const portfolioItems = document.querySelectorAll(".portfolio-item")
  const popup = document.querySelector(".portfolio-popup")
  const nextBtn = popup.querySelector(".pp-next")
  const prevBtn = popup.querySelector(".pp-prev")
  const closeBtn = popup.querySelector(".pp-close")
  const projectDetailsContainer = document.querySelector(".pp-details")
  const projectDetailsBtn = document.querySelector(".pp-project-details-btn")

  const names = ["alema", "julius", "anzua", "mike"]



  let itemIdex, screenShots, slideIndex;

  /** filter portfolio items */

  filterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-item") && !e.target.classList.contains("active")) {
      //deactivate existing active filter-item
      filterContainer.querySelector(".active").classList.remove("outer-shadow", "active")

      //activate new filter item
      e.target.classList.add("active", "outer-shadow");
      const target = e.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide")
          item.classList.add("show")
        } else {
          item.classList.remove("show")
          item.classList.add("hide")
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portifolioItem = event.target.closest(".portfolio-item-inner").parentElement;
      //get the portfolio item index
      itemIdex = Array.from(portifolioItem.parentElement.children).indexOf(portifolioItem)
      screenShots = portfolioItems[itemIdex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
      screenShots = screenShots.split(",");
      if (screenShots.length === 1) {
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
        prevBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle()
      popupSlideShow()
      popupDetails();
    }
  })

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle()
    }
  });
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle()
  }

  function popupSlideShow() {
    const imgSrc = screenShots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    //Activate loader until the popupImg is loaded

    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;

    popupImg.onload = () => {
      //deactivate loader after the image loads
      popup.querySelector(".pp-loader").classList.remove("active");
    }

    popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenShots.length;
  }

  //next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenShots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideShow();
  })

  //prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenShots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideShow();
  })

  //popup details
  function popupDetails() {

    if (!portfolioItems[itemIdex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }

    projectDetailsBtn.style.display = "block";
    const details = portfolioItems[itemIdex].querySelector(".portfolio-item-details").innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = portfolioItems[itemIdex].querySelector(".portfolio-item-title").innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;

    const category = portfolioItems[itemIdex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category;
  }


  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus")
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus")
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";

      popup.scrollTo(0, projectDetailsContainer.offsetTop);

    }
  }

})();