import {
  Cloud,
  Confetti,
  CreditCard,
  Keyboard,
  Plus,
  PlusCircle,
  User,
  UserPlus,
  Users,
} from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import { InputSearch } from './inputs/input-search';
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
} from './ui/dropdown-menu';
import {
  Settings,
  Mail,
  MessageSquare,
  Github,
  LifeBuoy,
  LogOut,
  Ticket,
  PartyPopper,
  Store,
} from 'lucide-react';
import { Button } from './ui/button';
import LocalTooltips from './local-tooltips';

const HomeNavbar = ({
  isSearch = true,
  isAccount = true,
}: {
  isSearch?: boolean;
  isAccount?: boolean;
}) => {
  return (
    <>
      <div className="sticky h-fit w-screen top-0 z-20 px-12 py-4 bg-white flex flex-row items-center justify-between border-b-[1px] border-b-slate-300 shadow-lg">
        <div className="w-full h-fit inline-flex flex-row gap-2 text-slate-blue-800">
          <Confetti weight="bold" size={32} />
          <span className="text-2xl font-extrabold tracking-tighter">
            ShowTime!
          </span>
        </div>
        {isSearch && (
          <div className="w-full">
            <InputSearch
              className="rounded-full bg-slate-100 focus:!ring-slate-blue-800"
              type="text"
              placeholder="Search your event here!"
            />
          </div>
        )}
        {isAccount && (
          <div className="w-full flex flex-row gap-2 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="focus:!ring-0">
                <Button className="rounded-full w-fit flex gap-4 px-0 bg-white hover:bg-white focus:!ring-0 focus-visible:ring-offset-0">
                  <div className="w-10 h-10 rounded-full bg-slate-blue-800 flex flex-shrink-0 justify-center items-center">
                    <span className="font-bold text-white text-sm">VY</span>
                  </div>

                  <div className="w-32 overflow-hidden flex flex-col items-start tracking-tight">
                    <LocalTooltips
                      align="end"
                      content="Vyan Inysa Nur Muhammad"
                    >
                      <p className="w-full text-slate-800 font-medium truncate">
                        Vyan Inysa Nur Muhammad
                      </p>
                    </LocalTooltips>
                    <LocalTooltips
                      align="end"
                      content="vyaninsya.nurmuhammad@gmail.com"
                    >
                      <p className="w-full text-slate-500 text-xs truncate">
                        vyaninsya.nurmuhammad@gmail.com
                      </p>
                    </LocalTooltips>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Ticket</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Store className="mr-2 h-4 w-4" />
                    <span>My Store</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeNavbar;
