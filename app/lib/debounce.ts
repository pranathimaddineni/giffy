export function debounce<A extends unknown[]>(
    fn: (...args: A) => void,
    delay = 400
  ) {
    let timer: ReturnType<typeof setTimeout>;
  
    return (...args: A) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  