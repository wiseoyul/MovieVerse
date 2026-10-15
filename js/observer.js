 export function setupInfiniteScroll(target, callback) {
  const options = {
    root: null, 
    rootMargin: '100px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  }, options);

  observer.observe(target);
  return observer;
}