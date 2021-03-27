const { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');
const steps = require('./steps');

const bot = new Bot({
    token: 'b909f846c0f6cb4ef7437bddd7e829a544d1ed9a6359a01e3390a3926d744a73d718460a4287d02aadb92',
    group_id: 203583457
}).start();

console.log('Bot started!');

bot.get(/./i, (message, exec, reply) => {

    let info = message.payload && steps[JSON.parse(message.payload)] || steps[''];
    let keyboard = new Keyboard(true);
    for (let i = 0; i < info.buttons.length; i++) {
        if (i) keyboard.addRow()

        const button = info.buttons[i];

        keyboard.addButton(button.msg, KeyboardColor.PRIMARY, JSON.stringify(button.next));
    }

    reply(info.question, {keyboard}).catch(e => console.error(e));
})

bot.on('poll-error', error => {
    console.error('error occurred on a working with the Long Poll server ' +
        `(${util.inspect(error, false, 8, true)})`)
})
