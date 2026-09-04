export const renderTasks = (tasks, tasksListContainer) => {
    tasksListContainer.innerHTML = "";
    const nameTaskElement = document.createElement("h4");
    nameTaskElement.innerText = "działa";
    tasksListContainer.appendChild(nameTaskElement);
};
