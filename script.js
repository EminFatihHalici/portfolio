let currentLine = 0;
let currentChar = 0;
let isDeleting = false;
let typeSpeed = 200;

const aboutMeData = [
  {
    icon: "<img src= 'assets/icons/location.svg'>",
    text: "I am located in Frankfurt am Main ...",
    highlight: "located in Frankfurt am Main",
  },

  {
    icon: "<img src= 'assets/icons/remote.svg'>",
    text: "I am open to work remote ...",
    highlight: "open to work remote",
  },
];

function init() {
  document.getElementById("defaultOpen").click();
  type();
}

function openProjects(evt, projectName) {
  let tabcontent = document.getElementsByClassName("project-info-section");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let = tablinks = document.getElementsByClassName("project-name");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(projectName).style.display = "flex";
  if (evt) {
    evt.currentTarget.classList.add("active");
  } else {
    document.getElementById("defaultOpen").classList.add("active");
  }
}

function updateInterface(obj, text) {
  const iconContainer = document.getElementById("icon-container");
  const textContainer = document.getElementById("typewriter-text");
  iconContainer.innerHTML = obj.icon;
  textContainer.innerHTML = getHighlightedHTML(obj.text, text, obj.highlight);
}

function getHighlightedHTML(fullText, currentTypedText, highlight) {
  const startIndex = fullText.indexOf(highlight);
  const highlightLength = highlight.length;
  if (startIndex === -1 || currentTypedText.length <= startIndex) {
    return currentTypedText;
  }
  const currentHighlight = currentTypedText.substring(
    startIndex,
    startIndex + highlightLength,
  );
  return currentTypedText.replace(
    currentHighlight,
    `<span class='about-me-text'>${currentHighlight}</span>`,
  );
}

function getNextIndex(index, deleting) {
  return deleting ? index - 1 : index + 1;
}

function handleState(index, text) {
  if (!isDeleting && index >= text.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && index <= 0) {
    isDeleting = false;
    currentLine++;
    if (currentLine === aboutMeData.length) {
      currentLine = 0;
    }
    typeSpeed = 400;
  } else typeSpeed = isDeleting ? 100 : 200;
}

function type() {
  let currentObject = aboutMeData[currentLine];
  let fullText = currentObject.text;
  currentChar = getNextIndex(currentChar, isDeleting);
  let visibleText = fullText.substring(0, currentChar);
  updateInterface(currentObject, visibleText);
  handleState(currentChar, fullText);
  setTimeout(type, typeSpeed);
}

function validateEmail() {
  let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let mail = document.getElementById("email");
  let mailError = document.getElementById("mail-error");
  let label = document.getElementById("mail-label");
  if (!mail.value.match(regex)) {
    label.classList.add("d-none");
    mailError.classList.remove("d-none");
    mail.classList.add("error-border");
    mail.classList.remove("success-checked");
    return false;
  } else {
    label.classList.remove("d-none");
    mailError.classList.add("d-none");
    mail.classList.remove("error-border");
    mail.value.length > 0
      ? mail.classList.add("success-checked")
      : mail.classList.remove("success-checked");
    return true;
  }
}

function validateName() {
  let name = document.getElementById("name");
  let nameError = document.getElementById("name-error");
  let label = document.getElementById("name-label");
  let letters = /^[A-Z-a-zÄÖÜäöüß\p{M}]{3,30}( [A-Z-a-zÄÖÜäöüß\p{M}]{3,30})?$/u;
  if (!name.value.match(letters)) {
    label.classList.add("d-none");
    nameError.classList.remove("d-none");
    name.classList.add("error-border");
    name.classList.remove("success-checked");
    return false;
  } else {
    name.value.length > 0
      ? name.classList.add("success-checked")
      : name.classList.remove("success-checked");
    label.classList.remove("d-none");
    nameError.classList.add("d-none");
    name.classList.remove("error-border");
    return true;
  }
}

function validateMessage() {
  let message = document.getElementById("message");
  let messageError = document.getElementById("message-error");
  let label = document.getElementById("message-label");
  if (message.value.trim().length === 0) {
    message.classList.remove("success-checked");
    label.classList.add("d-none");
    messageError.classList.remove("d-none");
    message.classList.add("error-border");
    return false;
  } else {
    message.value.length > 0
      ? message.classList.add("success-checked")
      : message.classList.remove("success-checked");
    label.classList.remove("d-none");
    messageError.classList.add("d-none");
    message.classList.remove("error-border");
    return true;
  }
}

function validatePrivacy() {
  let privacyCheckbox = document.getElementById("privacy");
  let errorCheckbox = document.getElementById("privacy-error");
  let checkboxIcon = document.getElementById("checkbox-icon");
  if (!privacyCheckbox.checked) {
    errorCheckbox.classList.remove("d-none");
    checkboxIcon.classList.add("error-circle");
    return false;
  } else {
    errorCheckbox.classList.add("d-none");
    checkboxIcon.classList.remove("error-circle");
    return true;
  }
}

function validateForm() {
  let nameOk = validateName();
  let emailOk = validateEmail();
  let messageOk = validateMessage();
  let privacyOk = validatePrivacy();
  let btn = document.getElementById("send-btn");

  btn.disabled = !(nameOk && emailOk && messageOk && privacyOk);
  if (nameOk && emailOk && messageOk && privacyOk) {
    btn.classList.add("enabled");
  } else {
    btn.classList.remove("enabled");
  }
}

async function sendMail(event) {
  event.preventDefault();
  let btn = document.getElementById("send-btn");
  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    btn.disabled = true;

    let response = await fetch("contact_form_mail.php", {
      method: "POST",
      headers: { "Content-Typ": "application/json" },
      body: JSON.stringify(data),
    });

    let result = await response.json();

    if (result.success) {
      alert("well done");
      event.target.reset();
      validateForm();
    } else {
      alert("not well done" + result.error);
    }
  } catch (error) {
    alert("server issues");
  } finally {
    btn.disabled = false;
  }
}
