window.addEventListener("DOMContentLoaded", init);

function init() {
    // const width = 960;
    // const height = 540;
    const width = document.getElementById('myCanvas').getBoundingClientRect().width;
    const height = document.getElementById('myCanvas').getBoundingClientRect().height;
  
    // レンダラーを作成
    // レンダラーを作成
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas")
    });
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
  
    // シーンを作成
    scene = new THREE.Scene();
  
    // カメラを作成
    camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      10000
    );
    camera.position.set(0, 0, 0);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.OrbitControls(camera);
  
    // // 箱を作成
    // const geometry = new THREE.BoxGeometry(500, 500, 500);
    // const material = new THREE.MeshStandardMaterial({
    //   color: 0x0000ff
    // });
    // const box = new THREE.Mesh(geometry, material);
    // scene.add(box);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = '../resource/models/CubicRoom1.glb';
    

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            // model.scale.set(400.0, 400.0, 400.0);
            model.position.set(0, 0, 0);
            scene.add(gltf.scene);

            // model["test"] = 100;
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );
  
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
      0xffffff
    );
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);
  
    // 初回実行
    tick();
}

function tick() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}