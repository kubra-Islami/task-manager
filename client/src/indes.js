window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloaded'); // This triggers the "cinema screen opening" effect

            // Wait for CSS animations to finish (around 1 second animation)
            setTimeout(() => {
                preloader.style.display = 'none'; // Removes the preloader
            }, 1000); // Match this to the transition duration
        }, 1500); // Delay for preloader to be visible for a brief moment before animation starts
    }
});

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function elisc_tm_cursor() {
    "use strict";

    var myCursor = jQuery('.mouse-cursor');

    if (myCursor.length) {
        if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n, i = 0,
                o = !1;
            window.onmousemove = function (s) {
                o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
            }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
            }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
                $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
            }), e.style.visibility = "visible", t.style.visibility = "visible"
        }
    }
}

elisc_tm_cursor();
