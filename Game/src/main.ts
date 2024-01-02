// main.js
import { Application } from 'pixi.js';
import { initAssets, loadBundles } from './utils/assets';
// import { HostPanel } from './hostPanel';
import { GameScreen } from './screens/gameScreen';
// import { Player } from './player';

// Global shared
import { configM } from './utils/configs';
import { logOB } from './utils/logObserver';
import { LoadingView } from './ui/loading';

/** The PixiJS app Application instance, shared across the project */
export const app = new Application<HTMLCanvasElement>({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0x000000,
});

const gamescreen = new GameScreen();
const loadingView = new LoadingView();

/** Set up a resize function for the app */
function resize()
{
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = 700;
    const minHeight = 375;

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    app.renderer.view.style.width = `${windowWidth}px`;
    app.renderer.view.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    // Update renderer  and navigation screens dimensions
    app.renderer.resize(width, height);
    configM.updateAppSize(width, height);

    gamescreen.resize(width, height);
    logOB.log("resized, width: %d, height: %d", width, height);
}

/** Just a test function */
async function showGameScreen() {
    await loadBundles('game');

    app.stage.removeChild(loadingView);

    const testview = gamescreen.hostPanel;
    const bg = gamescreen.background;

    bg.setInstance();
    testview.setUp();

    app.stage.addChild(gamescreen);

}

function setUpGame() {
    configM.setGamePlayerNum(1);
    configM.setMaxHandCardsNum(5);
}

async function Init() {
     // Add pixi canvas element (app.view) to the document's body
    document.body.appendChild(app.view);

    // Whenever the window resizes, call the 'resize' function
    window.addEventListener('resize', resize);

    // Trigger the first resize
    resize();

    loadingView.setup(configM.appWidth, configM.appHeight);
    app.stage.addChild(loadingView);
    // Setup assets bundles (see assets.ts) and start up loading everything in background
    await initAssets();

    setUpGame();
    showGameScreen();
}

// Five Cards, Start!
Init();
