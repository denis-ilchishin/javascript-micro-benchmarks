import { LoopBenchmark, benchmark } from "../utils.mjs";

class ObjectMergeBenchmark extends LoopBenchmark {
  createObject1() {
    return { a: 1, b: "2", c: [3, "4", true] };
  }

  createObject2() {
    return { c: [5, "6", false], d: "7", e: { f: "8", g: 9, h: "10" } };
  }

  run() {
    const obj1 = this.createObject1();
    const obj2 = this.createObject2();
    return [obj1, obj2];
  }
}

class BaseBenchmark extends ObjectMergeBenchmark {
  name = "base";

  run() {
    const objects = super.run();
    return;
  }
}

class ObjectAssignBenchmark extends ObjectMergeBenchmark {
  name = "Object.assign()";

  run() {
    const objects = super.run();
    const result = Object.assign({}, ...objects);
    return result;
  }
}

class SpreadBenchmark extends ObjectMergeBenchmark {
  name = "spread operator";

  run() {
    const objects = super.run();
    const result = { ...objects[0], ...objects[1] };
    return result;
  }
}

class ManualBenchmark extends ObjectMergeBenchmark {
  name = "manual for key loop";

  run() {
    const objects = super.run();
    const result = {};
    for (const obj of objects) {
      for (const key in obj) {
        result[key] = obj[key];
      }
    }
    return result;
  }
}

benchmark.add("base", BaseBenchmark);
benchmark.add("assign", ObjectAssignBenchmark);
benchmark.add("spread", SpreadBenchmark);
benchmark.add("manual", ManualBenchmark);

benchmark.run();
