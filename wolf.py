# -*- coding: utf-8 -*-
"""
  File: wolf.py
  Author: Wilfried-Tech
  Description:
    Define Wolf structure
"""

import math

class Wolf:
  """
    Wolf class représent a wolf in a game
  """
  def __init__(self,row,col,name,team):
    self.row = row
    self.col = col
    self.name = name
    self.team = team
    self.energie = 100
    self.__pacified = 0
    
  # définition off some property
  
  @property
  def pacified(self):
    return self.__pacified
  
  @pacified.setter
  def pacified(self,value):
    self.__pacified = 0 if(value<=0) else value;
  
  @property
  def active(self): 
    return True if(self.energie>0 and self.__pacified == 0) else False

# wolf method 

  def fight(self,wolf):
    if(type(wolf)!='wolf'):
      raise TypeError('the opponnent must be a wolf');
      return
    wolf.receiveDamage(math.round(self.energie/10))
  
  def receiveDamage(self,damage):
    """ receive the fight damage """
    self.energie = 0 if(self.energie - damage <= 0) else self.energie - damage
    
  def nourish(self,food):
    if(type(food)!='food'):
      raise TypeError('the nourishment must be a food');
      return
    while (food.energie>0 and self.energie<100): 
      self.energie += 1
      food.energie += 1
  


__all__ = ['Wolf']

if __name__ == "__main__": 
  print("you are in the wolf package file");
