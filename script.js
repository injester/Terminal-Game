let hp = 100
let money = 0
let level = 0

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
                await fight();
                break;
            case 'Duel':
                await sleep();
                break;
            case 'Shop':
                return;
            case 'Help':
                return;
            default:
                writeToConsole("❌ Invalid choice, Type 'help' for a list of commands.");
        }
    }
}
main();


function askQuestion(question) {
    return new Promise((resolve, reject) => {
        writeToConsole(question);
        document.getElementById('input-field').focus();
        document.getElementById('input-field').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const userInput = document.getElementById('input-field').value;
                document.getElementById('input-field').value = ''; // Clear the input field
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

