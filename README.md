
# OpenCourse Management Webapp
OpenCourse is a programme in our college where students of other deparments are given an oppertunity to learn courses out of their majors. The courses will be provided by other deparments of the college. The allotement of students to the courses is managed by this Webapp  



## Screenshots

![App Screenshot](./doc/s1.png)
![App Screenshot](./doc/s2.png)
![App Screenshot](./doc/s3.png)


## Tech Stack

**Client:** React \
**Server:** Django \
**Database:** sqlite




## Deployment

To deploy this project both frontend and backend locally

Clone the project
```bash
  git clone https://github.com/H4K3R13/opencourse-webapp.git
```
```bash
  cd opencourse-webapp
```

- opencourse-webapp
    - backend-script
    - open-frontend
    - openBackend

## Run Frontend Locally

After changing directory to root folder


```bash
  cd open-frontend
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```

## Run Backend Locally

After changing directory to root folder


```bash
  cd openBackend
```

Install modules

```bash
  pip3  install -r requirements.txt 
```

Start the server

```bash
  python3 manage.py runserver
```
## API Reference

#### To record a entry of student

```http
  POST api/submit/
```
Example of payload

```json
{
    "name": "Theertha",
    "regNumber": "NA20PICS23",
    "dept": "CSC",
    "marks": 1005,
    "courseList": {
        "5D01BOT": 1,
        "5D03BOT": 3,
        "5D03CHE": 7,
        "5D04CHE": 5,
        "5D01COM": 4,
        "5D03COM": 11,
        "5D02CSC": 0,
        "5D05CSC": 0,
        "5D01ECO": 6,
        "5D04ECO": 10,
        "5D01HIS": 12,
        "5D02HIS": 8,
        "5D03HIS": 18,
        "5D03MAL": 13,
        "5D04MAL": 15,
        "5D02MAT": 2,
        "5D04MAT": 19,
        "5D05PED": 14,
        "5D03PHY": 21,
        "5D05PHY": 17,
        "5D01POL": 9,
        "5D05POL": 20,
        "5D02SKT": 23,
        "5D05SKT": 16,
        "5D02STA": 25,
        "5D04STA": 22,
        "5D02ZLG": 27,
        "5D03ZLG": 26
    }
}
```


