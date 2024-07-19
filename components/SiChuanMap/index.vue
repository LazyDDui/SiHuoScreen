<script setup lang="ts">
import {
  Scene,
  Cache,
  PerspectiveCamera,
  WebGLRenderer,
  Raycaster,
  Vector2,
  FileLoader,
  Object3D,
  Shape,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  ExtrudeGeometry,
  MeshBasicMaterial,
  Mesh,
  Line,
  Group,
  Color,
  DirectionalLight,
  AmbientLight,
  AnimationMixer,
  LoopRepeat,
  TextureLoader,
  RepeatWrapping,
  MultiplyOperation,
  MathUtils, LinearFilter, NearestFilter, PlaneGeometry
} from 'three'
import type {
  Scene as SceneType,
  PerspectiveCamera as CameraType,
  WebGLRenderer as RendererType,
  Raycaster as RaycasterType,
  Vector2 as Vector2Type,
  Object3D as Object3DType
} from 'three'
import { Easing, Tween, update } from '@tweenjs/tween.js'
import * as d3 from 'd3'
import { OrbitControls, type OrbitControls as ControlsType } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { Object3DEventMap } from 'three'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getStaticPath } from '../../composables/utils'
import SiHuoLottie from '../Common/SiHuoLottie.vue'
import { texture } from 'three/examples/jsm/nodes/accessors/TextureNode'

defineOptions({
  name: 'SiChuanMap'
})

const mapConfig = {
  topMesh: 'rgb(0, 102, 255)',
  sideMesh: 'rgb(0,83,159)',
  topSelect: 'rgb(102, 255, 153)',
  sideSelect: 'rgb(153, 255, 153)',
  lineColor: '#ffffff',
  sceneBg: 'rgb(23,23,37)'
}

const movePosition = {
  start: { x: 10, y: -60, z: 120 },
  end: { x: 0, y: -100, z: 80 }
}

const yMoveUp = 2

const fontLoader = new FontLoader()
// 加载纹理
const screenBg = new TextureLoader();
const backgroundTexture = screenBg.load(getStaticPath("/lpg/images/screenBg.jpg"),(texture)=>{
  texture.minFilter = LinearFilter; // 避免缩小时的模糊
  texture.magFilter = NearestFilter; // 避免放大时的模糊
  texture.colorSpace = "srgb"
});


let font: Font


let timer: NodeJS.Timeout
let scene: SceneType
let camera: CameraType
let renderer: RendererType
let controls: ControlsType
let raycaster: RaycasterType
let mouse: Vector2Type
let map: Object3DType
let onMouseMove: (event: MouseEvent) => void
let animateLoop: number

type ProvinceListProps = Array<Object3DType & { properties: { name: string } }>

const loadedModels = []
const threeLabelGroup: Mesh[] = []

const label = ref<HTMLDivElement>()
let lastPick: any
const provinceList: ProvinceListProps = []

const loading = ref(true)


const init = async () => {
  // 第一步新建一个场景
  scene = new Scene()
  const light = new AmbientLight(0xffffff) // 环境光
  scene.add(light)


  const directionalLight = new DirectionalLight(0xffffff, 1) // 方向光
  directionalLight.position.set(5, 10, 7.5)
  scene.add(directionalLight)

  // scene.background = new Color(mapConfig.sceneBg)
  scene.background = backgroundTexture
  scene.castShadow = true


  // const dirLight = new DirectionalLight('rgb(253,253,253)', 5)
  // dirLight.position.set(10, 10, 5) // 根据需要自行调整位置
  // scene.add(dirLight)

  Cache.enabled = true

  setCamera()
  setRenderer()
  setController()
  setRaycaster()
  loadMapData()
  // 假设这是你想要相机移动到的新位置
  const targetPosition = movePosition.end
  const duration = 2000 // 动画持续时间，单位毫秒

// 移动相机
  moveToTargetPosition(targetPosition, duration)
}

const resize = () => {
  // 更新相机的宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  // 调整渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 如果你的渲染器启用了自适应像素比，需要调用此方法
  renderer.setPixelRatio(window.devicePixelRatio)
}

onMounted(async () => {
  await new Promise(resolve => setTimeout(()=>{
    resolve(init())
  }, 3000));
  loading.value = false;

  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', resize)
  scene.traverse(child => {
    if (child instanceof Mesh || child instanceof Group) {
      scene.remove(child)
    }
  })
  cancelAnimationFrame(animateLoop)
})
const setCamera = () => {
  // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
  camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
  //@ts-ignore
  camera.position.set(...Object.values(movePosition.start))
  camera.lookAt(0, 0, 0)
}

const setRenderer = () => {
  renderer = new WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  // 设置画布的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  //这里其实就是canvas 画布  renderer.domElement
  document.body.appendChild(renderer.domElement)
}

