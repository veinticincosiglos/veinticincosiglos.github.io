
/* Lo que se mueve: los bloques asoman al entrar en pantalla y la lámina del
   encabezado se desplaza un poco más lento que la página. Nada de esto es
   necesario para leer el sitio: si falla, todo queda visible igual. */
(function () {
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var piezas = [].slice.call(document.querySelectorAll(".asoma"));
  if (quieto || !("IntersectionObserver" in window)) {
    piezas.forEach(function (p) { p.classList.add("visible"); });
  } else {
    var ojo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        ojo.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    piezas.forEach(function (p, i) {
      p.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      ojo.observe(p);
    });
  }

  var lamina = document.querySelector(".porton .lamina");
  if (lamina && !quieto) {
    var pendiente = false;
    addEventListener("scroll", function () {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () {
        var y = Math.min(scrollY, 700);
        lamina.style.transform = "scale(1.06) translateY(" + (y * 0.16).toFixed(1) + "px)";
        pendiente = false;
      });
    }, { passive: true });
  }
})();
