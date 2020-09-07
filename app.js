console.log('hi')
const todaysDate = (new Date()).toString().split(' ').splice(1, 3).join(' ')

document.getElementById("todayDate").innerHTML = todaysDate;