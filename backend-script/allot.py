import pandas as pd

def is_available(dept):
    return currently_allotted_seats[dept] < seats[dept]

def update_seats(dept):
    currently_allotted_seats[dept] = currently_allotted_seats[dept] + 1

df = pd.read_excel("OC.xlsx")
df.sort_values(by=['Marks'], ascending=False,inplace=True)
seats = {"BOT":30,"CHE":34,"COM":66,"CSC":20,"ECO":58,
         "HIS":55,"MAL":39,"MAT":33,"PED":30,"PHY":42,
         "POL":50,"SKT":50,"STA":33,"ZLG":28}
currently_allotted_seats = {"BOT":0,"CHE":0,"COM":0,"CSC":0,"ECO":0,
         "HIS":0,"MAL":0,"MAT":0,"PED":0,"PHY":0,
         "POL":0,"SKT":0,"STA":0,"ZLG":0}

courses ={"5D01BOT":"BOT","5D03BOT":"BOT",
          "5D03CHE":"CHE","5D04CHE":"CHE",
          "5D01COM":"COM","5D03COM":"COM",
          "5D02CSC":"CSC","5D05CSC":"CSC",
          "5D01ECO":"ECO","5D04ECO":"ECO",
          "5D01HIS":"HIS","5D02HIS":"HIS","5D03HIS":"HIS",
          "5D03MAL":"MAL","5D04MAL":"MAL",
          "5D02MAT":"MAT","5D04MAT":"MAT",
          "5D05PED":"PED",
          "5D03PHY":"PHY","5D05PHY":"PHY",
          "5D01POL":"POL","5D05POL":"POL",
          "5D02SKT":"SKT","5D05SKT":"SKT",
          "5D02STA":"STA","5D04STA":"STA",
          "5D02ZLG":"ZLG","5D03ZLG":"ZLG"}

open_list = []

for i, stud in df.iterrows():
    allotted = False
    for choice in range(1,25):
        l = stud[stud  == choice].index.tolist()
        for course, dept in courses.items():
            print(stud["Reg No."])
            if l[0] == course:
                if is_available(dept):
                    update_seats(dept)
                    allotted = True
                    allotment_row = []
                    allotment_row.append(stud["Reg No."])
                    allotment_row.append(stud["Name"])
                    allotment_row.append(stud["Marks"])
                    allotment_row.append(course)
                    allotment_row.append(choice)
                    open_list.append(allotment_row)
                    break
        if allotted == True:
            break

data = pd.DataFrame(open_list)
data.to_excel("open_allotment_2022-23.xlsx")
