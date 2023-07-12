import { wait } from '../../shared/utils.js';
import { getStraightLineDistance } from './methods.js';
const customerQueue = [];
const drivers = [];
process.on('message', ({ from, data }) => {
    if (from === 'customer') {
        const { customerId, name, location } = data;
        customerQueue.push({ customerId, name, location });
    }
    else if (from === 'driver') {
        const { driverId, name, location } = data;
        drivers.push({ driverId, name, location });
    }
});
const main = async () => {
    await wait(5000);
    while (true) {
        await wait(500);
        if (customerQueue.length && drivers.length) {
            const { customerId, name, location } = customerQueue.shift();
            drivers.sort((driverA, driverB) => {
                return (getStraightLineDistance(driverB.location, location) -
                    getStraightLineDistance(driverA.location, location));
            });
            const matchedDriver = drivers.pop();
            const { driverId } = matchedDriver;
            process.send({ customerId, customerName: name, driverId, location });
        }
        if (customerQueue.length)
            continue;
        else
            await wait(1000);
    }
};
main();
//# sourceMappingURL=dispatcher.js.map