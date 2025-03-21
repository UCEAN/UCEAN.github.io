var playername = "";
var right = 0;
var errorright = 10;
var soupp = "我的妈妈最近有些反常，不但偷偷用我的香水穿我的衣服，还老是半夜出去。那天我与她发生了争执，结果不小心把她推倒在地，我上前扶她，却发现自己的双手沾满了鲜血。";
var story = [
    {
    text: function (playername) {
      return playername + "，欢迎来到海龟汤！" + soupp + " 你的任务是解开事情的真相！";
    },
    autoNext: true
    },
    {
    text: "最近妈妈的行为越来越奇怪了...她最近开始用我梳妆台上的香水",
    choices: [
            { text: "但她以前从来不使用香水", correct: true },
            { text: "她是不是有外遇需要伪装", correct: false },
            { text: "她可能怀念过去的味道", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {
    text: "凌晨 2 点，我听到客厅传来响动。透过门缝，我看到妈妈正在喷香水和梳妆",
    choices: [
            { text: "安装监控摄像头", correct: false },
          { text: "跟上去看看", correct: true },
            { text: "给门锁换密码", correct: false },
             { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {
        text: "妈妈穿着我的衣服准备出门.....我怀疑",
        choices: [
        { text: "她想参加重要聚会", correct: false },
        { text: "她嫉妒我的年轻貌美", correct: false },
        { text: "妈妈穿我的衣服肯定另有隐情", correct: true },
        { text: "查看汤面", correct: true, action: showSoupptext },
        { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {
        text: "我上去和妈妈争论，结果不小心把她推倒在地，赶忙上前扶她，她生气的转身就走",
        choices: [
            { text: "自己在房间里生闷气", correct: false },
            { text: "跟上去查看", correct: true },
            { text: "在房间里装监控", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {  text: "最后竟然走到了...墓地？大晚上我不知道母亲为什么会来扫墓",
        action: function () {
            var game = document.getElementById('game');
            if (game) {
                game.classList.remove('mirrorbroken', 'hospital');
                game.classList.add('cemetery');
            }
        },
        autoNext: true
    },
    {text: "妈妈走到墓地上，我觉得她是来",
        choices: [
            { text: "进行秘密交易", correct: false },
            { text: "被鬼魂附身", correct: false },
            { text: "扫墓", correct: true },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {text: "墓碑上的名字居然和你同名但刻着——慈母，我感觉",
        choices: [
            { text: "妈妈的身份是伪造的", correct: false },
            { text: "墓碑就是属于我的妈妈", correct: true },
            { text: "我已经死了", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {text: "在月光下，我终于看清墓碑上的照片，那个居然是我的脸！！我感觉",
        choices: [
            { text: "我就是妈妈", correct: true },
            { text: "这中间肯定出了问题", correct: false },
            { text: "妈妈和我互换了身份", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {text: "突然我感觉周围的环境开始变得扭曲...",
        choices: [
            { text: "尝试找回理智", correct: true },
            { text: "陷入迷茫", correct: false },
            { text: "跟着'妈妈'走", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }]
    },
    {
        text: "我努力回忆起一些片段，发现自己的双手开始流血...",
        choices: [
            { text: "惊慌失措", correct: false },
            { text: "查看伤口原因", correct: true },
            { text: "用衣服包扎", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {text: "我看着满地的镜子碎片，鲜血从掌心流下，身上有些酸痛",
        choices: [
            { text: "因为刚刚倒下的人就是我", correct: true },
            { text: "因为我和妈妈争执太激烈", correct: false },
            { text: "我决定离开墓地去找线索", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]},
    {
        text: "镜子破碎我看到了...我的脸！怎么会是我！为什么会是我！",
        action: function () {
        var game = document.getElementById('game');
            if (game) {
            game.classList.remove('cemetery', 'hospital');
            game.classList.add('mirrorbroken');
            }
        },
        autoNext: true
    },
    {
        text: "尝试寻找我的手被镜子划破的原因",
        choices: [
            { text: "是母亲撞到镜子后离开，我把碎片捡起来清理", correct: false },
            { text: "是我把镜子推倒的，我去把碎片捡起来清理", correct: true },
            { text: "镜子本身就碎掉了，争执的时候不小心撞上", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }]
    },
    {
        text: "第二天我去到了医院，想找医生解决这个让我崩溃的事情，结果医生告诉我.....",
        action: function () {
            var game = document.getElementById('game');
            if (game) {
            game.classList.remove('cemetery', 'mirrorbroken');
            game.classList.add('hospital');
            }
        },
        autoNext: true
    },
    {
        text: "医生告诉我这个香水有镇定助眠的功效，因为我...",
        choices: [
            { text: "患上了梦游幻想症", correct: true },
            { text: "因为母亲睡眠不好", correct: false },
            { text: "我一直睡不好", correct: false },
            { text: "查看汤面", correct: true, action: showSoupptext },
            { text: "回到上一题", correct: false, action: goBack }
        ]
    },
    {
        text: "在精神科医生的帮助下我逐渐的走出这个旋涡...",
        choices: [
          { text: "揭示真相", correct: true, action: ending },
          { text: "查看汤面", correct: true, action: showSoupptext },
          { text: "回到上一题", correct: false, action: goBack }
        ]
    }
];

document.getElementById('submitBtn').addEventListener('click', function () {
alert('确认要进入剧情吗....我怕你一去不复返');
  playername = document.getElementById('playername').value || "神秘玩家";
    var firstpage = document.getElementById('firstpage');
    var game = document.getElementById('game');
    if (firstpage) {
        firstpage.style.display = 'none';
    }
    if (game) {
        game.style.display = 'flex';  }
    right = 0;
    errorright = 10;
    var errorbadElement = document.getElementById('errorbad');
    if (errorbadElement) {
        errorbadElement.innerHTML = "错误剩余机会: " + errorright;
    }
    gengxing();
});
function errror(message) {
    errorright--;
    var errorbadElement = document.getElementById('errorbad');
    if (errorbadElement) {
        errorbadElement.innerHTML = "错误剩余机会: " + errorright;
    }
    var errormessageEl = document.getElementById('errormessage');
    if (errormessageEl) {
        errormessageEl.innerHTML = message;
        errormessageEl.style.display = 'block';
        setTimeout(function () {
            if (errormessageEl) {
              errormessageEl.style.display = 'none';
            }
        }, 2000);
    }
    if (errorright <= 0) {
        showFailure();
    }
}
function ending() {
    var game = document.getElementById('game');
    var ending = document.getElementById('ending');
    var trully = document.getElementById('trully');
    if (game && ending && trully) {
        game.style.display = 'none';
        ending.style.display = 'flex';
        trully.innerHTML = "我的妈妈前几天去世了，妈妈的去世对我产生了极大打击，以至于我产生了幻觉和梦游症，到了夜晚，梦游状态的我穿上妈妈生前给我买的漂亮衣服，喷上妈妈生前送我的香水，到她的墓地前和她聊天。那天我在照镜子时，把镜子里的自己幻想成了妈妈，我便与她理论，却不小心把镜子推倒了，镜子碎了一地，我赶忙用手去捡，手被玻璃割破，鲜血流了出来。";
    }
}
function showSoupptext() {
    var soupptext = document.getElementById('soupptext');
    if (soupptext) {
        soupptext.style.display = 'block';
    }
}
function hideSoupptext() {
    var soupptext = document.getElementById('soupptext');
    if (soupptext) {
    soupptext.style.display = 'none';
    }
}
function showFailure() {
    var game = document.getElementById('game');
    var failure = document.getElementById('failure');
    if (game && failure) {
        game.style.display = 'none';
        failure.style.display = 'flex';
    }
}
function gengxing() {
    var step = story[right];
    var textEl = document.getElementById('book');
    var choicesEl = document.getElementById('choices');
    var errormessageEl = document.getElementById('errormessage');
    if (textEl) {
        textEl.innerHTML = '';
    }
    if (choicesEl) {
        choicesEl.innerHTML = '';  }
    if (errormessageEl) {
        errormessageEl.style.display = 'none';}
    var displayText = typeof step.text === 'function'? step.text(playername) : step.text;
    var i = 0;
    function typeWriter() {
        if (i < displayText.length) {
      if (textEl) {
                textEl.innerHTML += displayText.charAt(i);
            }
        i++;
            setTimeout(typeWriter, 30);
        } else {
            if (step.autoNext) {
                setTimeout(function () {
                    right++;
                    if (right < story.length) {
                gengxing();
                    }
                }, 6000);
            }
            if (step.action) {
                step.action();  }
        }
    }
    typeWriter();
    if (step.choices) {
        step.choices.forEach(function (choice) {
            var btn = document.createElement('button');
            btn.innerHTML = choice.text;
            btn.onclick = function () {
                if (choice.correct) {
                    if (choice.action) {
                    choice.action();
                    } else {
                  right++;
                      if (right < story.length) {
                    gengxing();
                        }
                    }
            } else {
                    if (choice.action === goBack) {
                        goBack();
      } else {
              errror("似乎忽略了某些细节，再看看汤面");
                }
                }
            };
            if (choicesEl) {
                choicesEl.appendChild(btn);
            }
        });
    }
}
function goBack() {
    if (right > 0) {
        right--;
    gengxing();
    }
}
