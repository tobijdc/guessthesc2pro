# [Guess the SC2 Pro](https://guessthesc2pro.com/)

A [Wordle](https://www.nytimes.com/games/wordle/index.html), (maybe more specifically [gamedle](https://www.gamedle.wtf/guess)) inspired game, where you have to guess the StarCraft2 Progamer.

Find it under [guessthesc2pro.com](https://guessthesc2pro.com/).

## Data and Icons

Data from [Aligulac](http://aligulac.com/), who are kind enough to allow usage for non commercial purposes. Data from [Aligulac](http://aligulac.com/) is pulled via GitHub action once a week.
Additional information, including missing birthdays, has been mainly sourced from [Liquipedia](https://liquipedia.net/starcraft2/), see [db_import/data-fixup.sql](./db_import/data-fixup.sql).

The SC2 race logos featured in the game are sourced from [github.com/sc2-pulse/sc2-icons](https://github.com/sc2-pulse/sc2-icons) under the MIT license. It's important to note that these icons are based on the intellectual property of Blizzard Entertainment, Inc.

## Website Technolgies

The Homepage itself is made with [Hugo](https://gohugo.io/).
The game is written in vanilla JavaScript, except for the Search, which uses [Fuse](https://www.fusejs.io/).
Some icons from [FontAwesome](https://fontawesome.com/).

## Legal

StarCraft® is a trademarks or registered trademark of Blizzard Entertainment, Inc., in the U.S. and/or other countries.

# Development

## Local Development

Checkout with theme submodule, for example:

```sh
git clone --recurse-submodules git://github.com/tobijdc/guessthesc2pro
```

Start the page with [Hugo](https://gohugo.io/)

```sh
hugo serve
```

And access the page on `http://localhost:1313`.

# License

[MIT](LICENSE)
