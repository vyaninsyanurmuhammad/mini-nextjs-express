'use client';

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
import React, { useEffect } from 'react';
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
  Wallet,
  BadgePercent,
  Menu,
} from 'lucide-react';
import { Button } from './ui/button';
import LocalTooltips from './local-tooltips';
import { logout } from '@/lib/jwt';
import Link from 'next/link';
import { getSessionThunk, logOutThunk } from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { getPointThunk } from '@/redux/features/app-thunk';
import { discountDismiss, pointDismiss } from '@/redux/features/app-slice';

const HomeNavbar = ({ isSearch = true }: { isSearch?: boolean }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const point = useAppSelector((state) => state.appReducer.point);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      dispatch(getSessionThunk());
    } else {
      dispatch(getPointThunk());
    }
  }, [user]);

  return (
    <>
      <div className="sticky h-fit w-screen top-0 z-20 px-12 py-4 bg-white flex flex-row items-center justify-between border-b-[1px] border-b-slate-300 shadow-lg">
        <div className="w-full h-fit inline-flex">
          <Link
            href={'/'}
            className="h-fit w-fit inline-flex flex-row gap-2 text-slate-blue-800"
          >
            <Confetti weight="bold" size={32} />
            <span className="hidden lg:flex text-2xl font-extrabold tracking-tighter">
              ShowTime! <span>{user ? user.role[0] : 'null'}</span>
            </span>
          </Link>
        </div>
        {isSearch && (
          <div className="hidden lg:flex w-full">
            <InputSearch
              className="rounded-full bg-slate-100 focus:!ring-slate-blue-800"
              type="text"
              placeholder="Search your event here!"
            />
          </div>
        )}

        <div className="hidden lg:flex w-full flex-row gap-4 justify-end items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2.5">
                <Wallet />
                <span className="text-slate-blue-800">
                  {point ? point.data.totalPoints : 0} P
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="focus:!ring-0">
                  <Button className="rounded-full w-fit flex gap-4 px-0 bg-white hover:bg-white focus:!ring-0 focus-visible:ring-offset-0">
                    <div className="w-10 h-10 rounded-full bg-slate-blue-800 flex flex-shrink-0 justify-center items-center">
                      <span className="font-bold text-white text-sm">
                        {user.name[0].toLocaleUpperCase()}
                      </span>
                    </div>

                    <div className="w-32 overflow-hidden flex flex-col items-start justify-start tracking-tight">
                      <LocalTooltips align="end" content={user.name}>
                        <p className="w-full text-start text-slate-800 font-medium truncate">
                          {user.name}
                        </p>
                      </LocalTooltips>
                      <LocalTooltips align="end" content={user.email}>
                        <p className="w-full text-start text-slate-500 text-xs truncate">
                          {user.email}
                        </p>
                      </LocalTooltips>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={'/dashboard/profile'}>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href={'/dashboard/tickets'}>
                    <DropdownMenuItem>
                      <Ticket className="mr-2 h-4 w-4" />
                      <span>My Ticket</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href={'/dashboard/discount'}>
                    <DropdownMenuItem>
                      <BadgePercent className="mr-2 h-4 w-4" />
                      <span>My Discount</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href={'/dashboard/store'}>
                    <DropdownMenuItem>
                      <Store className="mr-2 h-4 w-4" />
                      <span>My Store</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      dispatch(logOutThunk());
                      dispatch(pointDismiss());
                      dispatch(discountDismiss());

                      router.push('/auth/signin');
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-slate-blue-800 hover:bg-slate-blue-800/90">
                Login
              </Button>
            </Link>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex lg:hidden rounded-full">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"top"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default HomeNavbar;
