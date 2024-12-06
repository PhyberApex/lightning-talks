interface Dog {
  barkAt(dog: Dog): void;
}

interface SmallDog extends Dog {
  whimper: () => void;
}

const smallDog: SmallDog = {
  barkAt(dog: Dog) {},
  whimper() { console.log('Whimper') },
}

const brian: Dog = {
  barkAt(smallDog: SmallDog) { smallDog.whimper();  },
};

const normalDog: Dog = {
  barkAt() {},
};
brian.barkAt(smallDog);