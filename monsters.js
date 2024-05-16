export async function fightmonster() {
    let monsterHP = 100;
    const monsterDamage = Math.floor(Math.random() * 4) + 5; 

    while (hp > 0 && monsterHP > 0) {
        writeToConsole("╔════════════════════════════════════════════════════════════╗");
        writeToConsole("║                       BATTLE STARTS!                       ║");
        writeToConsole("╠════════════════════════════════════════════════════════════╣");
        writeToConsole("║               🛡️❤️ Battle in Progress ❤️🛡️                 ║");
        writeToConsole("╠════════════════════════════════════════════════════════════╣");
        writeToConsole("║                                                            ║");
        writeToConsole(`║   Your HP: ${hp}                Monster's HP: ${monsterHP}            ║`);
        writeToConsole("║                                                            ║");
        writeToConsole("╠════════════════════════════════════════════════════════════╣");
        writeToConsole("║                                                            ║");
        writeToConsole("║    Choose your action:                                     ║");
        writeToConsole("║    1. Run                                                  ║");
        writeToConsole("║    2. Charge energy                                        ║");
        writeToConsole("║    3. Fight                                                ║");
        writeToConsole("║                                                            ║");
        writeToConsole("╚════════════════════════════════════════════════════════════╝");
        let playerAction = await askQuestion('👉 Enter your choice (1-3): ');

        switch (playerAction) {
            case '1':
                writeToConsole('🏃‍♂️ You attempt to run away from the monster.');
                if (Math.random() < 0.5) {
                    writeToConsole('🏃‍♂️💨 You successfully escape!');
                    return;
                } else {
                    hp -= monsterDamage;
                    writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                    writeToConsole('🚫 The monster catches up to you!');
                }
                break;
            case '2':
                writeToConsole('🧘‍♂️ You focus your energy, preparing for the next attack.');
                hp -= monsterDamage;
                writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                writeToConsole('🚫 The monster catches up to you!');
                baseDamageModifier += 15;
                break;
            case '3':
                const playerDamage = Math.floor(Math.random() * 10) + 1 + Math.floor(baseDamageModifier * 0.1);
                monsterHP -= playerDamage;
                writeToConsole(`⚔️ You attack the monster and deal ${playerDamage} damage.`);
                if (monsterHP > 0) {
                    writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                    hp -= monsterDamage;
                    writeToConsole(`❤️ Your HP: ${hp}`);
                    writeToConsole(`🐲 Monster's HP: ${monsterHP}`);
                }
                break;
            default:
                writeToConsole('❌ Invalid choice.');
        }
    }

    if (hp > 0) {
        points += 3;
        level += 1;
        writeToConsole("╔════════════════════════════════════════════════╗");
        writeToConsole("║                    VICTORY!                    ║");
        writeToConsole("╠════════════════════════════════════════════════╣");
        writeToConsole("║   🎉 You defeated the monster!                 ║");
        writeToConsole("║   🏆 You gained 3 points!                      ║");
        writeToConsole("║                                                ║");
        writeToConsole(`║   ❤️ Your HP: ${hp}                            ║`);
        writeToConsole(`║   💰 Points: ${points}                         ║`);
        writeToConsole("║                                                ║");
        writeToConsole("╚════════════════════════════════════════════════╝");
    } else {
        writeToConsole("╔══════════════════════════════════════════════════════╗");
        writeToConsole("║                   YOU WERE DEFEATED!                 ║");
        writeToConsole("╠══════════════════════════════════════════════════════╣");
        writeToConsole("║   💀 You were defeated by the monster. Game over! 💀  ║");
        writeToConsole("║                                                      ║");
        writeToConsole("║   You must rise and try again!                       ║");
        writeToConsole("║                                                      ║");
        writeToConsole("╚══════════════════════════════════════════════════════╝");
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
