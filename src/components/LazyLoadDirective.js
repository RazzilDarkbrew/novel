/*
 * Created by pan 2019-01-31
 */
export default {
    inserted: el => {
        function loadImage() {
            const imageElement = Array.from(el.children).find(el => el.nodeName === 'IMG');

            if (imageElement) {
                imageElement.addEventListener('load', () => {
                    setTimeout(() => el.classList.add('loaded'), 100);
                });
                imageElement.addEventListener('error', () => console.log('error'));
                imageElement.src = imageElement.dataset.url;
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return false;
                } else {
                    loadImage();
                    observer.unobserve(el);
                }
            });
        }

        function createObserver() {
            const options = {
                root: null, // defaults to the browser viewport if not specified or if null
                threshold: '0' // the degree of intersection between the target element and its root (0 - 1)
            };

            const observer = new IntersectionObserver(handleIntersect, options);

            observer.observe(el); // target element to watch
        }

        if (!window['IntersectionObserver']) {
            loadImage();
        } else {
            createObserver();
        }
    }
};
