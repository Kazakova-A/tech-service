export interface CrmCustomerRequest {
    company_id: string,
    event: string,
    customer: {
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        company: string,
        notifications_enabled: boolean,
        mobile_number: string,
        home_number: string,
        work_number: string,
        lead_source: string,
        tags: [
            string
        ],
        addresses: [
            {
                id: string,
                street: string,
                street_line_2: string,
                city: string,
                state: string,
                zip: string,
                country: string
            }
        ]
    }
}