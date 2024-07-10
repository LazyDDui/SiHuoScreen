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
  Color
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
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { getStaticPath } from '../../composables/utils'

defineOptions({
  name: 'SiChuanMap'
})

const mapConfig = {
  topMesh: 'rgb(0, 102, 255)',
  sideMesh: 'rgb(51, 153, 255)',
  topSelect: 'rgb(102, 255, 153)',
  sideSelect: 'rgb(153, 255, 153)',
  lineColor: '#ffffff',
  sceneBg: 'rgb(6,74,155)'
}

const movePosition = {
  start: { x: 10, y: -60, z: 120 },
  end: { x: 0, y: -100, z: 80 }
}

const fontLoader = new FontLoader();
let font:Font;



let scene: SceneType
let camera: CameraType
let renderer: RendererType
let controls: ControlsType
let raycaster: RaycasterType
let mouse: Vector2Type
let map: Object3DType
let onMouseMove: (event: MouseEvent) => void
let animateLoop: number
let threeLabelGroup:Mesh[] = []

const label = ref<HTMLDivElement>()
const lastPick = shallowRef<any>()


const init = () => {
  // 第一步新建一个场景
  scene = new Scene()

  scene.background = new Color("rgb(0, 0, 51)")
  scene.castShadow = true


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

onMounted(() => {
  init()
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
  renderer.setPixelRatio(window.devicePixelRatio);
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
    fontLoader.load(getStaticPath('/lpg/font/HONOR_Sans_CN_Regular.json'), (loadedFont:Font)=> {
      font = loadedFont;
      generateGeometry(jsonData)
      animate()
    });




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

  // 恢复上一次清空的
  if (lastPick.value) {
    lastPick.value.object.material[0].color.set(mapConfig.topMesh)
    lastPick.value.object.material[1].color.set(mapConfig.sideMesh)
  }
  lastPick.value = null
  lastPick.value = intersects.find(
    (item) => (item.object as any).material && (item.object as any).material.length === 2
  )

  if (lastPick.value) {
    lastPick.value.object.material[0].color.set(mapConfig.topSelect)
    lastPick.value.object.material[1].color.set(mapConfig.sideSelect)

    // 显示 label
    const properties = lastPick.value.object.parent.properties
    label.value.textContent = properties.name
    label.value.style.visibility = 'visible'
  } else {
    label.value.style.visibility = 'hidden'
  }
  threeLabelGroup.forEach(item=>{
    console.log(item)
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
  let xSum = 0; let ySum = 0;
  let count = 0;
  for (const polygon of coordinates) {
    for (const point of polygon) {
      const projectedPoint = projection(point);
      xSum += projectedPoint[0];
      ySum += projectedPoint[1];
      count++;
    }
  }
  return [xSum / count, ySum / count];
}

const generateGeometry = (jsonData: Record<any, any>) => {
  // 初始化一个地图对象
  map = new Object3D()
  // 墨卡托投影转换
  const projection = d3.geoMercator().center([104.0, 37.5]).scale(100).translate([0, 0])
  jsonData.features.forEach((elem: Record<any, any>) => {
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
          bevelSegments: 5,
        }),
        new MeshBasicMaterial({ color: 0xffffff })
      );

      // 计算或获取中心点
      const centerPoint = elem.properties.centroid ?
        projection(elem.properties.centroid) :
        computeCentroid(projection, elem.geometry.coordinates);

      // 设置标签位置
      threeLabel.position.set(centerPoint[0], -centerPoint[1], 10); // z轴位置可以适当调整以确保标签可见
      threeLabelGroup.push(threeLabel)
      // 添加标签到省份对象
      province.add(threeLabel);

    }


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
          color: mapConfig.topMesh,
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
  })
  scene.add(map)
}


const moveToTargetPosition = (targetPosition: { x: number, y: number, z: number }, duration: number) => {
  // 创建一个Tween对象来平滑地改变相机的位置
  new Tween(camera.position)
    .to(targetPosition, duration) // 目标位置和持续时间
    .easing(Easing.Quadratic.Out) // 缓动函数类型
    .onUpdate(() => {
      // 每次更新时，确保相机看向场景中心
      camera.lookAt(scene.position)
    })
    .start() // 开始动画
}


</script>

<template>
  <div id="label" ref="label"></div>
  <div id="container"></div>
</template>

<style scoped lang="less">
#container {
  position: fixed;
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