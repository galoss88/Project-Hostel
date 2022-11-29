const view = (entrada, observador) => {
  if (entrada[0].isIntersecting) entrada[0].target.classList.remove("demo11");
};

const newObserver = new IntersectionObserver(view, {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.7,
});

export const addObserver = (ref) => {
  newObserver.observe(ref);
};
