import { stories, Story, getStories } from "./story.js";
import { renderStories } from "./storyRender.js";
import { storyRenderForm } from "./storyRenderForm.js";

const storiesElementContainer = document.querySelector(".stories") as HTMLElement;
const allStories = getStories();

export interface Project {
    id : number,
    name : string,
    description : string,
}

let projects : Project[] = [];
let activeProjectId: number | null = null;
const projectContainerElement = document.querySelector(".projects") as HTMLElement;

export const loadProjects = () => {
    const savedProjects = localStorage.getItem("my_projects");
    if(savedProjects) {
        projects = JSON.parse(savedProjects);
    } else {
        projects = [{
            id: 1,
            name: "ManageMe",
            description: "Aplikacja na zaliczenie przedmiotu Prorgamowanie aplikacji webowych"
        }];
    }
    const saveActiveId = localStorage.getItem("active_project_id");
    if(saveActiveId) {
        activeProjectId = Number(saveActiveId);
    }
}

export const setActiveProject = (id: number) => {
    activeProjectId = id;
    localStorage.setItem("active_project_id", id.toString());
}

export const getActiveProject = (): Project | null => {
    if(!activeProjectId) return null;
    return projects.find(project => project.id === activeProjectId) || null;
}

export const addProject = (project : Project) => {
    projects.push(project);
    localStorage.setItem("my_projects", JSON.stringify(projects));
}

export const deleteProject = (idToDelete: number) => {
    projects = projects.filter(project => project.id !== idToDelete);
    localStorage.setItem("my_projects", JSON.stringify(projects));
}

export const renderProjects =(projectContainerElement:HTMLElement, onEditRequest: (project: Project) => void) => {
    projectContainerElement.innerHTML = "";
    projects.forEach((project, index) => {
        const projectElement = document.createElement("li");
        projectElement.innerText = `${project.name} `;
        if(project.id === activeProjectId) {
            projectElement.style.border="3px solid black";

            const currentAllStories = getStories();
            const currentProjectStories = currentAllStories.filter(story => story.projectId === activeProjectId);
            renderStories(storiesElementContainer, currentProjectStories);

            const addStoryButton = document.createElement("button");
            addStoryButton.innerHTML="Dodaj Story";
            projectElement.appendChild(addStoryButton);
            addStoryButton.addEventListener("click",(event:Event)=>{
                event.preventDefault();
                storyRenderForm(project.id);
            })
        }
        const selectElement = document.createElement("button");
        selectElement.innerHTML = "Wybierz";
        selectElement.addEventListener("click",(event: Event) => {
            event.preventDefault();
            setActiveProject(project.id);
            const currentAllStories = getStories();   
            const currentProjectStories = currentAllStories.filter(story => story.projectId === project.id)
            renderStories(storiesElementContainer, currentProjectStories);
            renderProjects(projectContainerElement,onEditRequest);
        })
        const deleteElement = document.createElement("button");
        const editElement = document.createElement("button");
        deleteElement.innerHTML = "Usuń";
        deleteElement.id = project.id.toString();
        deleteElement.addEventListener("click", (event: Event) => {
            event.preventDefault();
            const clickedButton = event.target as HTMLButtonElement;
            const clickedButtonId = Number(clickedButton.id);
            deleteProject(clickedButtonId);
            renderProjects(projectContainerElement, onEditRequest);
        })
        editElement.innerHTML = "Edytuj";
        editElement.id = project.id.toString();
        editElement.addEventListener("click", (event : Event) => {
            event.preventDefault();
            onEditRequest(project);
        })
        projectElement.appendChild(selectElement);
        projectElement.appendChild(editElement);
        projectElement.appendChild(deleteElement);
        projectContainerElement.appendChild(projectElement);
    });
}

export const editProject =(idToEdit : number,newName: string, newDescription : string) => {
    projects = projects.map(project => {
        if(project.id === idToEdit) {
            return {...project, name: newName, description: newDescription};
        }
        return project;
    });
    localStorage.setItem("my_projects", JSON.stringify(projects));
}