let playerName = "";
let currentStep = 0;
const soupText = "我的妈妈最近有些反常，不但偷偷用我的香水穿我的衣服，还老是半夜出去。那天我实在忍不住向她理论，并发生了争执，结果不小心把她推倒在地，我赶忙上前扶她，却发现自己的双手沾满了鲜血。";
const story = [
    {
        text: playerName => `${playerName}，欢迎来到海龟汤！${soupText} 你的任务是解开事情的真相。接下来让我们开始游戏吧！`,
        autoNext: true
    },
    {
        text: "最近妈妈的行为越来越奇怪了...她开始偷偷用我的香水，穿我的衣服，还总是半夜出门。今晚我一定要找她说清楚！",
        choices: [
            { text: "躲在门背后观察", correct: true },
            { text: "上前质问", correct: false },
            { text: "查看汤面", correct: true, action: showSoupTextbox }
        ]
    },
    {
        text: "凌晨 2 点，你听到客厅传来响动。透过门缝，你看到'妈妈'正在喷你的香水，穿着你的衣服准备出门...",
        choices: [
            { text: "跟上去看看", correct: true },
            { text: "拉住妈妈", correct: false },
            { text: "查看汤面", correct: true, action: showSoupTextbox }
        ]
    },
    {
        text: "你跟着'妈妈'来到昏暗的街道，最后竟然走到了...墓地？！她跪在一块墓碑前轻声说话...",
        choices: [
            { text: "走近查看墓碑", correct: true },
            { text: "忍不住尖叫", correct: false },
            { text: "查看汤面", correct: true, action: showSoupTextbox }
        ]
    },
    {
        text: "墓碑上赫然刻着妈妈的名字！你惊恐地转身要跑，却被'妈妈'抓住了手腕...",
        choices: [
            { text: "挣脱逃跑", correct: false },
            { text: "看清面容", correct: true },
            { text: "查看汤面", correct: true, action: showSoupTextbox }
        ]
    },
    {
        text: "在月光下，你终于看清——那分明是你自己的脸！镜子破碎的声音突然响起...",
        action: () => {
            const gamePage = document.getElementById('game-page');
            if (gamePage) {
                gamePage.classList.add('mirror-broken');
                currentStep++;
                updateScene();
            }
        }
    },
    {
        text: "你看着满地的镜子碎片，鲜血从掌心流下。记忆突然涌现：妈妈早已去世，这些天你一直在梦游...",
        // 移除自动跳转，改为添加按钮
        choices: [
            { text: "揭示真相", correct: true, action: showEnding },
            { text: "查看汤面", correct: true, action: showSoupTextbox }
        ]
    }
];

function startGame() {
    playerName = document.getElementById('player-name').value || "神秘玩家";
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'flex';
    currentStep = 0;
    updateScene();
}

function showError(message) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    setTimeout(() => errorEl.classList.add('hidden'), 2000);
}

function showEnding() {
    const gamePage = document.getElementById('game-page');
    const endingPage = document.getElementById('ending-page');
    const truthContent = document.getElementById('truth-content');
    if (gamePage && endingPage && truthContent) {
        gamePage.style.display = 'none';
        endingPage.style.display = 'flex';
        truthContent.textContent =
            "我的妈妈前几天去世了，妈妈的去世对我产生了极大打击，以至于我产生了幻觉和梦游症，到了夜晚，梦游状态的我穿上妈妈生前给我买的漂亮衣服，喷上妈妈生前送我的香水，到她的墓地前和她聊天。那天我在照镜子时，把镜子里的自己幻想成了妈妈，我便与她理论，却不小心把镜子推倒了，镜子碎了一地，我赶忙用手去捡，手被玻璃割破，鲜血流了出来。";
    } else {
        console.error("获取 DOM 元素失败");
    }
}

function showSoupTextbox() {
    const soupTextbox = document.getElementById('soup-textbox');
    soupTextbox.classList.remove('hidden');
}

function hideSoupTextbox() {
    const soupTextbox = document.getElementById('soup-textbox');
    soupTextbox.classList.add('hidden');
}

function updateScene() {
    const step = story[currentStep];
    const textEl = document.getElementById('story-text');
    const choicesEl = document.getElementById('choices');

    // 打字机效果
    const displayText = typeof step.text === 'function'? step.text(playerName) : step.text;
    textEl.innerHTML = '';
    let i = 0;
    function typeWriter() {
        if (i < displayText.length) {
            textEl.textContent += displayText.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        } else if (step.autoNext) {
            // 文本显示完后，延迟一段时间再跳转
            setTimeout(() => {
                currentStep++;
                if (currentStep < story.length) {
                    updateScene();
                }
            }, 5000); // 延迟 5 秒，可以根据需要调整
        }
    }
    typeWriter();

    // 清空选项和错误提示
    choicesEl.innerHTML = '';
    document.getElementById('error-message').classList.add('hidden');

    // 执行特殊动作
    if (step.action) step.action();

    // 添加选项按钮
    if (step.choices) {
        step.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.textContent = choice.text;
            btn.onclick = () => {
                if (choice.correct) {
                    if (choice.action) {
                        choice.action();
                    } else {
                        currentStep++;
                        if (currentStep < story.length) {
                            updateScene();
                        }
                    }
                } else {
                    showError("你找不出任何问题");
                }
            };
            choicesEl.appendChild(btn);
        });
    }
}    
