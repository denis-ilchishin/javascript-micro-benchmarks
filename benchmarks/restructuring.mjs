import { LoopBenchmark, benchmark } from "../utils.mjs";

function createObject() {
  return {
    id: 1,
    name: "John Doe",
    age: 30,
    isMarried: true,
  };
}

class BaseBenchmark extends LoopBenchmark {
  repeats = 100_000_000;

  run(obj = createObject()) {
    return {
      id: obj.id,
      name: obj.name,
      age: obj.age,
      isMarried: obj.isMarried,
    };
  }
}

class RestucturingBenchmark extends BaseBenchmark {
  name = "Restructuring";

  run({ age, id, isMarried, name } = createObject()) {
    return {
      id,
      name,
      age,
      isMarried,
    };
  }
}

benchmark.add("base", BaseBenchmark);
benchmark.add("restructuring", RestucturingBenchmark);

benchmark.run();
