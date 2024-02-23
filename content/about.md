+++
title = "About 'Guess the SC2 pro'"
description = "About who and how the game was created."
author = "tobijdc"
draft = false
+++

You have to guess the SC2 player in a cetain amount of tries.
With every try you will see how the guessed player compares to the player we are looking for.

I hope you enjoy.

If you like the game, hit be up on Twitter. I'm [@tobijdc](https://twitter.com/tobijdc).

## Data and Icons

Data from [Aligulac](http://aligulac.com/), who are kind enough to allow usage for non commercial purposes.
Additional information, including missing birthdays, has been sourced from [Liquipedia](https://liquipedia.net/starcraft2/).

The SC2 race logos featured in the game are sourced from [github.com/sc2-pulse/sc2-icons](https://github.com/sc2-pulse/sc2-icons) under the MIT license. It's important to note that these icons are based on the intellectual property of Blizzard Entertainment, Inc.

## Website Technolgies

The Homepage itself is made with [Hugo](https://gohugo.io/).
The game is written in vanilla JavaScript, except for the Search, which uses [Fuse](https://www.fusejs.io/).
Some icons from [FontAwesome](https://fontawesome.com/).

## Legal

StarCraft® is a trademarks or registered trademark of Blizzard Entertainment, Inc., in the U.S. and/or other countries.

## Changelog

{{<details  "Changelog">}}
- 2024-02-23:
  - automated weekly update of player data
- 2024-02-14:
  - "EasyMode" now default and renamed "Normal".
  - "EasyMode" now easier:
    - uses top 250 instead of top 300 players.
  - "HardMode" now harder:
    - uses top 400 instead of top 300 players.
  - Some game description changes
  - Own minified JS bundles per game mode.
- 2024-02-08:
  - Link to Aligulac on player name
  - Introduction of Changelog :)
- 2024-02-07:
  - Game logic bugfix
  - Player data update
- 2024-02-05:
  - Add hover text to explain Table headings
  - Change retired icon to "prohibit"
- 2024-02-04:
  - Game works with keyboard
  - Social sharing
- 2024-02-03:
  - better player list (looks like akkordeon, copy works)
{{</details>}}
