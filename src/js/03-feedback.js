import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector(".feedback-form"),
};

const STORAGE_KEY = "feedback-form-state";

const formData = {};

refs.form.addEventListener("input", throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
    e.preventDefault();
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

};

function onLoadFormData() {

    const savedFormData = localStorage.getItem(STORAGE_KEY);

    if (savedFormData) {
        const formData = JSON.parse(savedFormData) || {email: "", message: ""};
        const { email, message } = formData;
        refs.form.elements.email.value = email;
        refs.form.elements.message.value = message;
    };
};

onLoadFormData();

function onFormSubmit(e) {
    e.preventDefault();
    
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};