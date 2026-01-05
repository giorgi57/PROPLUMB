// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('#main-header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Service data
const serviceData = {
    'plumbing': {
        title: "სანტექნიკური მომსახურება",
        text: "წყალგაყვანილობის სრული სერვისი: თბილისში, ქუთაისსა და ბათუმში. ონკანების, მილებისა და სველი წერტილების მონტაჟი.",
        images: ["images/santeqnik.jpeg", "images/santeqnik.jpeg"]
    },
    'diagnostics': {
        title: "წერტილოვანი დიაგნოსტიკა",
        text: "გამსკდარი მილის პოვნა კედელსა და იატაკში ნგრევის გარეშე. ვმუშაობთ უახლესი აპარატურით მთელ საქართველოში.",
        images: ["images/santeqnik.jpeg", "images/santeqnik.jpeg"]
    },
    'heating': {
        title: "გათბობის სისტემები",
        text: "ცენტრალური გათბობის ქვაბების რემონტი და მონტაჟი. სისტემის გამორეცხვა და ოპტიმიზაცია.",
        images: ["images/santeqnik.jpeg", "images/santeqnik.jpeg", "images/santeqnik.jpeg"]
    },
    'drain': {
        title: "მილების წმენდა",
        text: "საკანალიზაციო მილების წმენდა და გაჭედილი სისტემების აღდგენა სპეციალური მექანიკური აპარატურით.",
        images: ["images/santeqnik.jpeg", "images/santeqnik.jpeg"]
    }
};

function openModal(id) {
    const data = serviceData[id];
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <h2 style="color:var(--dark); font-size: 2rem;">${data.title}</h2>
        <p style="margin: 20px 0; font-size: 1.1rem;">${data.text}</p>
        <div class="modal-img-grid">
            ${data.images.map(src => `<img src="${src}" alt="work">`).join('')}
        </div>
        <a href="tel:+995 598 55 37 55" class="btn btn-primary" style="margin-top: 30px; width:100%; text-align:center;">დარეკვა:+995 598 55 37 55</a>
    `;
    document.getElementById('serviceModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = (e) => {
    if (e.target.className === 'modal') closeModal();
};