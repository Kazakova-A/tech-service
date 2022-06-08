export interface CrmJobRequest {
    event: string,
    job: {
        id: string,
        name: string,
        description: string,
        customer: {
            id: string,
            first_name: string,
            last_name: string,
            email: string,
            mobile_number: string,
            home_number: string,
            work_number: string,
            company: string,
            notifications_enabled: boolean,
            tags: [string]
        },
        address: {
            id: string,
            street: string,
            street_line_2: string,
            city: string,
            state: string,
            zip: string,
            country: string
        },
        notes: string,
        work_status: string,
        work_timestamps: {
            started_at: string,
            completed_at: string,
        },
        schedule: {
            scheduled_start: string,
            scheduled_end: string,
        },
        total_amount: number,
        outstanding_balance: number,
        assigned_employees:
            {
                id: string,
                avatar_url: string,
                color_hex: string,
                first_name: string,
                last_name: string,
                email: string,
                mobile_number: string,
                role: string,
                tags: [string]
            }[]
        ,
        tags: [string]
    }
}