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
import Link from "next/link";
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
        <DropdownMenuLabel>Nav Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          
          <DropdownMenuItem>
          <Link href="/carprofile"> Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
          <Link href="">Register New Car</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
          <Link href="">Car Parts</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
          <Link href="">AutoShop Finder</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link href="">Update Password</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu></h1>
    </div>
  );
  
  }
  export default NavBar;
  
  


