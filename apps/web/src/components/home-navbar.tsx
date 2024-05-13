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
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  Search,
} from 'lucide-react';
import { Button } from './ui/button';
import LocalTooltips from './local-tooltips';
import { logout } from '@/lib/jwt';
import Link from 'next/link';
import {
  getIsTokenExpired,
  getSessionThunk,
  logOutThunk,
} from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import {
  findEventThunk,
  findEventThunkDetail,
  getPointThunk,
} from '@/redux/features/app-thunk';
import {
  discountDismiss,
  pointDismiss,
  setSearchText,
} from '@/redux/features/app-slice';
import useDebounce from '@/lib/debounce';

const HomeNavbar = ({ isSearch = true }: { isSearch?: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const point = useAppSelector((state) => state.appReducer.point);
  const isUserExpired = useAppSelector(
    (state) => state.authReducer.isUserExpired,
  );
  const searchText = useAppSelector((state) => state.appReducer.searchText);
  const searchEvents = useAppSelector((state) => state.appReducer.searchEvents);

  const router = useRouter();

  const debouncedSearch = useDebounce(searchText, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  useEffect(() => {
    dispatch(getIsTokenExpired());

    if (!user) {
      dispatch(getSessionThunk());
    } else {
      dispatch(getPointThunk());
    }

    console.log('debounce:', debouncedSearch);
    // if (debouncedSearch) {
    dispatch(findEventThunk({ title: searchText }));
    // }
  }, [user, debouncedSearch]);

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
              ShowTime!
            </span>
          </Link>
        </div>
        {isSearch && (
          <div className="hidden lg:flex w-full relative focus:bg-black focus-visible:bg-black">
            <InputSearch
              ref={inputRef}
              className="rounded-full w-full bg-slate-100 focus:!ring-slate-blue-800"
              type="text"
              placeholder="Search your event here!"
              defaultValue={searchText}
              onChange={handleInputChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() =>
                setTimeout(() => {
                  setIsFocus(false);
                }, 500)
              }
              onKeyDownCapture={(e) => {
                if (e.key === 'Enter') {
                  dispatch(
                    findEventThunkDetail({
                      title: searchText,
                      page: 1,
                    }),
                  );
                  router.push('/search');
                }
              }}
            />
            {searchText && isFocus && (
              <div className="absolute z-10 top-12 bg-white w-full rounded-md shadow-md border-[1px] p-2">
                {searchEvents.map((data, index) => {
                  return (
                    <Link key={`${data.id}-${index}`} href={`/${data.id}`}>
                      <Button className="w-full text-slate-800 bg-white hover:bg-slate-50/90 justify-between gap-2">
                        <span className="w-full overflow-hidden truncate text-start">
                          {data.title}
                        </span>
                        <span className="w-fit shrink-0">
                          {data.price === 0
                            ? 'Free'
                            : new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })
                                .format(data.price)
                                .toString()}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div className="w-full flex justify-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="px-0 aspect-square rounded-full">
                <Search />
              </Button>
            </SheetTrigger>
            <SheetContent side={'top'}>
              <InputSearch
                className="rounded-full w-full bg-slate-100 focus:!ring-slate-blue-800"
                type="text"
                placeholder="Search your event here!"
                defaultValue={searchText}
                onChange={handleInputChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsFocus(false);
                  }, 500)
                }
                onKeyDownCapture={(e) => {
                  if (e.key === 'Enter') {
                    console.log('------enter');
                    dispatch(
                      findEventThunkDetail({
                        title: searchText,
                        page: 1,
                      }),
                    );
                    router.push('/search');
                  }
                }}
              />
              {searchText && isFocus && (
                <div className="absolute z-10 left-0 top-24 bg-white w-full rounded-md shadow-md border-[1px] p-2">
                  {searchEvents.map((data, index) => {
                    return (
                      <Link key={`${data.id}-${index}`} href={`/${data.id}`}>
                        <Button className="w-full text-slate-800 bg-white hover:bg-slate-50/90 justify-between">
                          <span>{data.title}</span>
                          <span>
                            {data.price === 0
                              ? 'Free'
                              : new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                })
                                  .format(data.price)
                                  .toString()}
                          </span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex w-full flex-row gap-4 justify-end items-center">
          {isUserExpired || !user ? (
            <Link href="/auth/signin">
              <Button className="bg-slate-blue-800 hover:bg-slate-blue-800/90">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <div className="hidden lg:flex items-center gap-2.5">
                <Wallet />
                <span className="text-slate-blue-800">
                  {point ? point.data.totalPoints : 0} P
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="focus:!ring-0">
                  <Button className="rounded-full w-fit flex bg-white hover:bg-white focus:!ring-0 focus-visible:ring-offset-0">
                    <LocalTooltips
                      align="end"
                      content={`${user.name} | ${user.email}`}
                    >
                      <div className="flex gap-4 px-0 ">
                        <div className="w-10 h-10 rounded-full bg-slate-blue-800 flex flex-shrink-0 justify-center items-center">
                          <span className="font-bold text-white text-sm">
                            {user.name[0].toLocaleUpperCase()}
                          </span>
                        </div>

                        <div className="w-32 overflow-hidden hidden lg:flex flex-col items-start justify-start tracking-tight">
                          <p className="w-full text-start text-slate-800 font-medium truncate">
                            {user.name}
                          </p>
                          <p className="w-full text-start text-slate-500 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </LocalTooltips>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="flex lg:hidden" />
                  <DropdownMenuLabel className="flex lg:hidden">
                    <span>{user.name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="flex lg:hidden">
                    <span>{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="flex lg:hidden" />
                  <DropdownMenuLabel className="flex lg:hidden">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span className="text-slate-blue-800">
                      {point ? point.data.totalPoints : 0} P
                    </span>
                  </DropdownMenuLabel>
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
          )}
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
