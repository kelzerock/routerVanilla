const urlPageTitle = "Test Routing JS";

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  urlRoute();
});

const urlRoutes = {
  404: {
    template: "../templates/404.html",
    title: "404 |" + urlPageTitle,
    description: "Page not found",
  },
  "/": {
    template: "../templates/index.html",
    title: "Home |" + urlPageTitle,
    description: "Home page",
  },
  "/about": {
    template: "../templates/about.html",
    title: "About |" + urlPageTitle,
    description: "About us page",
  },
  "/contact": {
    template: "../templates/contact.html",
    title: "Contact |" + urlPageTitle,
    description: "Contact us page",
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  console.log({href: event.target.href})
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  console.log({path: window.location.pathname})
  let location = window.location.pathname.split('/')[2];
  if (!location) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoute[404];
  const html = await fetch(route.template).then((response) => response.text());
  document.getElementById("content").innerHTML = html;
  document.title = route.title;
  document
    .querySelector("meta[name='description']")
    .setAttribute("content", route.description);
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();
