export default {
    "rows": [
        {
            "rowNumber": 1,
            "tenant": "0XFF6DFC7",
            "property": "0X6F205CD4",
            "errors": [
                {
                    "cell": "AU1",
                    "question": "Is anybody in the household pregnant?",
                    "errorMessage": "You told us somebody in the household is pregnant, but that there are no female tenants. Is this correct?",
                    "checkResponse": true,
                    "possibleInput": ["Value labels", "1 = Yes", "2= No", "3 = Person prefers not to say"],
                    "canBeNull": "No",
                },
                {
                    "cell": "CK1",
                    "question": "What is the void or renewal day? - DD",
                    "errorMessage": "Enter void date that’s before the tenancy start date",
                    "checkResponse": false,
                    "possibleInput": ["Numeric, range 1 - 31"],
                    "canBeNull": "No",
                    
                },
                {
                    "cell": "CL1",
                    "question": "What is the void or renewal month? - MM",
                    "errorMessage": "Enter void date that’s before the tenancy start date",
                    "checkResponse": false,
                    "possibleInput": ["Numeric, range 1 - 12"],
                    "canBeNull": "No",
                    
                },
                {
                    "cell": "CM1",
                    "question": "What is the void or renewal year? - YYYY",
                    "errorMessage": "Enter void date that’s before the tenancy start date",
                    "checkResponse": false,
                    "possibleInput": ["Numeric, range 22 - 23"],
                    "canBeNull": "No",
                    
                },
                {
                    "cell": "CR1",
                    "question": "What day did the tenancy start? - DD",
                    "errorMessage": "Enter a tenancy start date that’s after the void date",
                    "checkResponse": false,
                    "possibleInput": ["Numeric, range 1 - 31"],
                    "canBeNull": "No",
                },
                {
                    "cell": "CS1",
                    "question": "What month did the tenancy start? - MM",
                    "errorMessage": "Enter a tenancy start date that’s after the void date",
                    "checkResponse": false,
                    "possibleInput": ["Numeric, range 1 - 12"],
                    "canBeNull": "No",
                },
                {
                    "cell": "CT1",
                    "question": "What month did the tenancy start? - YYYY",
                    "errorMessage": "Enter a tenancy start date that’s after the void date",
                    "checkResponse": false,
                    "possibleInput": ["Numeric, range 22 - 23"],
                    "canBeNull": "No",
                },
            ]
        },
        {
            "rowNumber": 2,
            "tenant": "H5KSLPOM3N5H7",
            "property": "KAMN38DHSJK3",
            "errors": [
                {
                    "cell": "I2",
                    "question": "What is the letting type?",
                    "errorMessage": "Answer rent type",
                    "checkResponse": false,
                    "possibleInput": ["Value labels:", 
                                        "1 = Social rent general needs private registered provider letting (SR GN PRP)",
                                        "2 = Social rent supported housing private registered provider letting (SR SH PRP)",
                                        "3 = Social rent general needs local authority letting (SR GN LA)",
                                        "4 = Social rent supported housing local authority letting (SR SH LA)",
                                        "5 = Affordable rent general needs private registered provider letting (AR GN PRP)",
                                        "6 = Affordable rent supported housing private registered provider letting (AR SH PRP)",
                                        "7 = Affordable rent general needs local authority letting (AR GN LA)",
                                        "8 = Affordable rent supported housing local authority letting (AR SH LA)",
                                        "9 = Intermediate rent general needs private registered provider letting (IR GN PRP)",
                                        "10 = Intermediate rent supported housing private registered provider letting (IR SH PRP)",
                                        "11 = Intermediate rent general needs local authority letting (IR GN LA)",
                                        "12 = Intermediate rent supported housing local authority letting (IR SH LA)"],
                    "canBeNull": "No",
                },
                {
                    "cell": "V2",
                    "question": "Was the person seriously injured or ill as a result of serving in the UK armed forces?",
                    "errorMessage": "Tell us if someone was seriously injured or ill as a result of serving in the UK armed forces",
                    "checkResponse": false,
                    "possibleInput": ["Value labels:", "1 = Yes", "2 = No", "3 = Person prefers not to say"],
                    "canBeNull": "No",
                },
                {
                    "cell": "Y2",
                    "question": "Is the tenant likely to be receiving benefits related to housing?",
                    "errorMessage": "Tell us if the tenant receives housing-related benefits",
                    "checkResponse": false,
                    "possibleInput": ["Value labels:",
                                        "1 = Housing Benefit", 
                                        "3 = Don’t know",
                                        "6 = Universal Credit housing element",
                                        "9 = Neither",
                                        "10 = Tenant prefers not to say"],
                    "canBeNull": "No",
                },
                {
                    "cell": "EC2",
                    "question": "Data Protection",
                    "errorMessage": "Confirm you have shown the DLUHC privacy notice to the tenant",
                    "checkResponse": false,
                    "possibleInput": ["Value labels:", "1 = Yes", "2 = No", "3 = Person prefers not to say"],
                    "canBeNull": "No",
                }
            ]
        }
    ]
}