const setController = () => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
}

const setRaycaster = () => {
  raycaster = new Raycaster()
  mouse = new Vector2()
  onMouseMove = (event: MouseEvent) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    label.value.style.left = event.clientX + 2 + 'px'
    label.value.style.top = event.clientY + 2 + 'px'
  }
  window.addEventListener('mousemove', onMouseMove, false)
}


const loadMapData = () => {
  const loader = new FileLoader()

  // 设置 output 格式
  loader.setResponseType('json')

  loader.load(getStaticPath('/lpg/GeoJson/china.json'), (data) => {
    const jsonData = JSON.parse(JSON.stringify(data))

    // 加载字体
    fontLoader.load(getStaticPath('/lpg/font/HONOR_Sans_CN_Regular.json'), (loadedFont: Font) => {
      font = loadedFont
      generateGeometry(jsonData)
      animate()
    })


  })
}


const animate = () => {

  animateLoop = requestAnimationFrame(animate.bind(this))
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)
  // 算出射线与当前场景相交的对象有那些
  const intersects = raycaster.intersectObjects(
    scene.children,
    true
  )
  if(loadOver){
    for(const i of actionAni){
      i.update(0.0166666666)
    }
  }

  // 恢复上一次清空的
  if (lastPick) {
    lastPick.object.material[0].color.set(mapConfig.topMesh)
    lastPick.object.material[1].color.set(mapConfig.sideMesh)
  }
  lastPick = null
  lastPick = intersects.find(
    (item) => (item.object as any).material && (item.object as any).material.length === 2
  )

  if (lastPick) {
    lastPick.object.material[0].color.set(mapConfig.topSelect)
    lastPick.object.material[1].color.set(mapConfig.sideSelect)
    // 显示 label
    const properties = lastPick.object.parent.properties
    if (properties) {
      provinceList.forEach((item) => {
        if (item.properties.name === properties.name) {
          item.position.z = yMoveUp
        } else {
          item.position.z = 0

        }
      })
    }


    label.value.textContent = properties.name
    label.value.style.visibility = 'visible'
  } else {
    label.value.style.visibility = 'hidden'
    provinceList.forEach((item: Object3DType & { properties: { name: string } }) => {
      item.position.z = 0
    })
  }
  threeLabelGroup.forEach(item => {
    item.lookAt(camera.position)
  })
  controls.update()
  update()
  render()

}

const render = () => {
  renderer.render(scene, camera)
}

const computeCentroid = (projection, coordinates) => {
  let xSum = 0
  let ySum = 0
  let count = 0
  for (const polygon of coordinates) {
    for (const point of polygon) {
      const projectedPoint = projection(point)
      xSum += projectedPoint[0]
      ySum += projectedPoint[1]
      count++
    }
  }
  return [xSum / count, ySum / count]
}

const generateGeometry = (jsonData: Record<any, any>) => {
  // 初始化一个地图对象
  map = new Object3D()
  // 墨卡托投影转换
  const projection = d3.geoMercator().center([104.0, 37.5]).scale(100).translate([0, 0])
  jsonData.features.forEach((elem: Record<any, any>,index:number,arr:Record<any, any>[]) => {
    // 定一个省份3D对象
    const province: Object3DType = new Object3D()
    // 每个的 坐标 数组
    const coordinates = elem.geometry.coordinates


    // 创建3D标签
    if (font && elem.properties.name) {
      const threeLabel = new Mesh(
        new TextGeometry(elem.properties.name, {
          font: font,
          size: 1,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        }),
        new MeshBasicMaterial({ color: 0xffffff })
      )

      // 计算或获取中心点
      const centerPoint = elem.properties.centroid ?
        projection(elem.properties.centroid) :
        computeCentroid(projection, elem.geometry.coordinates)


      loadModelAndAddToScene(province, centerPoint,arr.length,index)

      // 设置标签位置
      threeLabel.position.set(centerPoint[0], -centerPoint[1], 10) // z轴位置可以适当调整以确保标签可见
      threeLabelGroup.push(threeLabel)
      // 添加标签到省份对象
      province.add(threeLabel)

    }


    // 加载贴图
    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(getStaticPath('/lpg/GeoJson/mapPic.jpeg')) // 替换为你的贴图路径


    texture.wrapS = RepeatWrapping //纹理水平方向的平铺方式
    texture.wrapT = RepeatWrapping //纹理垂直方向的平铺方式
    texture.flipY = false // 如果设置为true，纹理在上传到GPU的时候会进行纵向的翻转。默认值为true。
    texture.rotation =
      MathUtils.degToRad(45) //rotation纹理将围绕中心点旋转多少度
    const scale = 0.1
    texture.repeat.set(scale, scale) //repeat决定纹理在表面的重复次数
    texture.offset.set(0.5, 0.5) //offset贴图单次重复中的起始偏移量
    // 循环坐标数组
    coordinates.forEach((multiPolygon: Record<any, any>) => {
      multiPolygon.forEach((polygon: Record<any, any>) => {
        const shape = new Shape()
        const lineMaterial = new LineBasicMaterial({ color: mapConfig.lineColor, linewidth: 2 })
        const points = []
        for (let i = 0; i < polygon.length; i++) {
          const [x, y] = projection(polygon[i])
          points.push(new Vector3(x, -y, 6))
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
        }
        const lineGeometry = new BufferGeometry().setFromPoints(points)

        const extrudeSettings = {
          depth: 6,
          bevelEnabled: false
        }

        const geometry = new ExtrudeGeometry(
          shape,
          extrudeSettings
        )

        // 平面的 style
        const material = new MeshBasicMaterial({
          map: texture,
          color: mapConfig.topMesh,
          combine: MultiplyOperation, //如何将表面颜色的结果与环境贴图
          opacity: .8,
          transparent: true
        })


        // 3D 斜面的 style
        const material1 = new MeshBasicMaterial({
          color: mapConfig.sideMesh,
          transparent: true,
          opacity: .5
        })
        const mesh = new Mesh(geometry, [material, material1])
        const line = new Line(lineGeometry, lineMaterial)

        province.add(mesh)
        province.add(line)
      })
    })
    // 将 geojson 的 properties 放到模型中，后面会用到
    //@ts-ignore
    province.properties = elem.properties
    if (elem.properties.centroid) {
      //@ts-ignore
      province.properties._centroid = projection(elem.properties.centroid)
    }
    map.add(province)
    provinceList.push(province as any)
  })
  scene.add(map)
}

