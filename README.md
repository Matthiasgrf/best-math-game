# Best Math Game

A kid-friendly multiplication practice game for grades 2+ with rewards, streaks, and saved progress.

## Features

- Multiplication questions from **1×1 to 10×10**
- 10-question rounds
- Score + streak tracking
- End-of-round rewards based on accuracy
- Local progress history with missed facts to review
- Language selector with English, German, and French
- Two game variants: typed answers and 4-choice multiple choice
- Second game in mode dropdown: addition with numbers 1-100 (sum max 100)
- Mobile-first native-app-like layout for phones and tablets
- Separate menu entry page with language selector + mode buttons and in-game "menu" back button

## Run locally

You can open `index.html` directly or run a static server:

```bash
python3 -m http.server 8000
```

Then browse to `http://localhost:8000`.

## Deploy on GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

1. Push this project to GitHub.
2. In GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` to trigger deployment.

After deployment, your game will be available on the GitHub Pages URL for the repository.
