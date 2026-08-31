import type { User } from "./user";

export const renderUser = (user : User, userCointainer:HTMLElement) => {
    const userNameLabel = document.createElement("h1");
    userNameLabel.innerText = `Witaj ${user.name} ${user.surname}!`;
    userCointainer.appendChild(userNameLabel);

}
