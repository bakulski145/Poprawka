import { addStory, Story } from "./story.js";
export const storyRenderForm = (projectId) => {
    const storyFormContainer = document.querySelector(".story-form-container");
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
    `;
    const addStoryButton = document.querySelector("#addstory");
    const storyNameElement = document.querySelector("#story-name");
    const storyDescriptionElement = document.querySelector("#story-description");
    const storyPrioElement = document.querySelector("#prio");
    addStoryButton === null || addStoryButton === void 0 ? void 0 : addStoryButton.addEventListener("click", (event) => {
        event.preventDefault();
        addStory(new Story(Date.now(), storyNameElement.value, storyDescriptionElement.value, storyPrioElement.value, projectId, Date.now(), "todo", 1));
        storyFormContainer.innerHTML = "";
    });
};
