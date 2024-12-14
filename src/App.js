import React from 'react';

const App = () => {
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    let cw = c.width = 400;
    let ch = c.height = 58;
    document.body.appendChild(c);

    ctx.font = 'normal 16px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
    ctx.shadowColor = '#3f3';
    let page = 0;

    let messagesArray = [
        "",
        "",
        "Wake up, Neo",
        "The Matrix has you...",
        "Follow the white rabbit.",
        "Knock, knock, Neo.",
        "██████████████████████████████████"
    ];

    let cursor = [
        "",
        "█",
        "",
        "█",
        "",
        "█",
        "",
        "█",
        "_",
        "",
        "\n",
        "█",
        "*Jack Rugile*",
        "█"
    ];



    let messageArray = messagesArray[page].split('');
    let totalMessages = messagesArray.length-1;
    let messageLength = messageArray.length;
    let pointer = 0;
    let typeTick = 0;
    let typeTickMax = 0;

    let minTick=5;
    let maxTick=50;
    let typeResetTick = 0;
    let typeResetMax = 200;

    let updateTypeTick = function(){
        if(pointer < messageLength){
            if(typeTick < typeTickMax){
                typeTick++;
            } else {
                typeTick = 0;
                pointer++;
                typeTickMax= Math.floor((Math.random()*maxTick)+minTick);;

            }
        } else {
            if(typeResetTick < typeResetMax){
                typeResetTick++;
            } else {
                typeResetTick = 0;
                typeTick = 0;
                pointer = 0;

                if(page<totalMessages)page++;
                else page=0;

                messageArray=messagesArray[page].split('');
                messageLength = messageArray.length;

            }
        }
    }

    let renderMessage = function(){
        let text;

        switch(cursor[page])
        {
            case "\n":
                text= messageArray.slice(0, messageLength);
                break;

            default:
                text= messageArray.slice(0, pointer);
                text[pointer]=cursor[page];
                break;
        }

        ctx.shadowBlur = 9;
        ctx.fillText(text.join(''), 20, 20);
        ctx.shadowBlur = 0;
    }

    let renderLines = function(){
        ctx.beginPath();
        for(let i = 0; i < ch/2; i += 1){
            ctx.moveTo(0, (i*2) + .5);
            ctx.lineTo(cw, (i*2) + .5);
        }
        ctx.stroke();
    }

    let loop = function(){
        ctx.clearRect(0, 0, cw, ch);
        updateTypeTick();
        renderMessage();
        renderLines();
        setTimeout(loop, 2);
    }

    loop();

    return (
        <div>

        </div>
    );
};

export default App;
