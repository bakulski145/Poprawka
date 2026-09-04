import type { Project } from "./projects";

export type Prio = "low" | "medium" | "high";
export type Condition = "todo" | "doing" | "done";

export let stories : Story[]=[];
export class Story {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public prio: Prio,
        public projectId: number,
        public date: number =Date.now(),
        public condition: Condition,
        public ownerId: number){}
}

export const addStory = (story: Story) =>{
    stories.push(story);
    localStorage.setItem("my_stories", JSON.stringify(stories));
};

export const deleteStory = (idToDelete: number) =>{
    stories = stories.filter(story => story.id !==idToDelete);
    localStorage.setItem("my_stories", JSON.stringify(stories));
};

export const getStories = ():Story[] =>{
    return stories;
}

export const loadStories = () => {
    const savedStories = localStorage.getItem("my_stories");
    if(savedStories) {
        stories = JSON.parse(savedStories);
    }
};

export const changeCondition = (storyToUpdate:Story, newCondition : Condition) => {
    storyToUpdate.condition = newCondition;
    localStorage.setItem("my_stories",JSON.stringify(stories));
}
