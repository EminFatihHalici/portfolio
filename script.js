function openProjects(evt, projectName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("project-info-section");
  for (i = 0, i < tabcontent.length; i++; ) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("project-name");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(projectName).style.display = "block";
  evt.currentTarget.className += "active";
}
