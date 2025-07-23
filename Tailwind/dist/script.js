const navdialouge=document.getElementById('nav_dialouge');
function handleMenu(){
    navdialouge.classList.toggle('hidden');
}
function setupIntersectionObserver(element, isLTR, speed) {
    const scrollHandler = () => {
        const offset = window.innerHeight - element.getBoundingClientRect().top;
        const translateX = offset * speed;
        let totalTranslate=0;
        if(isLTR)
        {
           totalTranslate=translateX+(-48*4);
        }
        else{
               totalTranslate=-(translateX+(36*4));
        }
        element.style.transform = `translateX(${totalTranslate}px)`;
    };

    const intersectionCallback = (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        if (isIntersecting) {
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }
    };

    const observer = new IntersectionObserver(intersectionCallback);
    observer.observe(element);
}

// Usage
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const line4 = document.getElementById('line4');



setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);
setupIntersectionObserver(line4, true, 0.8);

