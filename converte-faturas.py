import os

print("init open file")

for root, subdirs, files in os.walk("./faturas"):
    if len(files) > 0:
        for file in files:
            print (file)

#     f = open("dados-faturas/demofile2.txt", "w")
#     print("deu certo?")
#     print("An exception occurred")

# f.write("Now the file has more content!")
# f.close()