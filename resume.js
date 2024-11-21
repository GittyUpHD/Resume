// resume.js

$(document).ready(function () {
  // Initialize - hide all job descriptions and skill lists initially
  $(".job-description").hide();
  $(".skill-category ul").hide();

  // Set initial state for all sections
  $(".section-content").css({
    position: "relative",
    left: "-200px",
    opacity: "0",
  });

  // Function to check and animate sections
  function checkAndAnimateSections() {
    $(".section-content").each(function () {
      var $section = $(this);
      if (!$section.hasClass("animated") && isElementInViewport(this)) {
        $section.addClass("animated").stop(true).animate(
          {
            left: "0",
            opacity: 1,
          },
          {
            duration: 400, // Reduced from 1000 to 400ms
            easing: "easeOutCubic",
          }
        );
      }
    });
  }

  // Add jQuery easing function for smoother animation
  jQuery.easing.easeOutCubic = function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  };

  // Bind scroll event with requestAnimationFrame for smoother performance
  var ticking = false;
  $(window).on("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        checkAndAnimateSections();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Simple skills hover effect
  $(".skill-category").hover(
    function () {
      $(this).find("ul").fadeIn(400);
    },
    function () {
      $(this).find("ul").fadeOut(200);
    }
  );

  // Toggle job descriptions
  $(".job-title").click(function () {
    $(this).siblings(".job-description").slideToggle(600);
  });

  // Smooth scroll for navigation
  $('a[href^="#"]').click(function (event) {
    event.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 46,
        },
        1000
      );
    }
  });

  // Keep track of active section
  function updateActiveNavigation() {
    var scrollPosition = $(window).scrollTop() + 100;
    $(".section-content").each(function () {
      var currentSection = $(this);
      var sectionTop = currentSection.offset().top;
      var sectionBottom = sectionTop + currentSection.height();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        var id = currentSection.attr("id");
        $(".w3-bar-item").removeClass("w3-text-blue");
        $('a[href="#' + id + '"]').addClass("w3-text-blue");
      }
    });
  }

  $(window).scroll(updateActiveNavigation);

  // Initial setup
  checkAndAnimateSections();
  updateActiveNavigation();
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = $(window).height();
  var threshold = 50;

  return rect.top >= -rect.height && rect.top <= windowHeight - threshold;
}
