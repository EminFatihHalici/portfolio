let currentLine = 0;
let currentChar = 0;
let isDeleting = false;

const aboutMeData = [
  {
    icon: "assets/icons/location.svg",
    text: "I am located in Frankfurt am Main...",
  },

  {
    icon: "assets/icons/remote.svg",
    text: "I am open to work remote...",
  },
];

function init() {
  document.getElementById("defaultOpen").click();
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

function type() {
  let currentObject = aboutMeData[currentLine];
  let fullText = currentObject.text;
  let currentText = fullText.substring(0, currentChar);
  document.getElementById("typewriter-text").innerHTML = currentText;
}
