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
  let mail = document.getElementById("email").value;
  if (!mail.match(regex)) {
    alert("Invalid email address");
    return false;
  } else {
    return true;
  }
}

function validateName() {
  let name = document.getElementById("name").value;
  let letters = /^[A-Za-z]+$/;
  if (!name.match(letters) || name.length >= 30) {
    alert("Name required");
    return false;
  } else {
    return true;
  }
}

function validateMessage() {
  let message = document.getElementById("message").value;
  if (message.length == 0 || " ") {
    alert("Message required");
    return false;
  } else {
    return true;
  }
}
