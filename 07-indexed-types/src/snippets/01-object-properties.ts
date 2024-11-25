type NavbarProps = {
  onChange: () => void;
  title: string;
  isVisible: boolean;
};

// Extract specific property types
type OnChangeType = NavbarProps["onChange"];
type TitleType = NavbarProps["title"];

// Can even access multiple properties using union
type StringProps = NavbarProps[keyof NavbarProps];

type Invalid = NavbarProps["notExists"];