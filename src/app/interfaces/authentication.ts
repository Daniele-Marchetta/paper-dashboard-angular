export interface loginRequest{
  email:string,
  password:string
}

export interface registerRequest{
  firstName:string
  lastName:string
  email:string
  password:string
  role:"GUEST"|"HR"
}

export interface authResponse{
  access_token:string,
  refresh_token:string
}


