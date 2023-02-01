/*
 * 实现 Scheduler 中的 add 方法，满足:

 1. add 方法只有一个入参 task ， 类型为 () => Promise<any>
 2. 按 add 调用顺序执行任务
 3. 同一时刻只能存在至多2个并发任务
 4. 可自由添加实例属性、方法

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

限制同一时刻只能执行2个task

addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(3000, '4')

打印顺序 2,1,4,3
*/

// 实现

class Scheduler {
  constructor() {
    // 排队
    this.queue = [];
    // 处理中
    this.processing = [];
    // 并发任务数上限
    this.limit = 2;
  }

  add(fn) {
    if (this.processing.length == this.limit) {
      this.queue.push(fn);
      return;
    }
    return new Promise((resolve, reject) => {
      fn().then(() => {});
    });
  }
  run() {}
}
