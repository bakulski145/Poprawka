import { Story, changeCondition, deleteStory, getStories } from "./story.js";
import { addTask, getTasks, loadTasks } from "./task.js";
import {renderTasks} from "./taskRender.js";

export const renderStories = (storyListElement: HTMLElement, stories : Story[]) => {
    storyListElement.innerHTML = "";
    const todoStories = document.createElement("div");
    todoStories.id ="todo";
    const doingStories = document.createElement("div");
    doingStories.id = "doing";
    const doneStories = document.createElement("div");
    doneStories.id="done";

    const todoLabel = document.createElement("h2");
    todoLabel.innerText = "To Do:";
    const doingLabel = document.createElement("h2");
    doingLabel.innerText = "Doing:";
    const doneLabel = document.createElement("h2");
    doneLabel.innerText = "Done:";

    storyListElement.appendChild(todoStories);
    todoStories.appendChild(todoLabel);
    storyListElement.appendChild(doingStories);
    doingStories.appendChild(doingLabel);
    storyListElement.appendChild(doneStories);
    doneStories.appendChild(doneLabel);

    stories.forEach((story) => {
        if(story.projectId != null){
            const storyElement = document.createElement("div");
            storyElement.id = `${story.id}`;
            if(story.prio == "low") {            storyElement.style.border = "3px solid green";}
            else if(story.prio == "medium") {            storyElement.style.border = "3px solid yellow";}
            else if(story.prio == "high") {storyElement.style.border="3px solid red"};

            const storyNameElement = document.createElement("h3");
            storyNameElement.innerText = story.name;

            const storyDescriptionElement = document.createElement("p");
            storyDescriptionElement.innerText = story.description;

            const tasksListContainer = document.createElement("div");
            tasksListContainer.id="tasks";

            const rowContainer = document.createElement("div");
            rowContainer.style.display = "flex";
            rowContainer.style.justifyContent = "space-between";

            const storyDataElement = document.createElement("span");
            const data = new Date(story.date);
            storyDataElement.innerText = data.toLocaleString();

            const storyConditionElement =document.createElement("select");
            const todoOption = document.createElement("option");
            todoOption.innerText = "To do";
            todoOption.value = "todo";
            const doingOption = document.createElement("option");
            doingOption.innerText = "Doing";
            doingOption.value = "doing";
            const doneOption = document.createElement("option");
            doneOption.innerText = "Done";
            doneOption.value = "done";
            storyConditionElement.style.display = "block";
            storyConditionElement.style.textAlign = "right";
            storyConditionElement.appendChild(todoOption);
            storyConditionElement.appendChild(doingOption);
            storyConditionElement.appendChild(doneOption);
            storyConditionElement.value = story.condition;
            storyConditionElement.addEventListener("change", (event:Event) =>{
                const newCondition =storyConditionElement.value as "todo" | "doing" | "done";
                changeCondition(story, newCondition);
                const currentAllStories = getStories();
                const currentProjectStories = currentAllStories.filter(s => s.projectId === story.projectId);
                renderStories(storyListElement,currentProjectStories);
            });

            const addTaskButton = document.createElement("button");
            addTaskButton.innerText = "Dodaj zadanie";
            addTaskButton.addEventListener("click",(event:Event)=>{
                event.preventDefault();
                addTask({id: 1});
            })

            const storyDeleteButton = document.createElement("button");
            storyDeleteButton.innerText = "Usuń";
            storyDeleteButton.addEventListener("click", (event: Event) => {
                event.preventDefault();
                deleteStory(story.id);
                const currentAllStories = getStories();
                const currentProjectStories = currentAllStories.filter(s => s.projectId === story.projectId)
                renderStories(storyListElement,currentProjectStories);
            })

            if(story.condition === "todo"){
                todoStories.appendChild(storyElement);
            }
            else if(story.condition === "doing"){
                doingStories.appendChild(storyElement);
            }
            else if(story.condition === "done") {
                doneStories.appendChild(storyElement);
            }
            storyElement.appendChild(rowContainer);
            rowContainer.appendChild(storyDataElement);
            rowContainer.appendChild(storyConditionElement);
            storyElement.appendChild(storyNameElement);
            storyElement.appendChild(storyDescriptionElement);
            storyElement.appendChild(tasksListContainer);
            storyElement.appendChild(addTaskButton);
            storyElement.appendChild(storyDeleteButton);
            const currentAllTasks = getTasks();
            renderTasks(currentAllTasks, tasksListContainer);
        }
    });
}