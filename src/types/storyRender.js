import { Story, deleteStory, getStories } from "./story.js";
export const renderStories = (storyListElement, stories) => {
    storyListElement.innerHTML = "";
    stories.forEach((story) => {
        if (story.projectId != null) {
            const storyElement = document.createElement("div");
            storyElement.id = `${story.id}`;
            if (story.prio == "low") {
                storyElement.style.border = "3px solid green";
            }
            else if (story.prio == "medium") {
                storyElement.style.border = "3px solid yellow";
            }
            else if (story.prio == "high") {
                storyElement.style.border = "3px solid red";
            }
            ;
            const storyNameElement = document.createElement("h3");
            storyNameElement.innerText = story.name;
            const storyDescriptionElement = document.createElement("p");
            storyDescriptionElement.innerText = story.description;
            const rowContainer = document.createElement("div");
            rowContainer.style.display = "flex";
            rowContainer.style.justifyContent = "space-between";
            const storyDataElement = document.createElement("span");
            const data = new Date(story.date);
            storyDataElement.innerText = data.toLocaleString();
            const storyConditionElement = document.createElement("span");
            storyConditionElement.innerText = story.condition;
            storyConditionElement.style.display = "block";
            storyConditionElement.style.textAlign = "right";
            const storyDeleteButton = document.createElement("button");
            storyDeleteButton.innerText = "Usuń";
            storyDeleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                deleteStory(story.id);
                const currentAllStories = getStories();
                const currentProjectStories = currentAllStories.filter(s => s.projectId === story.projectId);
                renderStories(storyListElement, currentProjectStories);
            });
            storyListElement.appendChild(storyElement);
            storyElement.appendChild(rowContainer);
            rowContainer.appendChild(storyDataElement);
            rowContainer.appendChild(storyConditionElement);
            storyElement.appendChild(storyNameElement);
            storyElement.appendChild(storyDescriptionElement);
            storyElement.appendChild(storyDeleteButton);
        }
    });
};
