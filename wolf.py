# -*- coding: utf-8 -*-
"""
  File: wolf.py
  Author: Wilfried-Tech
  Description:
    Define Wolf structure
"""

class Wolf:
  """
    Wolf class représent a wolf in a game
  """
  def __init__(self,x,y,name,team):
    self.__x = x
    self.__y = y
    self.__name = name
    self.__team = team
    self.__energie = 100
    
