/* COPY students
    (first_name, last_name, email, password, netid, college, undergrad_major1, undergrad_major2, undergrad_minor, graduate_major, graduate_concentration, gpa, applying_for, current_position, current_member, profilepic, email_alt, year, gender, phone, birthday, shirt_size, linkedin, graduation_date, ibc_semesters, languages, nationality, keywords, graduated, defered, domestic)    
    FROM 'C:\Users\kinsey\Documents\Class_FA20_Insert_8-7-2020.csv' 
    WITH CSV HEADER;

COPY students
    (netid, profilepic)
    SET (profilepic)=(profilepic WHERE netid=netid)
FROM 'C:\Users\kinsey\Documents\Class_FA20_Insert_8-7-2020.csv' 
WITH CSV HEADER;

CREATE TABLE job_postings (
    job_id bigint PRIMARY KEY,
    job_title VARCHAR(100),
    short_job_description VARCHAR(500),
    long_job_description VARCHAR(2500),
    job_category VARCHAR(250),
    location_city VARCHAR(200),
    location_state VARCHAR(50),
    date_posted DATE,
    equity_model VARCHAR(250),
    founder_id bigint,
    company_id bigint,
    time_commitment VARCHAR(100)
);

INSERT INTO job_postings
    VALUES (1,'Programer','Help me do tasks on Prairie MVP', 'Longer description about helping me do tasks on Prairie MVP', 'Technical', 'anywhere', 'anywhere', '11-22-2020', 'slicing pie', 1,1,'10 hours per week');

CREATE SEQUENCE founder_sequence
  start 1
  increment 1;

UPDATE students
SET profilepic = temp_y.profilepic
FROM temp_y
WHERE students.netid = temp_y.netid;

UPDATE students
SET profilepic = '../Pictures/Ashley_Jun.jpg'
WHERE netid = 'aajun2';

COPY clients
FROM 'C:\Users\kinsey\Documents\client_import_8-15-2020.csv' 
WITH CSV HEADER; */

/* const c = require("config")

SELECT 
    s.person_id,
    s.first_name,
    s.last_name,
    s.email,
    s.netid,
    s.college,
    s.undergrad_major1,
    s.undergrad_major2,
    s.undergrad_minor,
    s.graduate_major,
    s.graduate_concentration,
    s.gpa,
    s.applying_for,
    s.current_position,
    s.current_member,
    s.profilepic,
    s.email_alt,
    s.year,
    s.gender,
    s.phone,
    s.birthday,
    s.shirt_size,
    s.linkedin,
    s.graduation_date,
    s.ibc_semesters,
    s.languages,
    s.nationality,
    s.keywords,
    s.graduated,
    s.defered,
    s.domestic,
    r.reviewer1,
    r.professional1,
    r.academic1,
    r.extracurricular1,
    r.appearance1,
    r.reviewer2,
    r.professional2,
    r.academic2,
    r.extracurricular2,
    r.appearance2,
    r.resume,
    r.total_score,
    b.interviewer,
    b.q1_question,
    b.q1_answer,
    b.q1_score,
    b.q2_question,
    b.q2_answer,
    b.q2_score,
    b.q3_question,
    b.q3_answer,
    b.q3_score,
    b.q4_question,
    b.q4_answer,
    b.q4_score,
    b.core_values,
    b.communication_note,
    b.communication_score,
    b.overall_note,
    b.total_score,
    b.professional_note,
    c.interviewer,
    c.case_question,
    c.q1_score,
    c.q1_note,
    c.q2_score,
    c.q2_note,
    c.q3_score,
    c.q3_note,
    c.overall_note,
    c.total_score,
    e.semester,
    e.q1,
    e.q2,
    e.q3,
    e.q4,
    e.q5,
    e.q6,
    e.q7,
    e.q8,
    e.q9,
    e.q10,
    e.q11,
    e.q12,
    e.q13,
    e.q14,
    e.q15,
    e.q16,
    e.q17,
    e.q18,
    e.q19,
    e.q20,
    e.q21,
    e.q22,
    e.q23,
    e.q24,
    e.q25,
    e.q26,
    e.growth_areas,
    e.returning_to_ibc,
    e.alumni_network,
    e.mentor,
    e.first_destination,
    e.company,
    e.company_location,
    e.company_industry,
    e.job_title,
    e.starting_salary,
    e.reason_leaving,
    e.reason_staying,
    e.project_type,
    e.project_industry,
    e.project_comments,
    e.summer_internship,
    e.event_comments,
    e.other_comments,
    p.semester,
    p.client_id,
    p.project_description,
    p.project_type,
    p.industry
FROM students s
LEFT JOIN resume r ON s.netid = r.netid
LEFT JOIN behavioral_interview b ON s.netid = b.netid
LEFT JOIN case_interview c ON s.netid = c.netid
LEFT JOIN eos_survey e ON s.netid = e.netid
LEFT JOIN projects p ON s.netid = ANY(p.new_consultants)
WHERE s.netid = 'ruoyuz3'; */

