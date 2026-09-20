/* Dashboard: mostra o conteúdo só para clientes */
(function () {
  "use strict";
  var A = window.TicordAuth;
  if (!A) return;

  function $(id) { return document.getElementById(id); }

  function show(which) {
    ["dash-loading", "dash-gate", "dash-denied", "dash-content"].forEach(function (id) {
      $(id).hidden = id !== which;
    });
  }

  function render() {
    var s = A.getState();
    if (!s.user) return show("dash-gate");
    if (!s.profile || !s.profile.is_client) return show("dash-denied");
    $("dash-name").textContent = s.profile.first_name;
    $("dash-fullname").textContent = s.profile.first_name + " " + s.profile.last_name;
    $("dash-email").textContent = s.user.email;
    show("dash-content");
  }

  $("dash-login").addEventListener("click", A.openLogin);
  A.ready.then(render);
  window.addEventListener("ticord-auth", render);
})();
