function generateDifficultyLevelOptionsView(difficultyLevel){
    const levels = {
        1:"Very Easy",
        2:"Easy",
        3:"Medium (Standart 3x3)",
        4:"Intermediate",
        5:"Expert",
        6:"Hardcore"
    };
    let html = ``;

    for (const key in levels) {
        html += `<option value="${key}" ${difficultyLevel == key ? 'selected' :""}>${key} - ${levels[key]}</option>`
    }

    return html;
}

module.exports = generateDifficultyLevelOptionsView;