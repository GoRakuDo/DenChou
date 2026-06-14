/* _denchou_deferred_v0.1.0.js */
(function () {
  // Adds hover effects to Jitendex dictionary content
  function jitendexHover() {
    const sentencePairs = document.querySelectorAll('[data-sc-content="example-sentence-a"]');
    const xrefPairs = document.querySelectorAll('[data-sc-content="xref"]');
    const antonymPairs = document.querySelectorAll('[data-sc-content="antonym"]');
    const notePairs = document.querySelectorAll('[data-sc-content="sense-note"]');
    const explanationPairs = document.querySelectorAll('[data-sc-content="info-gloss"]');
    const langPairs = document.querySelectorAll('[data-sc-content="lang-source"]');

    const handleHover = (parentElement, elementB) => {
      if (parentElement && elementB && !parentElement.dataset.hasHoverListener) {
        parentElement.classList.add('tappable');
        parentElement.style.opacity = '0.5';
        parentElement.style.transition = 'opacity 0.3s ease';
        elementB.style.maxHeight = '0';
        elementB.style.overflow = 'hidden';
        elementB.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        elementB.style.display = 'block';

        const showContent = () => {
          requestAnimationFrame(() => {
            parentElement.style.opacity = '1';
            elementB.style.maxHeight = elementB.scrollHeight + 'px';
            elementB.style.opacity = '1';
          });
        };

        const hideContent = () => {
          requestAnimationFrame(() => {
            parentElement.style.opacity = '0.5';
            elementB.style.maxHeight = '0';
            elementB.style.opacity = '0';
          });
        };

        elementB.addEventListener('mouseover', showContent);
        parentElement.addEventListener('mouseover', showContent);

        elementB.addEventListener('mouseout', hideContent);
        parentElement.addEventListener('mouseout', hideContent);

        const preventFlipAndLinks = (e) => {
          e.stopPropagation();
          if (e.target.tagName === 'A' || e.target.closest('a')) {
            e.preventDefault();
          }
        };

        parentElement.addEventListener('click', preventFlipAndLinks);
        elementB.addEventListener('click', preventFlipAndLinks);

        parentElement.dataset.hasHoverListener = 'true';
      }
    };

    sentencePairs.forEach(sentenceA => {
      const sentenceB = sentenceA.nextElementSibling;
      if (sentenceA && sentenceB && !sentenceA.dataset.hasClickListener) {
        sentenceA.classList.add('tappable');
        sentenceA.style.opacity = '0.5';
        sentenceA.style.transition = 'opacity 0.3s ease';
        sentenceA.style.cursor = 'pointer';
        sentenceB.style.maxHeight = '0';
        sentenceB.style.overflow = 'hidden';
        sentenceB.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        sentenceB.style.display = 'block';
        sentenceB.style.opacity = '0';

        let isSentenceBVisible = false;

        sentenceA.addEventListener('click', (event) => {
          event.stopPropagation();
          isSentenceBVisible = !isSentenceBVisible;

          const sentenceContainer = sentenceA.closest('[data-sc-content="example-sentence"]');

          requestAnimationFrame(() => {
            if (isSentenceBVisible) {
              sentenceA.style.opacity = '1';
              sentenceB.style.maxHeight = sentenceB.scrollHeight + 'px';
              sentenceB.style.opacity = '1';

              if (sentenceContainer) {
                sentenceContainer.classList.add('sentence-active');
              }

            } else {
              if (!sentenceA.matches(':hover')) {
                sentenceA.style.opacity = '0.5';
              }
              sentenceB.style.maxHeight = '0';
              sentenceB.style.opacity = '0';

              if (sentenceContainer) {
                sentenceContainer.classList.remove('sentence-active');
              }
            }
          });
        });

        sentenceA.addEventListener('mouseenter', () => {
          sentenceA.style.opacity = '1';
        });

        sentenceA.addEventListener('mouseleave', () => {
          if (!isSentenceBVisible) {
            sentenceA.style.opacity = '0.5';
          }
        });

        sentenceB.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.target.tagName === 'A' || e.target.closest('a')) {
            e.preventDefault();
          }
        });

        sentenceA.dataset.hasClickListener = 'true';
      }
    });

    xrefPairs.forEach(xref => {
      const xrefGlossary = xref.querySelector('[data-sc-content="xref-glossary"]');
      handleHover(xref, xrefGlossary);
    });

    antonymPairs.forEach(antonym => {
      const antonymGlossary = antonym.querySelector('[data-sc-content="antonym-glossary"]');
      handleHover(antonym, antonymGlossary);
    });

    notePairs.forEach(note => {
      const noteGlossary = note.querySelector('div:last-child');
      handleHover(note, noteGlossary);
    });

    explanationPairs.forEach(explanation => {
      const infoGloss = explanation.querySelector('div:last-child');
      handleHover(explanation, infoGloss);
    });

    langPairs.forEach(lang => {
      const langSource = lang.querySelector('div:last-child');
      handleHover(lang, langSource);
    });
  }

  // Ensures picture field videos behave like images in the picture container
  function initializePictureVideos() {
    const pictureContainer = document.querySelector('.picture-container');
    if (!pictureContainer) return;

    const shouldAutoplay = denchouConfig.autoPlayVideo !== 'false';
    const shouldMute = denchouConfig.muteVideo !== 'false';

    pictureContainer.querySelectorAll('video').forEach(video => {
      // No loop, no controls bar
      video.removeAttribute('controls');
      video.setAttribute('playsinline', '');

      video.autoplay = shouldAutoplay;
      video.loop = false;
      video.muted = shouldMute;
      video.playsInline = true;
      video.preload = 'metadata';

      if (!shouldAutoplay) {
        video.removeAttribute('autoplay');
      }

      // Click/tap: toggle play/pause; after ended, replay from start
      video.addEventListener('click', () => {
        if (video.ended) {
          video.currentTime = 0;
          video.play().catch(() => { });
        } else if (video.paused) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      });

      if (shouldAutoplay) {
        const playVideo = () => {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => { });
          }
        };

        if (video.readyState >= 2) {
          playVideo();
        } else {
          video.addEventListener('loadedmetadata', playVideo, { once: true });
        }
      }
    });
  }

  // Allows cycling through images and videos
  function enableImageSwitching() {
    let currentImageIndex = 0;
    const getPictureMedia = () => Array.from(document.querySelectorAll('.picture-container :is(img, video)'));

    function getMediaBackgroundUrl(media) {
      if (!media) return '';
      if (media.tagName === 'VIDEO') return media.poster || '';
      return media.currentSrc || media.src || '';
    }

    function isMediaVisible(media) {
      return media.getClientRects().length > 0;
    }

    function syncPictureFrameBackground() {
      const pictureContainer = document.querySelector('.picture-container');
      if (!pictureContainer) return;

      if (window.IS_NSFW && denchouConfig.blurNsfwPicture === 'true') {
        pictureContainer.style.removeProperty('--picture-frame-bg');
        return;
      }

      const visibleMedia = getPictureMedia().find(media => {
        return isMediaVisible(media);
      });

      const mediaUrl = getMediaBackgroundUrl(visibleMedia);
      if (mediaUrl) {
        pictureContainer.style.setProperty('--picture-frame-bg', `url(${JSON.stringify(mediaUrl)})`);
      } else {
        pictureContainer.style.removeProperty('--picture-frame-bg');
      }
    }

    function switchImage(direction, event) {
      if (event) event.preventDefault();
      if (event) event.stopPropagation();

      const mediaItems = getPictureMedia();
      if (mediaItems.length === 0) return;

      const visibleIndex = mediaItems.findIndex(media => {
        return window.getComputedStyle(media).display !== 'none';
      });

      if (visibleIndex !== -1) currentImageIndex = visibleIndex;

      mediaItems.forEach(media => media.style.setProperty('display', 'none', 'important'));

      currentImageIndex += direction;

      if (currentImageIndex >= mediaItems.length) {
        currentImageIndex = 0;
      } else if (currentImageIndex < 0) {
        currentImageIndex = mediaItems.length - 1;
      }

      mediaItems[currentImageIndex].style.setProperty('display', 'block', 'important');
      syncPictureFrameBackground();
      updatePictureCounter();
    }

    window.denchouToggleImage = (direction, e) => {
      switchImage(direction, e);
    };

    function refreshImageNavigation() {
      const arrows = document.querySelectorAll('.nav-arrow');
      const mediaItems = getPictureMedia();

      if (mediaItems.length <= 1) {
        arrows.forEach(arrow => arrow.classList.add('hidden'));
      } else {
        arrows.forEach(arrow => arrow.classList.remove('hidden'));
      }
    }

    const arrows = document.querySelectorAll('.nav-arrow');
    arrows.forEach(arrow => {
      if (!arrow.dataset.hasClickListener) {
        arrow.addEventListener('click', (event) => {
          const direction = arrow.classList.contains('left') ? -1 : 1;
          switchImage(direction, event);
        });
        arrow.dataset.hasClickListener = 'true';
      }
    });

    refreshImageNavigation();
    syncPictureFrameBackground();
    window.denchouRefreshImageNavigation = refreshImageNavigation;
    window.denchouSyncPictureFrameBackground = syncPictureFrameBackground;
  }

  // Creates lightbox for image and video viewing
  function enableLightbox() {
    const getPictureMedia = () => Array.from(document.querySelectorAll('.picture-container :is(img, video)'));
    if (!getPictureMedia().length) return;

    let currentIndex = 0;
    let scale = 1, translateX = 0, translateY = 0;
    let isPanning = false, startX = 0, startY = 0;
    let isGridView = false;
    let heavyListenersSetup = false;

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxVideo = document.getElementById("lightbox-video");
    const leftButton = document.querySelector(".lightbox-nav.left");
    const rightButton = document.querySelector(".lightbox-nav.right");
    const showAll = document.getElementById("show-all");

    if (!lightbox || !lightboxImg || !lightboxVideo || !leftButton || !rightButton || !showAll) return;

    function syncNavigationVisibility() {
      const mediaItems = getPictureMedia();
      if (mediaItems.length <= 1) {
        leftButton.classList.add("hidden");
        rightButton.classList.add("hidden");
        showAll.style.display = "none";
      } else {
        leftButton.classList.remove("hidden");
        rightButton.classList.remove("hidden");
        showAll.style.display = "block";
      }
    }

    syncNavigationVisibility();

    const hideLightboxMedia = () => {
      lightboxImg.style.display = "none";
      lightboxImg.removeAttribute("src");
      lightboxImg.classList.remove("clicked");
      lightboxVideo.pause();
      lightboxVideo.style.display = "none";
      lightboxVideo.removeAttribute("src");
      lightboxVideo.innerHTML = "";
      lightboxVideo.classList.remove("clicked");
      lightboxVideo.load();
    };

    if (getPictureMedia().length <= 1) {
      leftButton.classList.add("hidden");
      rightButton.classList.add("hidden");
      showAll.style.display = "none";
    } else {
      leftButton.classList.remove("hidden");
      rightButton.classList.remove("hidden");
      showAll.style.display = "block";
    }

    function showGridView() {
      isGridView = true;
      const gridContainer = document.createElement("div");
      gridContainer.className = "lightbox-grid";

      const mediaItems = getPictureMedia();
      mediaItems.forEach((media, index) => {
        const tagName = media.tagName.toLowerCase();
        const gridMedia = document.createElement(tagName);

        if (tagName === "video") {
          const src = media.currentSrc || media.getAttribute("src");
          if (src) {
            gridMedia.src = src;
          } else {
            gridMedia.innerHTML = media.innerHTML;
          }
          gridMedia.poster = media.poster || "";
          gridMedia.muted = true;
          gridMedia.playsInline = true;
          gridMedia.preload = "metadata";
        } else {
          gridMedia.src = media.currentSrc || media.src;
          gridMedia.alt = media.alt || `Image ${index + 1}`;
        }

        gridMedia.classList.add('tappable');
        gridMedia.addEventListener("click", () => {
          showImage(index);
          hideGridView();
        });
        gridContainer.appendChild(gridMedia);
      });

      const imgCount = mediaItems.length;
      if (imgCount <= 4) {
        gridContainer.style.gridTemplateColumns = `repeat(${imgCount}, 1fr)`;
      } else if (imgCount <= 9) {
        gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
      } else {
        gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
      }

      lightbox.appendChild(gridContainer);
      lightboxImg.style.display = "none";
      leftButton.style.display = "none";
      rightButton.style.display = "none";
      showAll.textContent = "Back";
    }

    function hideGridView() {
      isGridView = false;
      const grid = document.querySelector(".lightbox-grid");
      if (grid) {
        grid.remove();
      }
      leftButton.style.display = "";
      rightButton.style.display = "";
      showAll.textContent = "Show All";
      showImage(currentIndex);
    }

    const showImage = (index) => {
      if (!heavyListenersSetup) {
        setupHeavyListeners();
        heavyListenersSetup = true;
      }
      if (isGridView) hideGridView();
      currentIndex = index;
      const mediaItems = getPictureMedia();
      const media = mediaItems[index];
      const isVideo = media.tagName.toLowerCase() === "video";

      hideLightboxMedia();

      // NSFW: sync blur state from picture container to lightbox
      const isNSFW = window.IS_NSFW && denchouConfig.blurNsfwPicture === 'true';
      if (isNSFW) {
        lightbox.classList.add("nsfw");
        // Transfer .clicked state from picture media to lightbox media
        if (media.classList.contains('clicked')) {
          const target = isVideo ? lightboxVideo : lightboxImg;
          target.classList.add('clicked');
        }
      } else {
        lightbox.classList.remove("nsfw");
      }

      if (isVideo) {
        const src = media.currentSrc || media.getAttribute("src");
        if (src) {
          lightboxVideo.src = src;
        } else {
          lightboxVideo.innerHTML = media.innerHTML;
          lightboxVideo.load();
        }
        lightboxVideo.poster = media.poster || "";
        lightboxVideo.autoplay = true;
        lightboxVideo.loop = true;
        lightboxVideo.muted = true;
        lightboxVideo.playsInline = true;
        lightboxVideo.currentTime = 0;
        lightboxVideo.style.transform = "";
        lightboxVideo.style.display = "block";
      } else {
        lightboxImg.src = media.currentSrc || media.src;
        lightboxImg.alt = media.alt || "";
        lightboxImg.style.display = "block";
      }

      resetTransform();
      syncNavigationVisibility();
      lightbox.classList.add("active");
    };

    const resetTransform = () => {
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    };

    const updateTransform = () => {
      lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };

    getPictureMedia().forEach((media) => {
      if (!media.dataset.hasLightboxListener) {
        const isNSFW = window.IS_NSFW && denchouConfig.blurNsfwPicture === 'true';
        const openMedia = () => {
          const mediaItems = getPictureMedia();
          const mediaIndex = mediaItems.indexOf(media);
          if (mediaIndex !== -1) {
            showImage(mediaIndex);
          }
        };

        if (isNSFW) {
          media.addEventListener("click", (e) => {
            if (media.classList.contains('clicked')) {
              openMedia();
            } else {
              media.classList.add('clicked');
            }
          });
        } else {
          media.addEventListener("click", openMedia);
        }
        media.dataset.hasLightboxListener = 'true';
      }
    });

    if (!showAll.dataset.hasClickListener) {
      showAll.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isGridView) {
          hideGridView();
        } else {
          showGridView();
        }
      });
      showAll.dataset.hasClickListener = 'true';
    }

    if (!lightbox.dataset.hasShortcutsListener) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (isGridView) {
            hideGridView();
          } else {
            lightbox.classList.remove("active");
          }
        }

        if (lightbox.classList.contains("active") && !isGridView) {
          const mediaItems = getPictureMedia();
          if (!mediaItems.length) return;
          if (e.key === "ArrowLeft") {
            showImage(currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaItems.length - 1);
          }
          if (e.key === "ArrowRight") {
            showImage(currentIndex = (currentIndex < mediaItems.length - 1) ? currentIndex + 1 : 0);
          }
        }
      });
      lightbox.dataset.hasShortcutsListener = 'true';
    }

    function setupHeavyListeners() {
      if (!lightboxImg.dataset.hasWheelListener) {
        lightboxImg.addEventListener("wheel", (e) => {
          e.preventDefault();
          const prevScale = scale;
          scale = Math.min(Math.max(1, scale + e.deltaY * -0.001), 3);

          if (scale === 1) {
            resetTransform();
            if (getPictureMedia().length > 1) showAll.style.display = "block";
          } else {
            const rect = lightboxImg.getBoundingClientRect();
            const offsetX = (e.clientX - rect.left) / rect.width;
            const offsetY = (e.clientY - rect.top) / rect.height;
            translateX -= (offsetX - 0.5) * (scale - prevScale) * rect.width;
            translateY -= (offsetY - 0.5) * (scale - prevScale) * rect.height;
            updateTransform();
            showAll.style.display = "none";
          }
        });
        lightboxImg.dataset.hasWheelListener = 'true';
      }

      if (!lightboxImg.dataset.hasMousedownListener) {
        lightboxImg.addEventListener("mousedown", (e) => {
          if (scale === 1) return;
          e.preventDefault();
          isPanning = true;
          startX = e.clientX - translateX;
          startY = e.clientY - translateY;
          lightboxImg.style.cursor = "grabbing";
        });
        lightboxImg.dataset.hasMousedownListener = 'true';
      }

      let initialDistance = null;

      if (!lightboxImg.dataset.hasTouchListeners) {
        lightboxImg.addEventListener('touchstart', (e) => {
          if (e.touches.length === 2) {
            initialDistance = Math.hypot(
              e.touches[0].pageX - e.touches[1].pageX,
              e.touches[0].pageY - e.touches[1].pageY
            );
            isPanning = false;
          } else if (e.touches.length === 1 && scale > 1) {
            isPanning = true;
            startX = e.touches[0].pageX - translateX;
            startY = e.touches[0].pageY - translateY;
            initialDistance = null;
          } else {
            isPanning = false;
            initialDistance = null;
          }
        });

        lightboxImg.addEventListener('touchmove', (e) => {
          if (e.touches.length === 2 && initialDistance !== null) {
            e.preventDefault();
            const newDistance = Math.hypot(
              e.touches[0].pageX - e.touches[1].pageX,
              e.touches[0].pageY - e.touches[1].pageY
            );
            const newScale = scale * (newDistance / initialDistance);
            const prevScale = scale;

            scale = Math.min(Math.max(1, newScale), 3);

            if (scale > 1) {
              const rect = lightboxImg.getBoundingClientRect();
              const touchCenterX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
              const touchCenterY = (e.touches[0].pageY + e.touches[1].pageY) / 2;

              const offsetX = (touchCenterX - rect.left) / rect.width;
              const offsetY = (touchCenterY - rect.top) / rect.height;

              translateX -= (offsetX - 0.5) * (scale - prevScale) * rect.width;
              translateY -= (offsetY - 0.5) * (scale - prevScale) * rect.height;

              updateTransform();
              showAll.style.display = "none";
            } else {
              resetTransform();
              if (getPictureMedia().length > 1) showAll.style.display = "block";
            }
            initialDistance = newDistance;

          } else if (e.touches.length === 1 && isPanning) {
            e.preventDefault();
            translateX = e.touches[0].pageX - startX;
            translateY = e.touches[0].pageY - startY;
            updateTransform();
          }
        });

        lightboxImg.addEventListener('touchend', (e) => {
          if (e.touches.length < 2) {
            initialDistance = null;
          }
          if (e.touches.length < 1) {
            isPanning = false;
          }
        });
        lightboxImg.dataset.hasTouchListeners = 'true';
      }

      const moveImage = (e) => {
        if (!isPanning) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
      };

      if (!lightbox.dataset.hasMouseMoveListeners) {
        document.addEventListener("mousemove", (e) => {
          if (isPanning) requestAnimationFrame(() => moveImage(e));
        });

        document.addEventListener("mouseup", () => {
          isPanning = false;
          lightboxImg.style.cursor = "grab";
        });
        lightbox.dataset.hasMouseMoveListeners = 'true';
      }
    }

    if (!lightbox.dataset.hasClickListeners) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox ||
          (isGridView && !e.target.closest('.lightbox-grid :is(img, video)') && e.target !== showAll)) {
          if (isGridView) {
            lightbox.classList.remove("active");
          } else {
            lightbox.classList.remove("active");
          }
        }
      });

      // NSFW: click on lightbox media to unblur
      [lightboxVideo, lightboxImg].forEach(el => {
        el.addEventListener("click", () => {
          if (lightbox.classList.contains("nsfw")) {
            el.classList.add("clicked");
          }
        });
      });

      lightbox.addEventListener("touchend", (e) => {
        if (e.target === lightbox ||
          (isGridView && !e.target.closest('.lightbox-grid :is(img, video)') && e.target !== showAll)) {
          if (isGridView) {
            lightbox.classList.remove("active");
          } else {
            lightbox.classList.remove("active");
          }
        }
      });
      lightbox.dataset.hasClickListeners = 'true';
    }

    if (!leftButton.dataset.hasClickListener) {
      leftButton.addEventListener("click", () => {
        const mediaItems = getPictureMedia();
        showImage(currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaItems.length - 1);
      });
      leftButton.dataset.hasClickListener = 'true';
    }

    if (!rightButton.dataset.hasClickListener) {
      rightButton.addEventListener("click", () => {
        const mediaItems = getPictureMedia();
        showImage(currentIndex = (currentIndex < mediaItems.length - 1) ? currentIndex + 1 : 0);
      });
      rightButton.dataset.hasClickListener = 'true';
    }
  }

  // Custom Shortcuts
  function enableCustomShortcuts() {
    ['denchouFrontSettingsHandler', 'denchouBackKeyHandler'].forEach(h => {
      if (window[h]) document.removeEventListener('keydown', window[h]);
      window[h] = null;
    });

    const utils = {
      isTyping: () => {
        const active = document.activeElement;
        return active && ['INPUT', 'TEXTAREA'].includes(active.tagName);
      },

      getVar: (name) => {
        const map = {
          '--toggle-settings-key': 'toggleSettingsKey',
          '--toggle-picture-lightbox-grid-key': 'togglePictureLightboxGridKey',
          '--toggle-picture-lightbox-key': 'togglePictureLightboxKey',
          '--toggle-custom-dark-mode-key': 'toggleCustomDarkModeKey',
          '--toggle-image-key': 'toggleImageKey'
        };
        const key = map[name];
        return key ? denchouConfig[key] : '';
      }
    };

    const actions = {
      settings: () => {
        const modal = document.getElementById('denchou-settings-modal');
        const btn = document.querySelector('.toggle-settings-btn');

        if (modal) {
          modal.classList.toggle('active');
        } else if (btn) {
          btn.click();
        }
      },

      lightboxGrid: () => {
        const lb = document.getElementById("lightbox");
        const btn = document.getElementById("show-all");

        if (lb && !lb.classList.contains("active")) {
          const mediaItems = getPictureMedia();
          const visible = mediaItems.find(m => getComputedStyle(m).display !== 'none') || mediaItems[0];

          visible?.click();
          setTimeout(() => btn?.click(), 10);
        } else if (btn) {
          btn.click();
        }
      },

      lightbox: () => {
        const lb = document.getElementById("lightbox");

        if (lb?.classList.contains("active")) {
          lb.classList.remove("active");

          const grid = document.querySelector(".lightbox-grid");
          if (grid) grid.remove();

          hideLightboxMedia();

          const showAllBtn = document.getElementById("show-all");
          if (showAllBtn) showAllBtn.textContent = "Show All";

          const navs = document.querySelectorAll(".lightbox-nav");
          navs.forEach(n => n.style.display = "");
        } else {
          const mediaItems = getPictureMedia();
          const visible = mediaItems.find(m => getComputedStyle(m).display !== 'none') || mediaItems[0];

          visible?.click();
        }
      },

      customDarkMode: () => {
        const dmBtn = document.querySelector(".toggle-custom-dark-mode");

        if (dmBtn) dmBtn.click();
      },

      imageToggle: () => {
        const wrap = document.querySelector('.back');
        const btn = document.querySelector('.header .show-btn');

        if (wrap && btn) {
          const isHidden = wrap.classList.toggle('image-removed');

          localStorage.setItem("denchouImageHidden", isHidden);
          btn.style.setProperty('display', isHidden ? 'flex' : 'none', 'important');

          if (typeof dynamicCardHeight === 'function') dynamicCardHeight();
        }
      }
    };

    if (window.denchouBackKeyHandler) {
      document.removeEventListener('keydown', window.denchouBackKeyHandler);
      window.denchouBackKeyHandler = null;
    }

    window.denchouBackKeyHandler = (e) => {
      if (utils.isTyping()) return;

      const pairShortcuts = [
        { key: denchouConfig.toggleDictionarySwitchKey, action: (dir) => window.denchouToggleDictionary && window.denchouToggleDictionary(dir) },
        { key: denchouConfig.toggleSceneSwitchKey, action: (dir) => window.denchouToggleScene && window.denchouToggleScene(dir) },
        { key: denchouConfig.toggleImageSwitchKey, action: (dir) => window.denchouToggleImage && window.denchouToggleImage(dir === 'left' ? -1 : 1, e) }
      ];

      for (const item of pairShortcuts) {
        if (!item.key) continue;
        const matchData = isKeyMatchPair(e, item.key);
        if (matchData.match) {
          e.preventDefault();
          e.stopPropagation();
          item.action(matchData.direction);
          return;
        }
      }

      const shortcuts = [
        { key: denchouConfig.toggleSettingsKey, action: actions.settings },
        { key: denchouConfig.togglePictureLightboxGridKey, action: actions.lightboxGrid },
        { key: denchouConfig.togglePictureLightboxKey, action: actions.lightbox },
        { key: denchouConfig.toggleCustomDarkModeKey, action: actions.customDarkMode },
        { key: denchouConfig.toggleImageKey, action: actions.imageToggle }
      ];

      for (const item of shortcuts) {
        const keyStr = item.key;

        if (!keyStr) continue;

        const config = parseKeyConfig(keyStr);

        if (isKeyMatch(e, config)) {
          e.preventDefault();
          e.stopPropagation();

          item.action();
          break;
        }
      }
    };

    document.addEventListener('keydown', window.denchouBackKeyHandler);
  }

  // Init
  function denchouInitDeferred() {
    initializePictureVideos();
    if (!window.IS_MOBILE) {
      jitendexHover();
    }
    enableImageSwitching();
    enableLightbox();
    if (!window.IS_MOBILE) {
      enableCustomShortcuts();
    }
  }

  window.denchouInitDeferred = denchouInitDeferred;
  denchouInitDeferred();
})();
