const os = require('os')

const user = os.userInfo();

console.log(`The system uptime is ${os.version}`);

const currentOs = {
    type: os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMeme: os.freemem(),
}
console.log(currentOs);