// resume.js

$(document).ready(function () {
  // Set initial state for all sections
  $(".section-content").css({
    position: "relative",
    left: "-200px",
    opacity: "0",
  });

  // Set initial state for job entries
  $(".job-entry").each(function () {
    $(this).find(".job-description").css({
      opacity: "0",
      maxHeight: "0",
      overflow: "hidden",
      transition: "all 0.6s ease-in-out",
    });
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
            duration: 400,
            easing: "easeOutCubic",
          }
        );
      }
    });

    // Check and animate job entries
    $(".job-entry").each(function () {
      if (isElementInCenter(this) && !$(this).hasClass("expanded")) {
        $(this).addClass("expanded");
        $(this).find(".job-description").css({
          opacity: "1",
          maxHeight: "1000px",
        });
      } else if (!isElementInCenter(this) && $(this).hasClass("expanded")) {
        $(this).removeClass("expanded");
        $(this).find(".job-description").css({
          opacity: "0",
          maxHeight: "0",
        });
      }
    });

    // Add this new section for skill categories
    $(".skill-category").each(function () {
      if (isElementInCenter(this) && !$(this).hasClass("expanded")) {
        $(this).addClass("expanded");
      } else if (!isElementInCenter(this) && $(this).hasClass("expanded")) {
        $(this).removeClass("expanded");
      }
    });
  }

  // Helper function to check if element is in the center of viewport
  function isElementInCenter(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = $(window).height();
    var elementCenter = rect.top + rect.height / 2;
    var viewportCenter = windowHeight / 2;

    // Consider element "in center" if it's within 150px of viewport center
    return Math.abs(elementCenter - viewportCenter) < 150;
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

  // Mobile menu functionality
  $(document).on("click", function (event) {
    var menu = $(".w3-bar");
    var button = $(".mobile-menu-button");
    if (
      !menu.is(event.target) &&
      !button.is(event.target) &&
      menu.has(event.target).length === 0
    ) {
      menu.removeClass("responsive");
    }
  });

  $(".w3-bar-item").on("click", function () {
    $(".w3-bar").removeClass("responsive");
  });

  // Handle education section animations
  $(".education-entry").each(function (index) {
    var $entry = $(this);
    setTimeout(function () {
      $entry.addClass("animated");
    }, index * 200);
  });

  // Bind scroll event for navigation updates
  $(window).scroll(updateActiveNavigation);

  // Initial setup calls
  checkAndAnimateSections();
  updateActiveNavigation();

  // Trigger a scroll event on page load
  $(window).trigger("scroll");
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = $(window).height();
  var threshold = 50;

  return rect.top >= -rect.height && rect.top <= windowHeight - threshold;
}

// Mobile menu toggle function
function toggleMobileMenu() {
  var x = document.querySelector(".w3-bar");
  if (x.className.indexOf("responsive") == -1) {
    x.className += " responsive";
  } else {
    x.className = x.className.replace(" responsive", "");
  }
}
