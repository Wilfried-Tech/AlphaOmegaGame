
def printf(arg):
  """docstring for printf"""
  print(arg,sep='',end='')

def draw(map=(20,20)):
  """docstring for fname"""
  for i in range(map[0]):
    printf("__")
  printf('\n')
  for i in range(map[0]):
    for j in range(map[1]):
      printf("| *")
    printf("|\n")
    for i in range(map[0]):
      printf("__")
    printf('\n')
  
def draw(arg):
  """docstring for draw"""
  for i in range(arg[0]):
    for j in range(arg[1]):
      printf(" 🐺 ")
    printf("\n\n")