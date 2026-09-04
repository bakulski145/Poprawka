export let tasks = [];
export class Task {
    constructor(name, description, prio, storyId, estymatedTime, condition, addedDate, startedDate, endedDate, userId) { }
}
export const addTask = (task) => {
    tasks.push(task);
    localStorage.setItem("my_tasks", JSON.stringify(tasks));
    console.log(tasks.length);
};
export const loadTasks = () => {
    const savedTasks = localStorage.getItem("my_tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
};
export const getTasks = () => {
    return tasks;
};
