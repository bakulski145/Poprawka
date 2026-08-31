export const renderUser = (user, userCointainer) => {
    const userNameLabel = document.createElement("h1");
    userNameLabel.innerText = `Witaj ${user.name} ${user.surname}!`;
    userCointainer.appendChild(userNameLabel);
};
