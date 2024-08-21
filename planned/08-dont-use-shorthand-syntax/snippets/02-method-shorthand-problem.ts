interface Dog {
  barkAt(dog: Dog): void;
}

interface SmallDog extends Dog {
  whimper: () => void;
}

const brian: Dog = {
  barkAt(smallDog: SmallDog) {
    smallDog.whimper(); // Seems fine, but...
  },
};

const normalDog: Dog = {
  barkAt() {},
};

brian.barkAt(normalDog); // Runtime error!
