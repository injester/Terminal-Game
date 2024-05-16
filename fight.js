import { fightmonster } from './monsters.js';

export async function fight() {
    while (true) {
        writeToConsole("╔════════════════════╗");
        writeToConsole("1. Fight monster");
        writeToConsole("2. Fight mambo (lvl. 50)");
        writeToConsole("3. Back to home");
        writeToConsole("╚════════════════════╝");

        let choice = await askQuestion('Enter your choice (1-3): ');

        switch (choice) {
            case '1':
                await fightmonster();
                break;
            case '2':
                if (level >= 50) {
                    await fightmambo();
                } else {
                    writeToConsole('❌ You do not have enough levels to fight Mambo.');
                }
                break;
            case '3':
                return;
            default:
                writeToConsole('❌ Invalid choice.');
        }
    }
}

function writeToConsole(text) {
    const consoleOutput = document.getElementById('console-output');
    consoleOutput.innerHTML += `<div>${text}</div>`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll to the bottom
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
