import { Hash } from "@sinclair/typebox/value";
import { LoopBenchmark, benchmark } from "../utils.mjs";

function createObject() {
  return {
    id: 1,
    name: "John Doe",
    age: 30,
    isMarried: true,
  };
}

const object = createObject();
const typeboxHash = Hash(object);
const jsonHash = JSON.stringify(object);

class BaseBenchmark extends LoopBenchmark {
  repeats = 1_000_000;
}

class TypeboxBenchmark extends BaseBenchmark {
  name = "Typebox.Value.Hash";

  run() {
    return typeboxHash === Hash(object);
  }
}

class ManualBenchmark extends BaseBenchmark {
  name = "Manual comparison";

  run() {
    const object1Keys = Object.keys(object);
    const object2Keys = Object.keys(object);

    if (object1Keys.length !== object2Keys.length) return false;

    for (const key of object1Keys) {
      if (object[key] !== object[key]) return false;
    }

    return true;
  }
}

class JsonBenchmark extends BaseBenchmark {
  name = "Json comparison";

  run() {
    return jsonHash === JSON.stringify(object);
  }
}

benchmark.add("typebox", TypeboxBenchmark);
benchmark.add("manual", ManualBenchmark);
benchmark.add("json", JsonBenchmark);

benchmark.run();
