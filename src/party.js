const path = require('path');
const {app, BrowserWindow, TouchBar} = require('electron');

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar;

const numOfParrotsToDisplay = 4;
const parrots = [];

let parrotFrames = [];

const initParrots = () => {
    const parrotOffset = 2;
    let parrotFrame = 0;
    for (let x = 0; x < numOfParrotsToDisplay; x++) {
        const parrotPath = path.join(__dirname, `/parrot/parrot00${parrotFrame}.png`);
        parrots.push(new TouchBarButton({
            icon: parrotPath,
            backgroundColor: '#000'
        }));
        //parrots.push(new TouchBarSpacer({size: 'large'}));
        parrotFrames.push(parrotFrame);
        //parrotFrames.push(parrotFrame);
        parrotFrame += parrotOffset;
        if (parrotFrame > 9) {
            parrotFrame = 0;
        }
    }
    return parrots;
};

const touchBar = new TouchBar(initParrots());

const updateParrotFrame = (parrotIndex) => {
    if (parrotFrames[parrotIndex] > 9) {
        parrotFrames[parrotIndex] = 0;
    } else {
        parrotFrames[parrotIndex] += 1;
    }
    const parrotPath = path.join(__dirname, `/parrot/parrot00${parrotFrames[parrotIndex]}.png`);
    parrots[parrotIndex].icon = parrotPath;
}

const updateParrotsFrames = () => {
    for (let x = 0; x < numOfParrotsToDisplay; x++) {
        updateParrotFrame(x)
    }
}

const animateParrots = () => {
    setInterval(updateParrotsFrames, 60)
};

let window;

app.once('ready', () => {
    window = new BrowserWindow({
        width: 200,
        height: 200
    });
    window.loadURL(`file://${path.join(__dirname, '/index.html')}`);
    window.setTouchBar(touchBar);
    animateParrots();
})

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
    app.quit();
});
