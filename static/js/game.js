
var players = [
    {
        "id": 485,
        "tag": "Serral",
        "name": "Joona Sotala",
        "romanized_name": "NULL",
        "birthday": "1998-03-22",
        "country": "FI",
        "race": "Z",
        "rating": 2.745954957991117,
        "position": 1
    },
    {
        "id": 5878,
        "tag": "Clem",
        "name": "Clément Desplanches",
        "romanized_name": "NULL",
        "birthday": "2002-04-08",
        "country": "FR",
        "race": "T",
        "rating": 2.55549353734711,
        "position": 2
    },
    {
        "id": 19591,
        "tag": "MaxPax",
        "name": "NULL",
        "romanized_name": "NULL",
        "birthday": "2004-07-01",
        "country": "DK",
        "race": "P",
        "rating": 2.44602283999868,
        "position": 3
    },
    {
        "id": 49,
        "tag": "Maru",
        "name": "조성주",
        "romanized_name": "Cho Seong Ju",
        "birthday": "1997-07-28",
        "country": "KR",
        "race": "T",
        "rating": 2.4233965587672825,
        "position": 4
    },
    {
        "id": 233,
        "tag": "herO",
        "name": "김준호",
        "romanized_name": "Kim Joon Ho",
        "birthday": "1992-08-18",
        "country": "KR",
        "race": "P",
        "rating": 2.423004655445852,
        "position": 5
    },
    {
        "id": 76,
        "tag": "Dark",
        "name": "박령우",
        "romanized_name": "Park Ryung Woo",
        "birthday": "1995-10-06",
        "country": "KR",
        "race": "Z",
        "rating": 2.3693477989419103,
        "position": 6
    },
    {
        "id": 5414,
        "tag": "Reynor",
        "name": "Riccardo Romiti",
        "romanized_name": "NULL",
        "birthday": "2002-07-01",
        "country": "IT",
        "race": "Z",
        "rating": 2.3203960669983568,
        "position": 7
    },
    {
        "id": 47,
        "tag": "ByuN",
        "name": "변현우",
        "romanized_name": "Byun Hyun Woo",
        "birthday": "1993-05-08",
        "country": "KR",
        "race": "T",
        "rating": 2.30823589432285,
        "position": 8
    },
    {
        "id": 1793,
        "tag": "Solar",
        "name": "강민수",
        "romanized_name": "Kang Min Soo",
        "birthday": "1996-05-09",
        "country": "KR",
        "race": "Z",
        "rating": 2.2307688124170144,
        "position": 9
    }
]

var target = players[3];

function stats(guess, actual) {
    var result = "<b>" + guess.tag + "</b><br/>";
    if (guess.race == actual.race) {
        result += "race correct <br/>"
    } else {
        result += "race wrong <br/>"
    }
    if (guess.rating == actual.rating) {
        result += "rating same <br/>"
    } else if (guess.rating < actual.rating) {
        result += "rating ⬆️ <br/>"
    } else {
        result += "rating ⬇️<br/>"
    }
    document.getElementById('result-display').innerHTML = result;
}

function guess(index) {
    if (players[index].id == target.id) {
        document.getElementById('result-display').innerHTML = "winwinwin <br /><b>" + target.tag;
        alert('winwinwin');
    } else {
        stats(players[index], target);
    }
}

function playersList() {
    var result = "";
    for (i = 0; i < players.length; i++) {
        result += i + ": " + players[i].tag + "<br/>";
    }
    document.getElementById('player-display').innerHTML = result;
}