const actionAni = []

let loadOver = false


const loadModelAndAddToScene = (province: Object3DType, centerPoint: number[],len:number,index:number) => {
  // 如果模型已经加载过，直接使用
  if (loadedModels.length > 0) {
    const model = loadedModels[0].clone()
    adjustModelPosition(model, centerPoint)
    province.add(model)
  } else {
    const gltfLoader = new GLTFLoader()
    // 否则加载模型
    gltfLoader.load(getStaticPath('/three/banana_dancing_fortnite/scene.gltf'), (gltf) => {
      const model = gltf.scene

      let mixer
      const animations = gltf.animations
      if (animations.length > 0) {
        mixer = new AnimationMixer(model)

        const action = mixer.clipAction(animations[Math.floor(Math.random() * 3)])//把该物体需要的动画拿出来
        action.setLoop(LoopRepeat)//设置只播放一次,THREE.LoopRepeat设置播放多次
        action.play()
      }

      model.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true  // 光照是否有阴影
          child.receiveShadow = true  // 是否接收阴影
          child.frustumCulled = false
        }
      })

      actionAni.push(mixer)
      if(actionAni.length === len-1){
        loadOver = true
      }
      loadedModels.push(model)

      // 调整模型位置
      adjustModelPosition(model, centerPoint)

      // 添加模型到省份对象
      province.add(model)

    }, undefined, (error) => {
      console.log(error)
    })
  }
}

const adjustModelPosition = (model: Group<Object3DEventMap>, centerPoint: number[]) => {
  // 根据你的地图比例和视图调整模型位置
  model.position.set(centerPoint[0], -centerPoint[1], 6)
  // 可能需要进一步调整，比如旋转或缩放模型
  model.scale.set(2, 2, 2) // 示例缩放
  model.rotation.set(Math.PI / 2, 0, 0) // 示例旋转
}


const moveToTargetPosition = (targetPosition: { x: number, y: number, z: number }, duration: number) => {
  if (timer) {
    clearTimeout(timer)
  }
  // 创建一个Tween对象来平滑地改变相机的位置
  timer = setTimeout(() => {
    new Tween(camera.position)
      .to(targetPosition, duration) // 目标位置和持续时间
      .easing(Easing.Quadratic.Out) // 缓动函数类型
      .onUpdate(() => {
        // 每次更新时，确保相机看向场景中心
        camera.lookAt(scene.position)
      })
      .start() // 开始动画
  }, 1000)

}


</script>

<template>
  <div id="label" ref="label"></div>
  <div id="container"></div>
  <SiHuoLottie v-if="loading" class="loading" :path="getStaticPath('/lpg/lottieJson/loading.json')"/>
</template>

<style scoped lang="less">
#container {
  position: fixed;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 500px;
  height: 500px;
}


#label {
  position: absolute;
  z-index: 2;
  background: rgb(5, 59, 105);
  padding: 10px;
  color: #ffffff;
  visibility: hidden;
  border-radius: 4px;
}

.data-list {
  padding: 10px;
  cursor: pointer;
  border-bottom: #27363D solid 1px;
}

.data-list:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
