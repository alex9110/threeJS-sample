import GLTFLoader from 'three-gltf-loader';  
  
// функция для загрузки моделей с сервера, примает 3 параметра. 1) массив url адресов, 2) callback функцию, 
// 3) вызывать калбек после загрузки каждой модели или после загрузки всех моделей.
// возвращает массив обектов с тремя свойствами 1)error 2)url 3)модель

function modelLoader(pathArr, callback, callEveryTime = true) {
  var GLFLoader = new GLTFLoader();
  const modelsNecessary = pathArr;
  const modelsLoaded = [];

  for (let i = 0; i < modelsNecessary.length; i++) {
    let item = modelsNecessary[i];

    let gltfCopy = 'Model was not loaded!!!';

    GLFLoader.load(item, gltf => {
      gltfCopy = gltf;
      modelsLoaded.push({
        error: false,
        url: item,
        model: gltf
      });
      if (callEveryTime === true) {
        callback([{
          error: false,
          url: item,
          model: gltf
        }]);
      } else if (modelsLoaded.length === modelsNecessary.length) {
        callback(modelsLoaded);
      }
    }, ext => {
      //console.log(ext);
    }, error => {
      if (callEveryTime === true) {
        callback([{
          error: true,
          url: item,
          model: gltfCopy
        }]);
      }else{
        modelsLoaded.push({
          error: true,
          url: item,
          model: gltfCopy
        })
      }
      
      console.error(error);
    });
    // console.log(item)
  }

}

// example
// let modelsUrl = ['http://localhost:5000/glt', 'http://localhost:5000/gаlt'];

// modelsLoader(modelsUrl, (data) => {
//   console.log(data);
//   for (let item of data) {
//     if (!item.error) {
//       scene.add(item.model.scene);
//       animate();
//     }
//   }
// }, true);



  export default modelLoader;