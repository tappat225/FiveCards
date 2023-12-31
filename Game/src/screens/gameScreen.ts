import { Container } from "pixi.js";
import { HostPanel } from "../hostPanel";
import { GameBackGround } from "../ui/gameBackground";

export class GameScreen extends Container {
    // public mainContainer: Container;
    public background: GameBackGround;
    public hostPanel: HostPanel;

    constructor() {
        super();
        // this.mainContainer = new Container();
        // this.addChild(this.mainContainer);
        this.background = new GameBackGround();
        this.addChild(this.background);

        this.hostPanel = new HostPanel();
        this.addChild(this.hostPanel);
    }

    public resize(width: number, height: number) {
        this.background.resize(width, height);
        this.hostPanel.resize(width, height);
    }
}
