var JS = JS || {};

JS.scripts = function () {
  this.initialize();
};

JS.scripts.prototype = {
  initialize: function () {
    this.basicData();
    this.skillData();
    this.contactData();
    this.educationData();
    this.experienceData();
    this.projectData();
    this.certificateData();
    this.achievementData();
  },
  basicData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        $("#name").append(result.name);
        $("#title").append(result.title);
      },
    });
  },
  skillData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let skills = _.get(result, "Professional Skills");
        _.map(_.keys(skills), (skill) => {
          let html = `<h5>${skill}</h5>`;
          _.map(skills[skill], (s) => (html += `<span>${s}</span> `));
          $("#skills").append(html);
        });
      },
    });
  },
  contactData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let contacts = _.get(result, "Contacts");
        _.map(contacts, (contact) => {
          let html = `<h5><i class="${contact.icon}"></i> <a href="${contact.link}">${contact.label}</a></h5>`;
          $("#contacts").append(html);
        });
      },
    });
  },
  educationData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let educations = _.get(result, "Education");
        _.map(educations, (education) => {
          let html = `<div class="row">
					<div class="col-8">
						${education.title}
						<p class="text-secondary">
								${education.subtitle}
						</p>
					</div>
					<div class="col-3">
						<p class="float-right">${education.duration}</p>
					</div>
				</div>`;
          $("#education").append(html);
        });
      },
    });
  },
  experienceData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let experiences = _.get(result, "Work Experience");
        _.map(experiences, (experience) => {
          let expDesc = "<ul style='margin-top: -2%;'>";
          experience.desc.forEach((desc) => (expDesc += `<li>${desc}</li>`));
          expDesc += `<li>${experience.techStack.join(", ")}</li></ul>`;
          let html = `<div class="row">
					<div class="col-7">
						${experience.subtitle}
						<p class="text-secondary">
								${experience.title}
            </p>
            ${expDesc}
					</div>
					<div class="col-4">
						<p class="float-right">${experience.duration}</p>
					</div>
				</div>`;
          $("#experience").append(html);
        });
      },
    });
  },
  projectData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let projects = _.get(result, "Projects");
        _.map(projects, (project) => {
          let projectList = "";
          project.desc.forEach((item) => (projectList += `<li>${item}</li>`));
          let html = `<div class="row">
					<div class="col-7">
						${project.title}
						<ul>
							${projectList}
						</ul>
					</div>
					<div class="col-4">
						<p class="float-right">${project.duration}</p>
					</div>
				</div>`;
          $("#projects").append(html);
        });
      },
    });
  },
  certificateData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let certificates = _.get(result, "Certifications");
        _.map(certificates, (certificate) => {
          let html = `<div class="row">
					<div class="col-8">
						${certificate.title}
					</div>
					<div class="col-3">
						${certificate.duration}
					</div>
				</div>`;
          $("#certificates").append(html);
        });
      },
    });
  },
  achievementData: function () {
    $.ajax({
      url: "/resume/data.json",
      success: function (result) {
        let achievements = _.get(result, "Achievements");
        let achievementsUi = "";
        achievements.forEach((item) => (achievementsUi += `<li>${item}</li>`));
        let html = `<ul>${achievementsUi}</ul>`;
        $("#achievements").append(html);
      },
    });
  },
};
