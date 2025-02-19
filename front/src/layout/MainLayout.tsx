import { Outlet, NavLink } from 'react-router';

export const MainLayout = () => {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
        <div className="bg-white dark:bg-gray-950">
          <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
            <h1 className="flex gap-4 text-2xl">패스 오브 엑자일 2</h1>
            <div className="flex items-center gap-6 max-md:hidden">
              <NavLink
                className={({ isActive }) =>
                  `text-sm/6 text-gray-950 dark:text-white ${
                    isActive && 'font-bold'
                  }`
                }
                to="/"
              >
                홈
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-sm/6 text-gray-950 dark:text-white ${
                    isActive && 'font-bold'
                  }`
                }
                to="/tailwind"
              >
                테일윈드
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-sm/6 text-gray-950 dark:text-white ${
                    isActive && 'font-bold'
                  }`
                }
                to="/create"
              >
                이미지 분석기
              </NavLink>
            </div>
          </div>
          <div className="flex h-14 items-center border-t border-gray-950/5 bg-white px-4 sm:px-6 lg:hidden dark:border-white/10 dark:bg-gray-950"></div>
        </div>
      </header>

      <main className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] pt-26.25 lg:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem] lg:pt-14.25 xl:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem]">
        <aside className="relative col-start-1 row-span-full row-start-1 max-lg:hidden">
          <div className="absolute inset-0">
            <div className="sticky top-14.25 bottom-0 left-0 h-full max-h-[calc(100dvh-(var(--spacing)*14.25))] w-2xs overflow-y-auto p-6">
              <div className="h-2000">호호</div>
            </div>
          </div>
        </aside>
        <div className="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>
        <div className="relative row-start-1 grid grid-cols-subgrid lg:col-start-3">
          <div className="hidden"></div>
          <Outlet />
        </div>
        <div className="col-start-4 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>
      </main>
    </>
  );
};
