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

/* --- 3. მოდალური ფანჯრის მონაცემები --- */
const data = {
    't1': { 
        title: 'თერმოკამერა', 
        desc: 'წერტილოვანი დიაგნოსტიკა წყლის გაჟონვის საპოვნელად.', 
        img: 'images/2.jpg' 
    },
    't2': { 
        title: 'ელექტრო ტროსი', 
        desc: 'მილების გაწმენდა თანამედროვე აპარატურით.', 
        img: 'images/santeqnik.jpeg' 
    },
    'montage': { 
        title: 'მილების მონტაჟი', 
        desc: 'ხარისხიანი მონტაჟი და გარანტია სამუშაოზე.', 
        img: 'images/santeqnik.jpeg' 
    }
};

/* --- 4. სერვისების მოდალის მართვა --- */
function openModal(id) {
    const item = data[id];
    if(item) {
        const titleEl = document.getElementById('m-title');
        const descEl = document.getElementById('m-desc');
        const imgEl = document.getElementById('m-img');
        const modal = document.getElementById('modal');

        if(titleEl) titleEl.innerText = item.title;
        if(descEl) descEl.innerText = item.desc;
        
        if(imgEl) {
            // აქ ვუწერთ ფოტოს მისამართს და სტილს, რომ გარანტირებულად გამოჩნდეს
            imgEl.style.backgroundImage = `url('${item.img}')`;
            imgEl.style.backgroundSize = 'cover';
            imgEl.style.backgroundPosition = 'center';
            imgEl.style.display = 'block'; // აიძულებს ბლოკს გამოჩნდეს
        }

        if(modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // თიშავს საიტის სკროლს
        }
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // აბრუნებს სკროლს
}

/* --- 5. გალერეის სურათის გადიდება --- */
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

/* --- 6. გარე დაჭერით დახურვა --- */
window.onclick = (e) => { 
    // თუ დავაჭირეთ მუქ ფონს (overlay), ვხურავთ ორივე ტიპის მოდალს
    if(e.target.classList.contains('modal-overlay')) {
        closeModal();
        closeImage();
    } 
}