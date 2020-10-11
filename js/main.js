'use strict';
console.log('main');

var gCurrQuestCounter = 0;
var gQuests = [];

function init() {
    gCurrQuestCounter = 0;
    gQuests = createQuests();
    toggleModal();//change to display block
    renderQuest(gQuests[gCurrQuestCounter]);
}

function renderQuest(quest) {
    var strHTML = '<ul>';
    for (var i = 0; i < quest.opts.length; i++) {
        var currQuest = quest.opts[i];
        strHTML += ` <li> <button class="answer answer${i + 1}" 
        onclick="isCorrect(this)">${currQuest}</button></li>`; //send i instead of this
    }
    var elCurrAns = document.querySelector(`.game`);
    strHTML += '</ul>';
    elCurrAns.innerHTML = strHTML
    var elImg = document.querySelector('.pic img');
    elImg.src = `/img/${(gCurrQuestCounter + 1)}.jpg`;

}


function isCorrect(elAnswer) {
    var currAnsIdx = gQuests[gCurrQuestCounter].correctOptIndex; //sent i 
    var currAns = gQuests[gCurrQuestCounter].opts[currAnsIdx];
    if (elAnswer.innerText === currAns) {
        gCurrQuestCounter++;
        if (gCurrQuestCounter === gQuests.length) {
            toggleModal();
            return;
        } else {
            renderQuest(gQuests[gCurrQuestCounter]);
        }
    }
    return;
}

function toggleModal() {
    var elMsg = document.querySelector('.victorius');
    elMsg.classList.toggle('hide');
}
 
function createQuests() {
    var quests = [];
    var questsCount = 3;
    var id = 0;
    var answers = [['This is a cat riding a dog', 'This is a cat riding a cat'],
    ['This is a Moshe', 'This is a Pig'],
    ['This is a trophy', 'This is a drinking glass']];
    var correctOptIndex = [0, 1, 0];
    for (var i = 0; i < questsCount; i++) {
        var currQuest = {};
        currQuest['id'] = id++;
        currQuest['opts'] = answers[i];
        currQuest['correctOptIndex'] = correctOptIndex[i];
        quests.push(currQuest);
    }
    console.log(quests)
    return quests;
}