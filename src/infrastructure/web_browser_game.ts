import * as THREE from 'three';
import Game from "../domain/game";
import Stats from 'three/addons/libs/stats.module.js';
import WebBrowserRenderer from './web_browser_renderer';
import WebBrowserScene from './web_browser_scene';
import WebBrowserCamera from './web_browser_camera';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import RobotModel from './robot_model';
import LevelObjectType from '../domain/level_object_type';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default class WebBrowserGame {

    game: Game;
    renderer: WebBrowserRenderer;
    stats: Stats;
    clock: THREE.Clock;
    robotModel: RobotModel | null = null;
    enemyModels: {} = {}
    textures: {} = {}
    backgroundMusicPlaying: boolean = false;

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
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            RobotModel.MODEL_FILE, 
            (gltf) => {
                this.robotModel = RobotModel.fromGltf(gltf);
            }, 
            undefined, 
            (e) => {
                console.error(e);
            }
        );
        for(const level of this.game.levels) {
            for(const enemy of level.enemies) {
                gltfLoader.load(
                    RobotModel.MODEL_FILE, 
                    (gltf) => {
                        let enemyModelIndex = `${level.index}-${enemy.index}`
                        this.enemyModels[enemyModelIndex] = RobotModel.fromGltf(gltf);
                    }, 
                    undefined, 
                    (e) => {
                        console.error(e);
                    }
                );
            }
        }

        const textureLoader = new THREE.TextureLoader()
        textureLoader.load(
            `${import.meta.env.BASE_URL}/assets/textures/box.gif`,
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                this.textures[LevelObjectType.BOX] = texture;
            },
            undefined,
            (e) => {
                console.error(e);
            }
        );
        textureLoader.load(
            `${import.meta.env.BASE_URL}/assets/textures/floor.jpg`,
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                this.textures['Floor'] = texture;
            },
            undefined,
            (e) => {
                console.error(e);
            }
        );
        textureLoader.load(
            `${import.meta.env.BASE_URL}/assets/textures/elevator.png`,
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                this.textures[LevelObjectType.ELEVATOR] = texture;
            },
            undefined,
            (e) => {
                console.error(e);
            }
        );
        textureLoader.load(
            `${import.meta.env.BASE_URL}/assets/textures/background.jpg`,
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                this.textures['Background'] = texture;
            },
            undefined,
            (e) => {
                console.error(e);
            }
        );
        textureLoader.load(
            `${import.meta.env.BASE_URL}/assets/textures/movable_box.jpg`,
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                this.textures[LevelObjectType.MOVABLE_BOX] = texture;
            },
            undefined,
            (e) => {
                console.error(e);
            }
        );
    }

    animate() {
        this.game.animate();
        let scene = WebBrowserScene.fromGame(
            this.game,
            this.robotModel,
            this.enemyModels,
            this.textures,
            this.clock.getDelta()
        )
        let camera = WebBrowserCamera.fromCamera(this.game.currentLevel().camera)
        this.renderer.dispose();
        this.renderer.render(scene, camera);
        this.stats.update();
    }

    onKeyDown(event: KeyboardEvent) {
        if(!this.backgroundMusicPlaying) {
            this.backgroundMusicPlaying = true;
            this.playBackgroundSound()
        }
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

    playBackgroundSound() {
        const audio = new Audio(`${import.meta.env.BASE_URL}/assets/sounds/background.ogg`);
        audio.loop = true;
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

}