import * as ProjectManager from "./types/projects.js";
import { renderUser } from "./types/userRender.js";
import { User } from "./types/user.js";
import { loadStories } from "./types/story.js";
import { renderStories } from "./types/storyRender.js";
const addButtonElement = document.querySelector("#add");
const projectNameInput = document.querySelector("#name");
const projectDescriptionInput = document.querySelector("#description");
const projectContainerElement = document.querySelector(".projects");
const userCointainer = document.querySelector(".user");
let editingProjectId = null;
ProjectManager.loadProjects();
loadStories();
const handleEditRequest = (project) => {
    projectNameInput.value = project.name;
    projectDescriptionInput.value = project.description;
    editingProjectId = project.id;
    addButtonElement.innerText = "Zapisz zmiany";
};
addButtonElement === null || addButtonElement === void 0 ? void 0 : addButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    if (editingProjectId !== null) {
        ProjectManager.editProject(editingProjectId, projectNameInput.value, projectDescriptionInput.value);
        editingProjectId = null;
        addButtonElement.innerHTML = "Dodaj";
    }
    else {
        ProjectManager.addProject({ id: Date.now(), name: projectNameInput.value, description: projectDescriptionInput.value });
    }
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    ProjectManager.renderProjects(projectContainerElement, handleEditRequest);
});
ProjectManager.renderProjects(projectContainerElement, handleEditRequest);
const loggedUser = new User(1, "Jan", "Nowak");
renderUser(loggedUser, userCointainer);
