export let stories = [];
export class Story {
    constructor(id, name, description, prio, projectId, date = Date.now(), condition, ownerId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.prio = prio;
        this.projectId = projectId;
        this.date = date;
        this.condition = condition;
        this.ownerId = ownerId;
    }
}
export const addStory = (story) => {
    stories.push(story);
    localStorage.setItem("my_stories", JSON.stringify(stories));
};
export const deleteStory = (idToDelete) => {
    stories = stories.filter(story => story.id !== idToDelete);
    localStorage.setItem("my_stories", JSON.stringify(stories));
};
export const getStories = () => {
    return stories;
};
export const loadStories = () => {
    const savedStories = localStorage.getItem("my_stories");
    if (savedStories) {
        stories = JSON.parse(savedStories);
    }
};
export const changeCondition = (storyToUpdate, newCondition) => {
    storyToUpdate.condition = newCondition;
    localStorage.setItem("my_stories", JSON.stringify(stories));
};
