let currentLine = 0;
let currentChar = 0;
let isDeleting = false;
let typeSpeed = 200;

const aboutMeData = [
  {
    icon: "<img src= 'assets/icons/location.svg'>",
    text: "I am <span class='about-me-text'> located in Frankfurt am Main </span> ...",
  },

  {
    icon: "<img src= 'assets/icons/remote.svg'>",
    text: "I am <span class='about-me-text'> open to work remote </span> ...",
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

function updateInterface(icon, text) {
  let iconContainer = document.getElementById("icon-container");
  iconContainer.innerHTML = icon;

  let textContainer = document.getElementById("typewriter-text");
  textContainer.innerHTML = text;
}

function getNextIndex(index, text, deleting) {
  if (!deleting) {
    while (text.charAt(index) === "<") {
      index = text.indexOf(">", index) + 1;
    }
    index++;
  } else {
    index--;
    if (text.charAt(index) === ">") {
      index = text.lastIndexOf("<", index);
    }
  }
  return index;
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
  let fullIcon = currentObject.icon;
  let fullText = currentObject.text;
  currentChar = getNextIndex(currentChar, fullText, isDeleting);
  let visibleText = fullText.substring(0, currentChar);
  updateInterface(fullIcon, visibleText);
  handleState(currentChar, fullText);
  setTimeout(type, typeSpeed);
}
