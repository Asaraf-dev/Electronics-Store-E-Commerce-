/*--- About Hero Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){const hero=document.querySelector(".abt-hero");if(!hero)return;const banner=hero.querySelector(".abt-hero-banner");if(banner)banner.addEventListener("mouseenter",function(){banner.classList.add("active");});if(banner)banner.addEventListener("mouseleave",function(){banner.classList.remove("active");});});
/*--- About Hero Section End ---*/

/*--- About Features Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){const featureCards=document.querySelectorAll(".abt-feature-image-card,.abt-feature-info-card,.abt-feature-benefit");if(!featureCards.length)return;featureCards.forEach(function(card){card.addEventListener("mouseenter",function(){card.classList.add("active");});card.addEventListener("mouseleave",function(){card.classList.remove("active");});});});
/*--- About Features Section End ---*/

/*--- About Company Timeline & Leadership Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){const members=document.querySelectorAll(".abt-history-member");if(!members.length)return;members.forEach(function(member){member.addEventListener("mouseenter",function(){member.classList.add("active");});member.addEventListener("mouseleave",function(){member.classList.remove("active");});});});
/*--- About Company Timeline & Leadership Section End ---*/

/*--- About Mission And Vision Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){const section=document.querySelector(".abt-mission");if(!section)return;const notice=section.querySelector(".abt-mission-notice");if(notice){notice.addEventListener("click",function(event){const link=event.target.closest("a");if(link)return;notice.classList.toggle("active");});}});
/*--- About Mission And Vision Section End ---*/

/*--- Popular Brands Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){const cards=document.querySelectorAll(".es-ind-popular-brands-card");const hero=document.querySelector(".es-ind-popular-brands-hero");if(hero){hero.addEventListener("mouseenter",function(){hero.classList.add("active");});hero.addEventListener("mouseleave",function(){hero.classList.remove("active");});}cards.forEach(function(card){card.addEventListener("mouseenter",function(){card.classList.add("active");});card.addEventListener("mouseleave",function(){card.classList.remove("active");});});});
/*--- Popular Brands Section End ---*/


/* ==========================================
   ABOUT PAGE REVEAL ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".es-reveal, .es-reveal-left, .es-reveal-right, .es-reveal-scale, .es-reveal-stagger"
  );

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("es-reveal-active");

          // Run animation only once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});