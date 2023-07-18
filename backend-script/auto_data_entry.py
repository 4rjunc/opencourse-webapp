import requests
import random

reg_nos = [
    "NA21CPHR22",
    "NA21CPHR07",
    "NA21CPHR26",
    "NA21CPHR36",
    "NA21CPHR39",
    "NA21CPHR21",
    "NA21CPHR46",
    "NA21CPHR48",
    "NA21CPHR49",
    "NA21CPHR24",
    "NA21CPHR37",
    "NA21CPHR41",
    "NA21CPHR02",
    "NA21CPHR10",
    "NA21CPLR03",
    "NA21CPLR14",
    "NA21CPLR30",
    "NA21CPLR09",
    "NA21CPLR16",
    "NA21CPLR05",
    "NA21CPLR25",
    "NA21CPLR08",
    "NA21CPLR07",
    "NA21CPLR28",
    "NA21CPCR09",
    "NA21CPLR21",
    "NA21CZOR19",
    "NA21CZOR06",
    "NA21CZOR27",
    "NA21CZOR13",
    "NA21CZOR04",
    "NA21CZOR23",
    "NA21CZOR09",
    "NA21CZOR29",
    "NA21CZOR16",
    "NA21CZOR14",
    "NA21CZOR12",
    "NA21CMSR28",
    "NA21CMSR19",
    "NA21CMSR26",
    "NA21CMSR21",
    "NA21CMSR18",
    "NA21CMSR08",
    "NA21CMSR17",
    "NA21CMSR23",
    "NA21CPCR26",
    "NA21CPCR12",
    "NA21CPCR16",
    "NA21CPCR07",
    "NA21CPCR14",
    "NA21CPCR23",
    "NA21CPCR15",
    "NA21CSTR28",
    "NA21CPCR18",
    "NA21CSTR09",
    "NA21CSTR13",
    "NA21CSTR05",
    "NA21CSTR16",
    "NA21CSTR20",
    "NA21CSTR26",
    "NA21CSTR15",
    "NA21BR0034",
    "NA21BR0019",
    "NA21BR0017",
    "NA21BR0055",
    "NA21BR0050",
    "NA21BR0023",
    "NA21BR0011",
    "NA21BR0008",
    "NA21BR0061",
    "NA21BR0013",
    "NA21BR0013",
    "NA21BR0060",
    "NA21BR0038",
    "NA21BR0030",
    "NA21BR0015",
    "NA21CPCR19",
    "NA21BR0046",
    "NA21BR0006",
    "NA21BR0020",
    "NA21BR0047",
    "NA21BR0052",
    "NA21BR0005",
    "NA21BR0032",
    "NA21AHIR014",
    "NA21BR0014",
    "NA21BR0007",
    "NA21CZOR32",
    "NA21BR0037",
    "NA21BR0021",
    "NA21AECR038",
    "NA21CPLR01",
    "NA21BR0026",
    "NA21BR0002",
    "NA21BR0010",
    "NA21BR0004",
    "NA21CPLR12",
    "NA21BR00045",
    "NA21AMAR004",
    "NA21BR0053",
    "NA21CMSR22",
    "NA21CPHR34",
    "NA21BR0036",
    "NA21BR0043",
    "NA21BR0051",
    "NA21BR0039",
    "NA21BR0029",
    "NA21BR0012",
    "NA21BR0041",
    "NA21BR0054",
    "NA21BR0024",
    "NA21BR0057",
    "NA21BR0056",
    "NA21BR0040",
    "NA21AMAR038",
    "NA21AMAR020",
    "NA21AECR005",
    "NA21AECR036",
    "NA21AECR020",
    "NA21CSTR01",
    "NA21AMAR014",
    "NA21AMAR036",
    "NA21AECR017",
    "NA21AMAR001",
    "NA21AMAR032",
    "NA21AECR031",
    "NA21AECR049",
    "NA21AECR011",
    "NA21AECR043",
    "NA21AECR042",
    "NA21AECR006",
    "NA21AECR050",
    "NA21AECR041",
    "NA21AECR010",
    "NA21AECR033",
    "NA21AECR008",
    "NA21AECR026",
    "NA21AECR046",
    "NA21AECR047",
    "NA21AECR040",
    "NA21AECR014",
    "NA21AECR037",
    "NA21AECR035",
    "NA21AECR024",
    "NA21AECR002",
    "NA21AHIR009",
    "NA21AHIR057",
    "NA21AHIR027",
    "NA21AHIR039",
    "NA21AHIR005",
    "NA21CSTR03",
    "NA21AHIR036",
    "NA21AECR028",
    "NA21AHIR034",
    "NA21AHIR041",
    "NA21AHIR001",
    "NA21AHIR053",
    "NA21AHIR003",
    "NA21AHIR012",
    "NA21AHIR030",
    "NA21CPCR05",
    "NA21AHIR052",
    "NA21AMAR009",
    "NA21AHIR006",
    "NA21AHIR017",
    "NA21AHIR031",
    "NA21AHIR056",
    "NA21AHIR038",
    "NA21AHIR004",
    "NA21AHIR002",
    "NA21AHIR020",
    "NA21AHIR037",
    "NA21AHIR007",
    "NA21CZOR01",
    "NA21AHIR049",
    "NA21AHIR011",
    "NA21AHIR055",
    "NA21AHIR050",
    "NA21AHIR024",
    "NA21AHIR051",
    "NA21AHIR033",
    "NA21AHIR035",
    "NA21AHIR045",
    "NA21AHIR026",
    "NA21AHIR040",
    "NA21AHIR046",
    "NA21AHIR043",
    "NA21BR0035",
    "NA21CSTR29",
    "NA21CPLR18",
    "NA21CPHR17",
    "NA21AECR054",
    "NA21CPCR20",
    "NA21AHIR047",
    "NA21CPLR23",
    "NA21CPLR22",
    "NA21CPHR13",
    "NA21BR0003",
    "NA21CPHR44",
    "NA21CPLR24",
    "NA21BR0044",
    "NA21CZOR25",
    "NA21BR0027",
    "NA21AHIR029",
    "NA21CPHR38",
    "NA21AHIR015",
    "NA21CZOR11",
    "NA21CPHR20",
    "NA21AECR034",
    "NA21CZOR33",
    "NA21AECR052",
    "NA21BR0016",
    "NA21AHIR019",
    "NA21CSTR06",
    "NA21AHIR010",
    "NA21CSTR14",
    "NA21CPHR32",
    "NA21BR0022",
    "NA21AHIR028",
    "NA21BR0059",
    "NA21AHIR022",
    "NA21AHIR008",
    "NA21CSTR18",
    "NA21CPHR15",
    "NA21CPCR24",
    "NA21CPCR17",
    "NA21AECR029",
    "NA21AECR015",
    "NA21AMAR021",
    "NA21BR0018",
    "NA21CMSR09",
    "NA21CMSR03",
    "NA21AMAR025",
    "NA21AMAR018",
    "NA21AHIR025",
    "NA21CPHR33",
    "NA21BR0048",
    "NA21AECR007",
    "NA21AECR004",
    "NA21CMSR15",
    "NA21AMAR019",
    "NA21BR0025",
    "NA21AMAR002",
    "NA21AECR039",
    "NA21CMSR24",
    "NA21AECR016",
    "NA21AMAR037",
    "NA21AHIR016",
    "NA21CPLR13",
    "NA21BR0062",
    "NA21BR0028",
    "NA21CMSR16",
    "NA21AECR013",
    "NA21AMAR035",
    "NA21CMSR10",
    "NA21CPLR32",
    "NA21CPLR04",
    "NA21CPHR11",
    "NA21AHIR044",
    "NA21CPHR03",
    "NA21CPHR47",
    "NA21AECR022",
    "NA21CZOR03",
    "NA21CMSR27",
    "NA21CMSR33",
    "NA21AECR003",
    "NA21CPHR30",
    "NA21CPHR05",
    None,
    "NA21CMSR14",
    "NA21CPCR11",
    "NA21BR0049",
    "NA21AECR048",
    "NA21CZOR22",
    "NA21BR0042",
    "NA21CPHR08",
    "NA21CMSR05",
    "NA21CZOR02",
    "NA21AECR021",
    "NA21CSTR12",
    "NA21CMSR13",
    "NA21CMSR07",
    "NA21CZOR15",
    "NA21CZOR07",
    "NA21CMSR12",
    "NA21AMAR017",
    "NA21CPLR20",
    "NA21CZOR24",
    "NA21AECR051",
    "NA21AMAR012",
    "NA21AMAR031",
    "NA21CSTR07",
    "NA21CPLR31",
    "NA21CSTR27",
    "NA21AHIR018",
    "NA21CZOR31",
    "NA21AMAR033",
    "NA21AHIR042",
    "NA21AECR023",
    "NA21CZOR28",
    "NA21CZOR05",
    "NA21AMAR011",
    "NA21AMAR010",
    "NA21AMAR042",
    "NA21AMAR005",
    "NA21CPHR01",
    "NA21AECR009",
    "NA21AMAR039",
    "NA21AHIR054",
    "NA21CSTR22",
    "NA21CPLR10",
    "NA21BR0058",
    "NA21CSTR21",
    "NA21CMSR34",
    "NA21CPCR01",
    "NA21CSTR08",
    "NA21CZOR26",
    "NA21AMAR013",
    "NA21AMAR024",
    "NA21AECR045",
    "NA21CPLR27",
    "NA21CPLR06",
    "NA21CMSR11",
    "NA21AMAR015",
    "NA21AHIR048",
    "NA21CPCR13",
    "NA21CPCR21",
    "NA21CPLR19",
    "NA21AMAR023",
    "NA21CZOR30",
    "NA21CSTR17",
    "NA21AHIR013",
    "NA21CPHR35",
    "NA21AMAR003",
    "NA21CPHR04",
    "NA21CPHR29",
    "NA21AMAR034",
    "NA21CZOR21",
    "NA21CSTR11",
    "NA21CZOR18",
    "NA21CPCR03",
    "NA21AHIR021",
    "NA21CPCR22",
    "NA21AECR053",
    "NA21CPHR14",
    "NA21BR0001",
    "NA21CMSR32",
    "NA21AECR012",
    "NA21AECR032",
    "NA21CZOR20",
    "NA21CPLR15",
    "NA21CMSR06",
    "NA21CPHR25",
    "NA21CPCR25",
    "NA21CPHR09",
    "NA21CPHR28",
    "NA21AECR044",
    "NA21CPHR12",
    "NA21CMSR29",
    "NA21CMSR25",
    "NA21CPCR02",
    "NA21CMSR30",
    "NA21CSTR24",
    "NA21CSTR10",
    "NA21CMSR04",
    "NA21AMAR022",
    "NA21CPCR06",
    "NA21CPCR10",
    "NA21CPHR06",
    "NA21CSTR23",
    "NA21CPHR19",
    "NA21AECR001",
    "NA21CPHR50",
    "NA21CPCR04",
    "NA21CPCR08",
    "NA21CPLR29",
    "NA21AMAR029",
    "NA21AMAR006",
    "NA21AMAR008",
    "NA21AMAR027",
    "NA21CPHR23",
    "NA21AMAR043",
    "NA21AMAR030",
    "NA21CMSR20",
    "NA21CPLR26",
    "NA21AMAR028",
    "NA21CZOR10",
    "NA21CPCR27",
    "NA21CPHR45",
    "NA21CSTR19",
    "NA21AECR025",
    "NA21CMSR01",
    "NA21AMAR040",
    "NA21CPHR16",
    "NA21AMAR007",
    "NA21AMAR041",
    "NA21CSTR25",
    "NA21CPCR28",
    "NA21CMSR02",
    "NA21CMSR31",
    "NA21CPHR31",
    "NA21CPLR02",
    "NA21AHIR023",
    "NA21BR0033",
    "NA21AECR019",
    "NA21CPHR42",
    "NA21CPHR43",
    "NA21AMAR016",
    "NA21CZOR08",
    "NA21CPHR40",
    "NA21AECR018",
    "NA21CPHR18",
    "NA21AECR030",
    "NA21AMAR026",
    "NA21CSTR04",
    "NA21AHIR032",
    "NA21CPHR27",
    "NA21CPLR17",
    "NA21BR0063",
    "NA21AECR055",
]
course_list = [
    "5D01BOT",
    "5D04MAL",
    "5D03BOT",
    "5D01COM",
    "5D03COM",
    "5D03CHE",
    "5D02CSC",
    "5D05CSC",
    "5D01ECO",
    "5D01HIS",
    "5D02HIS",
    "5D03HIS",
    "5D01MAT",
    "5D04MAT",
    "5D03PHY",
    "5D05PHY",
    "5D01POL",
    "5D02SKT",
    "5D052SKT",
    "5D02STA",
    "5D04STA",
    "5D02ZLG",
    "5D03ZLG",
    "5D05PED",
]
url = "http://127.0.0.1:8000/openApi/api/submit/"


for reg in reg_nos:
        choice = random.sample(range(1, len(course_list) + 1), len(course_list))
        payload = {
            "regno": reg,
            "selectedCourses": {course: choice[i] for i, course in enumerate(course_list)},
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Data submitted successfully")
        else:
            print("Failed to submit data:", response.text)






