export function dateBuilder (dt,timezone) {
    let timetime = dt * 1000 + timezone * 1000;
    var convertdLocalTime = new Date(timetime);
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[convertdLocalTime.getUTCDay()];
    let date = convertdLocalTime.getUTCDate();
    let month = months[convertdLocalTime.getUTCMonth()];
    let year = convertdLocalTime.getUTCFullYear();

    return `${day} ${date} ${month} ,  ${year}`;
}

export function getDayOftheWeek (dt,timezone){
    let timetime = dt * 1000 + timezone * 1000;
    var a = new Date(timetime);
    var days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
    return days[a.getDay()]
}