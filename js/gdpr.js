class GDPR {
    constructor() {
        this.bindEvents();
 
        if (this.cookieStatus() !== 'accept' && this.cookieStatus() !== 'reject') {
            this.showGDPR();
        }
    }
 
    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.hideGDPR();
        });
 
        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.hideGDPR();
        });
    }
 
    cookieStatus(status) {
        if (status) localStorage.setItem('gdpr-consent-choice', status);
        return localStorage.getItem('gdpr-consent-choice');
    }
 
    hideGDPR() {
        document.querySelector('.gdpr-consent').classList.add('hide');
        document.querySelector('.gdpr-consent').classList.remove('show');
    }
 
    showGDPR() {
        document.querySelector('.gdpr-consent').classList.add('show');
    }
}
 
const gdpr = new GDPR();    