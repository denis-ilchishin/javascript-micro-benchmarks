import { LoopBenchmark, benchmark } from "../utils.mjs";

class SortBenchmark extends LoopBenchmark {
  array = () => [
    90164, 494000, 746313, 191981, 737339, 188800, 213246, 218583, 756965,
    812486, 946170, 175341, 742440, 182353, 358592, 82525, 438439, 313611,
    406182, 813244, 555949, 360258, 371229, 988051, 708985, 259081, 305573,
    466869, 702075, 34317, 629941, 978737, 653672, 257914, 167876, 796940,
    281448, 347739, 824192, 998124, 535572, 849236, 216671, 295698, 75282,
    133512, 702217, 86079, 906305, 63522, 746328, 751733, 282336, 437291,
    415210, 248929, 670639, 188646, 648975, 74288, 871499, 300273, 830342,
    792846, 690478, 515794, 808846, 432892, 493480, 149246, 690199, 178150,
    663197, 100915, 324109, 996807, 243334, 855140, 363038, 206864, 310836,
    328161, 986575, 391472, 373877, 135808, 519415, 38949, 673098, 446886,
    998314, 800946, 659602, 721520, 373130, 30509, 443939, 341864, 755400,
    723826, 645125, 928205, 653058, 361172, 296815, 164574, 797789, 49081,
    781130, 15009, 144772, 553847, 948650, 251123, 713044, 586662, 569749,
    59126, 401285, 431954, 813673, 607624, 305924, 194617, 884750, 858892,
    150187, 299196, 517986, 877245, 733831, 330338, 415522, 67534, 329159,
    501457, 337652, 687790, 592251, 87737, 750773, 404321, 134115, 25906,
    881530, 222188, 61896, 448977, 793065, 569504, 427696,
  ];
}

class ForSortBenchmark extends SortBenchmark {
  name = "for";

  run() {
    const arr = this.array();
    for (let i = 0; i < arr.length; i++) {
      let val = arr[i];
      const prevVal = arr[i - 1];
      const nextVal = arr[i + 1];
      if (val > nextVal) {
        arr[i] = nextVal;
        arr[i + 1] = val;
        i -= 1;
      }

      val = arr[i];

      if (val < prevVal) {
        arr[i] = prevVal;
        arr[i - 1] = val;
        i -= 2;
      }
    }
  }
}

class WhileForSortBenchmark extends SortBenchmark {
  name = "while-for";

  run() {
    const arr = this.array();

    while (true) {
      let sorted = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const val = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = val;
          sorted = true;
        }
      }
      if (!sorted) break;
    }
  }
}

class NestedForSortBenchmark extends SortBenchmark {
  name = "nested-for";

  run() {
    const arr = this.array();

    for (let i = 0; i < arr.length - 1; i++) {
      let sorted = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const val = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = val;
          sorted = true;
        }
      }
      if (!sorted) break;
    }
  }
}

class NativeSortBenchmark extends SortBenchmark {
  name = "native .sort()";

  run() {
    const arr = this.array();
    arr.sort((a, b) => a - b);
  }
}

benchmark.add("native", NativeSortBenchmark);
benchmark.add("for", ForSortBenchmark);
benchmark.add("while-for", WhileForSortBenchmark);
benchmark.add("nested-for", NestedForSortBenchmark);

benchmark.run();
