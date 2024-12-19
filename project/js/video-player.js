class VideoPlayer {
  constructor() {
    this.video = document.getElementById('video');
    this.qualitySelect = document.getElementById('quality-select');
    this.hls = null;

    this.initialize();
  }

  initialize() {
    if (Hls.isSupported()) {
      this.setupHLS();
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.setupNativeHLS();
    } else {
      console.error('HLS is not supported in your browser.');
    }
  }

  setupHLS() {
    const proxyUrl = 'https://mjstream.onrender.com/proxy?url='; // Your CORS proxy URL
    const targetUrl = 'https://rriptv.top/m3u8/V/m3u8.php/starhindi.m3u8'; // The original HLS stream URL

    this.hls = new Hls();
    this.hls.loadSource(proxyUrl + encodeURIComponent(targetUrl)); // Use the proxy to load the source
    this.hls.attachMedia(this.video);

    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      this.setupQualityLevels(data.levels);
    });

    this.hls.on(Hls.Events.ERROR, (event, data) => {
      console.error('HLS.js error:', data);
    });

    this.qualitySelect.addEventListener('change', () => {
      const selectedIndex = parseInt(this.qualitySelect.value);
      this.hls.currentLevel = selectedIndex;
      const selectedQuality = this.hls.levels[selectedIndex].height;

      // Update button text based on selected quality
      if (selectedQuality) {
        // Remove 'p' from height when updating button text
        qualityControl.updateQualityButtonText(`${selectedQuality}`); // Just the number, no 'p'
      } else {
        qualityControl.updateQualityButtonText('Auto Quality');
      }
    });
  }

  setupNativeHLS() {
    this.video.src = 'https://dai.fancode.com/primary/113543_english_hls_7904adfreeta-di/index.m3u8';
  }

  setupQualityLevels(qualities) {
    // Clear existing options
    this.qualitySelect.innerHTML = '';

    // Check if there are any quality levels available
    if (qualities.length === 0) {
      // No quality levels available
      this.qualitySelect.innerHTML = '<option value="0">No quality options available</option>';
      qualityControl.updateQualityButtonText('No quality options');
      return;
    }

    // If there is only one quality level, set it as "Auto Quality"
    if (qualities.length === 1) {
      this.qualitySelect.innerHTML = '<option value="0">Auto Quality</option>';
      qualityControl.updateQualityButtonText('Auto Quality'); // Set button text without "p"
      return;
    }

    // Add quality options for multiple qualities
    qualities.forEach((level, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${level.height}p (${Math.round(level.bitrate / 1000)} kbps)`; // Show 'p' in dropdown
      this.qualitySelect.appendChild(option);
    });

    // Set default quality to the first available option
    this.qualitySelect.value = 0; // Select the first option
    qualityControl.updateQualityButtonText(`${qualities[0].height}`); // Set button text without 'p'
  }
}

// Initialize video player
const videoPlayer = new VideoPlayer();
