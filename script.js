// script.js
import { fight } from './fight.js';
import { shop } from './shop.js';
export let hp = 100;
export let money = 300;
export let XPbase = 0;
export let baseDamage = 5;
export let points = 0;
export let level = 1;
export let requirement = 100;
export let baseHP = 100;

export function updateNavbar() {
    document.getElementById('battleHP').textContent = hp;
    document.getElementById('baseHP').textContent = baseHP;
    document.getElementById('money').textContent = money;
    document.getElementById('xp').textContent = XPbase; // Corrected xp to XPbase
    document.getElementById('dmg').textContent = baseDamage;
    document.getElementById('lvl').textContent = level;
    document.getElementById('req').textContent = requirement;
}

export function Buy(newMoney, newHP, newbaseHP, newbaseDamage){
    money = newMoney
    hp = newHP
    baseHP = newbaseHP
    baseDamage = newbaseDamage
}

export function updateStats(newMoney, newXP, newDamage, newHP) {
    money = newMoney;
    XPbase = newXP;
    baseDamage = newDamage;
    hp = newHP;
    if (XPbase >= requirement){
        setTimeout(async () => {
            baseDamage += baseDamage * 0.2; // Corrected increment logic
            baseHP += 5; // Corrected increment logic
            XPbase = XPbase - requirement;
            level = level + 1;
            requirement = requirement / 100 * 220;
            writeToConsole("Congratulations you just leveled up!");
            updateNavbar(); // Ensure the navbar updates after leveling up
        }, 75);
    }
    updateNavbar();
}

export function clearConsole() {
    const consoleOutput = document.getElementById('console-output');
    consoleOutput.innerHTML = '';
}

export async function main() {
    clearConsole();
    updateNavbar();
    writeToConsole("Welcome to the Console Conquest!");

    while (true) {
        const choice = (await askQuestion("Enter your choice 'Save' - 'Duel' - 'Shop':")).toLowerCase(); // Convert choice to lower case
        
        switch (choice) {
            case 'save':
                // Logic for saving the game
                writeToConsole("Game saved.");
                break;
            case 'duel':
                await fight();
                updateNavbar(); // Update the navbar with new values
                break;
            case 'shop':
                // Logic for shop
                await shop();
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
