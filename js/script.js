function openSubjects(grade) {
  const popup = document.getElementById("subjectPopup");
  const popupTitle = document.getElementById("popupTitle");
  const subjectList = document.getElementById("subjectList");

  popupTitle.textContent = grade + " - Select Subject";
  subjectList.innerHTML = ""; // clear previous list

  let subjects = [];

  if (grade === "Grade 8" || grade === "Grade 9" || grade === "Grade 10") {
    subjects = ["Science", "Mathematics", "English"];
  } 
  else if (grade === "Grade 11" || grade === "Grade 12") {
    subjects = ["Physics", "Chemistry", "Biology", "Mathematics"];
  }

  subjects.forEach(subject => {
    const link = document.createElement("a");
    link.href = ${grade.replace(" ", "").toLowerCase()}-${subject.toLowerCase()}.html;
    link.textContent = subject;
    link.className = "subject-link";
    subjectList.appendChild(link);
  });

  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById("subjectPopup").style.display = "none";
}