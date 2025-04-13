
function initializeFuse() {
    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.3,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "tag"
        ]
    };
    return new Fuse(JSON.parse(JSON.stringify(players)), fuseOptions);
}

var fuse = initializeFuse();

// Variables
var easyMode = true;
var guessesPerGame = 5;
var challengeMode = false;
var tableHeader = "<th>Tag <i class=\"fa-regular fa-circle-question fa-sm tooltip\" title=\"Name player goes by\"></i></th>\
<th>Race</th>\
<th>Country</th>\
<th>$$$ <i class=\"fa-regular fa-circle-question fa-sm tooltip\" title=\"Tournament earnings according to Aligulac\"></th>\
<th>Rating <i class=\"fa-regular fa-circle-question fa-sm tooltip\" title=\"Rating according to Aligulac\"></th>\
<th>Age</th>\
<th>Active <i class=\"fa-regular fa-circle-question fa-sm tooltip\" title=\"Inactive if no tournament games for ~2 months\"></th>";

// Initial game state
var main_player = players[Math.floor(Math.random() * players.length)];
var number_of_guesses = guessesPerGame;
var guesses = [];
var guessesCompares = [];
const earnings_format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
var currentListItemFocused = -1;
var won = false;

// ----- SEARCH -----
function elementSelectCallback(event) {
    document.getElementById('search-result').innerHTML = "";
    var input = document.getElementById('player_tag');
    input.value = this.innerText;
    input.focus;
}

function renderListElementWithCallback(text, index) {
    var element = document.createElement("li");
    element.id = "autocomplete-item-${index}";
    element.role = "listitem";
    element.tabindex = "0";
    element.innerText = text;
    element.addEventListener("click", elementSelectCallback);
    return element;
}

function search(event) {
    var key = event.keyCode || event.charCode;
    //console.log(key);
    if (key == 40 || key == 38) { // down && up
        currentListItemFocused++;
        var suggestions = document.getElementById('search-result').childNodes;
        if (!suggestions || suggestions.length <= 0) {
            return;
        }
        if (currentListItemFocused >= suggestions.length) {
            currentListItemFocused = 0;
        } else if (currentListItemFocused < 0) {
            currentListItemFocused = suggestions.length - 1;
        }
        suggestions[currentListItemFocused].focus();
        //suggestions[currentListItemFocused].setAttribute("aria-selected", "true");
        document.getElementById('player_tag').value = suggestions[currentListItemFocused].innerHTML;
        //document.getElementById('player_tag').setAttribute("aria-activedescendant", suggestions[currentListItemFocused].id);
        return;
    } else if (key == 13) { // Enter
        document.getElementById('search-result').innerHTML = "";
        currentListItemFocused = -1;
        guess(document.getElementById('player_tag').value);
        return;
    }

    const input = document.getElementById('player_tag').value;
    //console.log(input);
    const result = fuse.search(input, { limit: 10 });
    const tags = result.map(function (item) { return players[item["refIndex"]].tag; });
    var suggestions = document.getElementById('search-result');
    suggestions.innerHTML = "";
    for (i = 0; i < tags.length; i++) {
        suggestions.appendChild(renderListElementWithCallback(tags[i], i));
    }
}

// ----- GUESSING & RENDERING -----

function formatRace(race) {
    const imgPrefix = "<img class=\"race-icon\" height=\"20px\" width=\"20px\" src=\"/img/";
    if (race === "P") {
        return imgPrefix + "protoss.svg\" alt=\"P\" />";
    } else if (race === "T") {
        return imgPrefix + "terran.svg\" alt=\"T\" />";
    } else if (race === "Z") {
        return imgPrefix + "zerg.svg\" alt=\"Z\" />";
    } else if (race === "R") {
        return imgPrefix + "random.svg\" alt=\"R\" />";
    } else {
        return race;
    }
}

function formatActive(active) {
    if (active.unknown) {
        return "???";
    } else if (active.active) {
        return "🎮";
    } else {
        return "🚫";
    }
}

