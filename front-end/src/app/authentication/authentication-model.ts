export interface loginResponseDTO 
{
    accessToken: string
}

export interface loginDTO {
    email: string,
    password: string
}

export interface account 
{
    email: string,
    password: string,
    accessToken: string
}