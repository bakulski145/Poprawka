import { Story } from "./story.js";
export const renderStories = (storyListElement, stories) => {
    storyListElement.innerHTML = "";
    stories.forEach((story) => {
        console.log("działa");
    });
    const storyNameElement = document.createElement("h3");
    storyListElement.appendChild(storyNameElement);
};
