/* --- 1. მობილური მენიუ (Burger Menu) --- */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
if(burger) {
    burger.onclick = () => {
        nav.classList.toggle('active'); // ხსნის/კეტავს მენიუს
        burger.innerHTML = nav.classList.contains('active') ? '✕' : '☰'; // ცვლის იკონკას
    };
}

/* --- 2. ღამის რეჟიმი (Theme Switcher) --- */
const themeBtn = document.getElementById('theme-toggle');
// ამოწმებს შენახულ თემას ბრაუზერში
if (localStorage.getItem('theme') === 'dark') document.body.setAttribute('data-theme', 'dark');

if(themeBtn) {
    themeBtn.onclick = () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    };
}

/* --- 3. სერვისებისა და ტექნიკის მოდალის მართვა (სამენოვანი ლოგიკით) --- */
function openModal(id) {
    const titleEl = document.getElementById('m-title');
    const descEl = document.getElementById('m-desc');
    const imgEl = document.getElementById('m-img');
    const modal = document.getElementById('modal');
    const currentLang = localStorage.getItem('selectedLanguage') || 'ka';

    let titleKey = '';
    let descKey = '';
    let imgUrl = '';

    // არჩევს სწორ გასაღებებს translations.js-ისთვის და შესაბამის სურათებს
    if (id === 'montage') {
        titleKey = 'srv-montage-title';
        descKey = 'srv-montage-desc';
        imgUrl = 'images/santeqnik.jpeg';
    } else if (id === 't1') {
        // თუ ვართ ტექნიკის გვერდზე
        if (document.title.includes('ტექნიკა') || document.title.includes('Equipment') || document.title.includes('Техника')) {
            titleKey = 'eq-t1-title';
            descKey = 'eq-t1-desc';
            imgUrl = 'images/2.jpg';
        } else { // თუ ვართ სერვისების გვერდზე
            titleKey = 'srv-leak-title';
            descKey = 'srv-leak-desc';
            imgUrl = 'images/santeqnik.jpeg';
        }
    } else if (id === 't2') {
        // თუ ვართ ტექნიკის გვერდზე
        if (document.title.includes('ტექნიკა') || document.title.includes('Equipment') || document.title.includes('Техника')) {
            titleKey = 'eq-t2-title';
            descKey = 'eq-t2-desc';
            imgUrl = 'images/2.jpg';
        } else { // თუ ვართ სერვისების გვერდზე
            titleKey = 'srv-sewage-title';
            descKey = 'srv-sewage-desc';
            imgUrl = 'images/santeqnik.jpeg';
        }
    }

    // ვინახავთ გასაღებებს ატრიბუტებში, რომ ენის ღილაკზე დაჭერისას რეალურ დროში გადათარგმნოს
    if(titleEl && descEl) {
        titleEl.setAttribute('data-modal-title', titleKey);
        descEl.setAttribute('data-modal-desc', descKey);

        // ვსვამთ ტექსტს მიმდინარე ენის მიხედვით translations ობიექტიდან
        if (typeof translations !== 'undefined' && translations[currentLang]) {
            titleEl.textContent = translations[currentLang][titleKey] || '';
            descEl.textContent = translations[currentLang][descKey] || '';
        }
    }
    
    // ფოტოს გამოჩენის გარანტირებული კოდი შენი ძველი ვერსიიდან
    if(imgEl && imgUrl) {
        imgEl.style.backgroundImage = `url('${imgUrl}')`;
        imgEl.style.backgroundSize = 'cover';
        imgEl.style.backgroundPosition = 'center';
        imgEl.style.display = 'block';
    }

    // მოდალის გამოჩენა და სკროლის გათიშვა
    if(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // აბრუნებს სკროლს
}

/* --- 4. გალერეის სურათის გადიდება --- */
function expandImage(card) {
    const imgDiv = card.querySelector('.card-img');
    if(!imgDiv) return;

    // იღებს ფოტოს მისამართს CSS-იდან
    const bg = window.getComputedStyle(imgDiv).backgroundImage;
    const url = bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    
    const imageModal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('expandedImg');
    
    if(imageModal && expandedImg) {
        expandedImg.src = url;
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeImage() {
    const imageModal = document.getElementById('imageModal');
    if(imageModal) imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/* --- 5. გარე დაჭერით დახურვა --- */
window.onclick = (e) => { 
    // თუ დავაჭირეთ მუქ ფონს (overlay), ვხურავთ ორივე ტიპის მოდალს
    if(e.target.classList.contains('modal-overlay')) {
        closeModal();
        closeImage();
    } 
}