function getRandomNumberInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function getRandomNumberFloat(min, max) {
    return Math.random() * (max - min + 1) + min
}


function createCircles(circles) {
    for (let i = 0; i < 4; i++) {
        const circle = document.createElement("div");
        circles.push(circle);
    }
}


function getRandomCircles(circles) {
    circles.forEach((circle, i) => {
        let randomSize = getRandomNumberInt(10, 30) + 20 * i;
        let randomPositionX = getRandomNumberInt(20, 100) + 80 * i;
        let randomPositionY = getRandomNumberInt(5, 60) + 20 * i;
        circle.style.cssText = `
            display: none;
            position: absolute;
            z-index: 1;
            top: ${randomPositionY}px;
            left: ${randomPositionX}px;
            width: ${randomSize}px;
            height: ${randomSize}px;
            border-radius: 100%;
            background-color: rgba(255, 255, 255, 0.2);
        `;
    });
}


document.addEventListener("DOMContentLoaded", () => {
    function animate({ timing, draw, duration }) {
        let start = performance.now();
        requestId = requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            let progress = timing(timeFraction);
            draw(progress);
            if (timeFraction < 1 && requestId) {
                requestAnimationFrame(animate);
            }

        });
    }
    let requestId = undefined;
    const cards = document.querySelectorAll(".categories__card");
    let circles = [];
    createCircles(circles);
    cards.forEach((card) => card.addEventListener("mouseenter", (e) => {
        getRandomCircles(circles);
        e.target.classList.toggle("categories__card-focused");
        const imgs = e.target.querySelectorAll("img");
        imgs[0].classList.toggle("categories__card-img_hide");
        imgs[1].classList.toggle("categories__card-img_hide");
        const elem = e.target;
        circles.forEach((circle) => {
            elem.appendChild(circle)
            circle.style.display = "block";
        });
        let randomScale = getRandomNumberFloat(1, 2);
        let randomTranslate = getRandomNumberInt(-40, 40);
        animate({
            duration: 1000,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                circles.forEach((circle, index) => {
                    circle.style.transform = `scale(${progress * (randomScale - 0.4 * index) + 1},\
                     ${progress * (randomScale - 0.4 * index) + 1})\
                      translate(${progress * (randomTranslate - 10 * index) * (index % 2 == 0 ? 1 : -1)}px,\
                       ${progress * (randomTranslate - 10 * index)}px)`;
                });
            }
        });
    }));
    cards.forEach(card => card.addEventListener("mouseleave", (e) => {
        e.target.classList.toggle("categories__card-focused");
        const imgs = e.target.querySelectorAll("img");
        imgs[0].classList.toggle("categories__card-img_hide");
        imgs[1].classList.toggle("categories__card-img_hide");
        circles.forEach((circle) => {
            circle.style.display = "none";
        });
        if (requestId) {
            cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }));
    const sheetParallax = document.querySelectorAll(".sheet-parallax__img");
    document.addEventListener("mousemove", (e) => {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        sheetParallax[0].style.transform = `translate(${x * 20}px, -${y * 20}px)`;
        sheetParallax[1].style.transform = `translate(-${x * 20}px, ${y * 20}px)`;
    });
});
