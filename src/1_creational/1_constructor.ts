// https://github.com/vladilenm/js-patterns-youtube
namespace Example1 {
  class Server {
    constructor(public name: string, public ip: string) { }
  
    getUrl(): string {
      return `https://${this.ip}:80`;
    }
  }

  const aws = new Server('AWS German', '82.21.21.32');
  console.log("Constructor: ", aws.getUrl());
  console.assert(aws.getUrl() === 'https://82.21.21.32:80');
}

// Design Patterns Javascript : Constructor Pattern
// https://www.youtube.com/watch?v=i-oaChvc0xU
namespace Example2 {
  // Constructor Pattern

  // * create object
  // * set and get properties
  // * Constructor

  // const newObject1 = {};
  // const newObject2 = Object.create(Object.prototype);
  // const newObject3 = new Object();

  interface Person {
    firstName: string,
    fullName?: string, // optional value
    someKey?: string,
  }

  const newObject: Person = {
    firstName: "some name",
  };

  // ===== 1st way:
  // set
  newObject.fullName = "some fullName";

  // get
  let value = newObject.fullName;

  console.log(newObject); // { firstName: 'some name', fullName: 'some fullName' }
  console.log(value); // some fullName

  // ===== 2nd way:
  // set 
  newObject["someKey"] = "Hello";

  // get
  value = newObject["someKey"];

  console.log(value); // Hello


  // ===== 3rd way:
  let defineProp = function (obj: Object, key: string, value: string) {
    const config = {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(obj, key, config);
  }

  const person = Object.create(Object.prototype);
  defineProp(person, "car", "something");

  console.log(person); // { car: 'something' }

  // ===== 4th way:
  interface Person2 {
    someKey?: string;
  }

  let newObject2: Person2 = {};

  Object.defineProperties(newObject2, {
    "someKey": {
      value: "value1",
      writable: true,
    }
  });

  value = newObject2.someKey as string;

  console.log(newObject2); // {}: someKey don't show up!
  console.log(value); // value1
}

namespace Example2_2 {
  function Car(model: string, year: number, miles: number) {
    // typescript error: 'this' implicitly has type 'any' because it does not have a type annotation.
    // @ts-ignore
    this.model = model;
    // @ts-ignore
    this.year = year;
    // @ts-ignore
    this.miles = miles;

    // @ts-ignore
    this.toString = function () {
      return this.model + " has done " + this.miles + " miles";
    }
  }

  // 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.
  // to disable set "noImplicitAny": false
  // @ts-ignore
  let civic = new Car("Honda", 2009, 200);
  // @ts-ignore
  let range = new Car("Range Rover", 2004, 100);

  console.log(civic.toString());
  console.log(range.toString());
}