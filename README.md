# Typing Speed Test

Typing Speed Test - a web application designed to measure a user's typing speed and accuracy, providing an intuitive interface. The project is built using pure Vanilla JavaScript, HTML, and CSS without any additional libraries, adhering to best coding practices with ESLint and Prettier as code linters.

## Features

**Home Page** - Main interface where users can start the typing test, featuring a dynamically fetched text sample.
**Text Retrieval** - Fetches a random piece of text from a public API [PoetryDB API](https://github.com/thundercomb/poetrydb).
**Typing Interface** - Displays the text for the user to type with results feedback on accuracy and correctly typed characters after the timer ends.
**Timer** - Starts a 60-second timer as soon as the user begins typing, displaying the remaining time.
**Character Highlighting** - Highlights each correctly typed character in green and each incorrectly typed character in red.
**Backspace Support** - Allows users to use the backspace key to correct their typed text.
**Current Word Highlighting** - Underlines the current word being typed.
**Metrics Calculation** - After the timer ends, calculates and displays the user's typing speed for correctly typed words in words per minute (WPM) and word accuracy percentage.
**Reset and Restart** - Users can reset the test with the "esc" key with a new piece of text. Reseting is also possible when clicking "Reset The Test" button. It is also possible to restart it with the 'Enter' key to train with the same text.
**Metrics Storage** - Stores user's typing speed and accuracy metrics together with test timestamp for historical analysis.
**Metrics Display** - Displays the user's metrics over time in a table which appears after the test timer ends.
**Performance Feedback** - TO ADD: after each attempt, the app displays whether the user has improved compared to previous attempts.
