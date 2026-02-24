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
