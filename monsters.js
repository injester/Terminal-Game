import { hp, money, level, main, updateStats } from './script.js';

let isCooldown = false;


export async function fightmonster() {
    let batlleHP = hp;
    let reward = Math.floor(Math.random() * 4) + 5;
    let xmoney = money + reward
    let plusXP = 1
    let xp = level + plusXP
    let monsterHP = 100;
    const monsterDamage = Math.floor(Math.random() * 4) + 5;
    let baseDamageModifier = 0;

    while (batlleHP > 0 && monsterHP > 0) {
        writeToConsole("╔══════════════════════╗");
        writeToConsole("    1. Run                                                  ");
        writeToConsole("    2. Charge energy                                        ");
        writeToConsole("    3. Fight                                                ");
        writeToConsole("╚══════════════════════╝");
        let playerAction = await askQuestion('👉 Enter your choice (1-3): ');

        switch (playerAction) {
            case '1':
                writeToConsole('🏃‍♂️ You attempt to run away from the monster.');
                if (Math.random() < 0.5) {
                    await main();
                    return;
                } else {
                    batlleHP -= monsterDamage;
                    writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                    writeToConsole('🚫 The monster catches up to you!');
                    document.getElementById('battleHP').textContent = batlleHP;
                }
                break;
            case '2':
                writeToConsole('🧘‍♂️ You focus your energy, preparing for the next attack.');
                batlleHP -= monsterDamage;
                writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                writeToConsole('🚫 The monster catches up to you!');
                baseDamageModifier += 15;
                document.getElementById('battleHP').textContent = batlleHP;
                break;
            case '3':
                const playerDamage = Math.floor(Math.random() * 10) + 1 + Math.floor(baseDamageModifier * 0.1);
                monsterHP -= playerDamage;
                writeToConsole(`⚔️ You attack the monster and deal ${playerDamage} damage.`);
                if (monsterHP > 0) {
                    writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                    batlleHP -= monsterDamage;
                    writeToConsole(`❤️ Your HP: ${batlleHP}`);
                    writeToConsole(`🐲 Monster's HP: ${monsterHP}`);
                    document.getElementById('battleHP').textContent = batlleHP;
                }
                break;
            default:
                writeToConsole('❌ Invalid choice.');
        }
    }

    if (batlleHP > 0) {
        setTimeout(async () => {
            updateStats(xmoney, xp)
            writeToConsole("╔════════════════════════════════════════════════╗");
            writeToConsole("                    VICTORY!                    ");
            writeToConsole("╚════════════════════════════════════════════════╝");
            writeToConsole("╔════════════════════════════════════════════════╗");
            writeToConsole("                    You earned: " +reward+"💲 & "+xp+"XP");
            writeToConsole("╚════════════════════════════════════════════════╝");
        }, 100); // 10 seconds in milliseconds

    } else {
        setTimeout(async () => {
            writeToConsole("╔══════════════════════════════════════════════════════╗");
            writeToConsole("                   YOU WERE DEFEATED!                 ");
            writeToConsole("╚══════════════════════════════════════════════════════╝");
        }, 100); // 10 seconds in milliseconds
    }
    
    await main();
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
