document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').reset();
    document.getElementById('registrationForm').reset();
    document.getElementById('prijava').textContent = '';
    document.getElementById('regErrorMessage').textContent = '';
    document.getElementById('phoneErrorMessage').textContent = '';
    document.getElementById('dobErrorMessage').textContent = '';
    resetPasswordChecklist();

    IMask(
        document.getElementById('phone'),
        {
            mask: '000-000-000',
        }
    );

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const emailErrorMessage = document.getElementById('prijava');
        const passwordErrorMessage = document.getElementById('gesloError');
    
        emailErrorMessage.textContent = '';
        passwordErrorMessage.textContent = '';
    
        let hasError = false;
    
        if (email === '') {
            emailErrorMessage.textContent = 'Prosim, vnesite veljaven email.';
            hasError = true;
        } else if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
            emailErrorMessage.textContent = 'Prosim, vnesite veljaven email.';
            hasError = true; 
        }
    
        if (password === '') {
            passwordErrorMessage.textContent = 'Vnesi geslo.';
            hasError = true;
        }
    
        if (!hasError) {
            alert('Prijava uspešna!');
            document.getElementById('loginForm').reset();
        }
    });
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    document.getElementById('openRegister').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('registrationContainer').style.display = 'block';
        const emailErrorMessage = document.getElementById('prijava');
        const passwordErrorMessage = document.getElementById('gesloError');
    
        emailErrorMessage.textContent = '';
        passwordErrorMessage.textContent = '';
    });

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value; 
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
    
        const errorMessage = document.getElementById('regErrorMessage');
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const phoneErrorMessage = document.getElementById('phoneErrorMessage');
        const dobErrorMessage = document.getElementById('dobErrorMessage');
        const regPasswordMsg = document.getElementById('regPasswordMsg'); 
    
       
        errorMessage.textContent = '';
        firstNameError.textContent = '';
        lastNameError.textContent = '';
        phoneErrorMessage.textContent = '';
        dobErrorMessage.textContent = '';
        regPasswordMsg.textContent = '';
        let hasError = false;
       
        if (firstName === '') {
            firstNameError.textContent = 'Vnesi ime.';
            hasError = true;
        }
        if (lastName === '') {
            lastNameError.textContent = 'Vnesi priimek.';
            hasError = true;
        }
    
        if (email === '') {
            errorMessage.textContent += 'Vnesite e-pošto. ';
            hasError = true;
        } else if (!validateEmail(email)) {
            errorMessage.textContent += 'Prosim, vnesite veljaven email. ';
            hasError = true;
        }
    
        if (password === '') {
            regPasswordMsg.textContent += 'Vnesi geslo. ';
            hasError = true;
        }
        if (phone === '') {
            phoneErrorMessage.textContent = 'Vnesite telefonsko številko. ';
            hasError = true;
        } else if (!validatePhone(phone)) {
            phoneErrorMessage.textContent = 'Prosim, vnesite veljavno telefonsko številko (npr. 000-000-000). ';
            hasError = true;
        }
    
        if (dob === '') {
            dobErrorMessage.textContent = 'Vnesite datum rojstva. ';
            hasError = true;
        } else if (!validateDOB(dob)) {
            dobErrorMessage.textContent = 'Prosim, vnesite veljaven datum rojstva. ';
            hasError = true;
        }
    
        const lengthCheck = /.{8,}/.test(password);
        const uppercaseCheck = /[A-Z]/.test(password);
        const numberCheck = /\d/.test(password);
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        if (!lengthCheck || !uppercaseCheck || !numberCheck || !specialCharCheck) {
            regPasswordMsg.textContent += 'Upoštevaj zahteve gesla.';
            hasError = true;
        }
    
        if (hasError) {
            return;
        }
        document.getElementById('registrationForm').reset();
        alert('Registracija uspešna!');
        resetPasswordChecklist();
    
        document.getElementById('registrationContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';
    });
    
    function validatePhone(phone) {
        const regex = /^\d{3}-\d{3}-\d{3}$/;
        return regex.test(phone);
    }
    function validateDOB(dob) {
        const birthDate = new Date(dob);
        const today = new Date();

        return birthDate <= today && (today.getFullYear() - birthDate.getFullYear() < 150);
    }
    document.getElementById('backToLogin').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('registrationContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';
    
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('prijava').textContent = '';
    
        document.getElementById('registrationForm').reset();
        document.getElementById('regErrorMessage').textContent = '';
        document.getElementById('firstNameError').textContent = '';
        document.getElementById('lastNameError').textContent = '';
        document.getElementById('phoneErrorMessage').textContent = '';
        document.getElementById('dobErrorMessage').textContent = '';
        document.getElementById('regPasswordMsg').textContent = '';
    
        resetPasswordChecklist();
    });

    document.getElementById('reg-password').addEventListener('input', function() {
        const password = this.value;

        const lengthCheck = /.{8,}/.test(password);
        const uppercaseCheck = /[A-Z]/.test(password);
        const numberCheck = /\d/.test(password);
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        updateCheckItem('lengthCheck', lengthCheck);
        updateCheckItem('uppercaseCheck', uppercaseCheck);
        updateCheckItem('numberCheck', numberCheck);
        updateCheckItem('specialCharCheck', specialCharCheck);
    });

    function updateCheckItem(itemId, isValid) {
        const item = document.getElementById(itemId);
        if (isValid) {
            item.textContent = '✔️ ' + item.textContent.slice(2);
            item.classList.add('valid');
            item.classList.remove('invalid');
        } else {
            item.textContent = '❌ ' + item.textContent.slice(2);
            item.classList.add('invalid');
            item.classList.remove('valid');
        }
    }


function resetPasswordChecklist() {
    const checklistItems = ['lengthCheck', 'uppercaseCheck', 'numberCheck', 'specialCharCheck'];
    checklistItems.forEach(itemId => {
        const item = document.getElementById(itemId);
        item.textContent = '? ' + item.textContent.slice(2);
        item.classList.remove('valid', 'invalid');
    });
}
});