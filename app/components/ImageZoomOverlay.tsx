'use client';

import { useEffect } from 'react';

export default function ImageZoomOverlay() {
  useEffect(() => {
    const overlay = document.createElement('div');
    overlay.id = 'imageOverlay';
    overlay.className = 'image-overlay';
    overlay.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      justify-content: center;
      align-items: center;
      cursor: zoom-out;
    `;

    const overlayImage = document.createElement('img');
    overlayImage.id = 'overlayImage';
    overlayImage.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
    `;

    overlay.appendChild(overlayImage);
    document.body.appendChild(overlay);

    function initImageZoom() {
      const images = document.querySelectorAll('.qs-media img');

      images.forEach(img => {
        const imgElement = img as HTMLImageElement;
        imgElement.style.cursor = 'zoom-in';
        imgElement.addEventListener('click', (e) => {
          e.stopPropagation();
          overlayImage.src = imgElement.src;
          overlayImage.alt = imgElement.alt;
          overlay.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        });
      });

      overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    initImageZoom();

    // 监听路由变化重新初始化
    const observer = new MutationObserver(() => {
      initImageZoom();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      overlay.remove();
    };
  }, []);

  return null;
}
