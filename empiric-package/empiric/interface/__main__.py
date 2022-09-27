
import curses
from curses import panel

import time


MARGIN = 7

class Menu(object):
    def __init__(self, items, stdscreen):
        self.window = stdscreen.subwin(0, 0)
        self.window.keypad(1)
        self.panel = panel.new_panel(self.window)
        self.panel.hide()
        panel.update_panels()

        self.position = 0
        self.items = items
        self.items.append(("Exit", "Exit "))

        #set up color pair for highlighted option
        curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)
        self.hilite_color = curses.color_pair(1)
        self.normal_color = curses.A_NORMAL

    def navigate(self, n):
        self.position += n
        if self.position < 0:
            self.position = 0
        elif self.position >= len(self.items):
            self.position = len(self.items) - 1

    def _draw_title(self):
        self.window.addstr(2, 2, 'EMPIRIC', curses.A_STANDOUT)
        self.window.addstr(4, 2, 'Tools for interacting with Empiric', curses.A_BOLD)

    def display(self):
        self.panel.top()
        self.panel.show()
        self.window.clear()

        while True:
            self.window.refresh()
            self._draw_title()
            curses.doupdate()
            for index, item in enumerate(self.items):
                if index == self.position:
                    mode = curses.A_REVERSE
                else:
                    mode = curses.A_NORMAL

                msg = "%d. %s" % (index, item[0])
                self.window.addstr(MARGIN + index, 4, msg, mode)

            key = self.window.getch()

            if key in [curses.KEY_ENTER, ord("\n")]:
                if self.position == len(self.items) - 1:
                    break
                else:
                    self.items[self.position][1]()

            elif key == curses.KEY_UP:
                self.navigate(-1)

            elif key == curses.KEY_DOWN:
                self.navigate(1)

        self.window.clear()
        self.panel.hide()
        panel.update_panels()
        curses.doupdate()


class MyApp(object):
    def __init__(self, stdscreen):
        self.screen = stdscreen
        curses.curs_set(0)

        submenu_items = [("Request Random", lambda: multistage_prompt(self.screen, 5, 5)), ("Verify Random", curses.flash)]
        submenu1 = Menu(submenu_items, self.screen)

        submenu_items = [("ETH", curses.beep), ("USDC", curses.flash), ("USDT", curses.flash)]
        submenu2 = Menu(submenu_items, self.screen)

        submenu_items = [("ETH", curses.beep), ("POLYGON", curses.flash)]
        submenu3 = Menu(submenu_items, self.screen)

        main_menu_items = [
            ("VRF", submenu1.display),
            ("Price Feeds", submenu2.display),
            ("L1 Data", submenu3.display),
        ]
        main_menu = Menu(main_menu_items, self.screen)
        main_menu.display()

def multistage_prompt(stdscr, r, c):
    first_val = prompt(stdscr, r, c, 'input private key')
    second_val = prompt(stdscr, r, c, 'input seed')
    third_val = prompt(stdscr, r, c, 'input callback address')
    stdscr.clear()
    curses.echo()
    stdscr.addstr(r, c, 'processing')
    stdscr.refresh()
    time.sleep(1)
    stdscr.addstr(r, c + 10, '.')
    stdscr.refresh()
    time.sleep(1)
    stdscr.addstr(r, c + 11, '.')
    stdscr.refresh()
    time.sleep(1)
    stdscr.addstr(r, c + 12, '.')
    stdscr.refresh()
    time.sleep(2)
    stdscr.clear()
    stdscr.addstr(r, c, 'Transaction Complete')
    time.sleep(0.5)
    stdscr.addstr(r + 1, c, 'Transaction Hash: 0x123deadbeef4515b131d')
    stdscr.addstr(r + 3, c, 'press enter to return')
    stdscr.refresh()
    input_ = stdscr.getstr(r + 2, c, 20)
    stdscr.clear()

def prompt(stdscr, r, c, prompt_string):
    stdscr.clear()
    curses.echo()
    stdscr.addstr(r, c, prompt_string)
    stdscr.addstr(r + 1, c, '$')
    stdscr.refresh()
    input_ = stdscr.getstr(r + 1, c + 2, 20)
    stdscr.clear()
    return input_

if __name__ == "__main__":
    curses.wrapper(MyApp)
