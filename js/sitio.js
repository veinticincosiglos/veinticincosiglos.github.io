
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


  // la caja de comentarios: si no hay formulario configurado, se prepara el
  // mensaje en el correo del visitante. La dirección va codificada.
  var forma = document.querySelector("form.comentar");
  if (forma && forma.dataset.correo) {
    forma.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var texto = forma.comentario.value.trim();
      if (!texto) return;
      var quien = forma.nombre.value.trim();
      var unidad = forma.unidad.value;
      var destino;
      try { destino = atob(forma.dataset.correo); } catch (e) { return; }
      var asunto = "Comentario sobre la " + unidad + " — Veinticinco siglos";
      var cuerpo = texto + "\n\n" + (quien ? "— " + quien : "") +
                   "\n(" + location.href + ")";
      forma.querySelector(".aviso-envio").textContent =
        "Abriendo tu correo con el comentario listo para enviar…";
      location.href = "mailto:" + destino +
        "?subject=" + encodeURIComponent(asunto) +
        "&body=" + encodeURIComponent(cuerpo);
    });
  }

  var indice = document.querySelector(".indice-lateral");
  if (indice) {
    var cabeza = indice.querySelector(".cabeza");
    var CLAVE = "indice.unidades.abierto";
    var angosto = innerWidth < 1100;
    try {
      var guardado = localStorage.getItem(CLAVE);
      if (guardado) indice.dataset.abierto = guardado;
      else if (angosto) indice.dataset.abierto = "no";
    } catch (e) { if (angosto) indice.dataset.abierto = "no"; }
    var pintarEstado = function () {
      var abierto = indice.dataset.abierto !== "no";
      cabeza.setAttribute("aria-expanded", abierto ? "true" : "false");
    };
    pintarEstado();
    cabeza.addEventListener("click", function () {
      indice.dataset.abierto = indice.dataset.abierto === "no" ? "si" : "no";
      pintarEstado();
      try { localStorage.setItem(CLAVE, indice.dataset.abierto); } catch (e) {}
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
