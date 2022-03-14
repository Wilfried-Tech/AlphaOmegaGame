# -*- coding: utf-8 -*-

import os, re # , math
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
    self.__nb_of_turn = 0
  
  @property
  def turnCount(self): 
    return self.__nb_of_turn
  @property
  def end(self): 
    return self.__getAlpha(1).energie <= 0 or self.__getAlpha(2) <= 0 
  
  def loadConfigFile(self,file):
    with open(file,'r') as conf:
      lines = conf.readlines()
      self.__size = [int(x) for x in lines[1].split(' ')]
      for line in lines[2:]:
        arr = line.strip().split(' ')
        if arr[-1].isalpha():
          [team,row,col,name] = arr
          self.__volves.append(Wolf(int(row),int(col),name,int(team)))
        elif arr[-1].isdigit():
          [row,col,name,qte] = arr
          self.__foods.append(Food(int(row),int(col),name,int(qte)))
    self.__makeMap()
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
      print("] \r",end='')
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
        if item != None :
          if type(item) == int:
            item = item if item > 9 else ' '+str(item)
            print(item,end='')
          else:
            print(item,end='')
        else:
          print("  ",end='')
      print('')
  
  def __parseInstruction(self, orders):
    orders = orders.strip().split(' ')
    parsedOrders = {
      'pacify': [],
      'attack': [],
      'nourish': [],
      'move': []
    }
    MOVE,ATTACK,NOURISH,PACIFY = 0,1,2,3
    
    for order in orders :
      obj = {}
      for action,pattern in list([r"(\d+)-(\d+)\:\@(\d+)-(\d+)",r"(\d+)-(\d+)\:\*(\d+)-(\d+)",r"(\d+)-(\d+)\:\<(\d+)-(\d+)",r"(\d+)-(\d+)\:pacify"]): 
        match = re.match(pattern,order)
        if match and action == MOVE: 
          obj['from'] = {'row':match.group(1),'col':match.group(2)}
          obj['to'] = {'row':match.group(3),'col':match.group(4)}
          parsedOrders['move'].append(obj)
          break
        if match and action == ATTACK: 
          obj['from'] = {'row':match.group(1),'col':match.group(2)}
          obj['to'] = {'row':match.group(3),'col':match.group(4)}
          parsedOrders['attack'].append(obj)
          break
        if match and action == NOURISH: 
          obj['from'] = {'row':match.group(1),'col':match.group(2)}
          obj['to'] = {'row':match.group(3),'col':match.group(4)}
          parsedOrders['nourish'].append(obj)
          break
        if match and action == PACIFY: 
          obj['from'] = {'row':match.group(1),'col':match.group(2)}
          parsedOrders['pacify'].append(obj)
          break
    
    return parsedOrders
    
  def __getAlpha(self,team): 
    return list(filter(lambda wolf: wolf.name == 'alpha' and wolf.team == team,self.__volves))[0]
  
  def __distance(self,frow,fcol,trow,tcol):
    return max(abs(trow - frow),abs(tcol - fcol))
  
  def __getVolvesInRadius(self,row,col,radius):
    return []
