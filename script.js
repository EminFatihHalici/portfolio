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
  let iconContainer = document.getElementById("icon-container");
  iconContainer.innerHTML = obj.icon;
  let startIndex = obj.text.indexOf(obj.highlight);
  let highlightLength = obj.highlight.length;
  let currentHighlight = text.substring(
    startIndex,
    startIndex + highlightLength,
  );
  let html =
    startIndex !== -1 && text.length > startIndex
      ? text.replace(
          currentHighlight,
          `<span class='about-me-text'>${currentHighlight}</span>`,
        )
      : text;

  document.getElementById("typewriter-text").innerHTML = html;
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
