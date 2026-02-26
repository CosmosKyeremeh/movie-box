// Loading Skeleton Component
(function() {
    'use strict';

    const LoadingSkeleton = {
        // Create skeleton for movie grid
        createMovieGridSkeleton(count = 8) {
            return Array(count)
                .fill(0)
                .map(() => this.createMovieCardSkeleton())
                .join('');
        },

        // Create single movie card skeleton
        createMovieCardSkeleton() {
            return `
                <div class="movie-card skeleton">
                    <div class="skeleton-poster"></div>
                    <div class="skeleton-info">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-meta"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                    </div>
                </div>
            `;
        },

        // Show loading in element
        show(element, count = 8) {
            if (!element) return;
            element.innerHTML = this.createMovieGridSkeleton(count);
        },

        // Hide loading
        hide(element) {
            if (!element) return;
            const skeletons = element.querySelectorAll('.skeleton');
            skeletons.forEach(skeleton => skeleton.remove());
        }
    };

    // Make LoadingSkeleton globally available
    window.LoadingSkeleton = LoadingSkeleton;

    // Add skeleton styles if not present
    if (!document.getElementById('skeleton-styles')) {
        const style = document.createElement('style');
        style.id = 'skeleton-styles';
        style.textContent = `
            .skeleton {
                animation: skeleton-loading 1.5s infinite ease-in-out;
                background: linear-gradient(90deg, #1a1f2e 25%, #2a2f3e 50%, #1a1f2e 75%);
                background-size: 200% 100%;
            }

            @keyframes skeleton-loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            .skeleton-poster {
                width: 100%;
                height: 300px;
                background: #2a2f3e;
            }

            .skeleton-info {
                padding: 15px;
            }

            .skeleton-title,
            .skeleton-meta,
            .skeleton-text {
                height: 16px;
                background: #2a2f3e;
                margin-bottom: 10px;
                border-radius: 4px;
            }

            .skeleton-title {
                height: 20px;
                width: 70%;
            }

            .skeleton-meta {
                width: 50%;
            }

            .skeleton-text {
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    console.log('[LoadingSkeleton] Component loaded');
})();
