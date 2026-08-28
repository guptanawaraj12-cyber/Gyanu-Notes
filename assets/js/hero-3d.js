// Gyanu Notes — 3D hero scene (floating note cards)
// Requires three.js loaded before this script.

(function () {
  var container = document.getElementById('hero-3d-canvas');
  if (!container || typeof THREE === 'undefined') return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var width = container.clientWidth;
  var height = container.clientHeight;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 9);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  var ambient = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambient);
  var keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);
  var rimLight = new THREE.DirectionalLight(0x7b8fff, 0.6);
  rimLight.position.set(-5, -3, -4);
  scene.add(rimLight);

  var accentColor = 0x3654f4;
  var cardGroup = new THREE.Group();
  scene.add(cardGroup);

  var cardCount = 7;
  var cards = [];

  for (var i = 0; i < cardCount; i++) {
    var isAccent = i % 3 === 0;
    var geometry = new THREE.BoxGeometry(1.6, 2.1, 0.08);
    var material = new THREE.MeshStandardMaterial({
      color: isAccent ? accentColor : 0xffffff,
      roughness: 0.35,
      metalness: 0.05,
      emissive: isAccent ? 0x14204d : 0x000000,
      emissiveIntensity: isAccent ? 0.15 : 0
    });
    var edges = new THREE.EdgesGeometry(geometry);
    var lineMat = new THREE.LineBasicMaterial({ color: isAccent ? 0xffffff : 0xd6d8e4, transparent: true, opacity: 0.6 });

    var mesh = new THREE.Mesh(geometry, material);
    var wireframe = new THREE.LineSegments(edges, lineMat);
    mesh.add(wireframe);

    var angle = (i / cardCount) * Math.PI * 2;
    var radius = 3.2;
    mesh.position.set(
      Math.cos(angle) * radius * 0.9,
      Math.sin(angle) * radius * 0.55,
      Math.sin(angle * 2) * 1.4
    );
    mesh.rotation.set(
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 0.4
    );

    mesh.userData.baseY = mesh.position.y;
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.floatSpeed = 0.6 + Math.random() * 0.4;

    cards.push(mesh);
    cardGroup.add(mesh);
  }

  var mouseX = 0;
  var mouseY = 0;
  var targetRotX = 0;
  var targetRotY = 0;

  container.addEventListener('mousemove', function (e) {
    var rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetRotY = mouseX * 0.35;
    targetRotX = mouseY * -0.2;
  });

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y + t * 0.05 - cardGroup.rotation.y * 0) * 0.02;
      cardGroup.rotation.y = cardGroup.rotation.y * 0.96 + (targetRotY + t * 0.08) * 0.04;
      cardGroup.rotation.x += (targetRotX - cardGroup.rotation.x) * 0.04;

      cards.forEach(function (mesh) {
        mesh.position.y = mesh.userData.baseY + Math.sin(t * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.25;
        mesh.rotation.z += 0.0015;
      });
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', function () {
    var w = container.clientWidth;
    var h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();