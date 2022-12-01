
export class AppHelper {
static getConnectedUser(): import("./model/ApplicationUserDTO").ApplicationUserDTO {
 return JSON.parse(sessionStorage.getItem('connectedUser'));
}
public static countries = [
    {name: 'Ghana', code: 'GH'},
    {name: 'Togo', code: 'TG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Nigeria', code: 'NG'},
];
}