function birthdayEmptyOrNull(player) {
    return player.birthday == "NULL" || player.birthday == "" || !player.birthday;
}

function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function actualOlder(guess, actual) {
    if (guess > actual) {
        return false;
    } else {
        return true;
    }
}

function renderHigher(higher) {
    if (higher) {
        return "⏫";
    } else {
        return "⏬";
    }
}

function formatEarnings(earnings) {
    if (earnings.unknown) {
        return "???";
    } else {
        return earnings_format.format(earnings.sum_earnings);
    }
}

function withinPercentMargin(guess, actual, percent) {
    return Math.abs((actual - guess) / parseFloat(guess)) <= percent;
}

function compare(guess, actual, no_name) {
    var displayData = {};
    displayData.correct = guess.tag === actual.tag;

    if (!no_name) {
        displayData.tag = guess.tag;
        displayData.aligulacId = guess.id;
    } else {
        displayData.tag = "???";
        displayData.unknown = true;
    }
    displayData.race = {
        race: guess.race,
        correct: guess.race == actual.race,
    }
    displayData.country = {
        country: guess.country,
        correct: guess.country == actual.country,
        close: guess.country != "KR" && actual.country != "KR",
    }
    displayData.sum_earnings = {
        sum_earnings: guess.sum_earnings,
        correct: guess.sum_earnings == actual.sum_earnings,
        close: withinPercentMargin(guess.sum_earnings, actual.sum_earnings, 0.10),
        higher: guess.sum_earnings < actual.sum_earnings,
    }
    displayData.rating = {
        rating: guess.rating,
        correct: guess.rating == actual.rating,
        close: withinPercentMargin(guess.rating, actual.rating, 0.10),
        higher: guess.rating < actual.rating,
    }

    if (!birthdayEmptyOrNull(guess) && !birthdayEmptyOrNull(actual)) {
        const guessAge = _calculateAge(new Date(guess.birthday));
        const actualAge = _calculateAge(new Date(actual.birthday));
        displayData.age = {
            hasAge: true,
            age: guessAge,
            correct: guessAge == actualAge,
            close: Math.abs(guessAge - actualAge) <= 1,
            higher: actualOlder(guessAge, actualAge),
        }
    } else {
        displayData.age = {
            hasAge: false,
        }
    }
    const activeGuess = !(guess.position === "NULL" || !guess.position);
    const actualActive = !(actual.position === "NULL" || !actual.position);
    displayData.active = {
        active: activeGuess,
        correct: activeGuess === actualActive,
    }
    //console.log(JSON.stringify(displayData));
    return displayData;
}

function renderCorrectClose(data) {
    if (data.correct) {
        return "🟩";
    } else if (data.close) {
        return "🟨";
    } else {
        return "🟥";
    }
}

function socialRow(displayData) {
    var result = ""
    result += renderCorrectClose(displayData.race);
    result += renderCorrectClose(displayData.country);
    result += renderCorrectClose(displayData.sum_earnings);
    result += renderCorrectClose(displayData.rating);
    if (displayData.age.hasAge) {
        result += renderCorrectClose(displayData.age);
    } else {
        result += "🤷‍♂️"
    }
    result += renderCorrectClose(displayData.active);
    return result;
}

