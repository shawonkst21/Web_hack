/*=============== SHOW MENU ===============*/

/*===== MENU SHOW =====*/
/* Validate if constant exists */

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

/*==================== REMOVE MENU MOBILE ====================*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*==================== CHANGE BACKGROUND HEADER ====================*/
function screollHeader(){
    const header=document.getElementById('header');
    if(this.scrollY>=80)header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}

window.addEventListener('scroll',screollHeader);
/*==================== SHOW SCROLL UP ====================*/
function screollUp(){
    const scrollup=document.getElementById('scroll-up');
    if(this.scrollY>=350)scrollup.classList.add('show-scroll');
    else scrollup.classList.remove('show-scroll');
}

window.addEventListener('scroll',screollUp);
/*==================== ABOUT TABS ====================*/
const tabs=document.querySelectorAll('[data-target]');
const tabsContent=document.querySelectorAll('[data-content]');
tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
        const target=document.querySelector(tab.dataset.target);
        tabsContent.forEach(tabContent=>{
            tabContent.classList.remove('tab__active');
        });
        target.classList.add('tab__active');

        tabs.forEach(tab=>{
            tab.classList.remove('tab__active');
        });
        tab.classList.add('tab__active');
    });
});
/*=============== CONTACT FORM =============== */
const contactForm=document.getElementById('contact-form'),
    contactName=document.getElementById('contact-name'),
    contactEmail=document.getElementById('contact-email'),
    contactMessage=document.getElementById('contact-message'),
    contactSubject=document.getElementById('contact-subject'),
    errorMessage=document.getElementById('error-message');
   const sendEmail=(e)=>{
       e.preventDefault();
         if(contactName.value==='' ||
             contactEmail.value==='' ||
              contactMessage.value==='' ||
               contactSubject.value===''){
              errorMessage.style.display='block';
              errorMessage.innerHTML='Please fill in all fields';
              setTimeout(()=>{
                errorMessage.style.display='none';
              },3000);
   }
   else{

         emailjs.sendForm('service_rc1sus3',
             'template_f9m554c',
              '#contact-form',
            'QUgC9gQG9XUmIn_sW')
            .then(()=>{
                errorMessage.classList.add('color-first');
                print('Message sent successfully ✔️');
                errorMessage.textContent='Message sent successfully ✔️';
                errorMessage.style.display='block';
                // errorMessage.style.color='green';
                setTimeout(()=>{
                    errorMessage.textContent='';
                },5000);
            },(error)=>{
                alert('Oops! Something went wrong. Please try again later.');
            });
           contactName.value='';
           contactEmail.value='';
           contactMessage.value='';
           contactSubject.value='';
   }
};
   contactForm.addEventListener('submit',sendEmail);