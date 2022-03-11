
class Color:
  @staticmethod
  def bg(text,rgb):
    return "\x1b[48;2;{};{};{}m{}\x1b[m".format(*rgb,text)
  
  def txt(text,rgb): 
    return "\x1b[38;2;{};{};{}m{}\x1b[m".format(*rgb,text)



if __name__=="__main__": 
  print(Color.bg("Wilfried-Tech",(255,0,0)))
