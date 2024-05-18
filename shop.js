import { hp, money, updateNavbar, main, baseDamage, Buy, baseHP, clearConsole } from './script.js';

export async function shop() {
    let heal = money - 5;
    let sword = money - 250;
    let shield = money - 250
    let upgrade1 = baseDamage + 10;
    let upgrade2 = baseHP + 10;

    while (true) {
        clearConsole()
        writeToConsole("Welcome to the shop.");
        writeToConsole("╔═════════════════════════════╗");
        writeToConsole("1. Buy Health ( 5💲)");
        writeToConsole("2. Buy & Upgrade Weapon + 10 DMG ( 250💲)");
        writeToConsole("3. Buy & Upgrade Shield + 10 DMG ( 250💲)");
        writeToConsole("4. Leave the store...");
        writeToConsole("╚═════════════════════════════╝");

        let choice = await askQuestion('Enter your choice (1-4): ');

        switch (choice) {
            case '1':
                Buy(heal, baseHP, baseHP, baseDamage)
                updateNavbar()
                clearConsole();
                setTimeout(async () => {
                    writeToConsole("The shopkeeper just gave you a potion & you feel much better!!!.");
                }, 100); // 10 seconds in milliseconds
                await main()
                break;
            case '2':
                Buy(sword, hp, baseHP, upgrade1)
                writeToConsole("You feel much STRONGER!!");
                updateNavbar()
                await main()
                break;
            
            case '3':
                Buy(shield, hp, upgrade2, baseDamage)
                writeToConsole("You feel much UNDEFEATABLE!!");
                updateNavbar()
                await main()
                break;
            case '4':
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
