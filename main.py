# -*- coding: utf-8 -*-

from wolf import Wolf
from food import Food
from game import Game


def PvP():
  team = 1
  
  game = Game()
  game.loadConfigFile('config.ano')
  game.draw()
  while not game.end() or game.turnCount < 200: 
    game.waitOrders(team)
  


print("\n","BIENVENUE DANS LE JEU ALPHA OMEGA !".center(47),"\n\n")

while True:
  print(" 1) Player vs Player\n")
  print(" 2) Quit Game \n")
  try:
    choice = 1#int(input(">> "))
  except ValueError:
    print("\nun chiffre s'il vous plaît")
    choice = 0
  if(choice in range(1,3)):
    break

if choice == 1:
  PvP()
elif choice == 2:
  exit()
