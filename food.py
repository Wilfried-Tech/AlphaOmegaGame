# -*- coding: utf-8 -*-

"""
  File: food.py
  Author: Wilfried-Tech
  Description:
    Here is the definition of the Food class
"""


class Food: 
  """
    Food represent a food in the game
  """
  
  def __init__(self,row,col,name, quantity):
    self.row = row
    self.col = col
    self.name = name
    self.energie = quantity
  
  @property
  def finished(self): 
    return True if self.energie<=0 else False
    

__all__ = ['Food']

if __name__ == "__main__": 
  print("you are in Food package file")
