const pageTitle = "Test Routing JS";

const routes = {
  404: {
    template: "/templates/404.html",
    title: "404 |" + pageTitle,
    description: "Page not found",
  },
  "/": {
    template: "/templates/index.html",
    title: "Home |" + pageTitle,
    description: "Home page",
  },
  about: {
    template: "/templates/about.html",
    title: "About |" + pageTitle,
    description: "About us page",
  },
  contact: {
    template: "/templates/contact.html",
    title: "Contact |" + pageTitle,
    description: "Contact us page",
  },
};

const locationHandler = async () => {
  let location = window.location.hash.replace("#", "");
  if (location.length === 0) {
    location = "/";
  }
  const route = routes[location] || route[404];
  const html = await fetch(route.template).then((response) => response.text());
  document.getElementById("content").innerHTML = html;
  document.title = route.title;
  document
    .querySelector("meta[name='description']")
    .setAttribute("content", route.description);
};


window.addEventListener("hashchange", locationHandler);
locationHandler();