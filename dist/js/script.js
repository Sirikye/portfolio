
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