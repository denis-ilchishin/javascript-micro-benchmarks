import { LoopBenchmark, benchmark } from "../utils.mjs";

const item1 = { id: 1, name: "item1" };
const item2 = { id: 2, name: "item2" };
const item3 = { id: 3, name: "item3" };
const item4 = { id: 4, name: "item4" };
const item5 = { id: 5, name: "item5" };
const item6 = { id: 6, name: "item6" };
const item7 = { id: 7, name: "item7" };
const item8 = { id: 8, name: "item8" };
const item9 = { id: 9, name: "item9" };
const item10 = { id: 10, name: "item10" };

class BaseBenchmark extends LoopBenchmark {}

class ArrayIndexOfBenchmark extends BaseBenchmark {
  name = "array.indexOf";
  items = [
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
    item10,
  ];

  run() {
    const index = this.items.indexOf(item7);
    const item = this.items[index];
  }
}

class ArrayFindBenchmark extends BaseBenchmark {
  name = "array.find";
  items = [
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
    item10,
  ];

  run() {
    const item = this.items.find((item) => item === item7);
  }
}

class SetBenchmark extends BaseBenchmark {
  name = "set.has";

  items = new Set([
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
    item10,
  ]);

  run() {
    const item = this.items.has(item7) ? item7 : undefined;
  }
}

class MapBenchmark extends BaseBenchmark {
  name = "map.get";

  items = new Map(
    [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10].map(
      (item) => [item, item]
    )
  );

  run() {
    const item = this.items.get(item7);
  }
}

benchmark.add("array-indexOf", ArrayIndexOfBenchmark);
benchmark.add("array-find", ArrayFindBenchmark);
benchmark.add("set", SetBenchmark);
benchmark.add("map", MapBenchmark);

benchmark.run();
