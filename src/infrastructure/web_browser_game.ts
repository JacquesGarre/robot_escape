import * as THREE from 'three';
import Game from "../domain/game";
import Stats from 'three/addons/libs/stats.module.js';
import WebBrowserRenderer from './web_browser_renderer';
import WebBrowserLevel from './web_browser_level';
import WebBrowserCamera from './web_browser_camera';

export default class WebBrowserGame {

    game: Game;
    clock: THREE.Clock;
    renderer: WebBrowserRenderer;
    stats: Stats;

    private constructor(game: Game) {
        this.game = game;
        this.clock = new THREE.Clock();
        this.stats = new Stats();
        this.animate = this.animate.bind(this);
        this.renderer = WebBrowserRenderer.withAnimationLoop(this.animate);
    }

    static start(game: Game) {
        let webBrowserGame = new WebBrowserGame(game);
        window.addEventListener('keydown', webBrowserGame.onKeyDown.bind(webBrowserGame));
        window.addEventListener('keyup', webBrowserGame.onKeyUp.bind(webBrowserGame));
        let container = document.createElement('div');
        document.body.appendChild(container);
        container.appendChild(webBrowserGame.renderer.domElement);
        container.appendChild(webBrowserGame.stats.dom);
    }

    animate() {
        const delta = this.clock.getDelta();
        this.game.animate(delta);
        let level = WebBrowserLevel.fromLevel(this.game.currentLevel())
        let camera = WebBrowserCamera.fromCamera(this.game.currentLevel().camera)
        this.renderer.render(level, camera);
        this.stats.update();
    }

    onKeyDown(event: KeyboardEvent) {
        switch(event.code) {
            case "ArrowUp":
                this.game.controls.pressUp();
            break;
            case "ArrowDown":
                this.game.controls.pressDown();
            break;
            case "ArrowLeft":
                this.game.controls.pressLeft();
            break;
            case "ArrowRight":
                this.game.controls.pressRight();
            break;
        }
    }

    onKeyUp(event: KeyboardEvent) {
        switch(event.code) {
            case "ArrowUp":
                this.game.controls.releaseUp();
            break;
            case "ArrowDown":
                this.game.controls.releaseDown();
            break;
            case "ArrowLeft":
                this.game.controls.releaseLeft();
            break;
            case "ArrowRight":
                this.game.controls.releaseRight();
            break;
        }
    }

}