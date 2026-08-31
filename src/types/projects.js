import { storyRenderForm } from "./StoryRenderForm.js";
let projects = [];
let activeProjectId = null;
const projectContainerElement = document.querySelector(".projects");
export const loadProjects = () => {
    const savedProjects = localStorage.getItem("my_projects");
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    }
    else {
        projects = [{
                id: 1,
                name: "ManageMe",
                description: "Aplikacja na zaliczenie przedmiotu Prorgamowanie aplikacji webowych"
            }];
    }
    const saveActiveId = localStorage.getItem("active_project_id");
    if (saveActiveId) {
        activeProjectId = Number(saveActiveId);
    }
};
export const setActiveProject = (id) => {
    activeProjectId = id;
    localStorage.setItem("active_project_id", id.toString());
};
export const getActiveProject = () => {
    if (!activeProjectId)
        return null;
    return projects.find(project => project.id === activeProjectId) || null;
};
export const addProject = (project) => {
    projects.push(project);
    localStorage.setItem("my_projects", JSON.stringify(projects));
};
export const deleteProject = (idToDelete) => {
    projects = projects.filter(project => project.id !== idToDelete);
    localStorage.setItem("my_projects", JSON.stringify(projects));
};
export const renderProjects = (projectContainerElement, onEditRequest) => {
    projectContainerElement.innerHTML = "";
    projects.forEach((project, index) => {
        const projectElement = document.createElement("li");
        projectElement.innerText = `${project.name} `;
        if (project.id === activeProjectId) {
            projectElement.style.border = "3px solid black";
            const addStoryButton = document.createElement("button");
            addStoryButton.innerHTML = "Dodaj Story";
            projectElement.appendChild(addStoryButton);
            addStoryButton.addEventListener("click", (event) => {
                event.preventDefault();
                storyRenderForm(project.id);
            });
        }
        const selectElement = document.createElement("button");
        selectElement.innerHTML = "Wybierz";
        selectElement.addEventListener("click", (event) => {
            event.preventDefault();
            setActiveProject(project.id);
            renderProjects(projectContainerElement, onEditRequest);
        });
        const deleteElement = document.createElement("button");
        const editElement = document.createElement("button");
        deleteElement.innerHTML = "Usuń";
        deleteElement.id = project.id.toString();
        deleteElement.addEventListener("click", (event) => {
            event.preventDefault();
            const clickedButton = event.target;
            const clickedButtonId = Number(clickedButton.id);
            deleteProject(clickedButtonId);
            renderProjects(projectContainerElement, onEditRequest);
        });
        editElement.innerHTML = "Edytuj";
        editElement.id = project.id.toString();
        editElement.addEventListener("click", (event) => {
            event.preventDefault();
            onEditRequest(project);
        });
        projectElement.appendChild(selectElement);
        projectElement.appendChild(editElement);
        projectElement.appendChild(deleteElement);
        projectContainerElement.appendChild(projectElement);
    });
};
export const editProject = (idToEdit, newName, newDescription) => {
    projects = projects.map(project => {
        if (project.id === idToEdit) {
            return Object.assign(Object.assign({}, project), { name: newName, description: newDescription });
        }
        return project;
    });
    localStorage.setItem("my_projects", JSON.stringify(projects));
};
