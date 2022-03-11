# -*- coding: utf-8 -*-

import os
from color import Color
from wolf import Wolf
from food import Food


class Game:
  """ """
  def __init__(self):
    self.__map = None
    self.__size = None
    self.__volves = []
    self.__foods = []
    self.__pacified_volves = []
  
  def loadConfigFile(self,file):
    with open(file,'r') as conf:
      lines = conf.readlines()
      self.__size = [int(x) for x in lines[1].split(' ')]
      for line in lines[2:]:
        arr = line.split(' ')
        if arr[-1].isalpha():
          print('al')
          [team,row,col,name] = arr
          self.__volves.append(Wolf(int(row),int(col),name,int(team)))
        elif arr[-1].isdigit():
          print('di')
          [row,col,name,qte] = arr
          self.__foods.append(Food(int(row),int(col),name,int(qte)))
    self.__makeMap()
    print(self.__volves)
    self.__loading()
  
  def __loading(self):
    print('\n loading game . . .')
    progress,i = 0,0
    width = 40
    while progress <= width: 
      print(" [",end='')
      i = 0
      while i <= width:
        if i <= progress:
          print(Color.bg(" ",(20,255,20)),end='')
        else:
          print(Color.bg(" ",(100,100,100)),end='')
        i += 1
      print("]\r",end='')
      progress += 1
      os.system("sleep $((10/40))")
    os.system("sleep 2;clear")
  
  def __makeMap(self): 
    self.__map = []
    for row in range(0,self.__size[0]+1):
      self.__map.append([])
      for col in range(0,self.__size[1]+1):
        self.__map[row].append(None)
        if(not row and col):
          self.__map[row][col] = col
        if(not col):
          self.__map[row][col] = row
    
    for wolf in self.__volves:
      self.__map[wolf.row][wolf.col] = wolf
    for food in self.__foods:
      self.__map[food.row][food.col] = food
  
  def draw(self):
    os.system('clear');
    for row in range(0,self.__size[0]+1):
      for col in range(0,self.__size[1]+1):
        item = self.__map[row][col]
        print(item)
        if item != None :
          if type(item) == int:
            print(item,end=' ')
          else:
            print("*",end=' ')
        else:
          print(" ",end=' ')
      print('')

