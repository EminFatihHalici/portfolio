let currentLine = 0;
let currentChar = 0;
let isDeleting = false;

const aboutMeData = [
  {
    icon: "<img src= 'assets/icons/location.svg'>",
    text: "<span>I am</span> located in Frankfurt am Main<span>...</span>",
  },

  {
    icon: "<img src= 'assets/icons/remote.svg'>",
    text: "<span>I am</span> open to work remote<span>...</span>",
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

function type() {
  let currentObject = aboutMeData[currentLine];
  let fullText = currentObject.text;
  let typeSpeed = 200;
  if (!isDeleting) {
    while (fullText.charAt(currentChar) === "<") {
      currentChar = fullText.indexOf(">", currentChar) + 1;
    }
    currentChar++;
  } else {
    currentChar--;
    if (fullText.charAt(currentChar) === ">") {
      currentChar = fullText.lastIndexOf("<", currentChar);
    }
  }
  let currentImg = currentObject.icon;
  document.getElementById("icon-container").innerHTML = currentImg;
  let currentText = fullText.substring(0, currentChar);
  document.getElementById("typewriter-text").innerHTML = currentText;
  if (!isDeleting && currentChar >= fullText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && currentChar <= 0) {
    isDeleting = false;
    currentLine++;
    if (currentLine === aboutMeData.length) {
      currentLine = 0;
    }
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}
