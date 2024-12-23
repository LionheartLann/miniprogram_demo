export function getShippingData() {
const data = [];
for (let i = 1; i <= 100; i++) {
data.push({
serialNumber: `WHSC-FH-20231001-${String(i).padStart(3, '0')}`,
status: randomShippingStatus()
});
}
return data;
}
export function getReceivingData() {
const data = [];
for (let i = 1; i <= 100; i++) {
data.push({
serialNumber: `WHSC-SH-20231001-${String(i).padStart(3, '0')}`,
status: randomReceivingStatus()
});
}
return data;
}
function randomShippingStatus() {
const statuses = ['待发货', '已发货', '发货中', '发货完成', '发货异常'];
return statuses[Math.floor(Math.random() * statuses.length)];
}
function randomReceivingStatus() {
const statuses = ['待收货', '已收货', '收货中', '收货完成', '收货异常'];
return statuses[Math.floor(Math.random() * statuses.length)];
}