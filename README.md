# The Sound Quiz

[![Live demo](https://img.shields.io/badge/demo-live-19336e?style=flat-square)](https://hellenicdev.eu/the-sound-quiz/) [![License: BSD 3-Clause](https://img.shields.io/badge/license-BSD%203--Clause-blue?style=flat-square)](LICENSE)

Listen to a sound and guess what it is. How good are your ears?

**Play it live:** <https://hellenicdev.eu/the-sound-quiz/>

## Features

- 5 sounds in random order
- Replay a sound as many times as you like, or skip it
- Forgiving answers: "a ship", "The Ship!" and "boat" all count
- Score and progress bar
- Credits for every sound used

## How to play

- Press **Play Sound**
- Type what you heard and press **Enter** (or **Submit**)
- Use **Replay** to hear it again or **Skip** to move on

## Run locally

No build step. Serve the folder with any static server:

```sh
git clone https://github.com/hellenicdev/the-sound-quiz.git
cd the-sound-quiz
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Tech

- HTML5 `<audio>`, CSS3 and vanilla JavaScript

## License

BSD 3-Clause. See [LICENSE](LICENSE).

## Credits

Made by [HellenicDev](https://hellenicdev.eu). More projects at <https://hellenicdev.eu>.

If you enjoy it, you can support the work here:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S31XB030)