function stats(displayData) {
    var result = ""
    if (displayData.unknown) {
        result += "<td><b>" + displayData.tag + "</b></td>";
    } else {
        result += "<td><b><a target=\"_blank\" href=\"http://aligulac.com/players/" + displayData.aligulacId + "\">" + displayData.tag + "</a></b></td>";
    }
    
    if (displayData.race.correct) {
        result += "<td class=\"green\">" + formatRace(displayData.race.race) + "</td>"
    } else {
        result += "<td class=\"red\">" + formatRace(displayData.race.race) + "</td>"
    }
    if (displayData.country.correct) {
        result += "<td class=\"green\">"
    } else if (displayData.country.close) {
        result += "<td class=\"yellow\">"
    } else {
        result += "<td class=\"red\">";
    }
    result += displayData.country.country + "</td>"
    if (displayData.sum_earnings.correct) {
        result += "<td class=\"green\">" +  formatEarnings(displayData.sum_earnings) + "</td>"
    } else if (displayData.sum_earnings.close) {
        result += "<td class=\"yellow\">" + formatEarnings(displayData.sum_earnings) + renderHigher(displayData.sum_earnings.higher) + "</td>"
    } else {
        result += "<td class=\"red\">" + formatEarnings(displayData.sum_earnings) + renderHigher(displayData.sum_earnings.higher) + "</td>"
    }
    if (displayData.rating.correct) {
        result += "<td class=\"green\">" + displayData.rating.rating + "</td>"
    } else if (displayData.rating.close) {
        result += "<td class=\"yellow\">" + displayData.rating.rating + renderHigher(displayData.rating.higher) + "</td>"
    } else {
        result += "<td class=\"red\">" + displayData.rating.rating + renderHigher(displayData.rating.higher) + "</td>"
    }
    if (displayData.age.hasAge) {
        if (displayData.age.correct) {
            result += "<td class=\"green\">" + displayData.age.age + "</td>"
        } else if (displayData.age.close) {
            result += "<td class=\"yellow\">" + displayData.age.age + renderHigher(displayData.age.higher) + "</td>"
        } else {
            result += "<td class=\"red\">" + displayData.age.age + renderHigher(displayData.age.higher) + "</td>"
        }
    } else {
        result += "<td>🤷‍♂️</td>"
    }
    if (displayData.active.correct) {
        result += "<td class=\"green\">" + formatActive(displayData.active) + "</td>";
    } else {
        result += "<td class=\"red\">" + formatActive(displayData.active) + "</td>";
    }

    var table = document.getElementById('result-display');
    var row = table.insertRow(1);
    if (displayData.correct) {
        row.class = "correct-result"
    }
    row.innerHTML = result;
}

function playerDisplayDataHardMode(player, withCountry) {
    var displayData = {};
    displayData.correct = true;
    displayData.tag = "???";
    displayData.unknown = true;

    displayData.race = {
        race: player.race,
        correct: true,
    }
    if (withCountry) {
        displayData.country = {
            country: player.country,
            correct: true,
            close: true,
        }
    } else {
        displayData.country = {
            country: "???",
            correct: true,
            close: true,
        }
    }
    displayData.sum_earnings = {
        unknown: true,
        sum_earnings: 0,
        correct: true,
        close: true,
        higher: true,
    }
    displayData.rating = {
        rating: "???",
        correct: true,
        close: true,
        higher: true,
    }

    if (!birthdayEmptyOrNull(player)) {
        const guessAge = _calculateAge(new Date(player.birthday));
        displayData.age = {
            hasAge: true,
            age: guessAge,
            correct: true,
            close: true,
            higher: true,
        }
    } else {
        displayData.age = {
            hasAge: false,
        }
    }

    displayData.active = {
        unknown: true,
        active: true,
        correct: true,
    }
    //console.log(JSON.stringify(displayData));
    return displayData;
}

function reset() {
    number_of_guesses = guessesPerGame;
    document.getElementById('countdown-display').innerHTML = "<b>" + number_of_guesses + "</b> tries left.";
    document.getElementById('result-display').innerHTML = tableHeader;
    guesses = [];
    guessesCompares = [];
    currentListItemFocused = -1;
    won = false;
    if (challengeMode) {
        var dailyTag = "Stephano";
        main_player = players.find(obj => {
            return obj.tag === dailyTag
        });
    } else {
        main_player = players[Math.floor(Math.random() * players.length)];
    }
    if (easyMode) {
        const displayData = compare(main_player, main_player, true);
        console.log(displayData);
        stats(displayData);
    } else if (challengeMode) {
        const displayData = playerDisplayDataHardMode(main_player, true);
        stats(displayData);
    } else {
        const displayData = playerDisplayDataHardMode(main_player, false);
        stats(displayData);
    }
}

