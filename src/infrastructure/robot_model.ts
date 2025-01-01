import * as THREE from 'three';

export default class RobotModel {

    static MODEL_FILE = '/assets/models/Robot.glb';

    model: THREE.Group<THREE.Object3DEventMap>;
    
    private constructor(gltf) {
        this.model = gltf.scene;
        const mixer = new THREE.AnimationMixer(this.model);
        const actions = {};
        for (const clip of gltf.animations) {
            const action = mixer.clipAction(clip);
            actions[clip.name] = action;
        }
        this.model.animations = gltf.animations
        this.model.userData.mixer = mixer;
        this.model.userData.actions = actions;
        this.model.castShadow = true;
        this.model.name = 'RobotModel';
    }

    static fromGltf(gltf): RobotModel {
        return new RobotModel(gltf);
    }
}