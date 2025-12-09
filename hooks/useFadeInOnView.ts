import { useEffect } from "react";

export function useFadeInOnView(ref: React.RefObject<HTMLElement | null>, controls: any) {
  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } });
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, ref]);
}
