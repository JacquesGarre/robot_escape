import * as THREE from 'three';
import Game from "../domain/game";
import Stats from 'three/addons/libs/stats.module.js';
import ThreeRenderer from './three_renderer';
import ThreeLevel from './three_level';
import ThreeCamera from './three_camera';

export default class WebBrowserGame {

    game: Game;
    clock: THREE.Clock;
    renderer: ThreeRenderer;
    stats: Stats;

    private constructor(game: Game) {
        this.game = game;
        this.clock = new THREE.Clock();
        this.stats = new Stats();
        this.animate = this.animate.bind(this);
        this.renderer = new ThreeRenderer(this.animate);
    }

    static fromGame(game: Game): WebBrowserGame {
        return new WebBrowserGame(game);
    }

    animate() {
        const delta = this.clock.getDelta();
        this.game.animate(delta);
        let level = new ThreeLevel(this.game.currentLevel())
        let camera = new ThreeCamera(this.game.currentLevel().camera)
        this.renderer.render(level, camera);
        this.stats.update();
    }

}