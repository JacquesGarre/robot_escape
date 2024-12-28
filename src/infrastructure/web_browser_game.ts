import * as THREE from 'three';
import Game from "../domain/game";
import Stats from 'three/addons/libs/stats.module.js';
import WebBrowserRenderer from './web_browser_renderer';
import WebBrowserScene from './web_browser_scene';
import WebBrowserCamera from './web_browser_camera';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import RobotModel from './robot_model';

export default class WebBrowserGame {

    game: Game;
    renderer: WebBrowserRenderer;
    stats: Stats;
    clock: THREE.Clock;
    robotModel: RobotModel | null = null;

    private constructor(game: Game) {
        this.game = game;
        this.stats = new Stats();
        this.clock = new THREE.Clock()
        this.animate = this.animate.bind(this);
        this.renderer = WebBrowserRenderer.withAnimationLoop(this.animate);
    }

    static start(game: Game) {
        let webBrowserGame = new WebBrowserGame(game);
        webBrowserGame.loadAssets();
        window.addEventListener('keydown', webBrowserGame.onKeyDown.bind(webBrowserGame));
        window.addEventListener('keyup', webBrowserGame.onKeyUp.bind(webBrowserGame));
        let container = document.createElement('div');
        document.body.appendChild(container);
        container.appendChild(webBrowserGame.renderer.domElement);
        container.appendChild(webBrowserGame.stats.dom);
    }

    loadAssets() {
        const loader = new GLTFLoader();
        loader.load(
            RobotModel.MODEL_FILE, 
            (gltf) => {
                this.robotModel = RobotModel.fromGltf(gltf);
            }, 
            undefined, 
            (e) => {
                console.error(e);
            }
        );
    }

    animate() {
        this.game.animate();
        let scene = WebBrowserScene.fromLevel(
            this.game.currentLevel(),
            this.robotModel,
            this.clock.getDelta()
        )
        let camera = WebBrowserCamera.fromCamera(this.game.currentLevel().camera)
        this.renderer.render(scene, camera);
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