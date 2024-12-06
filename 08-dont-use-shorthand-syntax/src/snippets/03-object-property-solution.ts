interface Dog {
  barkAt: (dog: Dog) => void;
}

interface SmallDog extends Dog {
  whimper: () => void;
}

const brian: Dog = {
  barkAt(dog: SmallDog) {},
};
