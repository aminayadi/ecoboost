import { CountryDTO } from "./CountryDTO";
import { UserType } from "./UserType";


export class ApplicationUserDTO {
  id: number | undefined;
  password: String | undefined;
  firstName: String | undefined;
  email: String | undefined;
  lastName: String | undefined;
  userType: UserType | undefined;
  token: String | undefined;
  superAdmin: boolean;
  phone: String | undefined;
  code: String | undefined;
  address: String | undefined;
  countryDTO: CountryDTO;

}