/*
  实现一个Robot函数，能以如下方式调用：
  Robot("Mike").eat("lunch").wait(3000).eat("dinner")
  输出：
  Hello， I'M Mike
  eat lunch
  // 等待3s
  eat dinner
*/

function Robot(name) {
  console.log(`Hello, I'm ${name}`);
  let p = Promise.resolve()
  const self = {
    eat: (food) => {
      p = p.then(() => {
        console.log('eat', food)
        
      })
      return self
    },
    wait:time => {
      p = p.then(() => {
        return new Promise((reslove, reject) => {
          setTimeout(reslove, time)
        })
      })
      return self
    }
  }
  return self
}

Robot("Mike").eat("lunch").wait(3000).eat("dinner")