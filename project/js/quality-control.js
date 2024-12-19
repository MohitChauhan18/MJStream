class QualityControl {
  constructor() {
    this.qualityBtn = document.getElementById('quality-btn');
    this.qualityMenu = document.getElementById('quality-menu');
    this.qualitySelect = document.getElementById('quality-select');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Toggle quality menu
    this.qualityBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleQualityMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.qualityBtn.contains(e.target) && !this.qualityMenu.contains(e.target)) {
        this.hideQualityMenu();
      }
    });
  }

  toggleQualityMenu() {
    const isVisible = this.qualityMenu.style.display === 'block';
    this.qualityMenu.style.display = isVisible ? 'none' : 'block';
  }

  hideQualityMenu() {
    this.qualityMenu.style.display = 'none';
  }

  updateQualityButtonText(height) {
    // Remove 'p' if it exists in the height value
    const cleanHeight = height.toString().replace('p', '');
    this.qualityBtn.textContent = cleanHeight; // Set the button text without 'p'
  }
}

const qualityControl = new QualityControl();
