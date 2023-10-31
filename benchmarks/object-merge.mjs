import { LoopBenchmark, benchmark } from "../utils.mjs";

class ObjectMergeBenchmark extends LoopBenchmark {
  createObject1() {
    return {
      id: 1,
      name: "John Doe",
      age: 30,
      isMarried: true,
      children: [
        {
          id: 1,
          name: "Jane Doe",
          age: 10,
        },
        {
          id: 2,
          name: "Jim Doe",
          age: 7,
        },
      ],
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        zip: "12345",
      },
      hobbies: ["reading", "hiking", "coding"],
      education: {
        highSchool: "Anytown High",
        college: "Anytown University",
        degrees: ["BS in Computer Science", "MS in Software Engineering"],
      },
      employment: [
        {
          company: "Company A",
          position: "Software Engineer",
          years: 5,
        },
        {
          company: "Company B",
          position: "Senior Software Engineer",
          years: 3,
        },
      ],
    };
  }

  createObject2() {
    return {
      productId: 101,
      productName: "Product A",
      price: 50.5,
      inStock: true,
      tags: ["electronics", "gadgets"],
      manufacturer: {
        name: "Manufacturer A",
        location: "Location A",
        established: 1990,
      },
      reviews: [
        {
          userId: 1,
          review: "Great product!",
          rating: 5,
        },
        {
          userId: 2,
          review: "Good value for money.",
          rating: 4,
        },
      ],
      specifications: {
        color: "Black",
        weight: "1.5kg",
        dimensions: "10x5x3 inches",
        power: "5W",
      },
      warranty: {
        period: "1 year",
        serviceType: "On-site",
      },
    };
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
