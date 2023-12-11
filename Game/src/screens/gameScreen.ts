import { Container } from "pixi.js";
import { HostPanel } from "../hostPanel";

export class GameScreen extends Container {
    // public mainContainer: Container;
    public hostPanel: HostPanel;

    constructor() {
        super();
        // this.mainContainer = new Container();
        // this.addChild(this.mainContainer);

        this.hostPanel = new HostPanel();
        this.addChild(this.hostPanel);
    }

    public resize(width: number, height: number) {
        this.hostPanel.resize(width, height);
    }
}
