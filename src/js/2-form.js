const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const formElem = document.querySelector('.feedback-form');

populateForm();

formElem.addEventListener('input', handleFormInput);
formElem.addEventListener('submit', handleFormSubmit);

//===================================================================//
function handleFormInput(event) {
  event.preventDefault();

  const { name, value } = event.target;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//===================================================================//
function handleFormSubmit(event) {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formElem.reset();
  formData.email = '';
  formData.message = '';
}
//==================SAVE_DATA============================//
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    if (parsedData.email) {
      formElem.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }

    if (parsedData.message) {
      formElem.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (err) {
    console.error('Failed to parse saved data', err);
  }
}
//=====================PLACEHOLDER======================//

const textmail = document.getElementById('email');
const textarea = document.getElementById('message');

textmail.addEventListener('focus', () => {
  textmail.placeholder = 'Type area';
});

textmail.addEventListener('blur', () => {
  textmail.placeholder = '';
});

textarea.addEventListener('focus', () => {
  textarea.placeholder = 'Type area';
});

textarea.addEventListener('blur', () => {
  textarea.placeholder = '';
});
