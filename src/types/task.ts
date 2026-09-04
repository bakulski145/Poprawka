import type { Condition, Prio } from "./story";

export let tasks : Task[]=[];

export class Task {
    constructor(
        name: string,
        description: string,
        prio: Prio,
        storyId: number,
        estymatedTime: number,
        condition: Condition,
        addedDate: Date,
        startedDate: Date,
        endedDate : Date,
        userId : number,
    ){}
}

export const addTask = (task : Task) => {
    tasks.push(task)
    localStorage.setItem("my_tasks",JSON.stringify(tasks));
    console.log(tasks.length);
}

export const loadTasks=() => {
    const savedTasks = localStorage.getItem("my_tasks");
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
    }
}

export const getTasks = ():Task[] =>{
    return tasks;
}