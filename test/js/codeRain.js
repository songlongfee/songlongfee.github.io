/**
 * Created by geodo on 2015/4/11.
 */

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container;
var renderer;
var camera, light, scene;
var codeAreaDept = 800;
var texts = [],meshs = [];
var textPram = {
    height : 8,
    size : 30,
    hover : 30,

    curveSegments : 4,

    bevelThickness : 2,
    bevelSize : 1.5,
    bevelSegments : 3,
    bevelEnabled : true,

    font : "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
    weight : "normal", // normal bold
    style : "normal"// normal italic
}

function init(){
    container = document.createElement("div");
    document.body.appendChild(container);

    //RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth,window.innerHeight);
    container.appendChild(renderer.domElement);

    //CAMERA
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 );
    camera.position.set(300,300,500);
    camera.lookAt(new THREE.Vector3(0,0,0));

    //control = new THREE.OrbitControls(camera);

    //SCENE
    scene = new THREE.Scene();

    //LIGHT
    var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight );

    var directionalLight= new THREE.DirectionalLight(0xffffff,1);
    directionalLight.position.set(-200,0,400);
    scene.add(directionalLight);

    //GEOMETRY
    var text;// = new THREE.TextGeometry("0",textPram);
    var material = new THREE.MeshLambertMaterial({color:0x00ff33});
    var mesh;// = new THREE.Mesh(text,material);

    for(var i = 0;i<=127;i++){
        texts.push(new THREE.TextGeometry(String.fromCharCode(i),textPram));
    }

    for(var i= 0;i<1000;i++)
    {
        text = texts[i%127];

        mesh = new THREE.Mesh(text,material);
        mesh.position.x=(Math.random() * 2 - 1) * codeAreaDept;
        mesh.position.y=(Math.random() * 2 - 1) * codeAreaDept;
        mesh.position.z=(Math.random() * 2 - 1) * codeAreaDept;
        mesh.rotation.y += Math.random() * 360 * Math.PI/180.0;

        scene.add(mesh);
        meshs.push(mesh);
    }

    window.addEventListener("resize",onWindowResize,false);
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function render(){
    var p = meshs[0].position;;
    for(var i = 1;i<meshs.length;i++){
        var temp = meshs[i].position.clone();
        p.y-=5;
        if(p.y<-codeAreaDept)
        {
            p.y = codeAreaDept;
        }

        meshs[i].position.copy(p);

        p.copy(temp);
    }

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    renderer.render(scene,camera);
}

function animation(){
    requestAnimationFrame(animation);
    //control.update();
    render();
}

init();
animation();
