/*
 * 实现 Scheduler 中的 add 方法，满足:

  add 方法只有一个入参 task ， 类型为 () => Promise<any>
  按 add 调用顺序执行任务
  同一时刻只能存在至多2个并发任务
  可自由添加实例属性、方法

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

Scheduler ？
4 秒后打印1
3.5 秒打印2
3 进入队列，到7.5秒打印3
...
*/

// 实现

class Scheduler {
  constructor() {
    this.queue = [];
    this.processing = [];
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
}
