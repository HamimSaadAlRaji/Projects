from tkinter import *
from tkinter import ttk
from translate import Translator
from googletrans import LANGUAGES

def translate(text, src, dest):
    translator = Translator(to_lang=dest, from_lang=src)
    translated = translator.translate(text)
    return translated

def change():
    src = combo.get()
    dest = combo2.get()
    text = src_text.get(1.0, END).strip()  # Remove leading/trailing whitespaces
    destText = translate(text, src, dest)
    frame2.delete(1.0, END)
    frame2.insert(END, destText)

root = Tk()
root.title("Translator")
root.geometry("600x600")
root.configure(bg="Light Blue")  

Label(root, text="Translator", font="arial 20 bold", bg="Light Blue").place(x=220, y=30)

frame = Frame(root)
frame.pack(side=BOTTOM)

src_text = Text(root, font="arial 20", wrap=WORD)
src_text.place(x=50, y=80, height=150, width=500)

list_text = list(LANGUAGES.values()) # Use language codes instead of values

combo = ttk.Combobox(root, values=list_text)
combo.place(x=50, y=300)
combo.set("english")

button_text = Button(root, text="Translate", bg="White", fg="Black", font="arial 15 bold", command=change)
button_text.place(x=250, y=300, height=30, width=100)

combo2 = ttk.Combobox(root, values=list_text)
combo2.place(x=400, y=300)
combo2.set("Choose Language")

frame2 = Text(root, font="arial 20", wrap=WORD)
frame2.place(x=50, y=400, height=150, width=500)

root.mainloop()
