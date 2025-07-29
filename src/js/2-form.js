let formData = {
    email: '',
    message: '',
};

const formElem = document.querySelector('.feedback-form');

formElem.addEventListener('input', e => {
    const email = e.currentTarget.elements.email.value;
    const message = e.currentTarget.elements.message.value;
    
    formData.email = email;
    formData.message = message;

    saveToLS('feedbackFromState', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedbackFromState');
  try {
    formData = lsData;
    formElem.elements.email.value = lsData.email || '';
    formElem.elements.message.value = lsData.message || '';
  } catch {}
});


formElem.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = formElem.elements.email.value.trim();
    const messageValue = formElem.elements.message.value.trim();
    
    if(emailValue === '' || messageValue === '') {
        alert('Fill please all fields');
    }else {
            formData.email = emailValue;
            formData.message = messageValue;
            saveToLS('feedbackFromState', formData);
        };
        
    console.dir(formData);
    localStorage.removeItem('feedbackFromState');
    formElem.reset();
});


function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}