/*
SELECT 
    job_id,
    job_title,
    short_job_description,
    long_job_description,
    job_category,
    location_city,
    location_state,
    date_posted,
    equity_model,
    founder_id,
    company_id,
    time_commitment
FROM job_postings
WHERE job_title ILIKE '%'||'Programmer'||'%'
        AND ((FALSE=(array_length(Technical::text[],1) IS NOT NULL)) OR (job_category = ANY ('Technical')));

*/

/* SELECT CONCAT(s.first_name,' ',s.last_name) as FullName FROM students s
WHERE s.netid IN (
    SELECT p.student_director FROM projects p
    WHERE p.project_id = 'SP20-01'
);

SELECT p.client_id, (SELECT CONCAT(s.first_name,' ',s.last_name) as studentdirector FROM students s WHERE p.student_director = s.netid)
FROM students s
LEFT JOIN projects p ON s.netid = ANY(p.new_consultants)
WHERE s.netid = 'ruoyuz3';

ALTER TABLE resume
    RENAME COLUMN reviewer1 TO resume_reviewer1;
    RENAME COLUMN reviewer2 TO resume_reviewer2;
    RENAME COLUMN total_score TO resume_total_score;

ALTER TABLE projects
    RENAME COLUMN semester TO project_date;

ALTER TABLE eos_survey
    RENAME COLUMN semester TO eos_semester;
    RENAME COLUMN project_type TO eos_project_type;
    RENAME COLUMN project_industry TO eos_project_industry;

ALTER TABLE case_interview
    RENAME COLUMN interviewer TO case_interviewer;
    RENAME COLUMN q1_score TO c_q1_score;
    RENAME COLUMN q1_note TO case_q1_note;
    RENAME COLUMN q2_score TO c_q2_score;
    RENAME COLUMN q2_note TO case_q2_note;
    RENAME COLUMN q3_score TO c_q3_score;
    RENAME COLUMN q3_note TO case_q3_note;
    RENAME COLUMN overall_note TO case_overall_note;
    RENAME COLUMN total_score TO case_total_score;

ALTER TABLE behavioral_interview
    RENAME COLUMN interviewer TO behavioral_interviewer;
    RENAME COLUMN q1_question TO b_q1_question;
    RENAME COLUMN q1_answer TO b_q1_answer;
    RENAME COLUMN q1_score TO b_q1_score;
    RENAME COLUMN q2_question TO b_q2_question;
    RENAME COLUMN q2_answer TO b_q2_answer;
    RENAME COLUMN q2_score TO b_q2_score;
    RENAME COLUMN q3_question TO b_q3_question;
    RENAME COLUMN q3_answer TO b_q3_answer;
    RENAME COLUMN q3_score TO b_q3_score;
    RENAME COLUMN q4_question TO b_q4_question;
    RENAME COLUMN q4_answer TO b_q4_answer;
    RENAME COLUMN q4_score TO b_q4_score;
    RENAME COLUMN overall_note TO behavioral_overall_note;
    RENAME COLUMN total_score TO behavioral_total_score;


    INSERT INTO founders (founder_first_name, founder_last_name, founder_primary_email, password)
    VALUES ('Betty', 'White', 'betty.white@gmail.com', 'testpassword');

    ***LINEDIN OAUTH******
    Prerequisites:
    LinedIn Account
    curl

    Client Registration
    goto: www.linedin.com/developers/apps

    clicked on "create new"

    What you need:

    redirectURI = https://godledentrepreneur.com/
    URLENCODE(redirectURI) = https%3A%2F%2Fgodledentrepreneur.com%2F
    clientID = 783d8sq409t4j2
    clientSecret = cNAKmkN6kYaaOABc

    Authorized Endpoint (browser)

    https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=783d8sq409t4j2&redirect_uri=https%3A%2F%2Fgodledentrepreneur.com%2F

    code: AQRaoInEfpv19JCVcxq9aeLYZ_0KK9torfhJBsIhEYHmwKd2Smp7IUnzzC8VizpTF3CO9zvG05S89oWu445LscgFOU70N1cMIXOvGjdbMQ7B_FwOMWEfjvOdBSjt5-A5IjUpyzDXuth_xkG4h1suuD0QVUxgSQKr--K12tb5zbWt03QPC0xGfXfg61vWUg

    Token Endpoint:

    curl -ik -X POST https://www.linkedin.com/oauth/v2/accessToken \
    -d grant_type=authorization_code \
    -d code=AQRu4__epgf3aq0GUh_wjtFqbT6Bn2VzOJ0FvfJGTydXW-TKvgNnivwqpZUtDFxS1f0w_kVbrMB6jlyQSA1uh3U_XRGlRF-nr1p-UDqglLAx3a_rBYWVpPYrRbTSCzzHjspiR0uP5qk0ynhaWcMHdj5pqzMRFHf8U5bPC_Qfglbt7jUG6j68TSWIO2J-fw \
    -d redirect_uri=https%3A%2F%2Fgodledentrepreneur.com%2F \
    -d client_id=783d8sq409t4j2 \
    -d client_secret=cNAKmkN6kYaaOABc

    https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=AQSjiDgu_t-FC02lr7fp34RotBF0j7x7c_1zq5ZuQoxxVo4-PMiyNLuZlbK_Mcdw5gaOw6UCFGbSu6ecy76Q-wygnhOH6NPmYEaCjVooOg-vO27eIDPoNcCT4RhuSorGPktgph_VAeMdyx22UIJI1MZmgfOeszPMALx4Jo3CQZuIXRG3cFM6vOwEjKRw8A&redirect_uri=https%3A%2F%2Fgodledentrepreneur.com%2F&client_id=783d8sq409t4j2&client_secret=cNAKmkN6kYaaOABc

    access_token = AQVdmzXAcJ4IV9-uxTcsINwvKH7nAZUZzsiCps8V_wH4VJlKiHdoRUe1b6mleFbBEkywams_-70exbyjtJze-87fx-NIJOPe8ggb0dfvgHhOVcF95ykRdQOEwoZ6-ixzLK6Eo6vxgUMeA7-ToMr_aM25dMhlhkGmiVbKsRSquEvNZabj9n1BG_0Z85tcnb1Udaa2_AZU4yQbOJ2GoQaEKAftWdH_9aZ4IMnlljM0b5a97b7NPt3VUDi1yP5VJUQ0ZW3edv7qmpHEyWs3cTx-YZUnd8g49B_J-nigwE_GxX0S-L7gJXK8V2fLem_y5XlfeJ9esZZa9C4XMv953YPPKqn0m2jt1w

    Resource Access:

    https://api.linkedin.com/v2/me
    "Authorization: Bearer access_token"

    {
    "localizedLastName": "Kinsey",
    "profilePicture": {
        "displayImage": "urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ"
    },
    "firstName": {
        "localized": {
            "en_US": "Jacob"
        },
        "preferredLocale": {
            "country": "US",
            "language": "en"
        }
    },
    "lastName": {
        "localized": {
            "en_US": "Kinsey"
        },
        "preferredLocale": {
            "country": "US",
            "language": "en"
        }
    },
    "id": "9eFjd4B_W6",
    "localizedFirstName": "Jacob"
    }

    https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))

    {
    "elements": [
        {
            "handle~": {
                "emailAddress": "jacob.kinsey@gmail.com"
            },
            "handle": "urn:li:emailAddress:245720026"
        }
    ]
}

    https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))

    {
    "firstName": {
        "localized": {
            "en_US": "Jacob"
        },
        "preferredLocale": {
            "country": "US",
            "language": "en"
        }
    },
    "lastName": {
        "localized": {
            "en_US": "Kinsey"
        },
        "preferredLocale": {
            "country": "US",
            "language": "en"
        }
    },
    "profilePicture": {
        "displayImage": "urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ",
        "displayImage~": {
            "paging": {
                "count": 10,
                "start": 0,
                "links": []
            },
            "elements": [
                {
                    "artifact": "urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100)",
                    "authorizationMethod": "PUBLIC",
                    "data": {
                        "com.linkedin.digitalmedia.mediaartifact.StillImage": {
                            "mediaType": "image/jpeg",
                            "rawCodecSpec": {
                                "name": "jpeg",
                                "type": "image"
                            },
                            "displaySize": {
                                "width": 100.0,
                                "uom": "PX",
                                "height": 100.0
                            },
                            "storageSize": {
                                "width": 100,
                                "height": 100
                            },
                            "storageAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            },
                            "displayAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            }
                        }
                    },
                    "identifiers": [
                        {
                            "identifier": "https://media-exp1.licdn.com/dms/image/C4E03AQGnp0cC4AHRhQ/profile-displayphoto-shrink_100_100/0/1596164514264?e=1614816000&v=beta&t=LJAWN2PS1Gpfc2vGFulr6cMjftOyHK8iOjhCwFNvLos",
                            "index": 0,
                            "mediaType": "image/jpeg",
                            "file": "urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100,0)",
                            "identifierType": "EXTERNAL_URL",
                            "identifierExpiresInSeconds": 1614816000
                        }
                    ]
                },
                {
                    "artifact": "urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200)",
                    "authorizationMethod": "PUBLIC",
                    "data": {
                        "com.linkedin.digitalmedia.mediaartifact.StillImage": {
                            "mediaType": "image/jpeg",
                            "rawCodecSpec": {
                                "name": "jpeg",
                                "type": "image"
                            },
                            "displaySize": {
                                "width": 200.0,
                                "uom": "PX",
                                "height": 200.0
                            },
                            "storageSize": {
                                "width": 200,
                                "height": 200
                            },
                            "storageAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            },
                            "displayAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            }
                        }
                    },
                    "identifiers": [
                        {
                            "identifier": "https://media-exp1.licdn.com/dms/image/C4E03AQGnp0cC4AHRhQ/profile-displayphoto-shrink_200_200/0/1596164514264?e=1614816000&v=beta&t=isDpCSUCkweTFnGEQ4svyguRMxM9wZ-KI6lQBn8RrAk",
                            "index": 0,
                            "mediaType": "image/jpeg",
                            "file": "urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200,0)",
                            "identifierType": "EXTERNAL_URL",
                            "identifierExpiresInSeconds": 1614816000
                        }
                    ]
                },
                {
                    "artifact": "urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400)",
                    "authorizationMethod": "PUBLIC",
                    "data": {
                        "com.linkedin.digitalmedia.mediaartifact.StillImage": {
                            "mediaType": "image/jpeg",
                            "rawCodecSpec": {
                                "name": "jpeg",
                                "type": "image"
                            },
                            "displaySize": {
                                "width": 400.0,
                                "uom": "PX",
                                "height": 400.0
                            },
                            "storageSize": {
                                "width": 400,
                                "height": 400
                            },
                            "storageAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            },
                            "displayAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            }
                        }
                    },
                    "identifiers": [
                        {
                            "identifier": "https://media-exp1.licdn.com/dms/image/C4E03AQGnp0cC4AHRhQ/profile-displayphoto-shrink_400_400/0/1596164514264?e=1614816000&v=beta&t=u5KztN9o1GhASbPE4P2NGIJipYS5R-J3LOGN1qit4Wg",
                            "index": 0,
                            "mediaType": "image/jpeg",
                            "file": "urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400,0)",
                            "identifierType": "EXTERNAL_URL",
                            "identifierExpiresInSeconds": 1614816000
                        }
                    ]
                },
                {
                    "artifact": "urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800)",
                    "authorizationMethod": "PUBLIC",
                    "data": {
                        "com.linkedin.digitalmedia.mediaartifact.StillImage": {
                            "mediaType": "image/jpeg",
                            "rawCodecSpec": {
                                "name": "jpeg",
                                "type": "image"
                            },
                            "displaySize": {
                                "width": 800.0,
                                "uom": "PX",
                                "height": 800.0
                            },
                            "storageSize": {
                                "width": 800,
                                "height": 800
                            },
                            "storageAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            },
                            "displayAspectRatio": {
                                "widthAspect": 1.0,
                                "heightAspect": 1.0,
                                "formatted": "1.00:1.00"
                            }
                        }
                    },
                    "identifiers": [
                        {
                            "identifier": "https://media-exp1.licdn.com/dms/image/C4E03AQGnp0cC4AHRhQ/profile-displayphoto-shrink_800_800/0/1596164514264?e=1614816000&v=beta&t=RzTAOkattqe5rM4suenjGosM1I-CdcPu83rjqyBU7tM",
                            "index": 0,
                            "mediaType": "image/jpeg",
                            "file": "urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C4E03AQGnp0cC4AHRhQ,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800,0)",
                            "identifierType": "EXTERNAL_URL",
                            "identifierExpiresInSeconds": 1614816000
                        }
                    ]
                }
            ]
        }
    },
    "id": "9eFjd4B_W6"
}

    What you need from the response:
    firstname = 

    WITH comp_num AS (
        INSERT INTO companies (
            company_name,
            company_bio,
            date_inception,
            date_created,
            website,
            company_info_email,
            company_logo)
        VALUES (
            'Test Name 26',
            'Test Bio 26',
            '12-26-2020',
            '12-26-2020',
            'website test',
            'email test',
            'logo test')
        RETURNING company_id)
    INSERT INTO founders_company (founder_id, company_id, role, equity)
    SELECT '1', c.company_id, 'CEO', '100%'
    FROM comp_num c;

    SELECT 
            f.founder_id,
            f.founder_first_name,
            f.founder_last_name,
            f.founder_primary_email,
            f.founder_pic,
            f.founder_bio,
            f.date_created,
            f.status,
            array_agg(j.company_id) as related_company_ids,
            array_agg(c.company_name) as related_company_name,
            array_agg(p.job_id) as related_job_ids,
            array_agg(p.job_title) as related_job_name
        FROM founders f
        LEFT JOIN founders_company j ON f.founder_id = j.founder_id
        LEFT JOIN companies c ON j.company_id = c.company_id
        LEFT JOIN job_postings p ON c.company_id = p.company_id AND f.founder_id = p.founder_id
        WHERE f.founder_id = '1'
        GROUP BY f.founder_id;

        SELECT array_agg(j.company_id) as related_company_ids FROM founders_company j WHERE j.founder_id = '2'
        LEFT JOIN founders_company j ON f.founder_id = j.founder_id
        SELECT array_to_string({35,36,37}, ',', '');
        SELECT
            array_agg(j.company_id) as related_company_ids,
            array_agg(c.company_name) as related_company_name
        FROM founders_company j
        LEFT JOIN companies c ON j.company_id = c.company_id
        WHERE j.founder_id = '2';

        SELECT 
            c.company_id,
            c.company_name,
            c.company_bio,
            c.date_inception,
            c.date_created,
            c.website,
            c.company_info_email,
            c.company_logo,
            array_agg(j.founder_id) as related_founder_ids,
            array_agg(f.founder_last_name) as related_founder_name,
            array_agg(p.job_id) as related_job_ids,
            array_agg(p.job_title) as related_job_name
        FROM companies c
        LEFT JOIN founders_company j ON c.company_id = j.company_id
        LEFT JOIN founders f ON j.founder_id = f.founder_id
        LEFT JOIN job_postings p ON c.company_id = p.company_id AND f.founder_id = p.founder_id
        WHERE c.company_id = '1'
        GROUP BY c.company_id;

        INSERT INTO job_postings (
                    job_title,
                    short_job_description,
                    long_job_description,
                    job_category,
                    location_city,
                    location_state,
                    date_posted,
                    equity_model,
                    founder_id,
                    company_id,
                    time_commitment,
                    skills)
                VALUES (
                    'job_title',
                    'short_job_description',
                    'long_job_description',
                    'job_category',
                    'location_city',
                    'location_state',
                    CURRENT_DATE,
                    'equity_model',
                    '1',
                    '1',
                    'time_commitment',
                    '{skills}')
                RETURNING job_id;

    (DELETE FROM companies WHERE company_id = $1 RETURNING company_id)

            array_agg(p.job_id) as related_job_ids,
            array_agg(p.job_title) as related_job_name

    SELECT 
            c.company_id,
            c.company_name,
            c.company_bio,
            c.date_inception,
            c.date_created,
            c.website,
            c.company_info_email,
            c.company_logo,
            array_agg(f.founder_id) as related_founder_ids,
            array_agg(f.founder_last_name) as related_founder_name,
            array_agg(p.job_id) as related_job_ids,
            array_agg(p.job_title) as related_job_name            
        FROM companies c
        LEFT JOIN job_postings p ON c.company_id = p.company_id
        LEFT JOIN founders_company j ON c.company_id = j.company_id
        LEFT JOIN founders f ON j.founder_id = f.founder_id
        WHERE c.company_id = '1'
        GROUP BY c.company_id;

    SELECT
            f.founder_first_name,
            array_agg(j.company_id) as related_company_ids,
            array_agg(c.company_name) as related_company_names
        FROM founders f
        LEFT JOIN founders_company j ON f.founder_id = j.founder_id
        LEFT JOIN companies c ON j.company_id = c.company_id
        WHERE f.founder_id = '1'
        GROUP BY f.founder_id;

        SELECT 
            c.company_id,
            (SELECT array_agg(DISTINCT (f.founder_id)) as related_founder_ids FROM founders f LEFT JOIN founders_company j ON f.founder_id = j.founder_id LEFT JOIN companies c ON j.company_id = c.company_id WHERE c.company_id = '1'),
            (SELECT array_agg(f.founder_last_name) as related_founder_names FROM founders f LEFT JOIN founders_company j ON f.founder_id = j.founder_id LEFT JOIN companies c ON j.company_id = c.company_id WHERE c.company_id = '1'),
            (SELECT array_agg(p.job_id) as related_job_ids FROM job_postings p LEFT JOIN companies c ON p.company_id = c.company_id WHERE c.company_id = '1'),
            (SELECT array_agg(p.job_title) as related_job_name FROM job_postings p LEFT JOIN companies c ON p.company_id = c.company_id WHERE c.company_id = '1')
        FROM companies c
        WHERE c.company_id = '1';

    CREATE TABLE chat (
    chat_id BIGSERIAL PRIMARY KEY,
    sender_id bigint,
    reciever_id bigint,
    chat_message VARCHAR(2500),
    message_date date,
    message_read BOOLEAN
    );
    
    SELECT 
            c.chat_id,
            c.sender_id,
            c.reciever_id,
            c.chat_message,
            c.message_timestamp,
            c.message_read
        FROM chat c
        LEFT JOIN founders f ON c.reciever_id = f.founder_id
        WHERE c.reciever_id = '1' or c.sender_id = '1';

    SELECT 
            c.chat_id,
            (SELECT CONCAT(f.founder_first_name,' ',f.founder_last_name) as sender_name FROM founders f WHERE c.sender_id = f.founder_id and c.chat_id = c.chat_id),
            (SELECT CONCAT(f.founder_first_name,' ',f.founder_last_name) as reciever_name FROM founders f WHERE c.reciever_id = f.founder_id and c.chat_id = c.chat_id),
            c.chat_message,
            c.message_timestamp,
            c.message_read
        FROM chat c
        LEFT JOIN founders f ON c.reciever_id = f.founder_id
        WHERE c.reciever_id = '1' or c.sender_id = '1';

COPY account
    (salesforce_acct_uid, account_name, profit, account_description, website, administrator_id, company_logo, address_1, address_2, city, state, zip, country, industry, employee_size, yearly_revenue)    
    FROM 'C:\Users\kinsey\Documents\IBC_Accounts_Import_3-13-2021.csv' 
    WITH CSV HEADER;

COPY clients
    (salesforce_uid, client_first_name, client_last_name, client_title, client_email, client_phone, alumni, password, profilepic, linkedin)    
    FROM 'C:\Users\kinsey\Documents\IBC_Clients_Import_3-13-2021.csv' 
    WITH CSV HEADER;

COPY account_contacts
    (account_clients_id, salesforce_uid, salesforce_acct_uid)    
    FROM 'C:\Users\kinsey\Documents\IBC_Account_Clients_Import_3-13-2021.csv' 
    WITH CSV HEADER;

 */

