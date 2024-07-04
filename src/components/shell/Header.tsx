import { Avatar } from "@mantine/core";

export default function Header() {
  return (
    <div className="flex justify-between items-center h-full px-4 shadow-sm">
      <img src="/Brand.png" className="max-h-full" />
      <Avatar />
    </div>
  );
}
