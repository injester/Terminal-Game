import { hp, money, level, main, baseDamage, updateStats, XPbase } from './script.js';

export async function fightMonster() {
    let batlleHP = hp;
    let reward = Math.floor(Math.random() * 4) + 5;
    let xmoney = money + reward
    let plusXP = Math.floor(Math.random() * 10) + 10;
    let punish = 0;
    let xp = XPbase + plusXP
    let monsterHP = 100;
    let baseDamageModifier = baseDamage;

    while (batlleHP > 0 && monsterHP > 0) {
        writeToConsole(`🐲 Monster's HP: ${monsterHP}`);
        writeToConsole("╔══════════════════════╗");
        writeToConsole("    1. Run                                                  ");
        writeToConsole("    2. Charge energy                                        ");
        writeToConsole("    3. Fight                                                ");
        writeToConsole("╚══════════════════════╝");
        let playerAction = await askQuestion('👉 Enter your choice (1-3): ');
        const monsterDamage = Math.floor(Math.random() * 15) + 1;
        switch (playerAction) {
            case '1':
                writeToConsole('🏃‍♂️ You attempt to run away from the monster.');
                if (Math.random() < 0.09) {
                    setTimeout(async () => {
                        writeToConsole('🏃‍♂️ You ran away from the Monster!');
                        updateStats(money, XPbase, baseDamage, batlleHP)
                }, 100); // 10 seconds in milliseconds
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
                baseDamageModifier += 80;
                document.getElementById('battleHP').textContent = batlleHP;
                break;
            case '3':
                const playerDamage = Math.floor(Math.random() * 7) + baseDamage + Math.floor(baseDamageModifier * 0.1);
                monsterHP -= playerDamage;
                writeToConsole(`⚔️ You attack the monster and deal ${playerDamage} damage.`);
                if (monsterHP > 0) {
                    writeToConsole(`💥 The monster attacks you and deals ${monsterDamage} damage.`);
                    batlleHP -= monsterDamage;
                    writeToConsole(`❤️ Your HP: ${batlleHP}`);
                    document.getElementById('battleHP').textContent = batlleHP;
                    baseDamageModifier = baseDamage
                }
                break;
            default:
                writeToConsole('❌ Invalid choice.');
        }
    }

    if (batlleHP > 0) {
        setTimeout(async () => {
            updateStats(xmoney, xp, baseDamage, batlleHP)
            writeToConsole("╔════════════════════════════════════════════════╗");
            writeToConsole("                    VICTORY!                    ");
            writeToConsole("╚════════════════════════════════════════════════╝");
            writeToConsole("╔════════════════════════════════════════════════╗");
            writeToConsole("                    You earned: " +reward+"💲 & "+plusXP+" XP 🔱");
            writeToConsole("╚════════════════════════════════════════════════╝");
        }, 100); // 10 seconds in milliseconds

    } else {
        setTimeout(async () => {
            updateStats(punish, punish, baseDamage, hp)
            writeToConsole("╔══════════════════════════════════════════════════════╗");
            writeToConsole("                   YOU WERE DEFEATED!                 ");
            writeToConsole("YOU LOST ALL YOUR XP & MONEY, BUT RESTORED ALL HEALTH");
            writeToConsole("╚══════════════════════════════════════════════════════╝");
        }, 100); // 10 seconds in milliseconds
    }
    
    await main();
}

export async function fightVlad() {
    let batlleHP = hp;
    let reward = Math.floor(Math.random() * 4) + 5;
    let xmoney = money + reward
    let plusXP = Math.floor(Math.random() * 10) + 30;
    let xp = XPbase + plusXP
    let monsterHP = 100;
    let punish = 0;
    let baseDamageModifier = baseDamage;

    while (batlleHP > 0 && monsterHP > 0) {
        writeToConsole(`🐲 Vlad The Impalers HP: ${monsterHP}`);
        writeToConsole("╔══════════════════════╗");
        writeToConsole("    1. Run                                                  ");
        writeToConsole("    2. Charge energy                                        ");
        writeToConsole("    3. Fight                                                ");
        writeToConsole("╚══════════════════════╝");
        let playerAction = await askQuestion('👉 Enter your choice (1-3): ');
        const monsterDamage = Math.floor(Math.random() * 25) + 10;
        switch (playerAction) {
            case '1':
                writeToConsole('🏃‍♂️ You attempt to run away from Vlad The Impaler');
                if (Math.random() < 0.09) {
                    setTimeout(async () => {
                        writeToConsole('🏃‍♂️ You ran away from Vlad The Impaler');
                        updateStats(money, XPbase, baseDamage, batlleHP)
                }, 100); // 10 seconds in milliseconds
                    await main();
                    return;
                } else {
                    batlleHP -= monsterDamage;
                    writeToConsole(`💥 Vlad The Impaler attacks you and deals ${monsterDamage} damage.`);
                    writeToConsole('🚫 Vlad The Impaler catches up to you!');
                    document.getElementById('battleHP').textContent = batlleHP;
                }
                break;
            case '2':
                writeToConsole('🧘‍♂️ You focus your energy, preparing for the next attack.');
                batlleHP -= monsterDamage;
                writeToConsole(`💥 Vlad The Impaler attacks you and deals ${monsterDamage} damage.`);
                writeToConsole('🚫 Vlad The Impaler catches up to you!');
                baseDamageModifier += 30;
                document.getElementById('battleHP').textContent = batlleHP;
                break;
            case '3':
                const playerDamage = Math.floor(Math.random() * 7) + baseDamage + Math.floor(baseDamageModifier * 0.1);
                monsterHP -= playerDamage;
                writeToConsole(`⚔️ You attack Vlad The Impaler and deal ${playerDamage} damage.`);
                if (monsterHP > 0) {
                    writeToConsole(`💥 Vlad The Impaler attacks you and deals ${monsterDamage} damage.`);
                    batlleHP -= monsterDamage;
                    writeToConsole(`❤️ Your HP: ${batlleHP}`);
                    document.getElementById('battleHP').textContent = batlleHP;
                    baseDamageModifier = baseDamage
                }
                break;
            default:
                writeToConsole('❌ Invalid choice.');
        }
    }

    if (batlleHP > 0) {
        setTimeout(async () => {
            updateStats(xmoney, xp, baseDamage, batlleHP)
            writeToConsole("╔════════════════════════════════════════════════╗");
            writeToConsole("                    VICTORY!                    ");
            writeToConsole("╚════════════════════════════════════════════════╝");
            writeToConsole("╔════════════════════════════════════════════════╗");
            writeToConsole("                    You earned: " +reward+"💲 & "+plusXP+" XP 🔱");
            writeToConsole("╚════════════════════════════════════════════════╝");
        }, 100); // 10 seconds in milliseconds

    } else {
        setTimeout(async () => {
            updateStats(punish, punish, baseDamage, hp)
            writeToConsole("╔══════════════════════════════════════════════════════╗");
            writeToConsole("                   YOU WERE DEFEATED!                 ");
            writeToConsole("YOU LOST ALL YOUR XP & MONEY, BUT RESTORED ALL HEALTH");
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
