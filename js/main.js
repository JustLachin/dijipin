// Three.js Background Animation
const initThreeJS = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background-animation').appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#ff1493',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;

        // Mouse effect
        particlesMesh.rotation.x += mouseY * 0.1;
        particlesMesh.rotation.y += mouseX * 0.1;

        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Form Handling
const initForm = () => {
    const form = document.getElementById('donationForm');
    const amountInput = document.getElementById('amount');
    const quickAmountButtons = document.querySelectorAll('.quick-amounts button');

    // Quick amount buttons
    quickAmountButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.dataset.amount;
            amountInput.value = amount;
            
            // Remove active class from all buttons
            quickAmountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            message: document.getElementById('message').value,
            amount: amountInput.value
        };

        // Here you would typically send the data to your backend
        console.log('Donation form submitted:', formData);
        
        // Show success message
        alert('Teşekkürler! Bağışınız alındı.');
        form.reset();
    });
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initForm();
}); 