function guess(tag) {
    if (!challengeMode && (won || number_of_guesses <= 0)) {
        reset();
    } else if (won || number_of_guesses <= 0) {
        return; // Do not reset challengeMode
    }

    var foundPlayers = players.filter(x => x.tag === tag);
    if (foundPlayers.length <= 0) {
        alert('Player not found, try again!');
        return;
    } else if (foundPlayers.length > 1) {
        alert('error: multiple players found!');
        return;
    }
    if (guesses.includes(foundPlayers[0].tag)) {
        alert('Already guessed! Try a diffrent player.');
        return;
    }
    guesses.push(foundPlayers[0].tag);
    document.getElementById('player_tag').value = "";

    number_of_guesses--;
    document.getElementById('countdown-display').innerHTML = "<b>" + number_of_guesses + "</b> tries left.";
    if (foundPlayers[0].id == main_player.id) {
        const displayData = compare(foundPlayers[0], main_player, false);
        guessesCompares.push(displayData);
        stats(displayData);
        var resultText = "<tr><td colspan=\"100%\" class=\"win-loss-display\"><b>You won! 🎉</b>"
        if (!challengeMode) {
            resultText += " Try again?"
        } else {
            resultText += " Come back tomorrow!"
        }
        resultText += " <a onclick=\"socialDialog()\">Share 📢</a></td></tr>" + document.getElementById('result-display').innerHTML;
        document.getElementById('result-display').innerHTML = resultText;
        won = true;
        if (challengeMode) {
            socialDialog();
        }
        return;
    } else {
        const displayData = compare(foundPlayers[0], main_player, false);
        guessesCompares.push(displayData);
        stats(displayData);
    }
    if (number_of_guesses <= 0) {
        const displayData = compare(main_player, main_player, false);
        stats(displayData);
        var resultText = "<tr><td colspan=\"100%\" class=\"win-loss-display\"><b>You lost! 😢</b>"
        if (!challengeMode) {
            resultText += " Try again?"
        } else {
            resultText += " Try again tomorrow"
        }
        resultText += " <a onclick=\"socialDialog()\">Share 📢</a></td></tr>" + document.getElementById('result-display').innerHTML;
        document.getElementById('result-display').innerHTML = resultText;
        document.getElementById('countdown-display').innerHTML = "<b>" + number_of_guesses + "</b> tries left.";
    }
}

// ----- SOCIAL & PLAYER LIST

function socialGrid(guessArray) {
    var grid = "";
    for (i = 0; i < guessArray.length; i++) {
        grid += socialRow(guessArray[i]) + '<br/>';
    }
    return grid;
}

function socialDialog() {
    const dialog = document.getElementById("socialDialog");
    const dialogCloseButton = document.getElementById("socialDialogButton");
    const socialDialogX = document.getElementById("socialDialogX");
    var socialTwitterDiv = document.getElementById("socialTwitterText");
    var socialTwitterButton = document.getElementById("twitter-share-button");

    dialogCloseButton.addEventListener("click", () => {
        document.getElementById("socialDialog").close();
    });
    socialDialogX.addEventListener("click", () => {
        document.getElementById("socialDialog").close();
    });

    var socialText = "I played #guessthesc2pro<br/><br/>" + socialGrid(guessesCompares);
    socialTwitterDiv.innerHTML = socialText + "<br/>Try it out: https://guessthesc2pro.com";
    dialog.showModal();
}

function howToPlayDialog() {
    const dialog = document.getElementById("howToPlay");
    const dialogCloseX = document.getElementById("howToPlayX");
    const dialogCloseButton = document.getElementById("howToPlayClose");

    dialogCloseButton.addEventListener("click", () => {
        document.getElementById("howToPlay").close();
    });
    dialogCloseX.addEventListener("click", () => {
        document.getElementById("howToPlay").close();
    });

    dialog.showModal();
}

function playersList() {
    var result = "";
    for (i = 0; i < players.length; i++) {
        result += (i + 1) + ": " + players[i].tag + "<br/>";
    }
    document.getElementById('player-display').innerHTML = result;
}
