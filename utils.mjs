import { parseArgs } from "node:util";

const parsed = parseArgs({
  allowPositionals: true,
  strict: false,
});

function highlight(parts, ...args) {
  const color = "45";
  const paint = (text) => `\x1b[${color}m${text}\x1b[0m`;
  return parts.map((p, i) => p + (args[i] ? paint(args[i]) : "")).join("");
}

export class Benchmark {
  name = "";
  args = [];
  kwargs = {};

  constructor(args, kwargs) {
    this.args = args;
    this.kwargs = kwargs;
  }

  describe() {
    return this.name;
  }

  execute() {
    return this.run();
  }

  run() {
    throw new Error("Not implemented");
  }
}

export class LoopBenchmark extends Benchmark {
  repeats = 10_000_000;

  constructor(...args) {
    super(...args);
    this.repeats = this.kwargs.repeats || this.repeats;
  }

  describe() {
    const repeatsString = Intl.NumberFormat("en-US").format(this.repeats);
    return highlight`Loop ${this.name} benchmark with ${repeatsString} repeats`;
  }

  execute() {
    for (let i = 0; i < this.repeats; i++) {
      super.execute();
    }
  }
}

export class BenchmarkRunner {
  benchmarks = {};

  constructor({ values, positionals }) {
    this.benchmarkName = positionals.pop();
    this.args = positionals;
    this.kwargs = values;
  }

  add(name, bench) {
    this.benchmarks[name] = new bench(this.args, this.kwargs);
  }

  async run() {
    for (const [key, benchmark] of Object.entries(this.benchmarks)) {
      if (this.benchmarkName && key !== this.benchmarkName) continue;
      const startTime = process.hrtime();
      const memoryUsageStart = process.memoryUsage().heapUsed;
      const cpuUsageStart = process.cpuUsage().user;
      await benchmark.execute();
      const cpuUsageEnd = process.cpuUsage().user;
      const memoryUsageEnd = process.memoryUsage().heapUsed;
      const memoryDifference = (
        (memoryUsageEnd - memoryUsageStart) /
        1024 ** 2
      ).toFixed(2);
      const cpuUsage = ((cpuUsageEnd - cpuUsageStart) / 1000).toFixed(2);
      const endTime = process.hrtime(startTime);
      const totalTime = (endTime[0] * 1e9 + endTime[1]) / 1e6;
      const resultLog = highlight`Took ${totalTime} ms; \nHeap difference: ${memoryDifference} MB \nCPU usage: ${cpuUsage} ms`;
      console.log(benchmark.describe());
      console.log(resultLog, "\n");
    }
  }
}

export const benchmark = new BenchmarkRunner(parsed);
