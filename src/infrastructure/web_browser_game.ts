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

    static fromGame(game: Game): WebBrowserGame {
        return new WebBrowserGame(game);
    }

    animate() {
        const delta = this.clock.getDelta();
        this.game.animate(delta);
        let level = WebBrowserLevel.fromLevel(this.game.currentLevel())
        let camera = WebBrowserCamera.fromCamera(this.game.currentLevel().camera)
        this.renderer.render(level, camera);
        this.stats.update();
    }

}