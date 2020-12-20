// https://github.com/vladilenm/js-patterns-youtube
namespace Example1 {
  interface IMembership {
    name: string,
    cost: number,
  }

  class SimpleMembership implements IMembership {
    public cost: number;
    constructor(public name: string) {
      this.cost = 50;
    }
  }

  class StandardMembership implements IMembership {
    public cost: number;
    constructor(public name: string) {
      this.cost = 150;
    }
  }

  class PremiumMembership implements IMembership {
    public cost: number;
    constructor(public name: string) {
      this.cost = 500;
    }
  }

  // interface IList {
  //   [propName: string]: IMembership; // typeof IMembership also not works
  // }

  class MemberFactory {
    static list = {
      simple: SimpleMembership,
      standard: StandardMembership,
      premium: PremiumMembership,
    }

    create(name: string, type = 'simple') {
      const Membership = MemberFactory.list[type] || MemberFactory.list.simple;
      const member = new Membership(name);
      member.type = type;
      member.define = function () {
        console.log(`${this.name} (${this.type}): ${this.cost}`);
      }
      return member;
    }
  }

  const factory = new MemberFactory();
  const members = [
    factory.create('Vladilen', 'simple'), // Vladilen (simple): 50
    factory.create('Elena', 'premium'), // Elena (premium): 500
    factory.create('Vasilisa', 'standard'), // Vasilisa (standard): 150
    factory.create('Ivan', 'premium'), // Ivan (premium): 500
    factory.create('Petr') // Petr (simple): 50
  ]

  members.forEach(m => m.define());
}

// https://github.com/pkellz/devsage/blob/master/DesignPatterns/FactoryDesignPattern.js
namespace Example2_1 {
  // we have two type of employers
  // * Testers
  // * Developers

  // interface Employee {
  //   name: string;
  //   type: string;
  // }

  function Developer(name: string): void {
    this.name = name;
    this.type = "Developer";
  }

  function Tester(name: string): void {
    this.name = name;
    this.type = "Tester";
  }

  function EmployeeFactory() {
    this.create = (name: string, type: string) => {
      switch (type) {
        case "Developer":
          return new Developer(name);
        case "Tester":
          return new Tester(name);
        default:
          throw new Error(`Classname ${type} doesn't exist!`);
      }
    }
  }

  const employeeFactory = new EmployeeFactory();
  const employees = [];
  // Argument of type 'any' is not assignable to parameter of type 'never'.
  // @ts-ignore
  employees.push(employeeFactory.create("Patrick", "Developer"));
  // @ts-ignore
  employees.push(employeeFactory.create("John", "Tester"));

  function say() {
    console.log("Hi, I am " + this.name + " and I am a " + this.type);
  }

  employees.forEach(emp => {
    say.call(emp);
  })
}

namespace Example2_2 {
  interface Employee {
    name: string;
    type: string;
    say: () => void;
  }

  abstract class CanSay {
    public type: string;
    constructor(public name: string) {
      this.type = ""; // how to avoid this line?
    }

    say() {
      console.log("Hi, I am " + this.name + " and I am a " + this.type);
    }
  }

  class Developer extends CanSay implements Employee {
    public type: string;
    constructor(public name: string) {
      super(name);
      this.type = "Developer";
    }
  }

  class Tester extends CanSay implements Employee {
    public type: string;
    constructor(public name: string) {
      super(name);
      this.type = "Tester";
    }
  }

  class EmployeeFactory {
    public employees: Array<Employee>;
    constructor() {
      this.employees = [];
    }

    create(name: string, type: string) {
      switch (type) {
        case "Developer":
          return new Developer(name);
        case "Tester":
          return new Tester(name);
        default:
          throw new Error(`Classname ${type} doesn't exist!`);
      }
    }
  }

  const factory = new EmployeeFactory();
  factory.employees.push(factory.create("Patrick", "Developer"));
  factory.employees.push(factory.create("John", "Tester"));
  // We have Error: Classname Housewife don't exist!
  // factory.employees.push(factory.create("Alice", "Housewife"));

  factory.employees.forEach(emp => emp.say());

  // Let's create a factory that can work with arbitrary number of classes:

  interface ClassList {
    [propName: string]: any;
  }

  // We define ClassList that can contains all classes
  // with Employee interface.
  let classList: ClassList = {
    "Developer": Developer,
    "Tester": Tester,
  }

  class EmployeeFactoryUpgraded {
    constructor(public classList_: ClassList) { }

    create(name: string, type: string) {
      if (type in this.classList_) {
        const className = this.classList_[type];
        return new className(name);
      } else {
        throw new Error(`Classname ${type} doesn't exist!`);
      }
    }
  }

  let employees: Array<Employee> = [];

  const uFactory = new EmployeeFactoryUpgraded(classList);
  employees.push(uFactory.create("Patrick", "Developer"));
  employees.push(uFactory.create("John", "Tester"));

  employees.forEach(emp => emp.say());
}