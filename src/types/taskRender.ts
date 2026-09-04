import type { Task } from "./task";

export const renderTasks=(tasks : Task[],tasksListContainer : HTMLElement)=>{
    tasksListContainer.innerHTML = "";
    const nameTaskElement = document.createElement("h4");
    nameTaskElement.innerText="działa";
    tasksListContainer.appendChild(nameTaskElement);

}