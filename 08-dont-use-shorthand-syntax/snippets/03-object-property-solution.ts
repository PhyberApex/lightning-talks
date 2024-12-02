interface Dog {
  barkAt: (dog: Dog) => void;
}

interface SmallDog extends Dog {
  whimper: () => void;
}

const brian: Dog = {
  barkAt(dog: SmallDog) {}, // Error: Type '(dog: SmallDog) => void' is not assignable to type '(dog: Dog) => void'.
};
