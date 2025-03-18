(function () {
  "use strict";

  /**************************************
   ***** 01. Header Fixed
   **************************************/
  $(window).on("scroll", function () {
    if ($("header").hasClass("sticky-on")) {
      var stickyPlaceHolder = $("#sticky-placeholder"),
        menu = $("#navbar-wrap"),
        menuH = menu.outerHeight(),
        topbarH = $("#topbar-wrap").outerHeight() || 0,
        targrtScroll = topbarH,
        header = $("header");
      if ($(window).scrollTop() > targrtScroll) {
        header.addClass("sticky").removeClass("smooth-scroll");
        stickyPlaceHolder.height(menuH);
      } else {
        header.removeClass("sticky").addClass("smooth-scroll");
        stickyPlaceHolder.height(0);
      }
    }
  });

  /**************************************
   ***** 02. Custom Data Background
   **************************************/
  $("[data-bg-image]").each(function () {
    const img = $(this).data("bg-image");
    $(this).css({
      backgroundImage: `url(${img})`,
    });
  });

  /**************************************
   ***** 03. Custom Data Background
   **************************************/

  const themeSwitch = document.getElementById("theme-switch");
  if (themeSwitch) {
    const body = document.body;

    // Check if the element with id 'my-theme' exists
    const myThemeElement = document.getElementById("theme-options");
    if (myThemeElement) {
      const currentTheme = localStorage.getItem("theme") || "light";
      body.setAttribute("data-bp-theme", currentTheme);
      updateStylesForTheme(currentTheme);

      // If 'my-theme' exists, display the theme-switch
      themeSwitch.style.display = "block";
    } else {
      // If 'my-theme' doesn't exist, hide the theme-switch
      themeSwitch.style.display = "none";
    }

    themeSwitch.addEventListener("click", toggleTheme);

    function toggleTheme() {
      const newTheme =
        body.getAttribute("data-bp-theme") === "light" ? "dark" : "light";
      body.setAttribute("data-bp-theme", newTheme);
      updateStylesForTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }

    function updateStylesForTheme(theme) {
      if (theme === "light") {
        body.classList.add("theme--light");
        body.classList.remove("theme--dark");
        // change the image srouce
      } else {
        body.classList.remove("theme--light");
        body.classList.add("theme--dark");
        // change the image srouce
      }
    }
  }

  /**************************************
   ***** 04. Custom Mobile Menu
  //  **************************************/
  (function () {
    const $hamburgerIcon = $(".hamburger-icon");
    const $bodyTag = $("body");
    const $mobileOverlay = $(".mobile-overlay");

    // Hamburger Toggle Button Add
    $hamburgerIcon.on("click", function () {
      $bodyTag.addClass("mobile-overlay--visible");
    });

    // Hamburger Toggle Button Remove
    $(".mobile-overlay--backdrop, .mobile-overlay__close").on(
      "click",
      function () {
        $bodyTag.removeClass("mobile-overlay--visible");
      }
    );

    // Mobile Menu Copy From Main Menu
    let mobileMenuContentCopy = $(".header__menu").html();
    $(".mobile-overlay .mobile-overlay__main-menu").append(
      mobileMenuContentCopy
    );
    $(".mobile-overlay ul.main-menu__sub-menu li.main-menu__child").addClass(
      "has-active"
    );
    $(".mobile-overlay ul.main-menu__sub-menu ul.main-menu__sub-menu").addClass(
      "main-menu__sub-menu2"
    );
    $(
      ".mobile-overlay ul.main-menu__sub-menu ul.main-menu__sub-menu"
    ).removeClass("main-menu__sub-menu");

    // Function to handle mobile menu dropdown toggle
    function handleMobileMenuDropdown(
      $overlay,
      dropdownBtnClass,
      submenuClass
    ) {
      const $dropdownBtns = $overlay.find(`.${dropdownBtnClass}`);

      $dropdownBtns.on("click", function () {
        const $clickedDropdownBtn = $(this);
        const $subMenu = $clickedDropdownBtn.prev(`.${submenuClass}`);
        const $mainMenuChild = $clickedDropdownBtn.closest(`.main-menu__child`);

        const $mainMenuChildActive = $clickedDropdownBtn.closest(`.has-active`);

        const isSubMenuOpen = $subMenu.is(":visible");

        $dropdownBtns.removeClass("open");
        $mainMenuChildActive.removeClass("active");
        $mainMenuChild.removeClass("active");

        if (!isSubMenuOpen) {
          $clickedDropdownBtn.addClass("open");
          $mainMenuChildActive.addClass("active");
          $mainMenuChild.addClass("active");
        }

        $overlay.find(`.${submenuClass}:visible`).not($subMenu).slideUp(300);
        $subMenu.slideToggle(300);
      });
    }

    // Mobile Menu Dropdown Toggle for Level 1
    const $submenuItems = $(
      ".main-menu ul.main-menu__list > li.main-menu__child:not(:has(.main-menu__dropdown-btn))"
    );
    $submenuItems.append(
      '<div class="main-menu__dropdown-btn"><span class="plus-line"></span></div>'
    );
    handleMobileMenuDropdown(
      $(".mobile-overlay"),
      "main-menu__dropdown-btn",
      "main-menu__sub-menu"
    );

    // Mobile Menu Dropdown Toggle for Level 2
    const $menuLevel2 = $(
      ".main-menu ul.main-menu__sub-menu > li.main-menu__child:not(:has(.main-menu__dropdown-btn))"
    );
    $menuLevel2.append(
      '<div class="main-menu__dropdown-btn main-menu__dropdown-btn2"><span class="plus-line"></span></div>'
    );
    handleMobileMenuDropdown(
      $(".mobile-overlay"),
      "main-menu__dropdown-btn2",
      "main-menu__sub-menu2"
    );
  })();

  /**************************************
   ***** 06. Instagram Slider
   **************************************/
  $("#bp-slider-style-1").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    let swiper = new Swiper(bpSliderStyle, {
      slidesPerView: "auto",
      centeredSlides: false,
      loop: true,
      spaceBetween: 24,
      slideToClickedSlide: true,
      grabCursor: true,
      a11y: true,
      freeMode: true,
      speed: 14000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        stopOnLastSlide: false,
        waitForTransition: true,
        stopOnLast: true,
        reverseDirection: true,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 2.8,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3.5,
        },
        1200: {
          slidesPerView: 7.2,
        },
      },
    });
    swiper.on("slideChange", function () {
      if (swiper.isEnd) {
        swiper.autoplay = false;
      }
    });
  });

  /**************************************
   ***** 07. Instagram Slider
   **************************************/
  $("#bp-slider-style-2").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    let swiper = new Swiper(bpSliderStyle, {
      slidesPerView: "auto",
      centeredSlides: false,
      loop: true,
      spaceBetween: 24,
      slideToClickedSlide: false,
      grabCursor: true,
      a11y: false,
      freeMode: true,
      speed: 15000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        stopOnLastSlide: false,
        waitForTransition: true,
        stopOnLast: true,
        reverseDirection: true,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 2.8,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3.5,
        },
        1200: {
          slidesPerView: 7.2,
        },
      },
    });
    swiper.on("slideChange", function () {
      if (swiper.isEnd) {
        swiper.autoplay = false;
      }
    });
  });

  /**************************************
   ***** 08. Testimonial Slider
   **************************************/
  $(".testimonial-active").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    new Swiper(bpSliderStyle, {
      slidesPerView: "auto",
      centerMode: false,
      centeredSlides: false,
      loop: true,
      spaceBetween: 30,
      freeMode: false,
      slideToClickedSlide: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: false,
      speed: 800,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
        1900: {
          slidesPerView: 3,
        },
      },
    });
  });

  /**************************************
   ***** 09. Testimonial Slider
   **************************************/
  $(".sponsor-active").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    new Swiper(bpSliderStyle, {
      slidesPerView: 1,
      centerMode: false,
      centeredSlides: false,
      loop: false,
      spaceBetween: 30,
      freeMode: false,
      slideToClickedSlide: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: false,
      speed: 800,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1900: {
          slidesPerView: 5,
        },
      },
    });
  });

  /**************************************
   ***** 10. Testimonial Slider
   **************************************/
  $(".sponsor-active--about").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    new Swiper(bpSliderStyle, {
      slidesPerView: 5,
      centerMode: false,
      centeredSlides: false,
      loop: false,
      spaceBetween: 30,
      freeMode: false,
      slideToClickedSlide: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: false,
      speed: 800,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 5,
        },
        1900: {
          slidesPerView: 5,
        },
      },
    });
  });

  /**************************************
   ***** 11. features-slider
   **************************************/
  $(".features-slider").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    new Swiper(bpSliderStyle, {
      slidesPerView: 1,
      centerMode: false,
      centeredSlides: false,
      loop: true,
      spaceBetween: 30,
      freeMode: false,
      slideToClickedSlide: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      speed: 800,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 1,
        },
        1900: {
          slidesPerView: 1,
        },
      },
    });
  });

  /**************************************
   ***** 12. Blog-slider
   **************************************/
  $(".blog-slider").each(function (i) {
    let bpSliderStyle = $(this).get(0);
    let prev = $(this).parents(".bp-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".bp-slide-wrap").find(".btn-next").get(0);

    new Swiper(bpSliderStyle, {
      slidesPerView: 3,
      centerMode: false,
      centeredSlides: false,
      loop: true,
      spaceBetween: 30,
      freeMode: false,
      slideToClickedSlide: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      speed: 800,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
        1900: {
          slidesPerView: 3,
        },
      },
    });
  });

  /**************************************
   ***** 13. Custom Pricing Switch
   **************************************/
  $(".price-switcher__switch .price-switcher__toggle[type='checkbox']").click(
    function () {
      if ($(this).is(":checked")) {
        $("#yearly").addClass("show");
        $("#monthly").removeClass("show");
      } else if ($(this).is(":not(:checked)")) {
        $("#monthly").addClass("show");
        $("#yearly").removeClass("show");
      }
    }
  );

  /**************************************
   ***** 14. Custom Input Label Animation
   **************************************/
  const inputs = document.querySelectorAll(".contact-form__field input");

  inputs.forEach(function (input) {
    const label = input.nextElementSibling;

    input.addEventListener("focus", function () {
      label.style.top = "-50%";
      label.style.fontSize = "12px";
    });

    input.addEventListener("blur", function () {
      if (!input.value) {
        label.style.top = "-50%";
        label.style.fontSize = "";
      }
    });
  });

  /**************************************
   ***** 16. Preloader and All after loader
   **************************************/
  $(window).on("load", function () {
    let preloader = $(".loader-wrap");
    preloader &&
      $(".loader-wrap")
        .delay(380)
        .fadeOut("slow", function () {
          $(this).remove();
        });

    if ($(".wow").length) {
      var wow = new WOW({
        mobile: false,
      });
      wow.init();
    }

    if ($(".preloader-close").length) {
      $(".preloader-close").on("click", function () {
        $(".loader-wrap").delay(200).fadeOut(500);
      });
    }
    // title Animation active
    bp_title_animation();
  });

  /**************************************
   ***** 17. MagnifiPopup Activation
   **************************************/
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  $("#play-button").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /**************************************
   ***** 18. Scroll Bottom To Top
   **************************************/
  let scrollToTopBtn = document.querySelector(".scrollToTopBtn");
  if (scrollToTopBtn) {
    let rootElement = document.documentElement;

    function handleScroll() {
      // Do something on scroll - 0.15 is the percentage the page has to scroll before the button appears
      // This can be changed - experiment
      let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
      if (rootElement.scrollTop / scrollTotal > 0.15) {
        // Show button
        scrollToTopBtn.classList.add("showBtn");
      } else {
        // Hide button
        scrollToTopBtn.classList.remove("showBtn");
      }
    }

    function scrollToTop() {
      // Scroll to top logic
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    scrollToTopBtn.addEventListener("click", scrollToTop);
    document.addEventListener("scroll", handleScroll);
  }
})(jQuery);
