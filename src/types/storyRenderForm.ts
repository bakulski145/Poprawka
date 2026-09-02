import { addStory, Story, getStories } from "./story.js";
import type{ Prio } from "./story.js";
import { renderStories } from "./storyRender.js";
export const storiesElementContainer = document.querySelector(".stories") as HTMLElement;
const allStories = getStories();
export const storyRenderForm = (projectId: number) =>{
    const storyFormContainer = document.querySelector(".story-form-container") as HTMLElement;
    storyFormContainer.innerHTML = `
            <form>
            <label>Nazwa: </label><input type="text" id="story-name"><br>
            <label>Opis: </label><input type="text" id="story-description"><br>
            <label>priorytet</label><select id="prio">
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
            </select>
            <button id="addstory">Dodaj</button>
        </form>
    `
    const addStoryButton = document.querySelector("#addstory");
    const storyNameElement = document.querySelector("#story-name") as HTMLInputElement;
    const storyDescriptionElement = document.querySelector("#story-description") as HTMLInputElement;
    const storyPrioElement = document.querySelector("#prio") as HTMLSelectElement;
    addStoryButton?.addEventListener("click",(event:Event)=>{
        event.preventDefault();
        addStory(new Story(Date.now(),storyNameElement.value,storyDescriptionElement.value,storyPrioElement.value as Prio,projectId,Date.now(), "todo",1));
        const currentAllStories = getStories();
        const currentProjectStories = currentAllStories.filter(story => Number(story.projectId) === Number(projectId));
        const storiesElementContainer = document.querySelector(".stories") as HTMLElement;
        renderStories(storiesElementContainer, currentProjectStories);
        storyFormContainer.innerHTML = "";
    })
}