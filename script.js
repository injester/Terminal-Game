// script.js
import { fight } from './fight.js';

export let hp = 100;
export let money = 0;
export let level = 0.0;
export let baseDamageModifier = 0;
export let points = 0;

export function updateNavbar() {
    document.getElementById('battleHP').textContent = hp;
    document.getElementById('money').textContent = money;
    document.getElementById('level').textContent = level;
}

export function updateStats(newMoney, newLevel) {
    money = newMoney;
    level = newLevel;
    updateNavbar();
}

export function clearConsole() {
    const consoleOutput = document.getElementById('console-output');
    consoleOutput.innerHTML = '';
}

export async function main() {
    clearConsole();
    writeToConsole("Welcome to the Console Conquest!");
    document.getElementById('battleHP').textContent = hp;

    while (true) {
        const choice = (await askQuestion("Enter your choice 'Save' - 'Duel' - 'Shop':")).toLowerCase(); // Convert choice to lower case
        
        switch (choice) {
            case 'save':
                // Logic for saving the game
                writeToConsole("Game saved.");
                break;
            case 'duel':
                await fight();
                hp -= 10; // Correct syntax for deduction
                money -= 10;
                updateNavbar(); // Update the navbar with new values
                break;
            case 'shop':
                // Logic for shop
                writeToConsole("Welcome to the shop.");
                break;
            case 'help':
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
