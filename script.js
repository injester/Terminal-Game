// script.js
import { fightmonster } from './monsters.js';

let hp = 100;
let money = 0;
let level = 0;
let baseDamageModifier = 0;
let points = 0;

// Update navbar values
document.getElementById('hp').textContent = hp;
document.getElementById('money').textContent = money;
document.getElementById('level').textContent = level;

async function main() {
    writeToConsole("Welcome to the Console Conquest!");

    while (true) {
        const choice = await askQuestion("Enter your choice 'Save' - 'Duel' - 'Shop':");
        switch (choice) {
            case 'Save':
                // Logic for saving the game
                writeToConsole("Game saved.");
                break;
            case 'Duel':
                await fightmonster();
                break;
            case 'Shop':
                // Logic for shop
                writeToConsole("Welcome to the shop.");
                break;
            case 'Help':
                writeToConsole("Available commands: Save, Duel, Shop, Help");
                break;
            default:
                writeToConsole("❌ Invalid choice, Type 'help' for a list of commands.");
        }
    }
}

function askQuestion(question) {
    return new Promise((resolve) => {
        writeToConsole(question);
        const inputField = document.getElementById('input-field');
        inputField.focus();
        inputField.addEventListener('keydown', function handler(event) {
            if (event.key === 'Enter') {
                const userInput = inputField.value.trim();
                inputField.value = ''; // Clear the input field
                inputField.removeEventListener('keydown', handler); // Remove this listener
                resolve(userInput);
            }
        });
    });
}

function writeToConsole(text) {
    const consoleOutput = document.getElementById('console-output');
    consoleOutput.innerHTML += `<div>${text}</div>`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll to the bottom
}

// Call main function to start the game
main();
