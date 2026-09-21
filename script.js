(() => {
  const state = {
    material: 'waterproof',
    color: 'white',
    detailColor: '#25d8f0',
    design: 'Tropical Hibiscus',
    designImage: 'design-tropical-hibiscus.jpg',
    view: 'front',
    logoStyle: 'front-logo'
  };

  const root = document.documentElement;
  const bagPreview = document.getElementById('bagPreview');
  const bagDesignImage = document.getElementById('bagDesignImage');
  const rotateBag = document.getElementById('rotateBag');

  const colorMap = {
    white: '#f2f2ef',
    lime: '#d8ff65',
    pink: '#ff9dc5',
    aqua: '#baf7ff',
    black: '#171b1b',
    sand: '#d7c39a'
  };

  function activate(selector, el) {
    document.querySelectorAll(selector).forEach(x => x.classList.remove('active'));
    el.classList.add('active');
  }

  function renderBag() {
    bagDesignImage.setAttribute('href', state.designImage);
    bagDesignImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    root.style.setProperty('--detail-color', state.detailColor);

    const glow = document.querySelector('.bag-glow');
    if (glow) {
      glow.setAttribute('fill', state.detailColor + '40');
    }

    bagPreview.className = 'bag-preview-svg-wrap';
    bagPreview.classList.add(state.view === 'back' ? 'back-view' : 'front-view');
    if (state.logoStyle === 'front-logo') bagPreview.classList.add('logo-front');
    if (state.logoStyle === 'back-logo') bagPreview.classList.add('logo-back');
    if (state.logoStyle === 'icon-only') bagPreview.classList.add('icon-only');

    rotateBag.textContent = state.view === 'front' ? 'ROTATE TO BACK' : 'ROTATE TO FRONT';

    // Subtle preview reaction for material/color choice.
    const image = document.getElementById('bagDesignImage');
    let filters = '';
    if (state.material === 'coffee') filters += ' saturate(0.88) sepia(0.16) ';
    if (state.material === 'banner') filters += ' contrast(1.06) brightness(1.03) ';
    if (state.color === 'black') filters += ' brightness(0.7) ';
    if (state.color === 'pink') filters += ' hue-rotate(-8deg) saturate(1.08) ';
    if (state.color === 'aqua') filters += ' hue-rotate(6deg) saturate(1.08) ';
    if (state.color === 'lime') filters += ' hue-rotate(18deg) saturate(1.04) ';
    if (state.color === 'sand') filters += ' sepia(0.12) brightness(1.01) ';
    image.style.filter = filters || 'none';

    const bodyStroke = document.querySelector('.bag-body-stroke');
    if (bodyStroke) bodyStroke.style.stroke = colorMap[state.color] || '#0b0f0f';
  }

  document.querySelectorAll('[data-material]').forEach(btn => btn.addEventListener('click', () => {
    state.material = btn.dataset.material;
    activate('[data-material]', btn);
    renderBag();
  }));

  document.querySelectorAll('[data-color]').forEach(btn => btn.addEventListener('click', () => {
    state.color = btn.dataset.color;
    activate('[data-color]', btn);
    renderBag();
  }));

  document.querySelectorAll('.detail-swatch').forEach(btn => btn.addEventListener('click', () => {
    state.detailColor = btn.dataset.detail;
    document.getElementById('customDetailColor').value = state.detailColor;
    activate('.detail-swatch', btn);
    renderBag();
  }));

  document.getElementById('customDetailColor').addEventListener('input', (e) => {
    state.detailColor = e.target.value;
    document.querySelectorAll('.detail-swatch').forEach(x => x.classList.remove('active'));
    renderBag();
  });

  document.querySelectorAll('.design-thumb').forEach(btn => btn.addEventListener('click', () => {
    state.design = btn.dataset.design;
    state.designImage = btn.dataset.image;
    activate('.design-thumb', btn);
    renderBag();
  }));

  document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => {
    state.view = btn.dataset.view;
    activate('[data-view]', btn);
    renderBag();
  }));

  document.querySelectorAll('[data-logo-style]').forEach(btn => btn.addEventListener('click', () => {
    state.logoStyle = btn.dataset.logoStyle;
    activate('[data-logo-style]', btn);
    renderBag();
  }));

  rotateBag.addEventListener('click', () => {
    state.view = state.view === 'front' ? 'back' : 'front';
    document.querySelectorAll('[data-view]').forEach(btn => btn.classList.toggle('active', btn.dataset.view === state.view));
    renderBag();
  });

  function syncForm() {
    document.getElementById('formBoardType').value = document.getElementById('boardType').value;
    document.getElementById('formBoardSize').value = document.getElementById('boardSize').value;
    document.getElementById('formMaterial').value = state.material;
    document.getElementById('formColor').value = state.color;
    document.getElementById('formDetailColor').value = state.detailColor;
    document.getElementById('formPattern').value = state.design;
    document.getElementById('formBagView').value = state.view;
    document.getElementById('formLogoStyle').value = state.logoStyle;
  }

  const artworkUpload = document.getElementById('artworkUpload');
  artworkUpload.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.design = 'Custom Upload';
      state.designImage = reader.result;
      document.querySelectorAll('.design-thumb').forEach(x => x.classList.remove('active'));
      renderBag();
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('generateDesign').addEventListener('click', () => {
    syncForm();
    document.getElementById('generatedMessage').textContent = 'DESIGN READY — SAVE IT BELOW TO JOIN THE NEXT BATCH.';
    document.querySelector('.save').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('nextBatchForm').addEventListener('submit', syncForm);
  renderBag();
})();
