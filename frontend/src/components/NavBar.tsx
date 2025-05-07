'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";


const navList = [
    {
      label: "Home",
      link: '/'
    },
    {
  
      label: "Profile",
      link: '/profile'
    },
  ];
  
  function NavBar() {
  return(
    //const pathName : string = usePathname()
  
    <div>
      <h1><DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            Support
          </DropdownMenuItem>

          <DropdownMenuItem>
            Change Password
          </DropdownMenuItem>

          <DropdownMenuItem>
          <a href="https://github.com">GitHub</a>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu></h1>
    </div>
  );
  
  }
  export default NavBar;
  
  


