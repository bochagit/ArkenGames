document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const sliderItems = document.querySelectorAll('.slider__item');
    const navDots = document.querySelectorAll('.slider__nav a');
    const progressBar = document.querySelector('.slider__progress');
    const AUTO_SCROLL_TIME = 7000;
    let currentIndex = 0;
    let autoScrollInterval;
    
    function animateProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        void progressBar.offsetWidth;
        progressBar.style.transition = `width ${AUTO_SCROLL_TIME}ms linear`;
        progressBar.style.width = '100%';
    }
    
    function resetProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
    }

    function setActiveDot(index) {
        document.querySelectorAll('.slider__nav a').forEach(dot => dot.classList.remove('active'));
        document.querySelectorAll('.slider__nav a')[index].classList.add('active');
    }

    function scrollToIndex(index) {
        const item = sliderItems[index];
        sliderWrapper.scrollTo({
            left: item.offsetLeft,
            behavior: 'smooth'
        });
        setActiveDot(index);
    }

    function startAutoScroll() {
        if (autoScrollInterval) return;
        animateProgressBar();
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sliderItems.length;
            scrollToIndex(currentIndex);
            setTimeout(() => {
                animateProgressBar();
            }, 400);
        }, AUTO_SCROLL_TIME);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
    
    setActiveDot(currentIndex);
    startAutoScroll();

    navDots.forEach((a, i) => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToIndex(i);
            currentIndex = i;
            stopAutoScroll();
            startAutoScroll();
            animateProgressBar();
        });
    });

    sliderWrapper.addEventListener('scroll', () => {
        let minDiff = Infinity;
        let visibleIndex = 0;
        sliderItems.forEach((item, i) => {
            const diff = Math.abs(item.offsetLeft - sliderWrapper.scrollLeft);
            if (diff < minDiff) {
                minDiff = diff;
                visibleIndex = i;
            }
        });
        setActiveDot(visibleIndex);
        currentIndex = visibleIndex;
    });

    let scrollTimeout = null;
    
    sliderWrapper.addEventListener('scroll', () => {
        let minDiff = Infinity;
        let visibleIndex = 0;
        sliderItems.forEach((item, i) => {
            const diff = Math.abs(item.offsetLeft - sliderWrapper.scrollLeft);
            if (diff < minDiff) {
                minDiff = diff;
                visibleIndex = i;
            }
        });
        setActiveDot(visibleIndex);
        currentIndex = visibleIndex;
    
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            stopAutoScroll();
            startAutoScroll();
            animateProgressBar();
        }, 150);
    });
});
