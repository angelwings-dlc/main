        document.addEventListener("DOMContentLoaded", function () {
            const scrollContainer = document.querySelector(".scroll-container");
            const scrollbar = document.createElement("div");
            scrollbar.classList.add("custom-scrollbar");
            document.body.appendChild(scrollbar);

            function updateScrollbar() {
                const containerHeight = scrollContainer.clientHeight;
                const contentHeight = scrollContainer.scrollHeight;
                const scrollbarHeight = (containerHeight / contentHeight) * containerHeight;
                scrollbar.style.height = `${scrollbarHeight}px`;
                scrollbar.style.top = `${(scrollContainer.scrollTop / contentHeight) * containerHeight}px`;
            }

            scrollContainer.addEventListener("scroll", updateScrollbar);

            let isDragging = false;
            let startY, startScrollTop;

            scrollbar.addEventListener("mousedown", (e) => {
                isDragging = true;
                startY = e.clientY;
                startScrollTop = scrollContainer.scrollTop;
                document.body.classList.add("no-select");
            });

            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                const deltaY = e.clientY - startY;
                const scrollAmount = (deltaY / scrollContainer.clientHeight) * scrollContainer.scrollHeight;
                scrollContainer.scrollTop = startScrollTop + scrollAmount;
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
                document.body.classList.remove("no-select");
            });

            updateScrollbar();
        });

        window.onload = function() {
            setTimeout(() => {
                let preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';

                setTimeout(() => {
                    preloader.style.display = 'none';
                    let notification = document.getElementById('notification');
                    notification.classList.add('show');

                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 5000);
                }, 1000);
            }, 1000);
        };

        document.addEventListener("scroll", function () {
            const header = document.querySelector("header");
            if (window.scrollY > 50) {
                header.classList.add("blurred");
            } else {
                header.classList.remove("blurred");
            }
        });

        function changeScreenshot(src, description) {
            document.getElementById('main-screenshot').src = src;
            document.getElementById('screenshot-desc').textContent = description;
            
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            event.currentTarget.classList.add('active');
            
            event.preventDefault();
            event.stopPropagation();
        }