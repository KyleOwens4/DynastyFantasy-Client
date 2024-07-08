import { Avatar, Menu } from "@mantine/core";
import { LogOut } from "lucide-react";
import { supabase } from "../../supabase/supabase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/signin");
  };

  return (
    <div className="flex justify-between items-center h-full px-4 shadow-sm">
      <img src="/Brand.png" className="max-h-full" />
      <Menu>
        <Menu.Target>
          <Avatar />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<LogOut className="w-4 h-4 text-rose-500" />}
            color="red.6"
            onClick={handleSignout}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
