const scrollTo = (id) => {
  const y =
    document.getElementById(id).getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: y - window.innerHeight / 10,
    behavior: "smooth",
  });
};

export default scrollTo;
